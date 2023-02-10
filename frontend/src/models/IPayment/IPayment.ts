import { PaymentMethodInterface } from "./IMethod";
import { BillInterface } from "./IBill";
import { PayeeInterface } from "./IPayee";

export interface PaymentInterface{
	ID?: number;
	
	BillID?: number ;
	Bill?: BillInterface;

	PaymentMethodID?: number ;
	PaymentMethod?:   PaymentMethodInterface;

    PayeeID?: number;
	Payee?: PayeeInterface;

	PayDate?: Date;
}
