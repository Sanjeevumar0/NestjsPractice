import { IsNotEmpty } from "class-validator"

export class AddItemDto {
    @IsNotEmpty()
    title: string
    @IsNotEmpty()
    description: string
}