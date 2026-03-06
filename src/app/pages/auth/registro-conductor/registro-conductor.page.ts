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
import { AuthService } from '../../../services/auth';

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
  datosConductor = {
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    repetir_password: '',
    cedula: '',
    telefono: '',
    fecha_nacimiento: '',
    sexo: '',
    pais: '',
    ciudad: '',
    aceptaTerminos: false
  };

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {
    addIcons({ chevronBack, eyeOff, caretDown });
  }

  ngOnInit() { }

  irAtras() {
    this.router.navigate(['/auth/login']);
  }

  esMayorDeEdad(fechaNacimiento: string): boolean {
    if (!fechaNacimiento) return false;

    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }

    return edad >= 18;
  }

  async registrarse() {
    if (!this.datosConductor.nombres || !this.datosConductor.apellidos || !this.datosConductor.email || !this.datosConductor.cedula) {
      this.mostrarAlerta('Error', 'Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (this.datosConductor.password !== this.datosConductor.repetir_password) {
      this.mostrarAlerta('Error', 'Las contraseñas no coinciden.');
      return;
    }

    if (!this.datosConductor.fecha_nacimiento) {
      this.mostrarAlerta('Error', 'Por favor ingresa tu fecha de nacimiento.');
      return;
    }

    if (!this.esMayorDeEdad(this.datosConductor.fecha_nacimiento)) {
      this.mostrarAlerta('Registro Denegado', 'Debes ser mayor de 18 años para registrarte en Migo.');
      return;
    }

    if (!this.datosConductor.aceptaTerminos) {
      this.mostrarAlerta('Error', 'Debes aceptar los términos y condiciones.');
      return;
    }

    const datosParaBackend = {
      nombres: this.datosConductor.nombres,
      apellidos: this.datosConductor.apellidos,
      email: this.datosConductor.email,
      password: this.datosConductor.password,
      cedula: this.datosConductor.cedula,
      telefono: this.datosConductor.telefono,
      fecha_nacimiento: this.datosConductor.fecha_nacimiento,
      sexo: this.datosConductor.sexo,
      acepta_terminos: this.datosConductor.aceptaTerminos
    };

    this.authService.registrarConductor(datosParaBackend).subscribe({
      next: (respuesta) => {
        localStorage.setItem('temp_conductor_token', respuesta.token);
        localStorage.setItem('temp_conductor_id', respuesta.conductor_id.toString());
        this.router.navigate(['/auth/registro-vehiculo']);
      },
      error: (err) => {
        this.mostrarAlerta('Error de Registro', err.error?.error || 'No se pudo registrar.');
      }
    });
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