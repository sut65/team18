package main

import (
	
	"github.com/sut65/team18/controller"
	"github.com/sut65/team18/controller/Payment"
  // . "github.com/sut65/team18/controller/News"

	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"
)

 

func main() {

  entity.SetupDatabase()

 

  r := gin.Default()

  // Employee Routes
  r.GET("/employees", controller.ListEmployees)
  r.GET("/employee/:id", controller.GetEmployee)
  r.POST("/employee", controller.CreateEmployee)
  r.PATCH("/employee", controller.UpdateEmployee)
  r.DELETE("/employee/:id", controller.DeleteEmployee)

  // Education Routes
  r.GET("/education", controller.ListEducations)
  r.GET("/educations/:id", controller.Geteducation)
  r.POST("/education", controller.CreateEducation)
  r.PATCH("/edcation", controller.UpdateEducation)
  r.DELETE("/education/:id", controller.DeleteEducation)

  // Role Routes
  r.GET("/roles", controller.ListRoles)
  r.GET("/roles/:id", controller.GetRole)
  r.POST("/role", controller.CreateRole)
  r.PATCH("/role", controller.UpdateRole)
  r.DELETE("/role/:id", controller.DeleteRole)

  //Schedule Routes
  r.GET("/schedules", controller.ListSchedules)
  r.GET("/schedule/:id", controller.GetSchedule)
  r.POST("/schedule", controller.CreateSchedule)
  r.PATCH("/schedule", controller.UpdateSchedule)
  r.DELETE("/schedule/:id", controller.DeleteSchedule)

  //Duty Routes
  r.GET("/dutys", controller.ListDutys)
  r.GET("/duty/:id", controller.GetDuty)
  r.POST("/duty", controller.CreateDuty)
  r.PATCH("/duty", controller.UpdateDuty)
  r.DELETE("/duty/:id", controller.DeleteDuty)

  //Time Routes
  r.GET("/times", controller.ListTimes)
  r.GET("/time/:id", controller.GetTime)
  r.POST("/time", controller.CreateTime)
  r.PATCH("/time", controller.UpdateTime)
  r.DELETE("/time/:id", controller.DeleteTime)
 
  // User Routes
  // Payment------------------------------
  r.GET("/method", controller.ListPaymentMethod)
  r.GET("/method/:id", controller.GetPaymentMethod)

  r.GET("/payee", controller.ListPayee)
  r.GET("/payee/:id", controller.GetPayee)

  r.GET("/status", controller.ListStatus)
  r.GET("/status/:id", controller.GetStatus)

  r.GET("/bill", controller.ListBill)
  r.GET("/billbys", controller.ListBillByStatus)
  r.GET("/bill/:id", controller.GetBill)
  r.POST("/bill", controller.CreateBill)
	r.PATCH("/bill", controller.UpdateBill)
  
  r.GET("/payment", controller.ListPayment)
  r.GET("/payment/:id", controller.GetPayment)
  r.POST("/payment", controller.CreatePayment)
  r.DELETE("/payment/:id", controller.DeletePayment)

    // News------------------------------
    // r.GET("/newstype", controller.ListNewsType)
    // r.GET("/newstype/:id", controller.GetNewsType)
  
    // r.GET("/recipient", controller.ListRecipient)
    // r.GET("/recipient/:id", controller.GetRecipient)
    
    // r.GET("/news", controller.ListNews)
    // r.GET("/news/:id", controller.GetNews)
    // r.POST("/news", controller.CreateNews)
    // r.DELETE("/news/:id", controller.DeleteNews)
    // r.PATCH("/news", controller.UpdateNews)

  // Run the server

  r.Run()

}