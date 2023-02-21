package entity

import (
	"time"

	"gorm.io/gorm"
)

type Place struct {
	gorm.Model
	Locate       string
	BookInfolist []BookInfolist `gorm:"foreignKey:PlaceID"`
	Schedule 	 []Schedule `gorm:"foreignKey:PlaceID"`
	EquipmentBookingList []EquipmentBookingList `gorm:"foreignKey:PlaceID"`
}

type TimePeriod struct {
	gorm.Model
	Period       string
	BookInfolist []BookInfolist `gorm:"foreignKey:TimePeriodID"`
}

type BookInfolist struct {
	gorm.Model
	ServiceID  *uint
	Service    Service 
	PlaceID    *uint
	Place      Place 
	TimePeriodID     *uint
	TimePeriod TimePeriod 
	MemberID   *uint
	Member     Member 
	BDate      time.Time
}
