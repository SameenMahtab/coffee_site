import { HttpStatus, NotFoundException } from '@nestjs/common';
// Generate a Service with the Nest CLI
// shorthand: nest g s {name}

/* CoffeesService FINAL CODE */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { of } from 'rxjs';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {

  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeModel.find().skip(offset).limit(limit).exec();
  }

  findOne(id: string) {
    const coffee = this.coffeeModel.findOne({ _id: id }).exec();
    if(!coffee) {
        throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = new this.coffeeModel(createCoffeeDto);
    return coffee.save();
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.coffeeModel
    .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
    .exec();

    if (!existingCoffee) {
      throw new NotFoundException(`Coffee #${id} not found`);  
    }
    return existingCoffee;
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return coffee.remove();
  }

  async recommendCoffee(coffee: Coffee) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try{
      coffee.recommendations++;

      const recommentEvent = new this.eventModel({
        name: 'recomment_coffee',
        type: 'coffee', 
        payload: { coffeeId: coffee.id },
      });
      await recommentEvent.save({ session });
      coffee.save();

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
    }finally {
      session.endSession();
    }
  }
}

