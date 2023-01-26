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

  r.GET("/status", controller.ListStatus)

  r.GET("/status/:id", controller.GetStatus)

  // Run the server

  r.Run()

}