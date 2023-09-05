import { BadRequestException, Injectable } from '@nestjs/common';
import { ForbiddenException } from './forbidden.exception';

@Injectable()
export class AppService {
  getHello(): string {
    throw new BadRequestException('Something bad happened', {
      cause: new Error(),
      description: 'Some error description',
    });
  }
}
