import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import { Subject, Observable } from 'rxjs';
import { Game } from '../interfaces/game';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements CanActivate {
  private games: Game[] = [];
  private gamesUpdated = new Subject<Game[]>();
  user: Usuario;
  constructor(
    private firebase: AngularFireDatabase,
    private http: HttpClient,
    private navegacion: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.user) return true;
    else this.navegacion.navigate(['/']);
  }

  login(nick: string, pass: string) {
    this.getUsuario(nick).subscribe(data => {
      console.log(data);
      this.user = data as Usuario;
      this.user.key$ = nick;
      console.log(this.user);
      this.navegacion.navigate(['/games']);
    });
  }

  getUsuario(nick: string) {
    return this.firebase.object('usuarios/' + nick).valueChanges();
  }

  insertUsuario(nick: string, usuario: Usuario) {
    return this.firebase.list('usuarios').set(nick, usuario);
  }

  getGames() {
    return this.http
      .get<Game[]>('http://localhost:3000/api/todos')
      .subscribe(data => {
        this.games = data;
        this.gamesUpdated.next([...this.games]);
      });
  }

  getGame(id) {
    return { ...this.games.find(game => id === game.id) };
  }

  getGamesUpdated() {
    return this.gamesUpdated.asObservable();
  }

  addGames(title: string, consoles: string) {
    const game: Game = { id: null, title: title, console: consoles };
    this.http
      .post<{ data: Game }>('http://localhost:3000/api/anadir', game)
      .subscribe((data: any) => {
        console.log(data);

        this.games.push(data);

        this.gamesUpdated.next([...this.games]);
      });
  }

  updateGame(id: string, title: string, consoles: string) {
    const game: Game = { id: id, title: title, console: consoles };
    this.http
      .put('http://localhost:3000/api/editar/' + id, game)
      .subscribe(() => {
        const updatedGame = [...this.games];
        const oldGameIndex = updatedGame.findIndex(g => g.id === game.id);
        updatedGame[oldGameIndex] = game;
        this.games = updatedGame;
        this.gamesUpdated.next([...this.games]);
        console.log('actualizado');
      });
  }

  deleteGame(id: string) {
    this.http
      .delete('http://localhost:3000/api/eliminar/' + id)
      .subscribe(data => {
        console.log(data);
        const updatedGames = this.games.filter(game => game.id !== id);
        this.games = updatedGames;
        this.gamesUpdated.next([...this.games]);
      });
  }
}
