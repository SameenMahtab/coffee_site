import { HttpStatus, NotFoundException } from '@nestjs/common';
// Generate a Service with the Nest CLI
// shorthand: nest g s {name}

/* CoffeesService FINAL CODE */
import { HttpException, Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 100,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavours: ['chocolate', 'vanilla'],
    },
    {
      id: 100,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavours: ['chocolate', 'vanilla'],
    },
    {
      id: 100,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavours: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find(item => {
      console.log(`Item ${item.id}`)
      
      return item.id === +id;
    }) 
    if(!coffee) {
        throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}

