import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()

export class JWTHelper {
    constructor(private readonly jwtService: JwtService) { }
    sign(payload: any) {
        try {
            return this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET || 'defaultSecret',
                expiresIn: process.env.JWT_EXPIRES_IN || '1d'
            });
        } catch (error) {
            console.log(error);
        }
    }
}
