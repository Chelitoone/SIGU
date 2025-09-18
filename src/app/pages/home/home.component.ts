import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-home',
  standalone: true,
  // AQUI estaba el error, faltaba añadir NgbModule
  imports: [CommonModule, RouterModule, NgbModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}