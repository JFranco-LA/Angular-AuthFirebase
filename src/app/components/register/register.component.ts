import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registrarUsuario: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseErrorService) {
    this.registrarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
    }
    )
  }

  registerData() {
    const { email, password, repeatPassword } = this.registrarUsuario.value;
    // console.log(email, password, repeatPassword);
    if (password === repeatPassword) {
      this.isLoading = true;
      this.afAuth.createUserWithEmailAndPassword(email, password).then((user) => {
        console.log(user);
        this.toastr.success('Usuario registrado con éxito', 'Bienvenido!!');
        this.router.navigate(['login']);
        this.isLoading = false;
      }).catch((err) => {
        console.log(err);
        this.toastr.error(this.firebaseError.codeError(err.code), 'Ha ocurrido un problema');
        this.isLoading = false;
      });
    } else {
      this.toastr.error('Las contraseñas no coinciden', 'Ha ocurrido un problema')
      this.isLoading = true;
      setTimeout(() => { this.isLoading = false }, 150);
    }
    // this.isLoading = false;
  }

}
