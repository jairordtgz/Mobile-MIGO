import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { 
  IonHeader, IonToolbar, IonContent, IonIcon, AlertController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBack, helpCircleOutline, chevronDown } from 'ionicons/icons';

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

  fotos = {
    lateralIzq: '' as string | undefined,
    lateralDer: '' as string | undefined,
    trasera: '' as string | undefined,
    aerea: '' as string | undefined,
    frontal: '' as string | undefined
  };

  constructor(
    private router: Router,
    private alertController: AlertController
  ) { 
    addIcons({ chevronBack, helpCircleOutline, chevronDown });
  }

  ngOnInit() { }

  irAtras() {
    this.router.navigate(['/auth/registro-conductor']);
  }

  async tomarFoto(lado: string) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt 
      });
      
      this.fotos[lado as keyof typeof this.fotos] = image.dataUrl;
    } catch (error) {
      console.log('El usuario canceló la foto o cerró el explorador', error);
    }
  }

  async finalizarRegistro() {
    console.log('Fotos capturadas listas para enviar al backend:', this.fotos);
    
    const alert = await this.alertController.create({
      header: '¡Registro Completado!',
      message: 'Los datos de tu vehículo se han guardado.',
      buttons: [{
        text: 'Ir al Login',
        handler: () => {
          this.router.navigate(['/auth/login']);
        }
      }]
    });
    await alert.present();
  }
}