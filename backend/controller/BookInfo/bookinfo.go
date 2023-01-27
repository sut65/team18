package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

func GetBookInfo(c *gin.Context) {
	var bookinfo entity.BookInfolist
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM bookinfo WHERE id = ?", id).Scan(&bookinfo).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": bookinfo})
}