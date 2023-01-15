import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  sesionUsuario: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseErrorService
  ) {
    this.sesionUsuario = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  loginAccount() {
    const { email, password } = this.sesionUsuario.value;
    console.log(email, password);

    if (!email || !password) {
      this.toastr.error('Ingrese sus credenciales', 'Ha ocurrido un problema');
    }
    else {
      this.isLoading = true;
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
          this.router.navigate(['/dashboard']);
        }).catch((err) => {
          console.log(err);
          this.isLoading = false;
          this.toastr.error(this.firebaseError.codeError(err.code), 'Ha ocurrido un problema');
        });
    }
  }

}
