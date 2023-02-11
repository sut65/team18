import { RunNumberInterface } from "./IRunNumber";
import { EquipmentNameInterface } from "./IEquipmentName";
import { EmployeeInterface } from "./IEmployee";
export interface EquipmentListInterface {
    ID?: number,
    Detail?: string;
    EquipmentNameID?: number;
    EquipmentName?: EquipmentNameInterface;
    RunNumberID?: number;
    RunNumber?: RunNumberInterface;
    EmployeeID?:    number;
    Employee?:  EmployeeInterface;
    DateTime: Date | null;
}