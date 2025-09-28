export interface Usuario {
  id?: number;
  nombre?: string;
  cedula: string;
  contrasena: string;
  esAdmin?: boolean;
}