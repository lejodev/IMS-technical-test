import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearComponent } from './components/crear/crear.component';
import { ModificarComponent } from './components/modificar/modificar.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CrearComponent,
    ModificarComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PrestamoModule { }
