package controller

import (
	"net/http"

	//"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"

	"github.com/sut65/team18/entity"
)

// POST /time
func CreateTime(c *gin.Context) {
	var time entity.Time
	if err := c.ShouldBindJSON(&time); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&time).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": time})
}

// GET /time/:id
func GetTime(c *gin.Context) {
	var time entity.Time
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM times WHERE id = ?", id).Scan(&time).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": time})
}

// GET /times
func ListTimes(c *gin.Context) {
	var times []entity.Time
	if err := entity.DB().Raw("SELECT * FROM times").Scan(&times).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": times})
}

// DELETE /times/:id
func DeleteTime(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM times WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "time not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /times
func UpdateTime(c *gin.Context) {
	var time entity.Time
	if err := c.ShouldBindJSON(&time); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", time.ID).First(&time); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "time not found"})
		return
	}

	if err := entity.DB().Save(&time).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": time})
}
