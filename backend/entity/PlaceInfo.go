package entity

import (
	"time"

	"gorm.io/gorm"
)

type Service struct {
	gorm.Model
	typeP string

	PlaceInfolist []PlaceInfolist `gorm:"foreignKey:PlaceID"`
}

type Ocd struct {
	gorm.Model
	days          string
	PlaceInfolist []PlaceInfolist `gorm:"foreignKey:OcdID"`
}

type Oct struct {
	gorm.Model
	times         string
	PlaceInfolist []PlaceInfolist `gorm:"foreignKey:OcdID"`
}

type PlaceInfolist struct {
	gorm.Model
	ServiceID *uint
	Service   Service
	OcdID   *uint
	Ocd     Ocd
	OctID   *uint
	Oct     Oct
	EmployeeID	*uint
	Employee	Employee
	hours   *uint
	Detail  string
	PDate	time.Time
}
