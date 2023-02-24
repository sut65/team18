import { EquipmentListInterface } from "../EquipmentList/IEquipmentList";
import { MemberInterface } from "../IMember";
import { PlaceInterface } from "../IPlace";

export interface EquipmentBookingListInterface {
    ID?: number,
    EquipmentListID?: number;
    EquipmentList?: EquipmentListInterface;
    MemberID?:  number;
    Member?:    MemberInterface;
    PlaceID?: number;
    Place?: PlaceInterface;
    DateBooking: Date | null;
}