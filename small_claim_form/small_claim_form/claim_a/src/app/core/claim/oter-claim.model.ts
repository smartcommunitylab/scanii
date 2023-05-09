export class OtherClaim {
    private _isYes: boolean;
    private _description?: string;
    private _value?: number;
    private _currency?: string;

    constructor(isYes: boolean, description?: string, value?: number, currency?: string) {
        this._isYes = isYes;
        if(description) this._description = description;
        if(value) this._value = value;
        if(currency) this._currency = currency;
    }
}