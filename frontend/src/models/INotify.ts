import { EquipmentNameInterface } from "./EquipmentList/IEquipmentName";
import { MemberInterface } from "./IMember";
import { RunNumberInterface } from "./EquipmentList/IRunNumber";

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