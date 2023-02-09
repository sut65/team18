package controller

import (
	"net/http"

	//"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"

	"github.com/sut65/team18/entity"
)

// POST /duty
func CreateDuty(c *gin.Context) {
	var duty entity.Duty
	if err := c.ShouldBindJSON(&duty); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&duty).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": duty})
}

// GET /duty/:id
func GetDuty(c *gin.Context) {
	var duty entity.Duty
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM duties WHERE id = ?", id).Scan(&duty).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": duty})
}

// GET /duties
func ListDuties(c *gin.Context) {
	var duties []entity.Duty
	if err := entity.DB().Raw("SELECT * FROM duties").Scan(&duties).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": duties})
}

// DELETE /duties/:id
func DeleteDuty(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM duties WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "duty not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /duties
func UpdateDuty(c *gin.Context) {
	var duty entity.Duty
	if err := c.ShouldBindJSON(&duty); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", duty.ID).First(&duty); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "duty not found"})
		return
	}

	if err := entity.DB().Save(&duty).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": duty})
}
