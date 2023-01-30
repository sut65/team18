package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/sut65/team18/entity"
)

// POST /equipmentList
func CreateEquipmentList(c *gin.Context) {
	var employee entity.Employee
	var equipmentList entity.EquipmentList
	var equipmentName entity.EquipmentName
	var runNumber entity.RunNumber

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ x จะถูก bind เข้าตัวแปร member
	if err := c.ShouldBindJSON(&equipmentList); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา typem ด้วย id
	if tx := entity.DB().Where("id = ?", equipmentList.EquipmentNameID).First(&equipmentName); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Equipment name not found"})
		return
	}

	// ค้นหา evidencet ด้วย id
	if tx := entity.DB().Where("id = ?", equipmentList.RunNumberID).First(&runNumber); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Run number not found"})
		return
	}

	//สร้าง ตารางequipmentList
	el := entity.EquipmentList{
		Employee:      employee,
		EquipmentName: equipmentName,
		RunNumber:     runNumber,
	}
	if err := entity.DB().Create(&el).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": el})

}

// GET /Member/:id
func GetEquipmentList(c *gin.Context) {
	var equipmentList entity.EquipmentList
	id := c.Param("id")
	if err := entity.DB().Preload("Typem").Preload("Evidence").Preload("Gender").Raw("SELECT * FROM equipmentLists WHERE id = ?", id).Find(&equipmentList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmentList})
}

func ListEquipmentList(c *gin.Context) {
	var equipmentList []entity.EquipmentList
	if err := entity.DB().Preload("Typem").Preload("Evidence").Preload("Gender").Raw("SELECT * FROM equipmentLists").Find(&equipmentList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmentList})
}

// function สำหรับลบ equipmentList ด้วย ID
// DELETE /equipmentList/:id
func DeleteEquipmentList(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM equipmentLists WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "equipmentList not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /equipmentList
func UpdateEquipmentList(c *gin.Context) {
	var equipmentList entity.EquipmentList
	if err := c.ShouldBindJSON(&equipmentList); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", equipmentList.ID).First(&equipmentList); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "equipmentList not found"})
		return
	}

	if err := entity.DB().Save(&equipmentList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": equipmentList})
}
