import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NATS_SERVICE } from '../config';
import { PaginationDto } from '../common';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly natsClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.natsClient.send('create_product', createProductDto);
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.natsClient.send('find_all_products', paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.natsClient.send('find_one_product', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
    /*
    try {
      // We await for the response from the microservice if we need the product in fact not only as a response

      const product = await firstValueFrom(
        this.natsClient.send('find_one_product', { id }),
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
    */
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.natsClient.send('delete_product', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.natsClient
      .send('update_product', {
        id,
        ...updateProductDto,
      })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
