package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)



// GET /PaymentMethod/:id
func GetNewsType(c *gin.Context) {
	var nt entity.NewsType
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM news_types WHERE id = ?", id).Scan(&nt).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": nt})
}

// GET /PaymentMethod
func ListNewsType(c *gin.Context) {
	var nt []entity.NewsType
	if err := entity.DB().Raw("SELECT * FROM news_types").Scan(&nt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": nt})
}