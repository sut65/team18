package controller

import (
	"net/http"

	"github.com/sut65/team18/entity"
	"github.com/gin-gonic/gin"
)
// POST /program
func CreateExerciseProgramList(c *gin.Context) {

	var employee entity.Employee
	var wormup entity.WormUp
	var exercise entity.Exercise
	var stretch entity.Stretch
	var explist entity.ExerciseProgramList

	// ผลลัพธ์ที่ได้จากขั้นตอนที่  จะถูก bind เข้าตัวแปร exprlist
	if err := c.ShouldBindJSON(&explist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", explist.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// ค้นหา wormup ด้วย id
	if tx := entity.DB().Where("id = ?", explist.WormUpID).First(&wormup); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "worm up not found"})
		return
	}

	// ค้นหา exercise ด้วย id
	if tx := entity.DB().Where("id = ?", explist.ExerciseID).First(&exercise); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "exercise not found"})
		return
	}
	// ค้นหา stretch ด้วย id
	if tx := entity.DB().Where("id = ?", explist.StretchID).First(&stretch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "stretch not found"})
		return
	}
	// 12: สร้าง ex prog list
	list := entity.ExerciseProgramList{
		Employee: employee,       // โยงความสัมพันธ์กับ Entity Employee
		WormUp:   wormup,         // โยงความสัมพันธ์กับ Entity WormUp
		Exercise: exercise,       // โยงความสัมพันธ์กับ Entity Exercise
		Stretch:  stretch,        // โยงความสัมพันธ์กับ Entity Stretch
		Minute:   explist.Minute, // ตั้งค่าฟิลด์ Minute
	}

	// 13: บันทึก
	if err := entity.DB().Create(&list).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": list})
}

// GET /explist/:id
func GetExPList(c *gin.Context) {
	var explist entity.ExerciseProgramList
	id := c.Param("id")
	if err := entity.DB().Preload("Employee").Preload("WormUp").Preload("Exercise").Preload("Stretch").Raw("SELECT * FROM exercise_program_list WHERE id = ?", id).Find(&explist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": explist})
}

// LIST /explist
func ListExPList(c *gin.Context) {
	var explist []entity.ExerciseProgramList
	if err := entity.DB().Preload("Employee").Preload("WormUp").Preload("Exercise").Preload("Stretch").Raw("SELECT * FROM exercise_program_list").Find(&explist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": explist})
}

// DELETE /explist/:id
func DeleteExPList(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM exercise_program_list WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "list not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /explist
func UpdateExPList(c *gin.Context) {
	var explist entity.ExerciseProgramList
	if err := c.ShouldBindJSON(&explist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", explist.ID).First(&explist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "list not found"})
		return
	}

	if err := entity.DB().Save(&explist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": explist})
}