import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBack } from 'ionicons/icons';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon]
})
export class RecuperarPasswordPage {
  correo: string = '';
  emailInvalido: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({ chevronBack });
  }

  async enviar() {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!regex.test(this.correo)) {
      this.emailInvalido = true;
      return;
    }
    
    this.emailInvalido = false;

    const alert = await this.alertController.create({
      header: 'Código Enviado',
      message: 'Revisa tu bandeja de entrada. Te hemos enviado un código de 6 dígitos.',
      buttons: ['OK']
    });
    await alert.present();

    this.router.navigate(['/auth/reestablecer-password'], { state: { email: this.correo } });
  }

  irAtras() { this.router.navigate(['/auth/login']); }
}