package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET /OpenandCloseTime/:id
func GetOpenandCloseTime(c *gin.Context) {
	var oct entity.Oct
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM Oct WHERE id = ?", id).Scan(&oct).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": oct})
}

// GET /OpenandCloseTime
func ListOpenandCloseTime(c *gin.Context) {
	var oct []entity.Oct
	if err := entity.DB().Raw("SELECT * FROM Oct").Scan(&oct).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": oct})
}
