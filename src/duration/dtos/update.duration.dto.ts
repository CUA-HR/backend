export class UpdateDurationDTO {
    id: number;
    duration?: number;
    constructor(
        id: number,
        duration: number,
    ) {
        this.id = id;
        this.duration = duration;
    }
}
