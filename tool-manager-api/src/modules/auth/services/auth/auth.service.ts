import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from '../../dto/create-auth.dto';
import { SignInDto } from '../../dto/signIn.dto';
import { UsuarioService } from 'src/modules/usuario/services/usuario.service';
import { firstValueFrom } from 'rxjs';
import { JWTHelper } from '../jwt/jwt.service';

@Injectable()
export class AuthService {

  constructor(
    private UsuarioService: UsuarioService,
    private jwtHelper: JWTHelper
  ) { }

  async signIn(usuarioDTO: SignInDto) {

    try {
      const cedula = usuarioDTO.cedula;
      const clave = usuarioDTO.contrasena;
      const usuario = await firstValueFrom(this.UsuarioService.findOne(cedula))

      if (!usuario || usuario.contrasena !== clave) {
        throw new UnauthorizedException('Usuario no encontrado o contraseña incorrecta');
      }

      const { contrasena, prestamos, ...usuarioSinContrasena } = usuario;
      console.log('usuarioSinContrasena', usuarioSinContrasena);

      const token = this.jwtHelper.sign({ usuario: usuarioSinContrasena });

      console.log('token', token);

      return { token };

    } catch (error) {
      throw new UnauthorizedException('Error en la autenticación');
    }

  }
}
