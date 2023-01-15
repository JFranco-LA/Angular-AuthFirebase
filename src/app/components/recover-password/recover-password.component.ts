import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {

  recuperarUsuario: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseErrorService
  ) {
    this.recuperarUsuario = fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  actionCodeSettings = {
    url: 'https://www.example.com',
    handleCodeInApp: true

  }

  sendMessage() {
    const { email } = this.recuperarUsuario.value;
    
    this.isLoading=true;
    this.afAuth.sendPasswordResetEmail(email, this.actionCodeSettings)
      .then(() => {
        this.toastr.error('Se ha enviado un mensaje a su correo', 'Recuperar Contraseña');
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        console.log(err);
        this.isLoading = false;
        this.toastr.error(this.firebaseError.codeError(err.code), 'Ha ocurrido un problema');
      })
  }
}
