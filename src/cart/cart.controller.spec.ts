import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthModule } from "src/auth/auth.module";
import { User } from "src/auth/user.entity";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";
import { AddItemDto } from "./dto/add-item.dto";

describe('CartController', () => {
    let controller: CartController;
    let mockUser = new User()
    const mockCartService = {
        getAllItems: jest.fn().mockImplementation(() => ([{
            "id": 3,
            "title": "new",
            "description": "Item",
            "isAvailable": true
        }])),
        getItemById: jest.fn().mockImplementation((id: number) => ({
            "id": id,
            "title": "new",
            "description": "Item",
            "isAvailable": true
        })),
        addItem: jest.fn().mockImplementation((addItemDto: AddItemDto) => ({
            id: 2,
            title: addItemDto.title,
            description: addItemDto.description,
            isAvailable: true
        })),
        deleteItem: jest.fn().mockImplementation((id: number) => null),
        updateItem: jest.fn().mockImplementation((id: number, isAvailable: boolean) => ({
            id: 1,
            title: 'test',
            description: "this is a test item",
            isAvailable: false
        }))
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                PassportModule.register({ defaultStrategy: 'jwt' }),],
            controllers: [CartController],
            providers: [CartService]
        }).overrideProvider(CartService).useValue(mockCartService).compile();

        controller = module.get<CartController>(CartController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    })

    it('should get all items', () => {
        expect(controller.getAllItems(mockUser)).toEqual([{
            "id": 3,
            "title": "new",
            "description": "Item",
            "isAvailable": true
        }])
    })

    it('should get item by it\'s id', () => {
        expect(controller.getItemById(1, mockUser)).toEqual({
            "id": 1,
            "title": "new",
            "description": "Item",
            "isAvailable": true
        })
    })

    it('should add item', () => {
        const addItemDto: AddItemDto = { title: "test", description: "this is a test item" };
        expect(controller.addItem(addItemDto, mockUser)).toEqual({
            id: 2,
            title: 'test',
            description: "this is a test item",
            isAvailable: true
        })
    })

    it('should delete an item', () => {
        expect(controller.deleteItem(1, mockUser)).toEqual(null)
    })

    it('should update an item', () => {
        expect(controller.updateItem(1, false, mockUser)).toEqual({
            id: 1,
            title: 'test',
            description: "this is a test item",
            isAvailable: false
        })
    })

})