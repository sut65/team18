import { GenderInterface } from "./IGender";
import { EvidenceInterface } from "./IEvidencet";
import { TypemInterface } from "./ITypem";
import { RoleInterface } from "./IRole";

export interface MemberInterface {

    ID?: number;
    Name?: string;
    Email?: string;
    Password?: string;
    Bdate?:Date | null; //วันเกิด
    Age?: number; 

    GenderID?: number;
    Gender?: GenderInterface;

    TypemID?:number;
    Typem?: TypemInterface;

    EvidenceID?:number;
    Evidence?:EvidenceInterface;

    RoleID? :number;
	Role?:   RoleInterface;

    UserID? :number;
	//User?:   SigninInterface;
   }