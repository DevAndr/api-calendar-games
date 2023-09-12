import { IsNotEmpty } from 'class-validator';

export class ConfirmAccountDto {
  @IsNotEmpty()
  uid: string;
  @IsNotEmpty()
  code: string;
}
