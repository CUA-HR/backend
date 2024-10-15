export class UpgradeTeacherResponseDTO {
    months: number;
    duration: number;
    upgrade: boolean;
    upgradeWithDebt: boolean;
    upgradeWithoutDebt: boolean;
    newDebt?: Number;
    newEffectiveDate: Date;

    constructor(
        months: number,
        duration: number,
        upgrade: boolean,
        upgradeWithDebt: boolean,
        upgradeWithoutDebt: boolean,
        newDebt: number | undefined,
        newEffectiveDate: Date,

    ) {
        this.months = months;
        this.duration = duration;
        this.upgrade = upgrade;
        this.upgradeWithDebt = upgradeWithDebt;
        this.upgradeWithoutDebt = upgradeWithoutDebt;
        this.newDebt = newDebt;
        this.newEffectiveDate = newEffectiveDate;
    }
}   