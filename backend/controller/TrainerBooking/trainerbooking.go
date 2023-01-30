package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team18/entity"
)

// POST / booking
func CreateTrainerBookingList(c *gin.Context) {

	var employee entity.Employee
	var member entity.Member
	var explist entity.ExerciseProgramList
	var trblist entity.TrainerBookingList

	// ผลลัพธ์ที่ได้จากขั้นตอนที่  จะถูก bind เข้าตัวแปร trblist
	if err := c.ShouldBindJSON(&trblist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", trblist.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", trblist.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	// ค้นหา exerciseprogramlist ด้วย id
	if tx := entity.DB().Where("id = ?", trblist.ExerciseProgramListID).First(&explist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "exercise program not found"})
		return
	}

	// 12: สร้าง trainer booking list
	list := entity.TrainerBookingList{
		Employee: employee,       // โยงความสัมพันธ์กับ Entity Employee
		Member:   member,         // โยงความสัมพันธ์กับ Entity Member
		ExerciseProgramList: explist,       // โยงความสัมพันธ์กับ Entity ExerciseProgramList
		Training_Time:   trblist.Training_Time, // ตั้งค่าฟิลด์ Training Time
	}

	// 13: บันทึก
	if err := entity.DB().Create(&list).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": list})
}

// GET /trblist/:id
func GetTrBList(c *gin.Context) {
	var trblist entity.TrainerBookingList
	id := c.Param("id")
	if err := entity.DB().Preload("Employee").Preload("Member").Preload("ExerciseProgramList").Raw("SELECT * FROM trainer_booking_list WHERE id = ?", id).Find(&trblist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": trblist})
}

// LIST /trblist
func ListTrBList(c *gin.Context) {
	var trblist []entity.TrainerBookingList
	if err := entity.DB().Preload("Employee").Preload("Member").Preload("ExerciseProgramList").Raw("SELECT * FROM trainer_booking_list").Find(&trblist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": trblist})
}

// DELETE /trblist/:id
func DeleteTrBList(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM trainer_booking_list WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "list not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /trblist
func UpdateTrBList(c *gin.Context) {
	var trblist entity.TrainerBookingList
	if err := c.ShouldBindJSON(&trblist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", trblist.ID).First(&trblist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "list not found"})
		return
	}

	if err := entity.DB().Save(&trblist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": trblist})
}