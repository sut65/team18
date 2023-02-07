import { EmployeeInterface } from "../IEmployee";
import { RoleInterface } from "../Employee/IRole";
import { TimeInterface } from "./ITime";
import { DutyInterface } from "./IDuty";

export interface ScheduleInterface{
    ID: number,
    
	EmployeeID: number,
	Employee:   EmployeeInterface, 

	RoleID: number,
	Role: RoleInterface,

	
	DutyID: number,
	Duty:   DutyInterface,

	// OcdID: number,
	// Ocd:    OcdInterface,

	TimeID: number,
	Time:   TimeInterface, 

	
	// PlaceInfolistID: number,
	// PlaceInfolist:   PlaceInfolistInterface,
	
    Record_Time: Date,
}