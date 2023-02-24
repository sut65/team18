package controller

import (
	"net/http"

	"github.com/sut65/team18/entity"
	"github.com/gin-gonic/gin"
)
// POST /wormup
func CreateWormUp(c *gin.Context) {
	var WormUp entity.WormUp
	if err := c.ShouldBindJSON(&WormUp); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&WormUp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": WormUp})
}

// GET /wormup/:id
func GetWormUp(c *gin.Context) {
	var WormUp entity.WormUp
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM worm_ups WHERE id = ?", id).Scan(&WormUp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": WormUp})
}

// List /wormup
func ListWormUp(c *gin.Context) {
	var wormups []entity.WormUp
	if err := entity.DB().Raw("SELECT * FROM worm_ups").Scan(&wormups).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": wormups})
}

// DELETE /wormup/:id
func DeleteWormUp(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM worm_ups WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "WormUp not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /wormup
func UpdateWormUp(c *gin.Context) {
	var WormUp entity.WormUp
	if err := c.ShouldBindJSON(&WormUp); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", WormUp.ID).First(&WormUp); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type not found"})
		return
	}

	if err := entity.DB().Save(&WormUp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": WormUp})
}