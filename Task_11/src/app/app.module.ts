import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TeacherBookService } from './teacher-book.service';
import {HeadTeacher} from './head-teacher.service';

import { AppComponent } from './app.component';
import { TeacherBookComponent } from './teacher-book/teacher-book.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherBookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [TeacherBookService, HeadTeacher],
  bootstrap: [AppComponent]
})
export class AppModule { }
