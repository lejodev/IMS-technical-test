import { Injectable } from '@nestjs/common';
import { CreatePrestamoDto } from '../dto/create-prestamo.dto';
import { UpdatePrestamoDto } from '../dto/update-prestamo.dto';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { Prestamo } from '../entities/prestamo.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PrestamoService {

  constructor(private wrapperService: WrapperService) { }
  create(createPrestamo: Prestamo) {
    return this.wrapperService.create(Prestamo, createPrestamo);
  }

  findAll() {
    return this.wrapperService.GET(Prestamo);
  }

  findOne(id: number) {
    return this.wrapperService.findOne(Prestamo, { id });
  }

  async update(id: number, updatePrestamoDto: UpdatePrestamoDto) {
    const prestamo = await firstValueFrom(this.wrapperService.findOne(Prestamo, { id }));
    console.log('prestamo', prestamo);
    

    if (!prestamo) {
      throw new Error(`Prestamo con ID ${id} no encontrado`);
    }

    updatePrestamoDto.fechaEntrega = new Date();
    console.log('updatePrestamoDto', updatePrestamoDto);
    return this.wrapperService.update(Prestamo, id, updatePrestamoDto);
  }

  findByUsuario(id: number) {
    return this.wrapperService.GET(Prestamo, { where:{ usuario: { id }} });
  }

  remove(id: number) {
    return `This action removes a #${id} prestamo`;
  }
}
