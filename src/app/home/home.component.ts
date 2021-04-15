import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    console.log('vous êtes sur le composant home. Vous êtes redirigé vers la page préférée.');
    this.authenticationService.currentUser.subscribe((res: any) => {
      switch (res.ROLE) {
        case '3':
          this.router.navigate(['/app-operator']);
          break;
        case '4':
          this.router.navigate(['/app-preparateur']);
          break;
        case '5':
          this.router.navigate(['/app-gestionnaire']);
          break;
        default:
          this.router.navigate(['/app-operator']);
          console.log('default page');
          break;
      }
    });
  }

}
