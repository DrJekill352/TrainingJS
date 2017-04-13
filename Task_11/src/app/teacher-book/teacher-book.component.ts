import {Component, OnInit} from '@angular/core';
import {TeacherBook} from '../teacher-book';
import {TeacherAssistant} from '../teacher-assistant';

import {HeadTeacher} from '../head-teacher.service';

@Component({
  selector: 'app-teacher-book',
  templateUrl: './teacher-book.component.html',
  styleUrls: ['./teacher-book.component.css']
})
export class TeacherBookComponent implements OnInit {

  private _teacherBook: TeacherBook;
  private _teacherAssistant: TeacherAssistant;
  public _vm: any;
  public teacherName: string;

  public get canAddStudent(): boolean {
    return this.newStudentName.length > 0 && !this._teacherBook.studentsNames.find(s => s === this.newStudentName);
  };

  private updateVm(oldVm: any, teacherBook: TeacherBook): any {
    let newVM: any = oldVm;

    newVM.lessons = [];
    for (let i = 1; i <= teacherBook.lessonsCount; i++) {
      newVM.lessons.push(i);
    }
    let stat = this._teacherAssistant.calculateStatistic(this._teacherBook, newVM.statValuesIndex);

    newVM.students = teacherBook.studentsNames.map(studentName => {
      let values = [];
      for (let lessonNumber = 1; lessonNumber <= teacherBook.lessonsCount; lessonNumber++) {
        let rating = teacherBook.getRating(studentName, lessonNumber);
        let absence = teacherBook.isAbsend(studentName, lessonNumber);
        let value = rating != null ? rating.toString() : absence ? "Н" : null;
        values.push(value);
      }
      return {
        name: studentName,
        values: values,
        stat: stat.get(studentName)
      };
    });
    return newVM;
  }

  // constructor(private _teacherBookBox: TeacherBookService) {
  //
  //
  //   if (this._teacherBookBox.isEmpty) {
  //     this._teacherBook = new TeacherBook();
  //   } else {
  //     this._teacherBook = this._teacherBookBox.getTeacherBook();
  //   }
  //
    // }

  constructor(private _headTeacher: HeadTeacher) {
    this._teacherAssistant = new TeacherAssistant();
    this._vm = {statValuesIndex: 0};
  }


  ngOnInit() {
    this._teacherBook = new TeacherBook;
  }


  public newStudentName: string = "";

  public get vm(): any {
    this._vm = this.updateVm(this._vm, this._teacherBook);
    return this._vm;
  }

  public addStudent(): void {
    this.isSave = false;
    this._teacherBook.addStudent(this.newStudentName);
    this.newStudentName = "";
  }

  public addLesson(): void {
    this.isSave = false;
    this._teacherBook.addLesson();
  }

  public addValue(studentName: string, lessonNumber: number, value: any): void {
    let parsedValue = parseInt(value);
    if (!value) {
      return;
    } else if (!Number.isNaN(parsedValue)) {
      this._teacherBook.setRating(studentName, lessonNumber, parsedValue);
      this.isSave = false;
    } else {
      this._teacherBook.setAbsence(studentName, lessonNumber);
      this.isSave = false;
    }
  }

  public deleteStudent(studentName: string): void {
    this._teacherBook.removeStudent(studentName);
  }

  public setStatValuesIndex(lesson: number): void {
    this.vm.statValuesIndex = lesson;
  }

  public saveTeacherBook(): void {
    this.isSave = true;
    this._headTeacher.putTeacherBook(this.teacherName, this._teacherBook);
  }
//Найти более красивачениое решение
  public searchTeacherBook(): void {
    if (this.teacherName.length <  1) {
      throw new Error("Not Value Teacher Name");
    }
    this._teacherBook = this._headTeacher.getTeacherBook(this.teacherName);
    this.isSearch = true;
  }

  private isSave:boolean = true;
  private isSearch:boolean = false;

  public get canSearch(): boolean {
    return this.isSearch;
  }

  public closeTeacherBook(){
    if(this.isSave === false) {
      alert("Вы не сохранили изменения в журнале");
    }else{
      this.teacherName = "";
      this.isSearch = false;
    }
  }
}
