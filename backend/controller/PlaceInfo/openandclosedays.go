package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /openandclosedays
func CreateOpenandClosedays(c *gin.Context) {
	var ocd entity.Ocd
	if err := c.ShouldBindJSON(&ocd); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&ocd).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ocd})
}

// GET /openandclosedays/:id
func GetOpenandClosedays(c *gin.Context) {
	var ocd entity.Ocd
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM openandclosedays WHERE id = ?", id).Scan(&ocd).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ocd})
}

// List /openandclosedays
func ListOpenandClosedays(c *gin.Context) {
	var ocd []entity.Ocd
	if err := entity.DB().Raw("SELECT * FROM openandclosedays").Scan(&ocd).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ocd})
}

// DELETE /openandclosedays/:id
func DeleteOpenandClosedays(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM openandclosedays WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "openandclosedays not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /openandclosedays
func UpdateOpenandclosedays(c *gin.Context) {
	var ocd entity.Ocd
	if err := c.ShouldBindJSON(&ocd); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", ocd.ID).First(&ocd); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "openandclosedays not found"})
		return
	}

	if err := entity.DB().Save(&ocd).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ocd})
}