export class Product {
    id: string;
    name: string;
    category: string;
    price: number;
    imageUrl: string

    constructor(id, name, category: string, price: number, imageUrl: string){
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.imageUrl = imageUrl;
    }

}