import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuarioService {

  constructor(private wrapperService: WrapperService) { }

  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  findAll() {
    return this.wrapperService.GET(Usuario)
  }

  findOne(cedula: string) {
    return this.wrapperService.findOne(Usuario, { cedula });
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
