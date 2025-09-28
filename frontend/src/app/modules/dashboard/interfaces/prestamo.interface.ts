import { Usuario } from '../../auth/interfaces/usuario.interface';

export interface Prestamo {
    id: number;
    idUsuario: number;
    usuario: Usuario;
    fechaPrestamo: Date | string;
    fechaEntrega: Date | string | null;
    devuelto: boolean;
}