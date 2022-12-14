import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Item } from "src/cart/item.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'cartmanagement',
    entities: [Item],
    synchronize: true
} 