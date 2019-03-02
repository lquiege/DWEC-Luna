import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';
import { NgForm, NgModel } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  @ViewChild('nic') nickInput: NgModel;
  @ViewChild('af1') af1: any;
  @ViewChild('af2') af2: any;
  nick: string;
  aficion1: string = '';
  aficion2: string = '';
  placeHolderNick: string = 'Nick';
  nickRegistro: string = '';
  password: string = '';
  password2: string;
  user: any = null;
  activado: boolean = false;
  color: boolean = true;
  constructor(public db: FirebaseService, public router: Router) {
    //this.password.length
  }

  ngOnInit() {}

  registro() {
    if (this.password !== this.password2 || this.user !== null) {
      return;
    } else {
      this.activado = true;
      this.user = {};
      this.user.nombre = '';
      this.user.aficiones = '';
      this.user.password = this.password;
    }
  }

  registroVerdad(ng: NgForm) {
    console.log(this.user.nombre);

    let chk_arr = document.querySelectorAll('input[type=checkbox]:checked');
    let aficiones = [];
    for (var i = 0; i < chk_arr.length; i++) {
      //@ts-ignore
      aficiones.push(chk_arr[i].value);
    }
    this.user.aficiones = JSON.stringify(aficiones);
    console.log(this.user);
    this.db.insertUsuario(this.nick, this.user);
    this.router.navigate(['/login']);
  }
  onKeyUp(form: NgForm) {
    this.user = null;
    if (this.nick.length > 0) {
      this.db.getUsuario(this.nick).subscribe(data => {
        console.log(data);

        if (data) {
          this.user = data;
          this.placeHolderNick = 'Enter an available nick, please';
          this.color = false;
        } else {
          console.log('borrado');
          this.placeHolderNick = 'Nick';
          this.user = null;
          this.color = true;
        }
      });
    }
  }
}
