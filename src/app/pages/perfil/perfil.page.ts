import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonIcon, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personCircleOutline, documentTextOutline, megaphoneOutline,
  timeOutline, speedometerOutline, carOutline, addCircleOutline,
  notifications, chevronForward, logOutOutline
} from 'ionicons/icons';

// Importamos la interfaz desde la nueva carpeta
import { Perfil } from '../../../interfaces/perfil';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon]
})
export class PerfilPage implements OnInit {

  // Usamos la interfaz importada
  perfil: Perfil = {
    nombre: 'Emilio',
    apellido: 'Romero',
    email: 'emilio@espol.edu.ec',
    cedula: '09XXXXXX56',
    fecha_nacimiento: '14 Octubre 1998',
    telefono: '098XXXXX34',
    sexo: 'Masculino',
    fecha_creacion: '02 Marzo 2024'
  };

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({
      personCircleOutline, documentTextOutline, megaphoneOutline,
      timeOutline, speedometerOutline, carOutline, addCircleOutline,
      notifications, chevronForward, logOutOutline
    });
  }

  ngOnInit() { }

  agregarVehiculo() {
    this.router.navigate(['/auth/registro-vehiculo'], { queryParams: { origen: 'perfil' } });
  }

  cerrarSesion() {
    this.router.navigate(['/auth/login']);
  }
}