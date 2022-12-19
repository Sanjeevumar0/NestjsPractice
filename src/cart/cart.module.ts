import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Item } from './item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), AuthModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule { }
