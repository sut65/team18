import { ExerciseProgramInterface } from "../ExerciseProgram/IExerciseProgram";
import { EmployeeInterface } from "../IEmployee";
import { MemberInterface } from "../IMember";

export interface TrainerBookingInterface {
    ID?:    number;

    MemberID?: number;
    Member?: MemberInterface;

    EmployeeID?:  number;
	Employee?:    EmployeeInterface;

    ExerciseProgramListID?: number;
	ExerciseProgramList?: ExerciseProgramInterface;

	Training_Time?: Date | null;
	
    }