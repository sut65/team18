package entity

import (
	"time"

	"gorm.io/gorm"
)

type EquipmentBookingList struct {
	gorm.Model

	EmployeeID *uint
	Employee   Employee 

	EquipmentListID *uint
	EquipmentList   EquipmentList 

	MemberID *uint
	Member   Member 

	DateBooking time.Time
}
