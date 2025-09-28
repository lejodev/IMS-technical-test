import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Prestamo } from 'src/modules/prestamo/entities/prestamo.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tb_usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ name: 'cedula', unique: true, nullable: false })
  cedula: string;

  @Column({ name: 'contrasena' })
  contrasena: string;

  @Column({ name: 'es_admin', default: false })
  esAdmin: boolean;

  @OneToMany(() => Prestamo, (prestamo) => prestamo.usuario)
  prestamos: Prestamo[];

}
