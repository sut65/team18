package entity

import (
	"time"

	"gorm.io/gorm"
)

type Service struct {
	gorm.Model
	TypeP string

	PlaceInfolist []PlaceInfolist `gorm:"foreignKey:ServiceID"`
	BookInfolist  []BookInfolist  `gorm:"foreignKey:ServiceID"`
}

type Ocd struct {
	gorm.Model
	Days          string
	PlaceInfolist []PlaceInfolist `gorm:"foreignKey:OcdID"`
	Schedule      []Schedule      `gorm:"foreignKey:OcdID"`
}

type Oct struct {
	gorm.Model
	Times         string
	PlaceInfolist []PlaceInfolist `gorm:"foreignKey:OcdID"`
}

type PlaceInfolist struct {
	gorm.Model
	ServiceID  *uint
	Service    Service 
	OcdID      *uint
	Ocd        Ocd 
	OctID      *uint
	Oct        Oct 
	EmployeeID *uint
	Employee   Employee 
	Hours      int
	Detail     string
	PDate      time.Time

	Schedule []Schedule `gorm:"foreignKey:PlaceInfolistID"`
}
