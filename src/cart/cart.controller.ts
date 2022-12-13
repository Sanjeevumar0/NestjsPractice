import { Controller, Get, ParseBoolPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { Items } from './cart.model';
import { Body, Delete, Param, Patch, Post } from '@nestjs/common/decorators';
import { AddItemDto } from './dto/add-item.dto';
@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) {
    }

    @Get()
    getAllItems(): Items[] {
        return this.cartService.getAllItems();
    }

    @Get('/:id')
    getItemById(@Param('id') id: string): Items {
        return this.cartService.getItemById(id)
    }

    @Post()
    addItem(@Body() addItemDto: AddItemDto): Items {
        return this.cartService.addItem(addItemDto)
    }

    @Delete('/:id')
    deleteItem(@Param('id') id: string): void {
        return this.cartService.deleteItem(id)
    }

    @Patch('/:id/av')
    updateItem(@Param('id') id: string, @Body('isAvailable',ParseBoolPipe) isAvailable: boolean):Items {
        return this.cartService.updateItem(id, isAvailable)

    }

}
