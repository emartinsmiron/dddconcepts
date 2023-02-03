import Address from "./address";

export default class Customer{

    private _id: string;
    private _name: string;
    private _address!: Address;
    private _rewardPoints: number = 0;
    private _active: boolean = false;

    constructor(id: string, name: string){
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate(){
        if(this._name.length === 0){
            throw new Error("Name is required");
        }
        if(this._id.length === 0){
            throw new Error("Id is required");
        }
    }
    
    changeName(name: string){
        this._name = name;
        this.validate();
    }

    activate(){
        this.customerHasAddress();
        this._active = true;
    }
    deactivate(){
        this._active = false;
    }

    setAddress(address: Address){
        this._address = address;
    }

    addRewardPoints(amount: number){
        this._rewardPoints += amount;
    }

    customerHasAddress(){
        if(this._address === undefined){
            throw new Error("Customer doesn`t have address");
        }
    }

    get id(): string{
        return this._id;
    }

    get name(): String{
        return this._name;
    }

    get address(): Address{
        return this._address;
    }

    get isActive(): boolean{
        return this._active;
    }

    get rewardPoints(): number{
        return this._rewardPoints;
    }
}