import { EmployeeInterface } from "./IEmployee";
import { OcdInterface } from "./IOcd";
import { OctInterface } from "./IOct";
import { ServiceInterface } from "./IService";

export interface PlaceinfoInterface {

    ID? : number;

    ServiceID? : number;
    Service? : ServiceInterface;

    OcdID? : number;
    Ocd? : OcdInterface;

    OctID? : number;
    Oct? : OctInterface;

    EmployeeID? : number;
    Employee? : EmployeeInterface;

    Hours? : number | null;
    Detail? : string | null;
    PDate? : Date | null;
    
}