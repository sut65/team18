import { ExerciseProgramInterface } from "../models/ExerciseProgram/IExerciseProgram";
import { TrainerBookingInterface } from "../models/Trainer/ITrainerBooking";

const apiUrl = "http://localhost:8080";

//////////////// Trainer Booking System ////////////////

  async function ListTrBList() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/trainerBookings`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          return res;
        } 
      });
  
    return res;
  }
  async function GetTrBListByID(tr_id:any) {
    
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/trainerBooking/${tr_id}`, requestOptions)
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
  async function GetTrBListByMemID(id: any) {
   
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    
    let res = await fetch(`${apiUrl}/trainerBookingmid/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          return res;
        }
      });
  
    return res;
  }
  async function UpdateTrBList(data: Partial<TrainerBookingInterface>) {
   
    const requestOptions = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
  
    let res = await fetch(`${apiUrl}/trainerBooking`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          return res
        })
    return res
  }
  async function DeleteTrBListByID(ID : any){
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };
  
    let res = await fetch(`${apiUrl}/trainerBooking/${ID}`, requestOptions)
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
  async function CreateTrainerBookingList(data: TrainerBookingInterface) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/trainerBooking`, requestOptions)
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
  export{
    ListTrBList,
    GetTrBListByID,
    GetTrBListByMemID,
    CreateTrainerBookingList,
    UpdateTrBList,
    DeleteTrBListByID,
    
  }