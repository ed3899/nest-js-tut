import {
  ArgumentsHost,
  Inject,
  Injectable,
  Scope,
  Logger,
} from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CatsService {
  private readonly cats: InstanceType<typeof Cat>[] = [];
  private readonly logger = new Logger(CatsService.name);

  constructor(
    private configService: ConfigService,
    private schedulerRegistry: SchedulerRegistry,
    private eventEmitter: EventEmitter2,
  ) {}

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
    const r = this.configService.get('database.port');
    console.log(r);
    this.eventEmitter.emit('order.created');
    return `This action returns a #${id} cat`;
  }

  @OnEvent('order.created')
  handleOrderCreatedEvent() {
    console.log("boom!!x")
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'notifications',
  })
  handleCron() {
    this.logger.debug('Called every 30 seconds');

    const job = this.schedulerRegistry.getCronJob('notifications');

    console.log(job.lastDate());
  }
}
