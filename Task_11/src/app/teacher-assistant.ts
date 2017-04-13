import { TeacherBook } from './teacher-book';

export class TeacherAssistant {

    public calculateStatistic(teacherBook: TeacherBook, maxLessonToInclude: number): Map<string, number> {
        let statisticByStudentName: Map<string, number> = new Map();

        for (let studentName of teacherBook.studentsNames) {
            let sum = 0;

            for (let lessonNumber = 1; lessonNumber <= maxLessonToInclude && lessonNumber <= teacherBook.lessonsCount; lessonNumber++) {
                let rating = teacherBook.getRating(studentName, lessonNumber);
                if (rating) {
                    sum += rating;
                }
            }
            statisticByStudentName.set(studentName, +(sum / Math.min(maxLessonToInclude, teacherBook.lessonsCount)).toFixed(2));
        }
        return statisticByStudentName;
    }
}
