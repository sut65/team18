package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)



// GET /PaymentMethod/:id
func GetPaymentMethod(c *gin.Context) {
	var method entity.PaymentMethod
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM payment_methods WHERE id = ?", id).Scan(&method).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": method})
}

// GET /PaymentMethod
func ListPaymentMethod(c *gin.Context) {
	var method []entity.PaymentMethod
	if err := entity.DB().Raw("SELECT * FROM payment_methods").Scan(&method).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": method})
}