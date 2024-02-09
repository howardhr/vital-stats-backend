import { IsNotEmpty, IsString, IsEmail } from 'class-validator';


export class HealhDTO {
  
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  
  @IsNotEmpty()
  @IsString()
  readonly idType: string;

  
  @IsNotEmpty()
  @IsString()
  readonly idNumber: string;

  
  @IsNotEmpty()
  readonly dateBirth: Date;

  
  @IsNotEmpty()
  @IsString()
  readonly Weight: string;

  
  @IsNotEmpty()
  @IsString()
  readonly Height: string;
}