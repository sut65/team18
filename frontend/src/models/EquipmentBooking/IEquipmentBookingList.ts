import { EquipmentListInterface } from "../EquipmentList/IEquipmentList";
import { MemberInterface } from "../IMember";

export interface EquipmentBookingListInterface {
    ID?: number,
    EquipmentListID?: number;
    EquipmentList?: EquipmentListInterface;
    MemberID?:  number;
    Member?:    MemberInterface;
    DateBooking: Date | null;
}