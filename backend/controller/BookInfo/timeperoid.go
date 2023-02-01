package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET /TimePeriod/:id
func GetTimePeriod(c *gin.Context) {
	var timep entity.TimePeriod
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM TimePeriod WHERE id = ?", id).Scan(&timep).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": timep})
}

// GET /TimePeriod
func ListTimePeriod(c *gin.Context) {
	var timep []entity.TimePeriod
	if err := entity.DB().Raw("SELECT * FROM TimePeriod").Scan(&timep).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": timep})
}
