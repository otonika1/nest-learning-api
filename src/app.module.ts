import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyFeatureModule } from './property-feature/property-feature.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/db.config';
import { pgConfig } from 'dbConfig';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load:[dbConfig]
    }),
    PropertyModule,PropertyFeatureModule, TypeOrmModule.forRootAsync({useFactory:dbConfig}), PropertyFeatureModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
