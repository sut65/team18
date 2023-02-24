package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"

	"github.com/sut65/team18/entity"
)

// POST /equipmentBookingList
func CreateEquipmentBookingList(c *gin.Context) {
	var locate entity.Place
	var equipmentList entity.EquipmentList
	var member entity.Member
	var equipmentBookingList entity.EquipmentBookingList

	if err := c.ShouldBindJSON(&equipmentBookingList); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", equipmentBookingList.EquipmentListID).First(&equipmentList); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Equipment list not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", equipmentBookingList.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", equipmentBookingList.PlaceID).First(&locate); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "locate not found"})
		return
	}
	// สร้าง ตารางequipmentList
	eb := entity.EquipmentBookingList{
		EquipmentList: equipmentList,
		Place:      locate,
		Member:        member,
		DateBooking: equipmentBookingList.DateBooking,
	}
	
	if _, err := govalidator.ValidateStruct(eb); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&eb).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": eb})

}

// GET /Equipmrnt Booking List/:id
func GetEquipmentBookingList(c *gin.Context) {
	var equipmentBookingList entity.EquipmentBookingList
	id := c.Param("id")
	if err := entity.DB().Preload("Member").Preload("EquipmentList").Preload("Place").
	Raw("SELECT * FROM equipment_booking_lists WHERE id = ?", id).
	Find(&equipmentBookingList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmentBookingList})
}

func GetEquipmentBookingShow(c *gin.Context) {
	var equipmentBookingList []entity.EquipmentBookingList
	id := c.Param("id")
	if err := entity.DB().Preload("Member").Preload("EquipmentList").Preload("Place").Raw("SELECT * FROM equipment_booking_lists WHERE member_id = ?", id).Find(&equipmentBookingList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmentBookingList})
}
func ListEquipmentBookingList(c *gin.Context) {
	var equipmentBookingList []entity.EquipmentBookingList
	if err := entity.DB().Preload("Member").Preload("EquipmentName").Preload("RunNumber").Raw("SELECT * FROM equipment_booking_lists ").Find(&equipmentBookingList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmentBookingList})
}

// function สำหรับลบ equipmentBookingList ด้วย ID
// DELETE /equipmentBookingList/:id
func DeleteEquipmentBookingList(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM equipment_booking_lists WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "equipment_booking_lists not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

func UpdateEquipmentBookingList(c *gin.Context) {
	var equipmentBookingList entity.EquipmentBookingList
	var newEquipmentBookingList entity.EquipmentBookingList

	if err := c.ShouldBindJSON(&newEquipmentBookingList); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", newEquipmentBookingList.ID).First(&equipmentBookingList); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "equipment_booking_lists not found"})
		return
	}

	var member entity.Member
	var equipmentList entity.EquipmentList
	var locate	entity.Place

	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", newEquipmentBookingList.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	// ค้นหา equipmentList ด้วย id
	if tx := entity.DB().Where("id = ?", newEquipmentBookingList.EquipmentListID).First(&equipmentList); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Equipment name not found"})
		return
	}

	// // ค้นหาplace ด้วย id
	if tx := entity.DB().Where("id = ?", newEquipmentBookingList.PlaceID).First(&locate); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Locate not found"})
		return
	}
	equipmentBookingList.Member = member
	equipmentBookingList.Place = locate
	equipmentBookingList.EquipmentList = equipmentList
	equipmentBookingList.DateBooking = newEquipmentBookingList.DateBooking

	if _, err := govalidator.ValidateStruct(equipmentBookingList); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&equipmentBookingList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": equipmentBookingList})
}
