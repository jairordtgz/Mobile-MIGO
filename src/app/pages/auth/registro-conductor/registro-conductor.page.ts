import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, 
  IonTitle, IonContent, IonInput, IonSelect, 
  IonSelectOption, IonCheckbox, IonButton, AlertController,
  IonIcon // IMPORTANTE: Agregamos IonIcon para que cargue los iconos en Standalone
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

  // Variable conectada al HTML
  fechaNacimiento: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) { 
    // Registramos los iconos visuales del nuevo diseño
    addIcons({ chevronBack, eyeOff, caretDown });
  }

  ngOnInit() { }

  // Función para la flecha superior izquierda
  irAtras() {
    this.router.navigate(['/auth/login']); 
  }

  async registrarse() {
    if (!this.fechaNacimiento) {
      this.mostrarAlerta('Error', 'Por favor ingresa tu fecha de nacimiento.');
      return;
    }

    // Lógica para calcular la edad exacta
    const hoy = new Date();
    const fechaNac = new Date(this.fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();

    // Si el mes actual es menor al mes de nacimiento, o si es el mismo mes pero el día no ha llegado, restamos 1 año
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }

    // Regla de Negocio HU2
    if (edad < 18) {
      this.mostrarAlerta('Registro Denegado', 'Debes ser mayor de 18 años para registrarte en Migo.');
      return;
    }

    // Si pasa la validación, lo llevamos a subir las fotos del vehículo
    console.log('Edad validada:', edad, 'años. Navegando al registro de vehículo...');
    this.router.navigate(['/auth/registro-vehiculo']);
  }

  // Función auxiliar para mostrar alertas nativas
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}