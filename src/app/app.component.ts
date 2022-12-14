import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from './user/authentication/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Used cars';

  isLoggedIn = false;

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken() != null) {
      this.isLoggedIn = true;
    }
  }

  handleLogout() {
    this.tokenStorage.signOut();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
