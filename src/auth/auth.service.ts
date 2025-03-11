import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPyaload';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import { CurrentUser } from './types/current-user';

@Injectable()
export class AuthService {
    constructor(private userService:UserService, private jwtService:JwtService, @Inject(refreshJwtConfig.KEY) private refreshTokenConfig:ConfigType<typeof refreshJwtConfig>){}
    async validateUser(email:string, password:string){
        const user = await this.userService.findByEmail(email)
        if(!user) throw new UnauthorizedException("User Not Found")
        const isPasswordMatched = await compare(password, user.password)
        if(!isPasswordMatched) throw new UnauthorizedException("Invalid Credentials")

        return {id: user.id};
    }
    login(userId:number){
        const payload:AuthJwtPayload = {sub:userId}
        const token = this.jwtService.sign(payload)
        const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig)
        return ({
            id:userId,
            token,
            refreshToken
        })
    }

    refreshToken(userId:number){
        const payload:AuthJwtPayload = {sub:userId}
        const token = this.jwtService.sign(payload)
        return ({
            id:userId,
            token
        })
    }

    async validateJwtUser(userId:number){
        const user = await this.userService.getById(userId)
        if(!user) throw new UnauthorizedException();
            const currentUser:CurrentUser = {id:user.id, role:user.role};            
        return currentUser;
    }
}
