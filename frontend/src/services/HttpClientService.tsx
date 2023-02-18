import { MemberInterface } from "../models/IMember";
import { EmployeeInterface } from "../models/IEmployee";
import { ScheduleInterface } from "../models/Schedule/ISchedule";
import { ExerciseProgramInterface } from "../models/ExerciseProgram/IExerciseProgram";
import { EquipmentBookingListInterface } from "../models/IEquipmentBookingList";
import { EquipmentListInterface } from "../models/IEquipmentList";

const apiUrl = "http://localhost:8080";

async function GetTypem() {
  const requestOptions = {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/typems`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetEvidence() {
  const requestOptions = {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/evidences`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetGender() {
  const requestOptions = {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/genders`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetMember() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/members`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetMemberOne(id:any) {
  const requestOptions = {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/member/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function CreateMember(data: MemberInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/members`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

//---------------------update--------------------------------------
async function UpdateMember(data: MemberInterface) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/members`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        localStorage.setItem("lid", JSON.stringify(res.data));
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

//--------Employee_System----------------------------------------------------
async function GetEducation() {
  const requestOptions = {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/educations`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetRole() {
  const requestOptions = {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/roles`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetEmployee(){
  const requestOptions = {
    method: "GET",
    headers: {
       Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/employee`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

// ค้าหาข้อมูลคนใช้อยู่ด้วย id
async function GetEmployeeID(id: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/employee/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

//แสดงข้อมูลคนที่ใช้ด้วย id
async function ListEmployeeID(id: any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/employeeid/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}


async function CreateEmployee(data: EmployeeInterface) {
  const requestOptions = {
    method: "POST",
    headers: {  Authorization: `Bearer ${localStorage.getItem("token")}`,"Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  console.log(data)
  let res = await fetch(`${apiUrl}/employees`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}


async function UpdateEmployee(data: EmployeeInterface) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/employee`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

//--------------Schedule----------------
async function GetDuty() {
  const requestOptions = {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/duties`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetDays() {
  const requestOptions = {
    method: "GET", //from list 
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/ocds`, requestOptions)
  // let res = await fetch(`${apiUrl}/openandcolsedays`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetPlace() {
  const requestOptions = {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/place`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetTime() {
  const requestOptions = {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/times`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetSchedule() {
  const requestOptions = {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/schedules`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function CreateSchedule(data: ScheduleInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/schedule`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

//////////////// Exercise Program System ////////////////
async function GetWormUp() {
  const requestOptions = {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/wormups`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetExercise() {
  const requestOptions = {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/exercises`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetStretch() {
  const requestOptions = {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/stretchs`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function CreateExerciseProgram(data: ExerciseProgramInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/exerciseprogram`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}
//------- Equipment List -------
async function GetRunNumber() {
  const requestOptions = {
    method: "GET",
    headers: {
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/runNumber`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetEquipmentName() {
  const requestOptions = {
    method: "GET",
    headers: {
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/equipmentName`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function GetEquipmentList() {
  const requestOptions = {
    method: "GET",
    headers: {
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/equipmentList`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

async function CreateEquipmentList(data: EquipmentListInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/equipmentList`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function CreateEquipmentBookingList(data: EquipmentBookingListInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/equipmentBookingList`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}
export {
  //Member
  GetTypem,
  GetMember,
  GetEvidence,
  GetGender,
  CreateMember,
  UpdateMember,
  GetMemberOne,

  //Employees
  GetRole,
  GetEducation,
  GetEmployee,
  CreateEmployee,
  GetEmployeeID,
  ListEmployeeID,
  UpdateEmployee,

  //Schedule
  GetDuty,
  GetTime,
  GetDays,
  GetPlace,
  GetSchedule,
  CreateSchedule,

  //ExerciseProgram
  GetWormUp,
  GetExercise,
  GetStretch,
  CreateExerciseProgram,

  //equipmentList
  GetRunNumber,
  GetEquipmentName,
  GetEquipmentList,
  CreateEquipmentList,
  CreateEquipmentBookingList

};

//status 404: เชื่อม url หรือ apiurl ไม่ได้
//status 401: ไม่ได้ทำ authenticate มาก่อน ทำให้เซิฟเวอร์ไม่สามารถให้ request นี้ทำงานได้
//status 400: Bad request การร้องขอผิดพลาด เกิดขึ้นได้หลายกรณี
//status 204: ได้รับการตอบรับแล้วแต่ยังไม่เสร็จ
//status 200: status ถูกต้อง ได้รับ req และทำเสร็จแล้ว
