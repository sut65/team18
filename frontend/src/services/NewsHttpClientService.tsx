import React from "react";
import { NewsInterface } from "../models/INews/INews";
import { PayeeInterface } from "../models/IPayment/IPayee";
import { PaymentMethodInterface } from "../models/IPayment/IMethod";

const apiUrl = "http://localhost:8080";





async function GetRecipient() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/recipient`, requestOptions)
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

async function GetNewsbys( id : any) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/news/${id}`, requestOptions)
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

async function GetNewstype() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/newstype`, requestOptions)
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



async function GetNews() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/news`, requestOptions)
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

async function CreateNews(data: NewsInterface) {
  const requestOptions = {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,"Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/news`, requestOptions)
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

  async function UpdateNews(data: NewsInterface) {
    const requestOptions = {
      method: "PATCH",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,
                 "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/news`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return  res.data ;
        } else {
          return false;
        }
      });
  
    return res;
  }

  export {
    GetNewstype,
    GetNewsbys,
    GetNews,
    UpdateNews,
    GetRecipient,

    CreateNews,

  };