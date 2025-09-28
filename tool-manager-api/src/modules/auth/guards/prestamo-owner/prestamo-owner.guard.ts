import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';
import { PrestamoService } from 'src/modules/prestamo/services/prestamo.service';
import { Not } from 'typeorm';

@Injectable()
export class PrestamoOwnerGuard implements CanActivate {

  constructor(private readonly prestamoService: PrestamoService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Obtengo el id del usuario del anterior Guard
    const prestamoId = request.params.id;

    const { usuario } = request.user;
    const userId = usuario.id;
    const esAdmin = usuario.esAdmin;

    if (!prestamoId) {
      throw new NotFoundException('id de prestamo no presente');
    }

    const prestamo = await firstValueFrom(this.prestamoService.findOne(prestamoId));

    if (!prestamo) {
      throw new NotFoundException('Prestamo no encontrado');
    }

    console.log('user', user);

    if (prestamo.idUsuario !== userId && !esAdmin) {
      throw new NotFoundException('No tienes permso para modificar este prestamo');
    }

    return true;
  }
}
