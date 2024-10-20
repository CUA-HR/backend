export class DurationDTO {
    id: number;
    duration: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        duration: number,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this.id = id;
        this.duration = duration;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}