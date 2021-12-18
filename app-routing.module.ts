import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfile } from './users/user-profile.component';
import { mainPageComponent } from './main-page/main-page.component';
const routes: Routes = [
  // { path: 'user/:id', component: UserSideComponent },
  { path: 'user/:id', component: UserProfile },
  { path: '', component: mainPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const RoutingComponent = [UserProfile, mainPageComponent];
