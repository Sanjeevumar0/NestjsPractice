import { Injectable } from '@nestjs/common';
import { Items } from './cart.model';
import { AddItemDto } from './dto/add-item.dto';
import { v1 as uuid } from 'uuid'
@Injectable()
export class CartService {

    private items: Items[] = []

    getAllItems(): Items[] {
        return this.items
    }

    addItem(addItemDto: AddItemDto) {
        const { title, description } = addItemDto

        const item: Items = {
            id: uuid(),
            title,
            description,
            isAvailable: true
        }
        this.items.push(item)
        return item
    }
}
