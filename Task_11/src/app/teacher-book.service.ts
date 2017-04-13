import {Injectable} from '@angular/core';

import {TeacherBook} from './teacher-book';


@Injectable()
export class TeacherBookService {

  public putTeacherBook(teacherName: string, tb: TeacherBook) {
    localStorage.setItem(teacherName, JSON.stringify(TeacherBook.toJson(tb)));
  }

  public getTeacherBook(teacherName: string): TeacherBook {
    let tb = localStorage.getItem(teacherName);
    if(tb !== null) {
      return TeacherBook.fromJson(JSON.parse(tb));
    }else {
      return null;
    }
  }
}
