package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET /Ocd/:id
func GetOpenandCloseDay(c *gin.Context) {
	var ocd entity.Ocd
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM OpenandCloseDay WHERE id = ?", id).Scan(&ocd).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": ocd})
}

// GET /Ocd
func ListOpenandCloseDay(c *gin.Context) {
	var ocd []entity.Ocd
	if err := entity.DB().Raw("SELECT * FROM OpenandCloseDay").Scan(&ocd).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ocd})
}