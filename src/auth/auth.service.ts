import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt/dist';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService) { }

    async signUp(authDto: AuthDto): Promise<void> {
        const { username, password } = authDto;

        const user = new User()
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try {

            await this.userRepository.save(user)
        } catch (err) {
            if (err.code === '23505') {
                throw new ConflictException('username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(authDto: AuthDto): Promise<{ accessToken: string }> {
        const username = await this.validatePassword(authDto)
        if (!username) {
            throw new UnauthorizedException('Invalid username or password');
        }
        const payload: JwtPayload = { username };
        const accessToken = this.jwtService.sign(payload)

        return { accessToken }

    }

    private async validatePassword(authDto: AuthDto): Promise<string> {
        const { username, password } = authDto;
        const user = await this.userRepository.findOneBy({ username });
        if (user && await user.validatePassword(password)) {
            return user.username
        } else {
            return null
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
}
