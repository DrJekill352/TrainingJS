import { Rating } from './rating';
import { Absence } from './absence';

export class TeacherBook {

    private _studentsNames: string[] = [];
    private _ratings: Rating[] = [];
    private _absences: Absence[] = [];

    private _lessonsCount: number = 0;

    public static toJson(tb: TeacherBook): any {
        return {
            ratings: tb._ratings.map(r => Rating.toJson(r)),
            absences: tb._absences.map(a => Absence.toJson(a)),
            studentsNames: tb._studentsNames,
            lessonsCount: tb._lessonsCount
        };
    }

    public static fromJson(json: any): TeacherBook {
        let tb = new TeacherBook();
        tb._studentsNames = json.studentsNames;
        tb._absences = json.absences.map(a => Absence.fromJson(a));
        tb._lessonsCount = json.lessonsCount;
        tb._ratings = json.ratings.map(r => Rating.fromJson(r));
        return tb;
    }

    constructor() { }

    public get studentsNames(): string[] {
        return this._studentsNames;
    }

    public get lessonsCount(): number {
        return this._lessonsCount;
    }

    public addStudent(studentName: string): void {
        let studName = this.studentsNames.find(sn => sn === studentName);

        if (!studentName) {
            throw new Error('Enter student name');
        }
        if (studName) {
            throw new Error(`Student ${studentName} is already exist!`);
        }
        this._studentsNames.push(studentName);
    }

    public addLesson(): void {
        this._lessonsCount++;
    }

    public setRating(studentName: string, lessonNumber: number, value: number): void {
        if (value < 0) {
            throw new Error("Input value < 0");
        }
        this._ratings.push(new Rating(studentName, lessonNumber, value));
    }

    public setAbsence(studentName: string, lessonNumber: number): void {
        this._absences.push(new Absence(studentName, lessonNumber));
    }

    public removeStudent(studentName: string): void {
        this._studentsNames = this._studentsNames.filter(sn => sn != studentName);
        this._ratings = this._ratings.filter(r => r.studentName != studentName);
        this._absences = this._absences.filter(a => a.studentName != studentName);
    }

    public getRating(studentName: string, lessonNumber: number): number {
        let rating = this._ratings.find(r => r.studentName === studentName && r.lessonNumber === lessonNumber);
        return rating ? rating.value : null;
    }

    public isAbsend(studentName: string, lessonNumber: number): boolean {
        let isAbsend = this._absences.find(a => a.studentName === studentName && a.lessonNumber === lessonNumber);
        return !!isAbsend;
    }

}
