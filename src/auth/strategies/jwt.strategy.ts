import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "../config/jwt.config";
import { AuthJwtPayload } from "../types/auth-jwtPyaload";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@Inject(jwtConfig.KEY) private jwtConfiguration: ConfigType<typeof jwtConfig>){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfiguration.secret,
            ignoreExpiration:false,
        })
    }
    validate(payload:AuthJwtPayload){
        return {id:payload.sub}
    }
}