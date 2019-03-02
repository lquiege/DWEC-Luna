import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nick: string = '';
  password: string = '';
  constructor(public db: FirebaseService) {}

  ngOnInit() {}

  login() {
    this.db.login(this.nick, this.password);
  }
}
