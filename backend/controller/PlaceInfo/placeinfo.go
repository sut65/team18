package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /PlaceInfo
func CreatePlaceInfoList(c *gin.Context) {

	var employee entity.Employee
	var service entity.Service
	var ocd entity.Ocd
	var oct entity.Oct
	var placeinfolist entity.PlaceInfolist

	// ผลลัพธ์ที่ได้จากขั้นตอนที่  จะถูก bind เข้าตัวแปร bookinfolist
	if err := c.ShouldBindJSON(&placeinfolist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", placeinfolist.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	// ค้นหา service ด้วย id
	if tx := entity.DB().Where("id = ?", placeinfolist.ServiceID).First(&service); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "service not found"})
		return
	}

	// ค้นหา ocd ด้วย id
	if tx := entity.DB().Where("id = ?", placeinfolist.OcdID).First(&ocd); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "openandclosedays not found"})
		return
	}
	// ค้นหา oct ด้วย id
	if tx := entity.DB().Where("id = ?", placeinfolist.OctID).First(&oct); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "openandclosetime not found"})
		return
	}
	// 12: สร้าง placeinfolist
	list := entity.PlaceInfolist{
		Employee: employee,             // โยงความสัมพันธ์กับ Entity Employee
		Service:  service,              // โยงความสัมพันธ์กับ Entity Service
		Ocd:      ocd,                  // โยงความสัมพันธ์กับ Entity Ocd
		Oct:      oct,                  // โยงความสัมพันธ์กับ Entity Oct
		Hours:    placeinfolist.Hours,  // ตั้งค่าฟิลด์ Hours
		Detail:   placeinfolist.Detail, // ตั้งค่าฟิลด์ Detail
	}

	// 13: บันทึก
	if err := entity.DB().Create(&list).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": list})
}

// GET /placeinfolist/:id
func GetPlaceInfoList(c *gin.Context) {
	var placeinfolist entity.PlaceInfolist
	id := c.Param("id")
	if err := entity.DB().Preload("Employee").Preload("Service").Preload("Openandcloseday").Preload("Openandclosetime").Raw("SELECT * FROM placeinfo_list WHERE id = ?", id).Find(&placeinfolist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": placeinfolist})
}

// LIST /placeinfolist
func ListPlaceInfoList(c *gin.Context) {
	var placeinfolist []entity.PlaceInfolist
	if err := entity.DB().Preload("Employee").Preload("Service").Preload("Openandcloseday").Preload("Openandclosetime").Raw("SELECT * FROM placeinfo_list").Find(&placeinfolist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": placeinfolist})
}

// DELETE /placeinfolist/:id
func DeletePlaceInfoList(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM placeinfo_list WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "list not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /explist
func UpdatePlaceInfoList(c *gin.Context) {
	var placeinfolist entity.PlaceInfolist
	if err := c.ShouldBindJSON(&placeinfolist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", placeinfolist.ID).First(&placeinfolist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "list not found"})
		return
	}

	if err := entity.DB().Save(&placeinfolist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": placeinfolist})
}
