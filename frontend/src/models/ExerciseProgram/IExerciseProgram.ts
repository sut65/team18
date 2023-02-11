import { EmployeeInterface } from "../IEmployee";
import { ExerciseInterface } from "./IExercise";
import { StretchInterface } from "./IStretch";
import { WormUpInterface } from "./IWormup";

export interface ExerciseProgramInterface {
    ID?:               number;

    ProgramName?:       string;

    EmployeeID?:  number
	Employee?:    EmployeeInterface

	WormUpID?:    number
	WormUp?:      WormUpInterface

	ExerciseID?:  number
	Exercise?:    ExerciseInterface 

	StretchID?:   number
	Stretch?:     StretchInterface 

	Minute?:      number
    }

	