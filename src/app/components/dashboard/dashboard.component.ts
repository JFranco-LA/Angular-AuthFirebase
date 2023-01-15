import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  dataUser: any;

  isLoading: boolean = false;

  constructor(public router: Router, private afAuth: AngularFireAuth,
    private toastr: ToastrService,) {

      this.afAuth.currentUser.then((user) => {
        if (user) {
          this.dataUser = user;
        } else {
          this.router.navigate(['/login']);
        }
      });

  }

  cerrarSesion() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false
      this.afAuth.signOut()
        .then(() => {
          this.toastr.info('Sesion Finalizada', 'Mensaje de la Web');
          this.router.navigate(['/login'])
        });
    }, 400);

  }
}
