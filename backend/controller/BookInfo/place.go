package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /place
func CreatePlace(c *gin.Context) {
	var place entity.Place
	if err := c.ShouldBindJSON(&place); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&place).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": place})
}

// GET /place/:id
func GetPlace(c *gin.Context) {
	var place entity.Place
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM place WHERE id = ?", id).Scan(&place).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": place})
}

// List /place
func ListPlace(c *gin.Context) {
	var place []entity.Place
	if err := entity.DB().Raw("SELECT * FROM place").Scan(&place).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": place})
}

// DELETE /place/:id
func DeletePlace(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM place WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "place not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /place
func UpdatePlace(c *gin.Context) {
	var place entity.Place
	if err := c.ShouldBindJSON(&place); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", place.ID).First(&place); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "place not found"})
		return
	}

	if err := entity.DB().Save(&place).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": place})
}
