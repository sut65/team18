package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET /Place/:id
func GetPlace(c *gin.Context) {
	var place entity.Place
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM place WHERE id = ?", id).Scan(&place).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": place})
}

// GET /Place
func ListPlace(c *gin.Context) {
	var place []entity.Place
	if err := entity.DB().Raw("SELECT * FROM Oct").Scan(&place).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": place})
}
