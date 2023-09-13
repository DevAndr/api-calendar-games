export class CreateConfirmEventDto {
    email: string;
    confirmationCode: string;


    constructor(email: string, confirmationCode: string) {
        this.email = email;
        this.confirmationCode = confirmationCode;
    }
}
