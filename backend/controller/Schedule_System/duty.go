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
	if err := entity.DB().Raw("SELECT * FROM dutys WHERE id = ?", id).Scan(&duty).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": duty})
}

// GET /dutys
func ListDutys(c *gin.Context) {
	var dutys []entity.Duty
	if err := entity.DB().Raw("SELECT * FROM dutys").Scan(&dutys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dutys})
}

// DELETE /dutys/:id
func DeleteDuty(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM dutys WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "duty not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /dutys
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
