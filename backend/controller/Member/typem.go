package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET /Typem/:id
func GetTypem(c *gin.Context) {
	var typem entity.Typem
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM typems WHERE id = ?", id).Scan(&typem).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": typem})
}

// GET /Typem
func ListTypm(c *gin.Context) {
	var typem []entity.Typem
	if err := entity.DB().Raw("SELECT * FROM typems").Scan(&typem).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": typem})
}
