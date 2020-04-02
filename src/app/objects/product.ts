import { Category } from './category';
import { Type } from './type';
import { Manufacturer } from './manufacturer';
import { Size } from './size';
import { Color } from './color';
import { Material } from './material';
import { Discount } from './discount';

export class Product {
    constructor(
        public id: number,
        public name: string,
        public quantityInStock: number,
        public price: number,
        public description: string,
        public category: Category,
        public type: Type,
        public manufacturer: Manufacturer,
        public size: Size,
        public color: Color,
        public materials: Array<Material>,
        public discount: Discount
    ) {}
}