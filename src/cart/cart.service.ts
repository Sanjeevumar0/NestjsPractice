import { Injectable, NotFoundException } from '@nestjs/common';
import { AddItemDto } from './dto/add-item.dto';
import { v1 as uuid } from 'uuid'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { User } from 'src/auth/user.entity';
@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Item) private itemRepository: Repository<Item>
    ) { }



    async getAllItems(user: User): Promise<Item[]> {
        return await this.itemRepository.findBy({ userId: user.id })
    }

    async getItemById(id: number, user: User): Promise<Item> {
        const item = await this.itemRepository.findOneBy({ id: id, userId: user.id })
        if (!item) {
            throw new NotFoundException(`Item with ${id} not found!`)
        }
        return item
    }

    async addItem(addItemDto: AddItemDto, user: User): Promise<Item> {
        const { title, description } = addItemDto;
        const item = new Item();
        item.title = title;
        item.description = description;
        item.isAvailable = true;
        item.user = user;

        await this.itemRepository.save(item)
        delete item.user;
        return item
    }

    async deleteItem(id: number, user: User): Promise<void> {
        const { affected } = await this.itemRepository.delete({ id, userId: user.id });
        if (affected === 0) {
            throw new NotFoundException(`Item with ${id} not found!`)
        }
    }

    async updateItem(id: number, isAvailable: boolean, user: User): Promise<Item> {
        const item = await this.getItemById(id, user);
        item.isAvailable = isAvailable;
        await this.itemRepository.save(item);
        return item;
    }
}
