import { Component, OnInit } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private _flashMessagesService: FlashMessagesService,
    public router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.login(this.email, this.password).then((res) => {
      this._flashMessagesService.show('You are now logged in', { cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/']);

    })
      .catch((error) => {
        this._flashMessagesService.show(error.message, { cssClass: 'alert-danger', timeout: 4000});
        this.router.navigate(['/login']);
        });
  }
}
