import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBack, eyeOutline, eyeOffOutline, personCircleOutline } from 'ionicons/icons';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-reestablecer-password',
  templateUrl: './reestablecer-password.page.html',
  styleUrls: ['./reestablecer-password.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon]
})
export class ReestablecerPasswordPage implements OnInit {
  emailUser: string = 'correo@ejemplo.com';
  codigoValidacion: string = '';
  
  inputValue: string = '';
  inputValue2: string = '';
  
  mostrarPass1: boolean = false;
  mostrarPass2: boolean = false;
  noCoincide: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({ chevronBack, eyeOutline, eyeOffOutline, personCircleOutline });
    
    const navegacion = this.router.getCurrentNavigation();
    if (navegacion?.extras.state) {
      this.emailUser = navegacion.extras.state['email'];
    }
  }

  ngOnInit() { }

  async actualizar() {
    if (!this.codigoValidacion || !this.inputValue || !this.inputValue2) {
      this.mostrarAlerta('Campos vacíos', 'Por favor completa el código y las contraseñas.');
      return;
    }

    if (this.inputValue === this.inputValue2) {
      this.noCoincide = false;
      
      const passwordEncriptada = sha256(this.inputValue);
      console.log('Password lista para enviar al backend:', passwordEncriptada);

      // Aquí iría el HTTP POST real usando this.userService.actualizarPassword(...)
      
      const alert = await this.alertController.create({
        message: "La contraseña ha sido actualizada con éxito",
        buttons: [{
          text: "Aceptar",
          handler: () => { this.router.navigate(["/auth/login"]) }
        }],
        cssClass: "passwordAlert",
      });
      await alert.present();

    } else {
      this.noCoincide = true;
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({ header, message, buttons: ['OK'] });
    await alert.present();
  }

  irAtras() { this.router.navigate(['/auth/recuperar-password']); }
}