package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET /EquipmentName/:id
func GetEquipmentName(c *gin.Context) {
	var equipmentName entity.EquipmentName
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM equipment_names WHERE id = ?", id).Scan(&equipmentName).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": equipmentName})
}

// GET /EquipmentName
func ListEquipmentName(c *gin.Context) {
	var equipmentName []entity.EquipmentName
	if err := entity.DB().Raw("SELECT * FROM equipment_names").Scan(&equipmentName).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": equipmentName})
}
