import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { menuOutline, notifications, megaphoneOutline, businessOutline, locationOutline, logoUsd } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon]
})
export class HomePage {
  segmentoActivo: 'campanas' | 'marcas' = 'campanas';

  constructor() {
    addIcons({ menuOutline, notifications, megaphoneOutline, businessOutline, locationOutline, logoUsd });
  }
}