import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  placa: string = '';
  origen: string = '';

  fotos = {
    lateralIzq: '' as string | undefined,
    lateralDer: '' as string | undefined,
    trasera: '' as string | undefined,
    aerea: '' as string | undefined,
    frontal: '' as string | undefined
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {
    addIcons({ chevronBack, helpCircleOutline, chevronDown });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.origen = params['origen'] || 'registro_nuevo';
    });
  }

  irAtras() {
    if (this.origen === 'perfil') {
      this.router.navigate(['/tabs/perfil']);
    } else {
      this.router.navigate(['/auth/registro-conductor']);
    }
  }

  async tomarFoto(lado: string) {
    try {
      const image = await Camera.getPhoto({
        quality: 70,
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
    console.log('Fotos capturadas:', this.fotos);

    if (this.origen === 'perfil') {
      const claveTemporal = Math.floor(1000 + Math.random() * 9000);

      const alert = await this.alertController.create({
        header: '¡Vehículo Agregado!',
        subHeader: `Placa Registrada`,
        message: `Se ha generado una <strong>clave temporal</strong> para iniciar sesión de forma independiente con esta placa:<br><br><span style="font-size: 24px; font-weight: bold; color: #00c2b8; display: block; text-align: center; margin-top: 10px;">MIGO-${claveTemporal}</span><br><br>Recuerda que esta cuenta secundaria no podrá modificar datos del perfil.`,
        buttons: [{
          text: 'Aceptar',
          handler: () => {
            this.router.navigate(['/tabs/perfil']);
          }
        }],
        cssClass: 'custom-alert'
      });
      await alert.present();

    } else {
      const alert = await this.alertController.create({
        header: '¡Registro Completado!',
        message: 'Tu cuenta y vehículo han sido registrados exitosamente.',
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
}