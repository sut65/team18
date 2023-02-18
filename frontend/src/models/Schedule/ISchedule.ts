import { EmployeeInterface } from "../IEmployee";
import { RoleInterface } from "../IRole";
import { TimeInterface } from "./ITime";
import { DutyInterface } from "./IDuty";
import { OcdInterface } from "../IOcd";
import { PlaceInterface } from "../IPlace";

export interface ScheduleInterface {

	ID?: number;

	EmployeeID?: number;
	Employee?: EmployeeInterface;

	RoleID?: number;
	Role?: RoleInterface;

	DutyID?: number;
	Duty?: DutyInterface;

	OcdID?: number;
	Ocd?: OcdInterface;

	TimeID?: number;
	Time?: TimeInterface;

	PlaceID?: number;
	Place?: PlaceInterface;

	Record_Time?: Date | null;
}