import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import { EncargadosBPAComponent } from './encargados-bpa/encargados-bpa.component';
import { EncargadoBPAService} from './encargados-bpa/encargado-bpa.service';
import { RouterModule, Routes} from '@angular/router';
import { FormularioComponent } from './encargados-bpa/formulario.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', redirectTo: '/encargadosBPA', pathMatch: 'full'},
  {path: 'encargadosBPA', component: EncargadosBPAComponent},
  {path: 'encargadosBPA/formulario', component: FormularioComponent},
  {path: 'encargadosBPA/formulario/:id', component: FormularioComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EncargadosBPAComponent,
    FormularioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    EncargadoBPAService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
