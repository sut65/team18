package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// GET /Evidence/:id
func GetEvidence(c *gin.Context) {
	var evidence entity.Evidence
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM evidences WHERE id = ?", id).Scan(&evidence).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": evidence})
}

// GET /Evidence
func ListEvidence(c *gin.Context) {
	var evidence []entity.Evidence
	if err := entity.DB().Raw("SELECT * FROM evidences").Scan(&evidence).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": evidence})
}
