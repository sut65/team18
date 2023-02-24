package controller

import (
	"fmt"
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team18/entity"
)

// POST /program
func CreateExerciseProgramList(c *gin.Context) {

	var employees entity.Employee
	var wormups entity.WormUp
	var exercise entity.Exercise
	var stretch entity.Stretch
	var explists entity.ExerciseProgramList

	// ผลลัพธ์ที่ได้จากขั้นตอนที่  จะถูก bind เข้าตัวแปร exprlist
	if err := c.ShouldBindJSON(&explists); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", explists.EmployeeID).First(&employees); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employeesss not found"})
		return
	}

	// ค้นหา wormup ด้วย id
	if tx := entity.DB().Where("id = ?", explists.WormUpID).First(&wormups); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "worm up not found"})
		return
	}

	// ค้นหา exercise ด้วย id
	if tx := entity.DB().Where("id = ?", explists.ExerciseID).First(&exercise); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "exercise not found"})
		return
	}
	// ค้นหา stretch ด้วย id
	if tx := entity.DB().Where("id = ?", explists.StretchID).First(&stretch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "stretch not found"})
		return
	}
	// 12: สร้าง ex prog list
	list := entity.ExerciseProgramList{
		ProgramName: explists.ProgramName,
		Employee:    employees,       // โยงความสัมพันธ์กับ Entity Employee
		WormUp:      wormups,         // โยงความสัมพันธ์กับ Entity WormUp
		Exercise:    exercise,        // โยงความสัมพันธ์กับ Entity Exercise
		Stretch:     stretch,         // โยงความสัมพันธ์กับ Entity Stretch
		Minute:      explists.Minute, // ตั้งค่าฟิลด์ Minute
	}
// ขั้นตอนการ validate
if _, err := govalidator.ValidateStruct(list); err != nil {
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	return
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
	if err := entity.DB().Preload("Employee").Preload("WormUp").Preload("Exercise").Preload("Stretch").Raw("SELECT * FROM exercise_program_lists WHERE id = ?", id).Find(&explist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": explist})
}

// LIST /explist
func ListExPList(c *gin.Context) {
	var explists []entity.ExerciseProgramList
	if err := entity.DB().Preload("Employee").Preload("WormUp").Preload("Exercise").Preload("Stretch").Raw("SELECT * FROM exercise_program_lists").Find(&explists).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": explists})
}

// DELETE /explist/:id
func DeleteExPListByID(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM exercise_program_lists WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "list not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /explist
func UpdateExPList(c *gin.Context) {
	var explists entity.ExerciseProgramList
	var newexplists entity.ExerciseProgramList
	var employees entity.Employee
	var wormups entity.WormUp
	var exercise entity.Exercise
	var stretch entity.Stretch
	if err := c.ShouldBindJSON(&newexplists); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	if _, err := govalidator.ValidateStruct(&newexplists); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	if tx := entity.DB().Where("id = ?", newexplists.ID).First(&explists); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ExerciseProgram not found"})
		return
	}
	if newexplists.ProgramName == "" {
		newexplists.ProgramName = explists.ProgramName
	}

	// ค้นหา employee ด้วย id
	if newexplists.EmployeeID != nil {
		if tx := entity.DB().Where("id = ?", newexplists.EmployeeID).First(&employees); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "employeesss not found"})
			return
		}
		fmt.Print("NOT NULL")
		newexplists.Employee = employees
	} else {
		if tx := entity.DB().Where("id = ?", newexplists.EmployeeID).First(&employees); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		fmt.Print("NULL")
		newexplists.Employee = employees
	}

	// ค้นหา wormup ด้วย id
	if newexplists.WormUpID != nil {
		if tx := entity.DB().Where("id = ?", newexplists.WormUpID).First(&wormups); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "worm up not found"})
			return
		}
		newexplists.WormUp = wormups
	} else {
		if tx := entity.DB().Where("id = ?", newexplists.WormUpID).First(&wormups); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "worm up not found"})
			return
		}
		newexplists.WormUp = wormups
	}

	// ค้นหา exercise ด้วย id
	if newexplists.ExerciseID != nil {
		if tx := entity.DB().Where("id = ?", newexplists.ExerciseID).First(&exercise); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "exercise not found"})
			return
		}
		newexplists.Exercise = exercise
	} else {
		if tx := entity.DB().Where("id = ?", newexplists.ExerciseID).First(&exercise); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "exercise not found"})
			return
		}
		newexplists.Exercise = exercise
	}
	// ค้นหา stretch ด้วย id
	if newexplists.StretchID != nil {
		if tx := entity.DB().Where("id = ?", newexplists.StretchID).First(&stretch); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "stretch not found"})
			return
		}
		newexplists.Stretch = stretch
	} else {
		if tx := entity.DB().Where("id = ?", newexplists.StretchID).First(&stretch); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "stretch not found"})
			return
		}
		newexplists.Stretch = stretch
	}
	if newexplists.Minute == 0 {
		newexplists.Minute = explists.Minute
	}
	

	// ขั้นตอนการ validate
	if err := entity.DB().Save(&newexplists).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newexplists})
}