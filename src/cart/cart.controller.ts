import { Controller, Get, ParseBoolPipe, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { Body, Delete, Param, Patch, Post } from '@nestjs/common/decorators';
import { AddItemDto } from './dto/add-item.dto';
import { Item } from './item.entity';
@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) {
    }

    @Get()
    getAllItems():Promise<Item[]> {
        return this.cartService.getAllItems();
    }

    @Get('/:id')
    getItemById(@Param('id', ParseIntPipe) id: number): Promise<Item> {
        return this.cartService.getItemById(id)
    }

    @Post()
    addItem(@Body(ValidationPipe) addItemDto: AddItemDto): Promise<Item> {
        return this.cartService.addItem(addItemDto)
    }

    @Delete('/:id')
    deleteItem(@Param('id') id: number): Promise<void> {
        return this.cartService.deleteItem(id)
    }

    @Patch('/:id/av')
    updateItem(@Param('id') id: number, @Body('isAvailable', ParseBoolPipe) isAvailable: boolean): Promise<Item> {
        return this.cartService.updateItem(id, isAvailable)
    }

}
