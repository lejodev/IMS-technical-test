import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamoModule } from './modules/prestamo/prestamo.module';
import { PrestamoService } from './modules/prestamo/services/prestamo.service';
import { WrapperService } from './core/services/wrapper/wrapper.service';
import { UsuarioService } from './modules/usuario/services/usuario.service';
import { Usuario } from './modules/usuario/entities/usuario.entity';
import { Prestamo } from './modules/prestamo/entities/prestamo.entity';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/services/auth/auth.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SharedModule,
    UsuarioModule,
    PrestamoModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0000',
      database: 'tool_manager',
      entities: [Usuario, Prestamo]
      // synchronize: true,
    }),
    AuthModule,
    ],
  controllers: [AppController],
  providers: [AppService, PrestamoService, WrapperService, UsuarioService, AuthService],
})
export class AppModule { }
