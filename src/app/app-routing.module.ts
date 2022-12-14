import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CarComponent} from './car/car.component';
import {MotorcycleComponent} from './motorcycle/motorcycle.component';
import {TagComponent} from './tag/tag.component';
import {LoginComponent} from './user/login/login.component';
import {RegistrationComponent} from './user/registration/registration.component';
import ActivateGuard from './activate.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'cars', component: CarComponent, canActivate: [ActivateGuard]},
  {path: 'motorcycles', component: MotorcycleComponent, canActivate: [ActivateGuard]},
  {path: 'tags', component: TagComponent, canActivate: [ActivateGuard]},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
