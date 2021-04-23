import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import { EncargadosBPAComponent } from './encargados-bpa/encargados-bpa.component';
import { EncargadoBPAService} from './encargados-bpa/encargado-bpa.service';
import { RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/encargadosBPA', pathMatch: 'full'},
  {path: 'encargadosBPA', component: EncargadosBPAComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EncargadosBPAComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    EncargadoBPAService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
