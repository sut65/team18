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
	var ocd entity.Ocd
	var time entity.Time
	var employee entity.Employee
	var role entity.Role
	var place entity.Place

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร
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

	// ค้นหา ocd ด้วย id
	if tx := entity.DB().Where("id = ?", schedule.OcdID).First(&ocd); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "days not found"})
		return
	}

	// : ค้นหา time ด้วย id
	if tx := entity.DB().Where("id = ?", schedule.TimeID).First(&time); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "time not found"})
		return
	}

	// : ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", schedule.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// : ค้นหา role ด้วย id
	if tx := entity.DB().Where("id = ?", schedule.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Role not found"})
		return
	}

	// : ค้นหา place ด้วย id
	if tx := entity.DB().Where("id = ?", schedule.PlaceID).First(&place); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "place not found"})
		return
	}

	// : สร้างตาราง schedule
	ps := entity.Schedule{
		Employee:    employee,
		Role:        role,
		Duty:        duty,
		Ocd:         ocd,
		Time:        time,
		Place:       place,
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
	if err := entity.DB().Preload("Employee").Preload("Role").Preload("Duty").Preload("Ocd").Preload("Time").Preload("Place").Raw("SELECT * FROM schedules WHERE id = ?", id).Scan(&schedule).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": schedule})
}

//------- ค้นหา id 
func GetSchedulebyID(c *gin.Context) {
	var schedule []entity.Schedule
	id := c.Param("id")		// .Preload("id") -> ดึงตารางย่อยมา												// WHERE user_id = ? จะค้นหาเฉพาะข้อมูลของ user(admin) ที่ login เข้ามาใช้งาน
	if err := entity.DB().Preload("Employee").Preload("Role").Preload("Duty").Preload("Ocd").Preload("Time").Preload("Place").Raw("SELECT * FROM schedules", id).Find(&schedule).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": schedule})
}

// ค้าหา id แบบตัว GetSchedulebyID
// สร้าง id ของ user ที่เพิ่มเข้าไป
func GetScheduleByUserID(c *gin.Context) {
	var schedule entity.Employee
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM employees WHERE user_id = ?", id).Scan(&schedule).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": schedule})
}


// GET /Schedules
func ListSchedules(c *gin.Context) {
	var schedules []entity.Schedule
	if err := entity.DB().Preload("Employee").Preload("Role").Preload("Duty").Preload("Ocd").Preload("Time").Preload("Place").Raw("SELECT * FROM schedules").Find(&schedules).Error; err != nil {
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
	var newSchedule entity.Schedule

	if err := c.ShouldBindJSON(&newSchedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", newSchedule.ID).First(&schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Schedule not found"})
		return
	}

	var employee entity.Employee
	var role entity.Role
	var duty entity.Duty
	var ocd entity.Ocd
	var time entity.Time
	var place entity.Place

	// : ค้นหา duty ด้วย id
	if tx := entity.DB().Where("id = ?", newSchedule.DutyID).First(&duty); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Duty not found"})
		return
	}

	// : ค้นหา ocd ด้วย id
	if tx := entity.DB().Where("id = ?", newSchedule.OcdID).First(&ocd); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Role not found"})
		return
	}

	// : ค้นหา time ด้วย id
	if tx := entity.DB().Where("id = ?", newSchedule.TimeID).First(&time); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Time not found"})
		return
	}

	// : ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", newSchedule.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
		return
	}

	// : ค้นหา role ด้วย id
	if tx := entity.DB().Where("id = ?", newSchedule.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Role not found"})
		return
	}

	// : ค้นหา place ด้วย id
	if tx := entity.DB().Where("id = ?", newSchedule.PlaceID).First(&place); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Place not found"})
		return
	}

	// Combobox
	schedule.Employee = employee
	schedule.Role = role
	schedule.Duty = duty
	schedule.Ocd = ocd
	schedule.Time = time
	schedule.Place = place


	// TextField
	

	if err := entity.DB().Save(&schedule).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": schedule})
}
