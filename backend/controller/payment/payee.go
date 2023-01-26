package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)



// GET /Payee/:id
func GetPayee(c *gin.Context) {
	var payee entity.Payee
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM payees WHERE id = ?", id).Scan(&payee).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": payee})
}

// GET /Payee
func ListPayee(c *gin.Context) {
	var payee []entity.Payee
	if err := entity.DB().Raw("SELECT * FROM payees").Scan(&payee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payee})
}