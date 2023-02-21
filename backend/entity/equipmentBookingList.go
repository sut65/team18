package entity

import (
	"time"

	"gorm.io/gorm"
)

type EquipmentBookingList struct {
	gorm.Model

	PlaceID *uint
	Place	Place

	EquipmentListID *uint
	EquipmentList   EquipmentList 

	MemberID *uint
	Member   Member 

	DateBooking time.Time
}
