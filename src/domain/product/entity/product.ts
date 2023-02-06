export default class Product{
    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number){
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    validate(){
        if(this._name.length === 0){
            throw new Error("Name is required");
        }
        if(this._id.length === 0){
            throw new Error("Id is required");
        }
        if(this._price <= 0){
            throw new Error("Invalid price");
        }

    }

    changeName(name: string){
        this._name = name;
        this.validate();
    }

    increasePrice(amount: number){
        this._price += amount;
    }

    decreasePrice(amount: number){
        this._price -= amount;
    }

    increasePricePercentage(percentage: number){
        this._price = Math.trunc(this._price * (1+(percentage/100)));
    }

    decreasePricePercentage(percentage: number){
        this._price = Math.trunc(this._price * ((100 - percentage)/100));
    }

    get id(): string{
        return this._id;
    }

    get name(): string{
        return this._name;
    }

    get price(): number{
        return this._price;
    }
    
}