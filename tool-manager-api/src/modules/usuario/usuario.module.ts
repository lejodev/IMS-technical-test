import { Module } from '@nestjs/common';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, WrapperService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
