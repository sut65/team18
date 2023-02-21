package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"

	"github.com/sut65/team18/entity"
)

// POST /equipmentBookingList
func CreateEquipmentBookingList(c *gin.Context) {
	// var place entity.Place
	var equipmentList entity.EquipmentList
	var member entity.Member
	var equipmentBookingList entity.EquipmentBookingList

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ x จะถูก bind เข้าตัวแปร member
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
	// if tx := entity.DB().Where("id = ?", equipmentBookingList.PlaceID).First(&place); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Place not found"})
	// 	return
	// }
	// สร้าง ตารางequipmentList
	eb := entity.EquipmentBookingList{
		EquipmentList: equipmentList,
		// Place:      place,
		Member:        member,
		DateBooking: equipmentBookingList.DateBooking,
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
	if err := entity.DB().Preload("Member").Preload("EquipmentList").Preload("Place").Raw("SELECT * FROM equipment_booking_lists WHERE = ?", id).Find(&equipmentBookingList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmentBookingList})
}

func GetEquipmentBookingShow(c *gin.Context) {
	var equipmentBookingLists []entity.EquipmentBookingList
	id := c.Param("id")
	if err := entity.DB().Preload("Member").Preload("EquipmentList").Preload("Place").Raw("SELECT * FROM equipment_booking_lists WHERE member_id = ?", id).Find(&equipmentBookingLists).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmentBookingLists})
}

func ListEquipmentBookingList(c *gin.Context) {
	var equipmentBookingList []entity.EquipmentBookingList
	if err := entity.DB().Preload("Member").Preload("EquipmentList").Raw("SELECT * FROM equipment_booking_lists").Find(&equipmentBookingList).Error; err != nil {
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

// PATCH /equipmentBookingList
func UpdateEquipmentBookingList(c *gin.Context) {
	var equipmentBookingList entity.EquipmentBookingList
	var newequipmentBookingList entity.EquipmentBookingList
	if err := c.ShouldBindJSON(&equipmentBookingList); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", equipmentBookingList.ID).First(&equipmentBookingList); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "equipment_booking_lists not found"})
		return
	}

	var member entity.Member
	var equipmentList entity.EquipmentList
	var place	entity.Place

	// ค้นหา member ด้วย id
	if tx := entity.DB().Where("id = ?", newequipmentBookingList.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "member not found"})
		return
	}

	// ค้นหา equipmentList ด้วย id
	if tx := entity.DB().Where("id = ?", newequipmentBookingList.EquipmentListID).First(&equipmentList); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Equipment name not found"})
		return
	}

	// ค้นหาplace ด้วย id
	if tx := entity.DB().Where("id = ?", newequipmentBookingList.PlaceID).First(&place); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Place not found"})
		return
	}
	equipmentBookingList.Member = member
	equipmentBookingList.Place = place
	equipmentBookingList.EquipmentList = equipmentList
	equipmentBookingList.DateBooking = newequipmentBookingList.DateBooking

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
