import { EducationTnterface } from "./IEducation"
import { RoleInterface } from "./IRole"

export interface Employee_systemInterface{
    ID: number,
    Name: string,
    Tel: string,
    Email: string,
    Password: string,

    // GenderID: number,
	// Gender:   Gender

	EducationID: number,
	Education: EducationTnterface,

	RoleID: number,
	Role: RoleInterface,

	// UserID: number,
	// User:   CanvasUserInterface,




}