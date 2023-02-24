package controller

import (
	"fmt"

	"github.com/asaskevich/govalidator"
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /placeinfolist
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
		PDate: placeinfolist.PDate,
	}

// ขั้นตอนการ validate
if _, err := govalidator.ValidateStruct(list); err != nil {
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	return
}

	// 13: บันทึก
	if err := entity.DB().Create(&list).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": list})
}

// GET /placeInfo/:id
func GetPlaceInfoList(c *gin.Context) {
	var placeinfolist entity.PlaceInfolist
	id := c.Param("id")
	if err := entity.DB().Preload("Employee").Preload("Service").Preload("Ocd").Preload("Oct").Raw("SELECT * FROM place_infolists WHERE id = ?", id).Find(&placeinfolist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": placeinfolist})
}

// LIST /placeInfo
func ListPlaceInfoList(c *gin.Context) {
	var placeinfolist []entity.PlaceInfolist
	if err := entity.DB().Preload("Employee").Preload("Service").Preload("Ocd").Preload("Oct").Raw("SELECT * FROM place_infolists").Find(&placeinfolist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": placeinfolist})
}

// DELETE /placeInfo/:id
func DeletePlaceInfoList(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM place_infolists WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "list not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /placeInfo
func UpdatePlaceInfoList(c *gin.Context) {
	var placeinfolist entity.PlaceInfolist
	var newplaceinfolists entity.PlaceInfolist
	var employee entity.Employee
	var service entity.Service
	var ocd entity.Ocd
	var oct entity.Oct
	if err := c.ShouldBindJSON(&newplaceinfolists); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if _, err := govalidator.ValidateStruct(&newplaceinfolists); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	if tx := entity.DB().Where("id = ?", newplaceinfolists.ID).First(&placeinfolist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PlaceInfo not found"})
		return
	}

	// ค้นหา employee ด้วย id
	if newplaceinfolists.EmployeeID != nil {
		if tx := entity.DB().Where("id = ?", newplaceinfolists.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "employees not found"})
			return
		}
		fmt.Print("NOT NULL")
		newplaceinfolists.Employee = employee
	} else {
		if tx := entity.DB().Where("id = ?", newplaceinfolists.EmployeeID).First(&employee); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found employee"})
			return
		}
		fmt.Print("NULL")
		newplaceinfolists.Employee = employee
	}

	// ค้นหา service ด้วย id
	if newplaceinfolists.ServiceID != nil {
		if tx := entity.DB().Where("id = ?", newplaceinfolists.ServiceID).First(&service); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "service not found"})
			return
		}
		newplaceinfolists.Service = service
	} else {
		if tx := entity.DB().Where("id = ?", newplaceinfolists.ServiceID).First(&service); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "service not found"})
			return
		}
		newplaceinfolists.Service = service
	}

	// ค้นหา ocd ด้วย id
	if newplaceinfolists.OcdID != nil {
		if tx := entity.DB().Where("id = ?", newplaceinfolists.OcdID).First(&ocd); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "openandclosedays not found"})
			return
		}
		newplaceinfolists.Ocd = ocd
	} else {
		if tx := entity.DB().Where("id = ?", newplaceinfolists.OcdID).First(&ocd); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "openandclosedays not found"})
			return
		}
		newplaceinfolists.Ocd = ocd
	}
	// ค้นหา oct ด้วย id
	if newplaceinfolists.OctID != nil {
		if tx := entity.DB().Where("id = ?", newplaceinfolists.OctID).First(&oct); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "openandclosetime not found"})
			return
		}
		newplaceinfolists.Oct = oct
	} else {
		if tx := entity.DB().Where("id = ?", newplaceinfolists.OctID).First(&oct); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "openandclosetime not found"})
			return
		}
		newplaceinfolists.Oct = oct
	}
	if newplaceinfolists.Hours == 0 {
	newplaceinfolists.Hours = placeinfolist.Hours
	}
	if newplaceinfolists.Detail == ""{
	newplaceinfolists.Detail = placeinfolist.Detail
	}
	newplaceinfolists.PDate = placeinfolist.PDate
	
	

	// ขั้นตอนการ validate
	if err := entity.DB().Save(&newplaceinfolists).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newplaceinfolists})
}
