import { ArgumentsHost, Inject, Injectable, Scope } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { LazyModuleLoader, REQUEST } from '@nestjs/core';

@Injectable()
export class CatsService {
  private readonly cats: InstanceType<typeof Cat>[] = [];

  onModuleInit() {
    console.log(`The module has been initialized.`);
  }

  onApplicationShutdown(signal: string) {
    console.log(signal); // e.g. "SIGINT"
  }

  create(createCatDto: CreateCatDto) {
    this.cats.push(createCatDto);
    return 'This action adds a new cat';
  }

  findAll() {
    return [`This action returns all cats`];
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
