import { BookInfoInterface } from "../models/IBookInfo";
import { PlaceinfoInterface } from "../models/IPlaceInfo";

const apiUrl = "http://localhost:8080";

//////////////// PlaceInfo ////////////////
async function GetService() {
    const requestOptions = {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/services`, requestOptions)
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
  
  async function GetOpenandClosedays() {
    const requestOptions = {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/openandclosedays`, requestOptions)
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
  
  async function GetOpenandClosetime() {
    const requestOptions = {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/openandclosetimes`, requestOptions)
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
  
  async function CreatePlaceInfo(data: PlaceinfoInterface) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/placeInfo`, requestOptions)
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

  async function ListPlaceInfolist() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/placeInfos`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          return res;
        }
      });
  
    return res;
  }

  async function UpdatePlaceInfoList(data: Partial<PlaceinfoInterface>) {
    const requestOptions = {
      method: "PATCH",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json", 
              },
              body: JSON.stringify(data)
    }
  
    let res = await fetch(`${apiUrl}/placeInfo`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          return res
        
      })
  
    return res
  }

  async function GetPlaceInfoListByID() {
    let pid = localStorage.getItem("pid")
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/placeInfo/${pid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false
        }
      });
  
    return res;
  }

  async function DeletePlaceInfoByID(id: any) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/placeInfo/${id}`, requestOptions)
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

  export {

    //PlaceInfo
  GetService,
  GetOpenandClosedays,
  GetOpenandClosetime,
  CreatePlaceInfo,
  DeletePlaceInfoByID,
  ListPlaceInfolist,
  GetPlaceInfoListByID,
  UpdatePlaceInfoList,

  }