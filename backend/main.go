package main

import (

  "github.com/sut65/team18/controller/payment"

  "github.com/sut65/team18/entity"

  "github.com/gin-gonic/gin"

)

 

func main() {

  entity.SetupDatabase()

 

  r := gin.Default()

 

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

  // Run the server

  r.Run()

}