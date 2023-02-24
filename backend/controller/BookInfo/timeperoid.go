package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)


// POST /timeperiod
func CreateTimeperiod(c *gin.Context) {
	var timeperiod entity.TimePeriod
	if err := c.ShouldBindJSON(&timeperiod); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&timeperiod).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": timeperiod})
}

// GET /timeperiod/:id
func GetTimeperiod(c *gin.Context) {
	var timeperiod entity.TimePeriod
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM time_periods WHERE id = ?", id).Scan(&timeperiod).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": timeperiod})
}

// List /timeperiod
func ListTimeperiod(c *gin.Context) {
	var timeperiod []entity.TimePeriod
	if err := entity.DB().Raw("SELECT * FROM time_periods").Scan(&timeperiod).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": timeperiod})
}

// DELETE /timeperiod/:id
func DeleteTimeperiod(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM time_periods WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "timeperiod not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /timeperiod
func UpdateTimeperiod(c *gin.Context) {
	var timeperiod entity.TimePeriod
	if err := c.ShouldBindJSON(&timeperiod); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", timeperiod.ID).First(&timeperiod); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "timeperiod not found"})
		return
	}

	if err := entity.DB().Save(&timeperiod).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": timeperiod})
}
