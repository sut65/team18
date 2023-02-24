package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /openandclosetime
func CreateOpenandClosetime(c *gin.Context) {
	var oct entity.Oct
	if err := c.ShouldBindJSON(&oct); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&oct).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": oct})
}

// GET /openandclosetime/:id
func GetOpenandClosetime(c *gin.Context) {
	var oct entity.Oct
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM octs WHERE id = ?", id).Scan(&oct).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": oct})
}

// List /openandclosetime
func ListOpenandClosetime(c *gin.Context) {
	var oct []entity.Oct
	if err := entity.DB().Raw("SELECT * FROM octs").Scan(&oct).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": oct})
}

// DELETE /openandclosetime/:id
func DeleteOpenandClosetime(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM octs WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "openandclosetime not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /openandclosetime
func UpdateOpenandClosetime(c *gin.Context) {
	var oct entity.Oct
	if err := c.ShouldBindJSON(&oct); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", oct.ID).First(&oct); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "openandclosetime not found"})
		return
	}

	if err := entity.DB().Save(&oct).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": oct})
}
