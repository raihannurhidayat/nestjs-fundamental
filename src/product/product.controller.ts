import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { RequestCreateProduct, ResponseCreatedProduct } from './types/product';

@Controller('/api/product')
export class ProductController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/all')
  getAllProduct() {
    return {
      code: 200,
      data: [],
    };
  }

  @Post('/create')
  async createProduct(@Body() request: RequestCreateProduct) {
    const { name, description, price } = request;
    
  }
}
