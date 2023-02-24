import { MemberInterface } from "./IMember";
import { PlaceInterface } from "./IPlace";
import { ServiceInterface } from "./IService";
import { TimeperiodInterface } from "./ITimeperiod";

export interface BookInfoInterface {

    ID? : number;

    ServiceID? : number;
    Service? : ServiceInterface

    PlaceID? : number;
    Place? : PlaceInterface;

    TimeperiodID? : number;
    Timperiod? : TimeperiodInterface;

    MemberID? : number;
    Member? : MemberInterface;

    Tel? : string;
    BDate? : Date | null;


}