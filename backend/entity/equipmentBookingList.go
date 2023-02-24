package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type EquipmentBookingList struct {
	gorm.Model

	PlaceID *uint
	Place	Place	`gorm:"references:id" valid:"-"`

	EquipmentListID *uint
	EquipmentList   EquipmentList `gorm:"references:id" valid:"-"`

	MemberID *uint
	Member   Member `gorm:"references:id" valid:"-"`

	DateBooking time.Time	`valid:"notNow~DateBooking must not be in the now,notPast30min~DateBooking must not be in the past"`
}
func init() {
	govalidator.CustomTypeTagMap.Set("notPast30min", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().Add(time.Minute * -30))
	})
	govalidator.CustomTypeTagMap.Set("notNow", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Equal(time.Now())
	})
}
