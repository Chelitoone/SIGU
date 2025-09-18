import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 


@Component({
  selector: 'app-investigacion',
  imports: [ RouterModule, CommonModule, NgbModule ],
  templateUrl: './investigacion.component.html',
  styleUrl: './investigacion.component.css'
})
export class InvestigacionComponent {

}
