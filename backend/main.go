package main

import (
	employee "github.com/sut65/team18/controller/Employee_System"
	payment "github.com/sut65/team18/controller/Payment"
	schedule "github.com/sut65/team18/controller/Schedule_System"

	// . "github.com/sut65/team18/controller/News"

	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()

	// Employee Routes
	r.GET("/employees", employee.ListEmployees)
	r.GET("/employee/:id", employee.GetEmployee)
	r.POST("/employee", employee.CreateEmployee)
	r.PATCH("/employee", employee.UpdateEmployee)
	r.DELETE("/employee/:id", employee.DeleteEmployee)

	// Education Routes
	r.GET("/education", employee.ListEducations)
	r.GET("/educations/:id", employee.GetEducation)
	r.POST("/education", employee.CreateEducation)
	r.PATCH("/edcation", employee.UpdateEducation)
	r.DELETE("/education/:id", employee.DeleteEducation)

	// Role Routes
	r.GET("/roles", employee.ListRoles)
	r.GET("/roles/:id", employee.GetRole)
	r.POST("/role", employee.CreateRole)
	r.PATCH("/role", employee.UpdateRole)
	r.DELETE("/role/:id", employee.DeleteRole)

	//Schedule Routes
	r.GET("/schedules", schedule.ListSchedules)
	r.GET("/schedule/:id", schedule.GetSchedule)
	r.POST("/schedule", schedule.CreateSchedule)
	r.PATCH("/schedule", schedule.UpdateSchedule)
	r.DELETE("/schedule/:id", schedule.DeleteSchedule)

	//Duty Routes
	r.GET("/dutys", schedule.ListDutys)
	r.GET("/duty/:id", schedule.GetDuty)
	r.POST("/duty", schedule.CreateDuty)
	r.PATCH("/duty", schedule.UpdateDuty)
	r.DELETE("/duty/:id", schedule.DeleteDuty)

	//Time Routes
	r.GET("/times", schedule.ListTimes)
	r.GET("/time/:id", schedule.GetTime)
	r.POST("/time", schedule.CreateTime)
	r.PATCH("/time", schedule.UpdateTime)
	r.DELETE("/time/:id", schedule.DeleteTime)

	// User Routes
	// Payment------------------------------
	r.GET("/method", payment.ListPaymentMethod)
	r.GET("/method/:id", payment.GetPaymentMethod)

	r.GET("/payee", payment.ListPayee)
	r.GET("/payee/:id", payment.GetPayee)

	r.GET("/status", payment.ListStatus)
	r.GET("/status/:id", payment.GetStatus)

	r.GET("/bill", payment.ListBill)
	r.GET("/billbys", payment.ListBillByStatus)
	r.GET("/bill/:id", payment.GetBill)
	r.POST("/bill", payment.CreateBill)
	r.PATCH("/bill", payment.UpdateBill)

	r.GET("/payment", payment.ListPayment)
	r.GET("/payment/:id", payment.GetPayment)
	r.POST("/payment", payment.CreatePayment)
	r.DELETE("/payment/:id", payment.DeletePayment)

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
