export class Absence {
    private _studentName: string;
    private _lessonNumber: number;

    constructor(studentName: string, lessonNumber: number) {
        this._lessonNumber = lessonNumber;
        this._studentName = studentName;
    }

    public get studentName(): string {
        return this._studentName;
    }

    public get lessonNumber(): number {
        return this._lessonNumber;
    }

    public static toJson(absence: Absence): any {
        return {
            lessonNumber: absence.lessonNumber,
            studentName: absence.studentName
        }
    }

    public static fromJson(json: any): Absence {
        return new Absence(json.studentName, json.lessonNumber);
    }
}
