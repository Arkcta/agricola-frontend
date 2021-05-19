import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { EncargadosBPAComponent } from './encargados-bpa/encargados-bpa.component';
import { EncargadoBPAService} from './encargados-bpa/encargado-bpa.service';
import { ProductoFitosanitarioService} from './producto-fitosanitario/producto-fitosanitario.service';
import { CamposService} from './campos/campos.service';
import { PredioService} from './predio/predio.service';
import { RegistroFitosanitarioService} from './registro-fitosanitario/registro-fitosanitario.service';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ProductoFitosanitarioComponent } from './producto-fitosanitario/producto-fitosanitario.component';
import { SidenavDefinitivoComponent } from './sidenav-definitivo/sidenav-definitivo.component';
import { CamposComponent } from './campos/campos.component';
import { RegistroFitosanitarioComponent } from './registro-fitosanitario/registro-fitosanitario.component';
import { PredioComponent } from './predio/predio.component';
import { CuartelComponent } from './cuartel/cuartel.component';
import { CuartelService} from './cuartel/cuartel.service';
import { ProductoFertilizanteComponent } from './producto-fertilizante/producto-fertilizante.component';
import { ProductoFertilizanteService} from './producto-fertilizante/producto-fertilizante.service';
import { RegistroFertilizanteService} from './registro-fertilizante/registro-fertilizante.service';
import { RegistroFertilizanteComponent} from './registro-fertilizante/registro-fertilizante.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { AdministradorService } from './administrador/administrador.service';
import { LoginComponent } from './usuarios/login.component';
import { NavbarComponent } from './navbar/navbar.component';



const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'encargadosBPA', component: EncargadosBPAComponent},
  {path: 'fitosanitarios', component: ProductoFitosanitarioComponent},
  {path: 'campos', component: CamposComponent},
  {path: 'registrosFitosanitarios', component: RegistroFitosanitarioComponent},
  {path: 'predios', component: PredioComponent},
  {path: 'cuarteles', component: CuartelComponent},
  {path: 'fertilizantes', component: ProductoFertilizanteComponent},
  {path: 'registrosFertilizantes', component: RegistroFertilizanteComponent},
  {path: 'administradores', component: AdministradorComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    EncargadosBPAComponent,
    HomeComponent,
    ProductoFitosanitarioComponent,
    SidenavDefinitivoComponent,
    CamposComponent,
    RegistroFitosanitarioComponent,
    PredioComponent,
    CuartelComponent,
    ProductoFertilizanteComponent,
    RegistroFertilizanteComponent,
    AdministradorComponent,
    LoginComponent,
    NavbarComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [
    EncargadoBPAService,
    ProductoFitosanitarioService,
    CamposService,
    PredioService,
    RegistroFitosanitarioService,
    CuartelService,
    ProductoFertilizanteService,
    RegistroFertilizanteService,
    AdministradorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
