import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent} from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientService } from './clients/client.service';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { FormComponent } from './clients/form.component';
import {FormsModule  } from '@angular/forms';
import { localeES } from '@angular/common/locales/es-CL';

registerLocaleData(localeES, 'es-CL');

const routes: Routes = [
  {path: '', redirectTo: '/clients', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'clients/form', component: FormComponent},
  {path: 'clients/form/:id', component: FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientsComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
