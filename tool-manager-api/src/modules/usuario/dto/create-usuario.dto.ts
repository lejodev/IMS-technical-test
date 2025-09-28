import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CreateUsuarioDto {


    @IsString()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    cedula: String;

    @IsString()
    @IsNotEmpty()
    contrasena: string;

    @IsBoolean()
    esAdmin: boolean;
}
