export class CreateTeacherHistoryDTO {
    teacherId: number;
    currentDegree: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '12';
    nextDegree: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '12';
    effectiveDate: Date;
    highPostion: boolean;
    constructor(
        teacherId: number,
        currentDegree: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '12',
        nextDegree: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '12',
        effectiveDate: Date,
        highPostion: boolean = false, // Default to false if not provided
    ) {
        this.teacherId = teacherId;
        this.currentDegree = currentDegree;
        this.nextDegree = nextDegree;
        this.effectiveDate = effectiveDate;
        this.highPostion = highPostion;
    }
}
