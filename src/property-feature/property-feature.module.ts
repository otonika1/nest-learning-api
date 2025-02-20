import { Module } from '@nestjs/common';
import { PropertyFeatureController } from './property-feature.controller';
import { PropertyFeatureService } from './property-feature.service';
import { PropertyFeature } from 'src/entities/propertyFeature.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PropertyFeature, Property])],
  controllers: [PropertyFeatureController],
  providers: [PropertyFeatureService]
})
export class PropertyFeatureModule {}
