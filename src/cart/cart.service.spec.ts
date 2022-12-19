import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { CartService } from "./cart.service";
import { AddItemDto } from "./dto/add-item.dto";
import { Item } from "./item.entity";

describe('UserService', () => {
    let service: CartService;
    let mockUser = new User()
    const mockCartRepository = {
        findBy: jest.fn().mockImplementation(() => Promise.resolve([{
            "id": 3,
            "title": "new",
            "description": "Item",
            "isAvailable": true
        }])),
        findOneBy: jest.fn().mockImplementation((id: string) => Promise.resolve({
            "id": 2,
            "title": "new",
            "description": "Item",
            "isAvailable": true
        })),
        save: jest.fn().mockImplementation(() => null),
        delete: jest.fn().mockImplementation((id: number) => Promise.resolve({ affected: 1 })),

    }


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CartService, { provide: getRepositoryToken(Item), useValue: mockCartRepository }],
        }).compile();

        service = module.get<CartService>(CartService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    it('should return all the items', async () => {
        expect(await service.getAllItems(mockUser)).toEqual([{
            "id": 3,
            "title": "new",
            "description": "Item",
            "isAvailable": true
        }])
    })

    it('should return item by it\'s id', async () => {
        expect(await service.getItemById(2, mockUser)).toEqual({
            "id": 2,
            "title": "new",
            "description": "Item",
            "isAvailable": true
        });
        expect(mockCartRepository.findOneBy).toHaveBeenCalled();
    })

    it('should add item and return the values', async () => {
        const addItemDto: AddItemDto = { title: "test", description: "this is a test item" };
        expect(await service.addItem(addItemDto, mockUser)).toEqual({ description: "this is a test item", isAvailable: true, title: "test" })
    })

    it('should delete an item ', async () => {
        expect(await service.deleteItem(1, mockUser)).toEqual(undefined)
    })
    it('should update an item ', async () => {
        expect(await service.updateItem(1, false, mockUser)).toEqual({ "description": "Item", "id": 2, "isAvailable": false, "title": "new" })
    })
})