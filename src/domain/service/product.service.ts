import Product from "../entity/product";

export default class ProductService{
    static increasePrice(products: Product[], amount: number): void{
        products.forEach(product =>{
            product.increasePrice(amount);
        });
    }

    static decreasePrice(products: Product[], amount: number): void{
        products.forEach(product =>{
            product.decreasePrice(amount);
        });
    }

    static increasePercentagePrice(products: Product[], percentage: number): void{
        products.forEach(product =>{
            product.increasePricePercentage(percentage);
        });
    }

    static decreasePercentagePrice(products: Product[], percentage: number): void{
        products.forEach(product =>{
            product.decreasePricePercentage(percentage);
        });
    }
}