package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /bookInfolist
func CreateBookInfoList(c *gin.Context) {

	var member entity.Member
	var service entity.Service
	var place entity.Place
	var timeperiod entity.TimePeriod
	var bookinfolist entity.BookInfolist

	// ผลลัพธ์ที่ได้จากขั้นตอนที่  จะถูก bind เข้าตัวแปร bookinfolist
	if err := c.ShouldBindJSON(&bookinfolist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", bookinfolist.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	// ค้นหา service ด้วย id
	if tx := entity.DB().Where("id = ?", bookinfolist.ServiceID).First(&service); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "service not found"})
		return
	}

	// ค้นหา place ด้วย id
	if tx := entity.DB().Where("id = ?", bookinfolist.PlaceID).First(&place); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "place not found"})
		return
	}
	// ค้นหา timeperiod ด้วย id
	if tx := entity.DB().Where("id = ?", bookinfolist.TimePeriodID).First(&timeperiod); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "timeperiod not found"})
		return
	}
	// 12: สร้าง bookinfolist
	list := entity.BookInfolist{
		Member:     member,     // โยงความสัมพันธ์กับ Entity Member
		Service:    service,    // โยงความสัมพันธ์กับ Entity Service
		Place:      place,      // โยงความสัมพันธ์กับ Entity Place
		TimePeriod: timeperiod, // โยงความสัมพันธ์กับ Entity TimePeriod

	}

	// 13: บันทึก
	if err := entity.DB().Create(&list).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": list})
}

// GET /bookinfolist/:id
func GetBookInfoList(c *gin.Context) {
	var bookinfolist entity.BookInfolist
	id := c.Param("id")
	if err := entity.DB().Preload("Member").Preload("Service").Preload("Place").Preload("Timeperiod").Raw("SELECT * FROM bookinfo_list WHERE id = ?", id).Find(&bookinfolist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookinfolist})
}

// LIST /bookinfolist
func ListBookInfoList(c *gin.Context) {
	var bookinfolist []entity.BookInfolist
	if err := entity.DB().Preload("Member").Preload("Service").Preload("Place").Preload("Timeperiod").Raw("SELECT * FROM bookinfo_list").Find(&bookinfolist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bookinfolist})
}

// DELETE /bookinfolist/:id
func DeleteBookInfoList(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM bookinfo_list WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "list not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /bookinfolist
func UpdateBookInfoList(c *gin.Context) {
	var bookinfolist entity.BookInfolist
	if err := c.ShouldBindJSON(&bookinfolist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", bookinfolist.ID).First(&bookinfolist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "list not found"})
		return
	}

	if err := entity.DB().Save(&bookinfolist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bookinfolist})
}
