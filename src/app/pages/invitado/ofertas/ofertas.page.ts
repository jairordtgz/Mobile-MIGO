import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
// Agregamos 'chevronBack' a la lista de iconos
import {
  menuOutline, notifications, chevronDownOutline, megaphone,
  business, location, logoUsd, homeOutline, speedometerOutline,
  calendarOutline, person, chevronBack
} from 'ionicons/icons';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.page.html',
  styleUrls: ['./ofertas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OfertasPage implements OnInit {

  segmentoActivo: string = 'campanas';

  campanasDisponibles = [
    {
      nombreCampana: 'Nombre de Campaña',
      nombreEmpresa: 'Nombre de Empresa',
      fechaPublicacion: '02/08/23',
      fechaLimite: '23/08/23',
      sectores: 'Sector / Sectores',
      tarifa: 'Tarifa por KM'
    },
    {
      nombreCampana: 'Campaña Verano',
      nombreEmpresa: 'Coca Cola',
      fechaPublicacion: '05/08/23',
      fechaLimite: '25/08/23',
      sectores: 'Norte / Sur',
      tarifa: '$ 0.25'
    },
    {
      nombreCampana: 'Campaña Escolar',
      nombreEmpresa: 'Bic',
      fechaPublicacion: '10/08/23',
      fechaLimite: '30/08/23',
      sectores: 'Centro',
      tarifa: '$ 0.15'
    }
  ];

  constructor(private router: Router) {
    // Registramos la flechita aquí también
    addIcons({
      menuOutline, notifications, chevronDownOutline, megaphone,
      business, location, logoUsd, homeOutline, speedometerOutline,
      calendarOutline, person, chevronBack
    });
  }

  ngOnInit() { }

  cambiarSegmento(segmento: string) {
    this.segmentoActivo = segmento;
  }

  // Función para ir al Registro (botón turquesa)
  irARegistro() {
    this.router.navigate(['/auth/registro-conductor']);
  }

  // NUEVA: Función para regresar al Login con la flechita
  irALogin() {
    this.router.navigate(['/auth/login']);
  }
}