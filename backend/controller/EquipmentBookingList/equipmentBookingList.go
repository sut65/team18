package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/sut65/team18/entity"
)

// POST /equipmentBookingList
func CreateEquipmentBookingList(c *gin.Context) {
	var employee entity.Employee
	var equipmentList entity.EquipmentList
	var member entity.Member
	var equipmentBookingList entity.EquipmentList

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ x จะถูก bind เข้าตัวแปร member
	if err := c.ShouldBindJSON(&equipmentBookingList); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//สร้าง ตารางequipmentList
	el := entity.EquipmentBookingList{
		Employee:      employee,
		EquipmentList: equipmentList,
		Member:        member,
	}
	if err := entity.DB().Create(&el).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": el})

}

// GET /Member/:id
func GetEquipmentBookingList(c *gin.Context) {
	var equipmentBookingList entity.EquipmentBookingList
	id := c.Param("id")
	if err := entity.DB().Preload("Typem").Preload("Evidence").Preload("Gender").Raw("SELECT * FROM equipmentBookingLists WHERE id = ?", id).Find(&equipmentBookingList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmentBookingList})
}

func ListEquipmentBookingList(c *gin.Context) {
	var equipmentBookingList []entity.EquipmentBookingList
	if err := entity.DB().Preload("Typem").Preload("Evidence").Preload("Gender").Raw("SELECT * FROM equipmentBookingLists").Find(&equipmentBookingList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmentBookingList})
}

// function สำหรับลบ equipmentBookingList ด้วย ID
// DELETE /equipmentBookingList/:id
func DeleteEquipmentBookingList(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM equipmentBookingLists WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "equipmentBookingList not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /equipmentBookingList
func UpdateEquipmentBookingList(c *gin.Context) {
	var equipmentBookingList entity.EquipmentBookingList
	if err := c.ShouldBindJSON(&equipmentBookingList); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", equipmentBookingList.ID).First(&equipmentBookingList); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "equipmentBookingList not found"})
		return
	}

	if err := entity.DB().Save(&equipmentBookingList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": equipmentBookingList})
}
