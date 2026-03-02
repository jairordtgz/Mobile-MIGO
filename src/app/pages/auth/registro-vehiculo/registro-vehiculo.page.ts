import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { 
  IonHeader, IonToolbar, IonContent, IonIcon 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
// Agregamos chevronBack y helpCircle para igualar el diseño
import { chevronBack, helpCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-registro-vehiculo',
  templateUrl: './registro-vehiculo.page.html',
  styleUrls: ['./registro-vehiculo.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonContent, IonIcon
  ]
})
export class RegistroVehiculoPage implements OnInit {

  // Lógica intacta para guardar las fotos (HU2)
  fotos: any = {
    lateralIzq: null,
    lateralDer: null,
    trasera: null,
    frontal: null,
    aerea: null
  };

  constructor(private router: Router) { 
    addIcons({ chevronBack, helpCircleOutline });
  }

  ngOnInit() { }

  // Función para la flecha superior
  irAtras() {
    this.router.navigate(['/auth/registro-conductor']);
  }

  // Lógica intacta de la Cámara
  async tomarFoto(lado: string) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, 
        source: CameraSource.Camera 
      });
      this.fotos[lado] = image.dataUrl;
    } catch (error) {
      console.log('El usuario canceló la foto o hubo un error', error);
    }
  }

  finalizarRegistro() {
    console.log('Fotos capturadas:', this.fotos);
    // Regresamos al login o a ofertas al terminar
    this.router.navigate(['/auth/login']);
  }
}