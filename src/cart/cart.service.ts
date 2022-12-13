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

    getItemById(id: string): Items {
        const found = this.items.find(e => e.id === id)
        return found
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

    deleteItem(id: string): void {
        const found = this.getItemById(id)
        this.items = this.items.filter(e => e.id !== id)

    }

    updateItem(id: string, isAvailable: boolean):Items {
        const found = this.getItemById(id);
        // console.log(found)
        found.isAvailable = isAvailable;
        return found;
    }
}
