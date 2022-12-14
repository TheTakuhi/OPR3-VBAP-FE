import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CarComponent } from './car/car.component';
import { MotorcycleComponent } from './motorcycle/motorcycle.component';
import { TagComponent } from './tag/tag.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    MotorcycleComponent,
    TagComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
