package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"

	"github.com/sut65/team18/entity"
)

// POST /member
func CreateNotify(c *gin.Context) {

	var notify entity.Notify
	var member entity.Member
	var equipmentname entity.EquipmentName
	var runnumber entity.RunNumber

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ x จะถูก bind เข้าตัวแปร notify
	if err := c.ShouldBindJSON(&notify); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", notify.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	// ค้นหา equipmentname ด้วย id
	if tx := entity.DB().Where("id = ?", notify.EquipmentNameID).First(&equipmentname); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Equipmentname not found"})
		return
	}

	// ค้นหาrunnumber ด้วย id
	if tx := entity.DB().Where("id = ?", notify.RunNumberID).First(&runnumber); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Runnumber not found"})
		return
	}

	//สร้าง ตารางNotify
	nt := entity.Notify{
		Member:        member,
		Problem:       notify.Problem,
		Date:          notify.Date,
		EquipmentName: equipmentname,
		RunNumber:     runnumber,
	}

	// ขั้นตอนการ validate
	if _, err := govalidator.ValidateStruct(nt); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// บันทึก
	if err := entity.DB().Create(&nt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": nt})
}

// GET /Notify/:id
func GetNotify(c *gin.Context) {
	var notify entity.Notify
	id := c.Param("id")
	if err := entity.DB().Preload("Member").Preload("EquipmentName").Preload("RunNumber").Raw("SELECT * FROM notifys WHERE id = ?", id).Find(&notify).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": notify})
}

func ListNotify(c *gin.Context) {
	var notify []entity.Member
	if err := entity.DB().Preload("Member").Preload("EquipmentName").Preload("RunNumber").Raw("SELECT * FROM notifys").Find(&notify).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": notify})
}

// function สำหรับลบ Notify ด้วย ID
// DELETE /Notify/:id
func DeleteNotify(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM notifys WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Notify not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Notify
func UpdateNotify(c *gin.Context) {
	var notify entity.Notify
	if err := c.ShouldBindJSON(&notify); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", notify.ID).First(&notify); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Notify not found"})
		return
	}

	if err := entity.DB().Save(&notify).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": notify})
}
