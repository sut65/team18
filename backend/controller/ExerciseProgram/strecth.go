package controller

import (
	"net/http"

	"github.com/sut65/team18/entity"
	"github.com/gin-gonic/gin"
)
// POST /stretch
func CreateStretch(c *gin.Context) {
	var Stretch entity.Stretch
	if err := c.ShouldBindJSON(&Stretch); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&Stretch).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Stretch})
}

// GET /stretch/:id
func GetStretch(c *gin.Context) {
	var Stretch entity.Stretch
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM stretch WHERE id = ?", id).Scan(&Stretch).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Stretch})
}

// List /stretch
func ListStretch(c *gin.Context) {
	var Stretch []entity.Stretch
	if err := entity.DB().Raw("SELECT * FROM stretch").Scan(&Stretch).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Stretch})
}

// DELETE /stretch/:id
func DeleteStretch(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM stretch WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Stretch not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /stretch
func UpdateStretch(c *gin.Context) {
	var Stretch entity.Stretch
	if err := c.ShouldBindJSON(&Stretch); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Stretch.ID).First(&Stretch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type not found"})
		return
	}

	if err := entity.DB().Save(&Stretch).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Stretch})
}