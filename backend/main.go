package main

import (
	"os"

	bookInfo "github.com/sut65/team18/controller/BookInfo"
	employee "github.com/sut65/team18/controller/Employee_System"
	eb "github.com/sut65/team18/controller/EquipmentBookingList"
	el "github.com/sut65/team18/controller/EquipmentManagement"
	exerciseProgram "github.com/sut65/team18/controller/ExerciseProgram"
	member "github.com/sut65/team18/controller/Member"
	notify "github.com/sut65/team18/controller/Notify"
	placeInfo "github.com/sut65/team18/controller/PlaceInfo"
	schedule "github.com/sut65/team18/controller/Schedule_System"
	signin "github.com/sut65/team18/controller/Signin"
	trainerBooking "github.com/sut65/team18/controller/TrainerBooking"
	new "github.com/sut65/team18/controller/news"
	payment "github.com/sut65/team18/controller/payment"

	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}

}
func main() {

	os.Remove("./Team18.db")

	entity.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	// ****** PUT VS PATCH ******
	// PUT - ใช้สำหรับ update ข้อมูลทั้งหมดทุก field ( อัพเดททั้ง doc หรือทั้ง record จากข้อมูลเก่าให้เป็นข้อมูลชุดที่ส่งมาอัพเดทแทน )
	// PATCH - ใช้สำหรับ update ข้อมูลเฉพาะ field ที่เราส่งไป ( ถ้า field ไหนเราไม่ได้ส่งไปให้ คือใช้ค่าเดิม )

	// Employee Routes
	r.GET("/employees", employee.ListEmployees)
	r.GET("/employee/:id", employee.GetEmployee)
	r.GET("/employeeid/:id", employee.GetEmployeebyID)
	r.POST("/employees", employee.CreateEmployee)
	//r.PATCH("/employee", employee.UpdateEmployee)
	r.PUT("/employee", employee.UpdateEmployee)
	r.DELETE("/employees/:id", employee.DeleteEmployee)

	// Education Routes
	r.GET("/educations", employee.ListEducations)
	r.GET("/education/:id", employee.GetEducation)
	r.POST("/education", employee.CreateEducation)
	r.PATCH("/edcation", employee.UpdateEducation)
	r.DELETE("/education/:id", employee.DeleteEducation)

	// Role Routes
	r.GET("/roles", employee.ListRoles)
	r.GET("/role/:id", employee.GetRole)
	r.POST("/role", employee.CreateRole)
	r.PATCH("/role", employee.UpdateRole)
	r.DELETE("/role/:id", employee.DeleteRole)

	//Schedule Routes
	r.GET("/schedules", schedule.ListSchedules)
	r.GET("/schedule/:id", schedule.GetSchedule)
	r.GET("/scheduleid/:id", schedule.GetSchedulebyID)
	r.POST("/schedules", schedule.CreateSchedule)
	// r.PATCH("/schedule", schedule.UpdateSchedule)
	r.PUT("/schedule", schedule.UpdateSchedule)
	r.DELETE("/schedules/:id", schedule.DeleteSchedule)

	//Duty Routes
	r.GET("/duties", schedule.ListDuties)
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

	r.GET("/bills", payment.ListBill)
	r.GET("/billbys/:id", payment.ListBillByStatus)
	r.GET("/bill/:id", payment.GetBill)
	r.POST("/bill", payment.CreateBill)
	r.PATCH("/bill", payment.UpdateBill)

	r.GET("/payment", payment.ListPayment)
	r.GET("/payment/:id", payment.GetPayment)
	r.POST("/payment", payment.CreatePayment)
	r.DELETE("/payment/:id", payment.DeletePayment)

	//Equipment management
	r.GET("/runNumber", el.ListRunNumber)
	r.GET("/runNumber/:id", el.GetRunNumber)

	r.GET("/equipmentName", el.ListEquipmentName)
	r.GET("/equipmentName/:id", el.GetEquipmentName)

	r.GET("/equipmentLists", el.ListEquipmentList)
	r.GET("/equipmentList/:id", el.GetEquipmentList)
	r.GET("/equipmentListShow/:id", el.GetEquipmentListShow)
	r.POST("/equipmentList", el.CreateEquipmentList)
	r.PUT("equipmentList", el.UpdateEquipmentList)
	r.DELETE("/equipmentLists/:id", el.DeleteEquipmentList)

	//Equipment booking
	r.GET("/equipmentBookingLists", eb.ListEquipmentBookingList)
	r.GET("/equipmentBookingList/:id", eb.GetEquipmentBookingList)
	r.GET("/equipmentBookingShow/:id", eb.GetEquipmentBookingShow)
	r.POST("/equipmentBookingList", eb.CreateEquipmentBookingList)
	r.PUT("equipmentBookingList", eb.UpdateEquipmentBookingList)
	r.DELETE("/equipmentBookingLists/:id", eb.DeleteEquipmentBookingList)

	// News------------------------------
	r.GET("/newstype", new.ListNewsType)
	r.GET("/newstype/:id", new.GetNewsType)

	r.GET("/recipient", new.ListRecipient)
	r.GET("/recipient/:id", new.GetRecipient)

	r.GET("/news", new.ListNews)
	r.GET("/news/:id", new.GetNews)
	r.GET("/newsbytime/:id", new.GetNewsbytime)
	r.POST("/news", new.CreateNews)
	r.DELETE("/news/:id", new.DeleteNews)
	r.PATCH("/news", new.UpdateNews)

	// // BookInfo
	r.GET("/bookInfos", bookInfo.ListBookInfoList)
	r.GET("/bookInfo/:id", bookInfo.GetBookInfoList)
	r.GET("/bookInfomb/:id", bookInfo.GetBookInfobyMB)
	r.POST("/bookInfo", bookInfo.CreateBookInfoList)
	r.PATCH("/bookInfo", bookInfo.UpdateBookInfoList)
	r.DELETE("/bookInfo/:id", bookInfo.DeleteBookInfoList)

	r.GET("/places", bookInfo.ListPlace)
	r.GET("/place/:id", bookInfo.GetPlace)
	r.POST("/place", bookInfo.CreatePlace)
	r.PATCH("/place", bookInfo.UpdatePlace)
	r.DELETE("/place/:id", bookInfo.DeletePlace)

	r.GET("timeperiods", bookInfo.ListTimeperiod)
	r.GET("timeperiod/:id", bookInfo.GetTimeperiod)
	r.POST("timeperiod", bookInfo.CreateTimeperiod)
	r.PATCH("timeperiod", bookInfo.UpdateTimeperiod)
	r.DELETE("timeperiod/:id", bookInfo.DeleteTimeperiod)

	//PlaceInfo
	r.GET("placeInfos", placeInfo.ListPlaceInfoList)
	r.GET("placeInfo/:id", placeInfo.GetPlaceInfoList)
	r.POST("placeInfo", placeInfo.CreatePlaceInfoList)
	r.PATCH("placeInfo", placeInfo.UpdatePlaceInfoList)
	r.DELETE("placeInfo/:id", placeInfo.DeletePlaceInfoList)

	r.GET("services", placeInfo.ListService)
	r.GET("service/:id", placeInfo.GetSercive)
	r.POST("service", placeInfo.CreateService)
	r.PATCH("service", placeInfo.UpdateService)
	r.DELETE("service/:id", placeInfo.DeleteService)

	r.GET("openandclosedays", placeInfo.ListOpenandClosedays)
	r.GET("openandcloseday/:id", placeInfo.GetOpenandClosedays)
	r.POST("openandcloseday", placeInfo.CreateOpenandClosedays)
	r.PATCH("openandcloseday", placeInfo.UpdateOpenandclosedays)
	r.DELETE("openandcloseday/:id", placeInfo.DeleteOpenandClosedays)

	r.GET("openandclosetimes", placeInfo.ListOpenandClosetime)
	r.GET("openandclosetime/:id", placeInfo.GetOpenandClosetime)
	r.POST("openandclosetime", placeInfo.CreateOpenandClosetime)
	r.PATCH("openandclosetime", placeInfo.UpdateOpenandClosetime)
	r.DELETE("openandclosetime/:id", placeInfo.DeleteOpenandClosetime)
	//Member
	r.GET("/members", member.ListMember)
	r.GET("/member/:id", member.GetMember)
	r.POST("/members", member.CreateMember)
	r.PUT("/members", member.UpdateMember)
	r.DELETE("/members/:id", member.DeleteMember)

	r.GET("/evidences", member.ListEvidence)
	r.GET("/evidence/:id", member.GetEvidence)

	r.GET("/typems", member.ListTypem)
	r.GET("/typem/:id", member.GetTypem)

	r.GET("/genders", member.ListGender)
	r.GET("/gender/:id", member.GetGender)

	//notify
	r.GET("/notifys", notify.ListNotify)
	r.GET("/notify/:id", notify.GetNotify)
	r.GET("/notifymb/:id", notify.GetNotifybyMB)
	r.POST("/notifys", notify.CreateNotify)
	r.DELETE("/notify/:id", notify.DeleteNotify)
	r.PUT("/notifys", notify.UpdateNotify)

	//traniner booking
	r.GET("/trainerBookings", trainerBooking.ListTrBList)
	r.GET("/trainerBooking/:id", trainerBooking.GetTrBList)
	r.GET("/trainerBookingmid/:id", trainerBooking.GetTrBListByMem)
	r.POST("/trainerBooking", trainerBooking.CreateTrainerBookingList)
	r.DELETE("/trainerBooking/:id", trainerBooking.DeleteTrBList)
	r.PATCH("/trainerBooking", trainerBooking.UpdateTrBList)

	//Execise Program
	r.GET("/exercises", exerciseProgram.ListExercise)
	r.GET("/exercise/:id", exerciseProgram.GetExercise)
	r.POST("/exercise", exerciseProgram.CreateExercise)
	r.DELETE("/exercise/:id", exerciseProgram.DeleteExercise)
	r.PATCH("/exercise", exerciseProgram.UpdateExercise)

	r.GET("/stretchs", exerciseProgram.ListStretch)
	r.GET("/stretch/:id", exerciseProgram.GetStretch)
	r.POST("/stretch", exerciseProgram.CreateStretch)
	r.DELETE("/stretch/:id", exerciseProgram.DeleteStretch)
	r.PATCH("/stretch", exerciseProgram.UpdateStretch)

	r.GET("/wormups", exerciseProgram.ListWormUp)
	r.GET("/wormup/:id", exerciseProgram.GetWormUp)
	r.POST("/wormup", exerciseProgram.CreateWormUp)
	r.DELETE("/wormup/:id", exerciseProgram.DeleteWormUp)
	r.PATCH("/wormup", exerciseProgram.UpdateWormUp)

	r.GET("/exerciseprograms", exerciseProgram.ListExPList)
	r.GET("/exerciseprogram/:id", exerciseProgram.GetExPList)
	r.POST("/exerciseprogram", exerciseProgram.CreateExerciseProgramList)
	r.DELETE("/exerciseprogram/:id", exerciseProgram.DeleteExPListByID)
	r.PATCH("/exerciseprogram", exerciseProgram.UpdateExPList)

	//user
	r.GET("/user", signin.ListUser)
	r.GET("/user/:id", signin.GetUser)
	r.DELETE("/user/:id", signin.DeleteUser)
	r.PATCH("/user", signin.UpdateUser)

	//signin
	r.POST("/signin", signin.Signin)
	r.GET("/valid", signin.Validation)
	r.GET("/employee_userID/:id", employee.GetEmployeeByUserID)
	r.Run()
}
