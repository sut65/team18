package entity

import (
	"time"

	"gorm.io/gorm"
)


type Place struct {
	gorm.Model
	locate	string
	PlaceInfolist []PlaceInfolist `gorm:"foreignKey:OcdID"`
}

type TimePeriod struct {
	gorm.Model
	period  string
	PlaceInfolist []PlaceInfolist `gorm:"foreignKey:OcdID"`
}

type BookInfolist struct {
	gorm.Model
	ServiceID	*uint
	Service		Service
	PlaceID		*uint
	Place		Place
	TimeID      *uint
	TimePeriod	TimePeriod
	MemberID	*uint
	Member	Member
	BDate	time.Time
}
