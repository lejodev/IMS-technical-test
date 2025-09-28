import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    cedula: string;

    @IsString()
    @IsNotEmpty()
    contrasena: string;
}