import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CarComponent} from './car/car.component';
import {MotorcycleComponent} from './motorcycle/motorcycle.component';
import {TagComponent} from './tag/tag.component';
import {UserComponent} from './user/user.component';

const routes: Routes = [
  {path: 'cars', component: CarComponent},
  {path: 'motorcycles', component: MotorcycleComponent},
  {path: 'tags', component: TagComponent},
  {path: 'users', component: UserComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
