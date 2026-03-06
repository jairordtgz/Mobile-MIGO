import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  menuOutline, notifications, chevronDownOutline, megaphone,
  business, location, logoUsd, homeOutline, speedometerOutline,
  calendarOutline, person, chevronBack
} from 'ionicons/icons';
import { CampaniaResponse, CampaniasService } from 'src/app/services/campanias.serivice';
import { CampaniaList } from 'src/app/interfaces/campania';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.page.html',
  styleUrls: ['./ofertas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OfertasPage implements OnInit {

  segmentoActivo: string = 'campanas';

  campanasDisponibles: CampaniaList[] = [];

  constructor(private router: Router, private campaniasService: CampaniasService) {
    addIcons({
      menuOutline, notifications, chevronDownOutline, megaphone,
      business, location, logoUsd, homeOutline, speedometerOutline,
      calendarOutline, person, chevronBack
    });
  }

  ngOnInit() {
    this.campaniasService.getCampanias().subscribe({
      next: (campanias) => {
        this.campanasDisponibles = campanias;
      },
      error: (err) => {
        console.error('Error fetching campanias:', err);
      }
    });
  }

  cambiarSegmento(segmento: string) {
    this.segmentoActivo = segmento;
  }

  irARegistro() {
    this.router.navigate(['/auth/registro-conductor']);
  }

  irALogin() {
    this.router.navigate(['/auth/login']);
  }
}