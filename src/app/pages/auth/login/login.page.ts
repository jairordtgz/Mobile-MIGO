import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline, logoGoogle } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon]
})
export class LoginPage implements OnInit {
  correoPlaca: string = '';
  contrasena: string = '';
  mostrarContrasena: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService 
  ) { 
    addIcons({ eyeOutline, eyeOffOutline, logoGoogle });
  }

  ngOnInit() { }

  toggleContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  async iniciarSesion() {
    if (!this.correoPlaca || !this.contrasena) {
      this.mostrarAlerta('Campos vacíos', 'Por favor ingresa tu correo y contraseña.');
      return;
    }

    const credenciales = {
      username: this.correoPlaca,
      email: this.correoPlaca,
      password: this.contrasena
    };

    this.authService.login(credenciales).subscribe({
      next: (respuesta) => {
        console.log('Login exitoso:', respuesta);
        this.mostrarAlerta('¡Éxito!', 'Conectado al servidor de Django correctamente.');
      },
      error: (errorRes) => {
        console.error('Error de login:', errorRes);
        let mensajeError = 'Error al intentar conectar con el servidor.';
        
        if (errorRes.status === 401) {
          mensajeError = 'Credenciales incorrectas. Verifica tu correo y contraseña.';
        } else if (errorRes.status === 403) {
          mensajeError = 'Tu cuenta no tiene permisos para acceder.';
        }

        this.mostrarAlerta('Error de Acceso', mensajeError);
      }
    });

    this.router.navigate(['/tabs/home']);
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({ header, message, buttons: ['OK'] });
    await alert.present();
  }

  irARegistro() { this.router.navigate(['/auth/registro-conductor']); }
  irAInvitado() { this.router.navigate(['/invitado/ofertas']); }
  irARecuperar() { this.router.navigate(['/auth/recuperar-password']); }
}