package controller

import (
	"fmt"

	"github.com/asaskevich/govalidator"
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
		BDate: bookinfolist.BDate,
		Tel: bookinfolist.Tel,
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

// GET /bookinfolist/:id
func GetBookInfoList(c *gin.Context) {
	var bookinfolist entity.BookInfolist
	id := c.Param("id")
	if err := entity.DB().Preload("Member").Preload("Service").Preload("Place").Preload("TimePeriod").Raw("SELECT * FROM book_infolists WHERE id = ?", id).Find(&bookinfolist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookinfolist})
}

func GetBookInfobyMB(c *gin.Context) {
	var notify []entity.BookInfolist
	id := c.Param("id")
	if err := entity.DB().Preload("Member").Preload("Service").Preload("Place").Preload("TimePeriod").Raw("SELECT * FROM book_infolists WHERE member_id = ?", id).Find(&notify).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": notify})
}

// LIST /bookinfolist
func ListBookInfoList(c *gin.Context) {
	var bookinfolist []entity.BookInfolist
	if err := entity.DB().Preload("Member").Preload("Service").Preload("Place").Preload("TimePeriod").Raw("SELECT * FROM book_infolists").Find(&bookinfolist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bookinfolist})
}

func DeleteBookInfoByID(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM book_infolists WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "list not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// DELETE /bookinfolist/:id
func DeleteBookInfoList(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM book_infolists WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "list not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /bookinfolist
func UpdateBookInfoList(c *gin.Context) {
	var bookinfolist entity.BookInfolist
	var newbookinfolists entity.BookInfolist
	var member entity.Member
	var service entity.Service
	var place entity.Place
	var timeperiod entity.TimePeriod
	if err := c.ShouldBindJSON(&newbookinfolists); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if _, err := govalidator.ValidateStruct(&newbookinfolists); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	if tx := entity.DB().Where("id = ?", newbookinfolists.ID).First(&bookinfolist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "BookInfo not found"})
		return
	}

	// ค้นหา member ด้วย id
	if newbookinfolists.MemberID != nil {
		if tx := entity.DB().Where("id = ?", newbookinfolists.MemberID).First(&member); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
			return
		}
		fmt.Print("NOT NULL")
		newbookinfolists.Member = member
	} else {
		if tx := entity.DB().Where("id = ?", newbookinfolists.MemberID).First(&member); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "not found member"})
			return
		}
		fmt.Print("NULL")
		newbookinfolists.Member = member
	}

	// ค้นหา service ด้วย id
	if newbookinfolists.ServiceID != nil {
		if tx := entity.DB().Where("id = ?", newbookinfolists.ServiceID).First(&service); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "service not found"})
			return
		}
		newbookinfolists.Service = service
	} else {
		if tx := entity.DB().Where("id = ?", newbookinfolists.ServiceID).First(&service); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "service not found"})
			return
		}
		newbookinfolists.Service = service
	}

	// ค้นหา place ด้วย id
	if newbookinfolists.PlaceID != nil {
		if tx := entity.DB().Where("id = ?", newbookinfolists.PlaceID).First(&place); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "place not found"})
			return
		}
		newbookinfolists.Place = place
	} else {
		if tx := entity.DB().Where("id = ?", newbookinfolists.PlaceID).First(&place); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "place not found"})
			return
		}
		newbookinfolists.Place = place
	}
	// ค้นหา timeperiod ด้วย id
	if newbookinfolists.TimePeriodID != nil {
		if tx := entity.DB().Where("id = ?", newbookinfolists.TimePeriodID).First(&timeperiod); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "timeperiod not found"})
			return
		}
		newbookinfolists.TimePeriod = timeperiod
	} else {
		if tx := entity.DB().Where("id = ?", newbookinfolists.TimePeriodID).First(&timeperiod); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "timeperiod not found"})
			return
		}
		newbookinfolists.TimePeriod = timeperiod
	}
	newbookinfolists.BDate = bookinfolist.BDate
	newbookinfolists.Tel = bookinfolist.Tel
	
	

	// ขั้นตอนการ validate
	if err := entity.DB().Save(&newbookinfolists).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newbookinfolists})
}

