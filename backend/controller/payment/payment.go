package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

func GetPayment(c *gin.Context) {
	var payment entity.Payment
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM payments WHERE id = ?", id).Scan(&payment).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": payment})
}