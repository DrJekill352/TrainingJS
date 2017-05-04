import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';



import { AppComponent } from './app.component';
import { GameSphereComponent } from './game-sphere/game-sphere.component';
import { GameRectangleComponent } from './game-rectangle/game-rectangle.component';

@NgModule({
  declarations: [
    AppComponent,
    GameSphereComponent,
    GameRectangleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
