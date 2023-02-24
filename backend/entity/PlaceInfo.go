package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Service struct {
	gorm.Model
	TypeP string `gorm:"uniqueIndex"`

	PlaceInfolist []PlaceInfolist `gorm:"foreignKey:ServiceID"`
	BookInfolist  []BookInfolist  `gorm:"foreignKey:ServiceID"`
}

type Ocd struct {
	gorm.Model
	Days          string `gorm:"uniqueIndex"`
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
	Service    Service `gorm:"references:id" valid:"-"`
	OcdID      *uint
	Ocd        Ocd `gorm:"references:id" valid:"-"`
	OctID      *uint
	Oct        Oct `gorm:"references:id" valid:"-"`
	EmployeeID *uint
	Employee   Employee `gorm:"references:id" valid:"-"`
	Hours      int `valid:"range(0|12)~ชั่วโมงไม่เกิน 12"`
	Detail     string `valid:"required~กรุณากรอกDetail"`
	PDate      time.Time `valid:"notPast1min~วันที่ไม่เป็นอดีต"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("notFuture30min", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now().Add(time.Minute * 30))
	})

	govalidator.CustomTypeTagMap.Set("notPast1min", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().Add(time.Minute * -1))
	})

}


