import { RoleInterface } from "./IRole";
import { GenderInterface } from "./IGender";
import { EducationInterface } from "./Employee/IEducation";

export interface EmployeeInterface {
    
    ID?: number;
    Employee_ID?: string;
    Name?: string;
    Tel?: string,
    Email?: string,
    Password?: string,
    
    GenderID?: number,
	Gender?:   GenderInterface;
    
	EducationID?: number,
	Education?: EducationInterface,
    
    // RoleID: string;
    // RoleInterface?: RoleInterface;
	RoleID?: number,
	Role?: RoleInterface,

	// UserID: number,
	// User:   CanvasUserInterface,
}