package controller

import (
	"net/http"

	//"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team18/entity"
)

//โครงสร้างตัวควบคุม database

// POST //schedule
func CreateSchedule(c *gin.Context) { // c รับข้อมูลมาจาก api
	var schedule entity.Schedule //การประกาศตัวแปรให้เป็นไทป์ที่เราสร้างขึ้นเอง
	var duty entity.Duty
	var time entity.Time

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร foodsickeness
	// c.ShouldBindJSON  คือการผูกข้อมูลที่ได้จากหน้า frontend ให้เข้ากับ structure(โครงสร้าง) ของ backend
	if err := c.ShouldBindJSON(&schedule); err != nil {
		// c.JSON เปลี่ยนข้อมูลที่มีให้เป็นนข้อมูลแบบ json
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//tx.RowsAffected == 0 คือมัน err
	// : ค้นหา duty ด้วย id
	if tx := entity.DB().Where("id = ?", schedule.DutyID).First(&duty); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "duty not found"})
		return
	}

	// : ค้นหา time ด้วย id
	if tx := entity.DB().Where("id = ?", schedule.TimeID).First(&time); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "time not found"})
		return
	}

	// : สร้างตาราง schedule
	ps := entity.Schedule{
		Employee: schedule.Employee,
		Role: schedule.Role,
		Duty: schedule.Duty,
		Ocd: schedule.Ocd,
		Time: schedule.Time,
		PlaceInfolist: schedule.PlaceInfolist,
		Record_Time: schedule.Record_Time,
	}	

	// : บันทึก
	if err := entity.DB().Create(&ps).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": ps}) //ส่ง ps กลับไปตรงที่ fetch ที่เราเรียกใช้
}

// GET /Schedule/:id
func GetSchedule(c *gin.Context) {
	var schedule entity.Schedule
	id := c.Param("id") //มาจาก api จากใน main.go
	if tx := entity.DB().Where("id = ?", id).First(&schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "schedule not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": schedule})
}

// GET /Schedules 
func ListSchedules(c *gin.Context) {
	var schedules []entity.Schedule
	if err := entity.DB().Preload("Gender").Preload("Role").Preload("Education").Raw("SELECT * FROM schedules").Find(&schedules).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": schedules})
}

// DELETE /Schedules/:id
func DeleteSchedule(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM schedules WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "schedule not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Schedules 
func UpdateSchedule(c *gin.Context) {
	var schedule entity.Schedule
	if err := c.ShouldBindJSON(&schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", schedule.ID).First(&schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "schedule not found"})
		return
	}
	if err := entity.DB().Save(&schedule).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": schedule})
}
