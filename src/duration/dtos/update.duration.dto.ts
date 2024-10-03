export class UpdateDurationDTO {
    id: number;
    duration?: string;
    constructor(
        id: number,
        duration: string,
    ) {
        this.id = id;
        this.duration = duration;
    }
}
