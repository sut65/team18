package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)
//Get/PlaceInfo
func GetPlaceInfo(c *gin.Context) {
	var placeinfo entity.PlaceInfolist
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM placeinfo WHERE id = ?", id).Scan(&placeinfo).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": placeinfo})
}