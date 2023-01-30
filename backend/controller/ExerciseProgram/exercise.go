package controller

import (
	"net/http"

	"github.com/sut65/team18/entity"
	"github.com/gin-gonic/gin"
)
// POST /exercise
func CreateExercise(c *gin.Context) {
	var Exercise entity.Exercise
	if err := c.ShouldBindJSON(&Exercise); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&Exercise).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Exercise})
}

// GET /exercise/:id
func GetExercise(c *gin.Context) {
	var Exercise entity.Exercise
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM exercise WHERE id = ?", id).Scan(&Exercise).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Exercise})
}

// List /exercise
func ListExercise(c *gin.Context) {
	var Exercise []entity.Exercise
	if err := entity.DB().Raw("SELECT * FROM exercise").Scan(&Exercise).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Exercise})
}

// DELETE /exercise/:id
func DeleteExercise(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM exercise WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Exercise not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /exercise
func UpdateExercise(c *gin.Context) {
	var Exercise entity.Exercise
	if err := c.ShouldBindJSON(&Exercise); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Exercise.ID).First(&Exercise); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type not found"})
		return
	}

	if err := entity.DB().Save(&Exercise).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Exercise})
}