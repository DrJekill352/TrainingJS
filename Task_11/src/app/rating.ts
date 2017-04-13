export class Rating {
    private _studentName: string;
    private _lessonNumber: number;
    private _value: number;

    constructor(studentName: string, lessonNumber: number, value: number) {
        this._lessonNumber = lessonNumber;
        this._studentName = studentName;
        this._value = value;
    }

    public get studentName(): string {
        return this._studentName;
    }

    public get lessonNumber(): number {
        return this._lessonNumber;
    }

    public get value(): number {
        return this._value;
    }

    public static toJson(rating: Rating): any {
        return {
            lessonNumber: rating.lessonNumber,
            studentName: rating.studentName,
            value: rating.value
        }
    }

    public static fromJson(json: any): Rating {
        return new Rating(json.studentName, json.lessonNumber, json.value);
    }
}
