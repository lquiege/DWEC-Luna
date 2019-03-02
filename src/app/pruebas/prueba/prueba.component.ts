import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/game';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../../servicios/firebase.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {
  games: Game[] = [];
  game: Game;
  gamesPrueba: Game[] = [];
  editar: boolean = false;
  GameId: string = '';
  private gamesSub: Subscription;
  constructor(public gameServ: FirebaseService) {}

  ngOnInit() {
    /* this.posts = */ this.gameServ.getGames();
    this.gamesSub = this.gameServ
      .getGamesUpdated()
      .subscribe((posts: Game[]) => {
        console.log('clg', posts);
        this.games = posts;
      });
  }

  ngOnDestroy(): void {
    this.gamesSub.unsubscribe();
  }

  onAddGame(form: NgForm) {
    if (form.invalid) {
      return;
    }
    //  this.newPost = this.input.nativeElement.value;
    /* const post: Post = {
      tittle: form.value.title,
      content: form.value.content
    }; */
    this.gameServ.addGames(form.value.title, form.value.console);
    //   this.gameServ.getGames();
    // form.reset();
    form.resetForm();
  }

  getPost(id) {
    this.game = this.gameServ.getGame(id);

    this.GameId = id;
    this.editar = !this.editar;
  }

  onEdit(form: NgForm) {
    //console.log(id);

    this.gameServ.updateGame(this.GameId, form.value.title, form.value.console);

    this.editar = !this.editar;
  }

  onDelete(id) {
    this.gameServ.deleteGame(id);
  }
}
