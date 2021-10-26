import { CoffeesController } from './coffees.controller';
import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Module({controllers: [ CoffeesController], providers: [CoffeesService], exports: [CoffeesService]})
export class CoffeesModule {}
 