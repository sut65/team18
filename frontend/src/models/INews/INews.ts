import { EmployeeInterface } from "../IEmployee";
import { NewsTypeInterface } from "./INewsType";
import { RecipientInterface } from "./IRecipient";

export interface NewsInterface {
    ID?:          number;
    Headline?:    string;
    Body?:       string;
    SDate?:      Date | null;
    DDate?:      Date | null;
    
    RecipientID?: number ;
	Recipient?:   RecipientInterface;

    NewsTypeID?: number ;
	NewsType?:  NewsTypeInterface;

    EmployeeID?: number ;
	Employee?:   EmployeeInterface;
    }