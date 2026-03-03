import { Component } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { menuOutline, notifications, timeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  standalone: true,
  imports: [IonContent, IonIcon]
})
export class PanelPage {
  constructor() {
    addIcons({ menuOutline, notifications, timeOutline });
  }
}