import {Injectable} from '@angular/core';
import {TeacherBookService} from './teacher-book.service';
import {TeacherBook} from './teacher-book';
@Injectable()
export class HeadTeacher {

  constructor(private _teacherBookBox:TeacherBookService) {
  }

  public putTeacherBook(teacherName:string, tb: TeacherBook) {
    this._teacherBookBox.putTeacherBook(teacherName, tb);
  }

  public getTeacherBook(teacherName:string): TeacherBook {
    let tb = this._teacherBookBox.getTeacherBook(teacherName);
    if (tb !== null) {
      return tb;
    } else {
      return new TeacherBook();
    }
  }
}
