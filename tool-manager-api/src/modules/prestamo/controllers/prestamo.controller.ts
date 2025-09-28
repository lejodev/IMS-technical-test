import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PrestamoService } from '../services/prestamo.service';
import { CreatePrestamoDto } from '../dto/create-prestamo.dto';
import { UpdatePrestamoDto } from '../dto/update-prestamo.dto';
import { Prestamo } from '../entities/prestamo.entity';
import { AuthGuard } from 'src/modules/auth/guards/auth/auth.guard';
import { PrestamoOwnerGuard } from 'src/modules/auth/guards/prestamo-owner/prestamo-owner.guard';

@Controller('api/prestamo')
export class PrestamoController {
  constructor(private readonly prestamoService: PrestamoService) { }

  @Post()
  create(@Body() prestamo: Prestamo) {
    return this.prestamoService.create(prestamo);
  }

  @Get()
  findAll() {
    let prestamos = this.prestamoService.findAll();
    return prestamos;
  }

  @Get('usuario/:id')
  findByUsuario(@Param('id') id: string) {
    console.log('id', id);
    
    return this.prestamoService.findByUsuario(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prestamoService.findOne(+id);
  }


  @UseGuards(AuthGuard, PrestamoOwnerGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrestamoDto: UpdatePrestamoDto) {
    return this.prestamoService.update(+id, updatePrestamoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prestamoService.remove(+id);
  }
}
