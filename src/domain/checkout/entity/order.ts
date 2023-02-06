import OrderItem from "./order_item";

export default class Order{

    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]){
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }

    validate(){
        if(this._customerId.length === 0){
            throw new Error("CustomerId is required");
        }
        if(this._id.length === 0){
            throw new Error("Id is required");
        }
        if(this._items.length === 0){
            throw new Error("Orders should have items");
        }
    }

    total(): number{
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }

    addItem(item: OrderItem){
        this.items.push(item);
    }

    get id(): string{
        return this._id;
    }

    get items(): OrderItem[]{
        return this._items;
    }

    get customerId(): string{
        return this._customerId;
    }

}