import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';

@Entity('tb_prestamo')
export class Prestamo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_usuario' })
  idUsuario: number;

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ name: 'fecha_prestamo', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaPrestamo: Date;

  @Column({ name: 'fecha_entrega', type: 'date', nullable: true })
  fechaEntrega: Date;

  @Column({ name: 'devuelto', default: false })
  devuelto: boolean;
}
