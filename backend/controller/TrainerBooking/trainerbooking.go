package controller

import (
	"fmt"
	"net/http"

	"github.com/asaskevich/govalidator"
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
	if err := entity.DB().Preload("Employee").Preload("Member").Preload("ExerciseProgramList").Raw("SELECT * FROM trainer_booking_lists WHERE id = ?", id).Find(&trblist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": trblist})
}

// LIST /trblist
func ListTrBList(c *gin.Context) {
	var trblist []entity.TrainerBookingList
	if err := entity.DB().Preload("Employee").Preload("Member").Preload("ExerciseProgramList").Raw("SELECT * FROM trainer_booking_lists").Find(&trblist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": trblist})
}
// GET /explist/:eid
func GetTrBListByMem(c *gin.Context) {
	var trblist []entity.TrainerBookingList
	member_id := c.Param("id")
	if err := entity.DB().Preload("Employee").Preload("Member").Preload("ExerciseProgramList").Raw("SELECT * FROM trainer_booking_lists WHERE member_id = ?", member_id).Find(&trblist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": trblist})
}
// DELETE /trblist/:id
func DeleteTrBList(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM trainer_booking_lists WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "list not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /trblist
func UpdateTrBList(c *gin.Context) {
	var oldtrblist entity.TrainerBookingList
	var newtrblist entity.TrainerBookingList
	var employees entity.Employee
	var member entity.Member
	var explist entity.ExerciseProgramList
	if err := c.ShouldBindJSON(&newtrblist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if _, err := govalidator.ValidateStruct(&newtrblist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	if tx := entity.DB().Where("id = ?", newtrblist.ID).First(&oldtrblist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "trainer bk not found"})
		return
	}
	if newtrblist.MemberID != nil {
		if tx := entity.DB().Where("id = ?", newtrblist.MemberID).First(&member); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "employeesss not found"})
			return
		}
		fmt.Print("NOT NULL")
		newtrblist.Member = member
	} else {
		if tx := entity.DB().Where("id = ?", newtrblist.EmployeeID).First(&employees); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found member"})
			return
		}
		fmt.Print("NULL")
		newtrblist.Member = member
	}
	// ค้นหา employee ด้วย id
	if newtrblist.EmployeeID != nil {
		if tx := entity.DB().Where("id = ?", newtrblist.EmployeeID).First(&employees); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "employeesss not found"})
			return
		}
		
		newtrblist.Employee = employees
	} else {
		if tx := entity.DB().Where("id = ?", newtrblist.EmployeeID).First(&employees); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		
		newtrblist.Employee = employees
	}
	if newtrblist.ExerciseProgramListID != nil {
		if tx := entity.DB().Where("id = ?", newtrblist.ExerciseProgramListID).First(&explist); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "ex program not found"})
			return
		}
		newtrblist.ExerciseProgramList = explist
	} else {
		if tx := entity.DB().Where("id = ?", newtrblist.ExerciseProgramListID).First(&explist); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "ex program not found"})
			return
		}
		newtrblist.ExerciseProgramList = explist
	}
	newtrblist.Training_Time = oldtrblist.Training_Time


	if err := entity.DB().Save(&newtrblist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}


	c.JSON(http.StatusOK, gin.H{"data": newtrblist})
}