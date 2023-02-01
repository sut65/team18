package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET /Service/:id
func GetService(c *gin.Context) {
	var service entity.Service
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM place WHERE id = ?", id).Scan(&service).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": service})
}

// GET /Place
func ListService(c *gin.Context) {
	var service []entity.Service
	if err := entity.DB().Raw("SELECT * FROM service").Scan(&service).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": service})
}
