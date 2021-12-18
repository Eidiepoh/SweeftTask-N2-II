import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';

import {UserFriends} from './users/user-friends/user-friends.component';

@NgModule({
  declarations: [AppComponent, UserFriends, RoutingComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
