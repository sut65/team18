package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET /runNumber/:id
func GetRunNumber(c *gin.Context) {
	var runNumber entity.RunNumber
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM runNumbers WHERE id = ?", id).Scan(&runNumber).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": runNumber})
}

// GET /runNumber
func ListRunNumber(c *gin.Context) {
	var runNumber []entity.RunNumber
	if err := entity.DB().Raw("SELECT * FROM runNumbers").Scan(&runNumber).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": runNumber})
}
