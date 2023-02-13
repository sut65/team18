import { EquipmentNameInterface } from "./IEquipmentName";
import { MemberInterface } from "./IMember";
import { RunNumberInterface } from "./IRunNumber";

export interface NotifyInterface {

    ID?: number;
    Problem?: string;
    Ddate?: Date | null;


    MemberID?: number;
    Member?: MemberInterface;

    RunNumberID?: number;
    RunNumber?: RunNumberInterface;

    EquipmentNameID?: number;
    EquipmentName?: EquipmentNameInterface;

}