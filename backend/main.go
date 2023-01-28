package main

import (
	"github.com/sut65/team18/controller/Payment"
  // . "github.com/sut65/team18/controller/News"

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