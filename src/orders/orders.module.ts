import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDERS_SERVICE_CLIENT } from '../config';

@Module({
  controllers: [OrdersController],
  imports: [
    ClientsModule.register([
      {
        name: ORDERS_SERVICE_CLIENT,
        transport: Transport.TCP,
        options: {
          host: envs.ordersMSHost,
          port: envs.ordersMSPort,
        },
      },
    ]),
  ],
})
export class OrdersModule {}
