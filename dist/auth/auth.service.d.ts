import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private jwtService;
    private readonly adminPassword;
    constructor(jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    validateToken(payload: any): Promise<any>;
    private getHashedPassword;
}
