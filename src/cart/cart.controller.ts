import { Controller, Get } from '@nestjs/common';
import { CartService } from './cart.service';
import { Items } from './cart.model';
import { Body, Post } from '@nestjs/common/decorators';
import { AddItemDto } from './dto/add-item.dto';
@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) {
    }

    @Get()
    getAllItems(): Items[] {
        return this.cartService.getAllItems();
    }

    @Post()
    addItem(@Body() addItemDto: AddItemDto): Items {
        return this.cartService.addItem(addItemDto)
    }
}
