package entity

import (
	"time"

	"gorm.io/gorm"
)

type EquipmentBookingList struct {
	gorm.Model

	EmployeeID *uint
	Employee   Employee `gorm:"references:ID"`

	EquipmentListID *uint
	EquipmentList   EquipmentList `gorm:"references:ID"`

	MemberID *uint `gorm:"references:ID"`
	Member   Member

	DateBooking time.Time
}
