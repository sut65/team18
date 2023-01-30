import { RoleInterface } from "./IRole";

export interface EmployeeInterface {
    ID?: number;

    Employee_ID?: string;

    Name?: string;
    Surname?: string;

    RoleID: string;
    RoleInterface?: RoleInterface;
}