import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';
import { SettingsService } from '../../services/settings.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegistration: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.auth.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
        this.loggedInUser = null;
      }
    });
    this.showRegistration = this.settingsService.getSettings().allowRegistration;
  }

  onLogoutClick() {
    this.auth.logout();
    this.flashMessages.show('You have been logged out', { cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/login']);
  }

}
