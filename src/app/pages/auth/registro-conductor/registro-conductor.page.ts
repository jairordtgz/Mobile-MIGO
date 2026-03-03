import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, 
  IonTitle, IonContent, IonInput, IonSelect, 
  IonSelectOption, IonCheckbox, IonButton, AlertController,
  IonIcon
} from '@ionic/angular/standalone'; 
import { addIcons } from 'ionicons';
import { chevronBack, eyeOff, caretDown } from 'ionicons/icons';

@Component({
  selector: 'app-registro-conductor',
  templateUrl: './registro-conductor.page.html',
  styleUrls: ['./registro-conductor.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonButtons, 
    IonBackButton, IonTitle, IonContent, IonInput, IonSelect, 
    IonSelectOption, IonCheckbox, IonButton, IonIcon
  ]
})
export class RegistroConductorPage implements OnInit {

  fechaNacimiento: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) { 
    addIcons({ chevronBack, eyeOff, caretDown });
  }

  ngOnInit() { }

  irAtras() {
    this.router.navigate(['/auth/login']); 
  }

  async registrarse() {
    if (!this.fechaNacimiento) {
      this.mostrarAlerta('Error', 'Por favor ingresa tu fecha de nacimiento.');
      return;
    }

    const hoy = new Date();
    const fechaNac = new Date(this.fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }

    if (edad < 18) {
      this.mostrarAlerta('Registro Denegado', 'Debes ser mayor de 18 años para registrarte en Migo.');
      return;
    }

    this.router.navigate(['/auth/registro-vehiculo']);
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}