import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  constructor(private jwtService: JwtService) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { password } = loginDto;

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, await this.getHashedPassword());
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    // Générer le token JWT
    const payload = { sub: 'admin', role: 'admin' };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateToken(payload: any): Promise<any> {
    return { userId: payload.sub, role: payload.role };
  }

  private async getHashedPassword(): Promise<string> {
    // Hash du mot de passe admin (en production, ceci devrait être stocké de manière sécurisée)
    return await bcrypt.hash(this.adminPassword, 10);
  }
}
