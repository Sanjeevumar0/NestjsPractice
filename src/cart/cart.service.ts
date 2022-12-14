import { Injectable, NotFoundException } from '@nestjs/common';
import { AddItemDto } from './dto/add-item.dto';
import { v1 as uuid } from 'uuid'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Item) private itemRepository: Repository<Item>
    ) { }



    async getAllItems(): Promise<Item[]> {
        return await this.itemRepository.find()
    }

    async getItemById(id: number): Promise<Item> {
        const item = await this.itemRepository.findOneBy({ id: id })
        if (!item) {
            throw new NotFoundException(`Item with ${id} not found!`)
        }
        return item
    }

    async addItem(addItemDto: AddItemDto): Promise<Item> {
        const { title, description } = addItemDto;
        const item = new Item();
        item.title = title;
        item.description = description;
        item.isAvailable = true;

        await item.save()
        return item
    }

    async deleteItem(id: number): Promise<void> {
        const { affected } = await this.itemRepository.delete(id);
        if (affected === 0) {
            throw new NotFoundException(`Item with ${id} not found!`)
        }
    }

    async updateItem(id: number, isAvailable: boolean): Promise<Item> {
        const item = await this.getItemById(id);
        item.isAvailable = isAvailable;
        await item.save();
        return item;
    }
}
