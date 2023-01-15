import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  constructor() { }

  codeError(code: string) {
    switch (code) {
      case 'auth/email-already-in-use': return 'El correo ya ha sido registrado en el sistema';

      case 'auth/invalid-email': return 'Ingrese un correo válido';

      case 'auth/weak-password': return 'La contraseña es muy corta'

      case 'auth/wrong-password': return 'La contraseña es incorrecta'

      case 'auth/user-not-found': return 'El usuario no existe'

      default: return 'Ocurrió un error al intentar registrarse';
    }
  }
}
