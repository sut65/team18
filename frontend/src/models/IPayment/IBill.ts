import { StatusInterface } from "./IStatus";
import { MemberInterface } from "../IMember";

export interface BillInterface{
	
	ID?: number;
	
	MemberID?: number;
	Member?: MemberInterface;

	StatusID?: number;
	Status?:   StatusInterface;

	PayableAM?: number;
}