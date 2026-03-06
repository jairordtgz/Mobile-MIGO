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
import { AuthService } from '../../../services/auth';

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
  anio: string = '';
  marca: string = '';
  catalogo_vehiculo: string = '';
  tipo: string = '';
  color: string = '';
  origen: string = '';

  todosLosCatalogos: any[] = [];
  marcasDisponibles: string[] = [];
  modelosFiltrados: any[] = [];

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
    private alertController: AlertController,
    private authService: AuthService
  ) {
    addIcons({ chevronBack, helpCircleOutline, chevronDown });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.origen = params['origen'] || 'registro_nuevo';
    });

    this.cargarCatalogos();
  }

  cargarCatalogos() {
    let token = '';
    if (this.origen === 'perfil') {
      token = localStorage.getItem('auth_token') || ''; 
    } else {
      token = localStorage.getItem('temp_conductor_token') || '';
    }

    this.authService.obtenerCatalogos(token).subscribe({
      next: (respuesta) => {
        this.todosLosCatalogos = respuesta.results || respuesta; 
        
        this.marcasDisponibles = [...new Set(this.todosLosCatalogos.map(c => c.marca))];
      },
      error: (err) => {
        console.error('Error al cargar catálogos:', err);
      }
    });
  }

  alCambiarMarca() {
    this.modelosFiltrados = this.todosLosCatalogos.filter(c => c.marca === this.marca);
    this.catalogo_vehiculo = '';
    this.tipo = '';
  }

  alCambiarModelo() {
    const catalogoElegido = this.todosLosCatalogos.find(c => c.id === this.catalogo_vehiculo);
    if (catalogoElegido) {
      this.tipo = catalogoElegido.categoria;
    }
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

  dataURLtoBlob(dataurl: string) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)![1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  }

  async finalizarRegistro() {
    if (!this.placa || !this.anio || !this.tipo || !this.color || !this.catalogo_vehiculo) {
      const alert = await this.alertController.create({ header: 'Faltan Datos', message: 'Completa la información del vehículo.', buttons: ['OK'] });
      await alert.present();
      return;
    }

    if (!this.fotos.frontal || !this.fotos.trasera || !this.fotos.lateralIzq || !this.fotos.lateralDer || !this.fotos.aerea) {
      const alert = await this.alertController.create({ header: 'Faltan Fotos', message: 'Debes tomar las 5 fotos requeridas del vehículo para continuar.', buttons: ['OK'] });
      await alert.present();
      return;
    }

    const formData = new FormData();
    formData.append('placa', this.placa);
    formData.append('anio', this.anio.toString());
    formData.append('color', this.color);
    formData.append('tipo', this.tipo);
    formData.append('marca', this.marca);
    //const index = this.todosLosCatalogos.findIndex(c => c.modelo === this.catalogo_vehiculo) + 1;
    formData.append('catalogo_vehiculo', String(this.catalogo_vehiculo));
    formData.append('foto_frontal', this.dataURLtoBlob(this.fotos.frontal), 'frontal.jpg');
    formData.append('foto_trasera', this.dataURLtoBlob(this.fotos.trasera), 'trasera.jpg');
    formData.append('foto_lateral_izquierdo', this.dataURLtoBlob(this.fotos.lateralIzq), 'lat_izq.jpg');
    formData.append('foto_lateral_derecho', this.dataURLtoBlob(this.fotos.lateralDer), 'lat_der.jpg');
    formData.append('foto_techo', this.dataURLtoBlob(this.fotos.aerea), 'techo.jpg');

    let token = '';
    let conductorId = '';

    if (this.origen === 'perfil') {
      token = localStorage.getItem('auth_token') || ''; 
      conductorId = localStorage.getItem('conductor_id') || '';
    } else {
      token = localStorage.getItem('temp_conductor_token') || '';
      conductorId = localStorage.getItem('temp_conductor_id') || '';
    }

    if (!token || !conductorId) {
      const errorAlert = await this.alertController.create({
        header: 'Error de Autenticación',
        message: 'No se encontraron las credenciales del conductor. Intenta de nuevo.',
        buttons: ['OK']
      });
      await errorAlert.present();
      return;
    }

    this.authService.registrarVehiculo(Number(conductorId), token, formData).subscribe({
      next: async (respuesta) => {
        if (this.origen === 'perfil') {
          const claveTemporal = Math.floor(1000 + Math.random() * 9000);
          const alert = await this.alertController.create({
            header: '¡Vehículo Agregado!',
            subHeader: `Placa Registrada`,
            message: `Se ha generado una <strong>clave temporal</strong> para iniciar sesión de forma independiente con esta placa:<br><br><span style="font-size: 24px; font-weight: bold; color: #00c2b8; display: block; text-align: center; margin-top: 10px;">MIGO-${claveTemporal}</span><br><br>Recuerda que esta cuenta secundaria no podrá modificar datos del perfil.`,
            buttons: [{ text: 'Aceptar', handler: () => { this.router.navigate(['/tabs/perfil']); } }],
            cssClass: 'custom-alert'
          });
          await alert.present();

        } else {
          localStorage.removeItem('temp_conductor_token');
          localStorage.removeItem('temp_conductor_id');

          const alert = await this.alertController.create({
            header: '¡Registro Completado!',
            message: 'Tu cuenta y vehículo han sido registrados exitosamente.',
            buttons: [{ text: 'Ir al Login', handler: () => { this.router.navigate(['/auth/login']); } }]
          });
          await alert.present();
        }
      },
      error: async (err) => {
        const errorAlert = await this.alertController.create({
          header: 'Error al Registrar',
          message: err.error?.error || 'No se pudo guardar el vehículo en la base de datos.',
          buttons: ['OK']
        });
        await errorAlert.present();
      }
    });
  }
}