import { Injectable } from '@nestjs/common';
import { RequestCreateProduct, ResponseCreatedProduct } from './types/product';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(request: RequestCreateProduct) {
    return await this.prismaService.product.create({
      data: request,
    });
  }
}
