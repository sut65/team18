package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)



// GET /PaymentMethod/:id
func GetRecipient(c *gin.Context) {
	var recipient entity.Recipient
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM recipients WHERE id = ?", id).Scan(&recipient).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": recipient})
}

// GET /PaymentMethod
func ListRecipient(c *gin.Context) {
	var recipient []entity.Recipient
	if err := entity.DB().Raw("SELECT * FROM recipients").Scan(&recipient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": recipient})
}