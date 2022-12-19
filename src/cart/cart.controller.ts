import { Controller, Get, ParseBoolPipe, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { Body, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common/decorators';
import { AddItemDto } from './dto/add-item.dto';
import { Item } from './item.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
@Controller('cart')
@UseGuards(AuthGuard())
export class CartController {
    constructor(private cartService: CartService) {
    }

    @Get()
    getAllItems(@GetUser() user: User): Promise<Item[]> {
        return this.cartService.getAllItems(user);
    }

    @Get('/:id')
    getItemById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Item> {
        return this.cartService.getItemById(id, user)
    }

    @Post()
    addItem(@Body(ValidationPipe) addItemDto: AddItemDto,
        @GetUser() user: User): Promise<Item> {
        return this.cartService.addItem(addItemDto, user)
    }

    @Delete('/:id')
    deleteItem(@Param('id') id: number, @GetUser() user: User): Promise<void> {
        return this.cartService.deleteItem(id,user)
    }

    @Patch('/:id/av')
    updateItem(@Param('id') id: number, @Body('isAvailable', ParseBoolPipe) isAvailable: boolean, @GetUser() user: User): Promise<Item> {
        return this.cartService.updateItem(id, isAvailable, user)
    }

}
