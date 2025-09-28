import { Module } from '@nestjs/common';
import { PrestamoService } from '../prestamo/services/prestamo.service';
import { PrestamoController } from './controllers/prestamo.controller';
import { WrapperService } from 'src/core/services/wrapper/wrapper.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [PrestamoController],
  providers: [PrestamoService, WrapperService],
  imports: [JwtModule],
})
export class PrestamoModule {}
