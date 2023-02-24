package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Place struct {
	gorm.Model
	Locate       string         `gorm:"uniqueIndex"`
	BookInfolist []BookInfolist `gorm:"foreignKey:PlaceID"`
	Schedule     []Schedule     `gorm:"foreignKey:PlaceID"`
}

type TimePeriod struct {
	gorm.Model
	Period       string         `gorm:"uniqueIndex"`
	BookInfolist []BookInfolist `gorm:"foreignKey:TimePeriodID"`
}

type BookInfolist struct {
	gorm.Model
	ServiceID    *uint
	Service      Service `gorm:"references:id" valid:"-"`
	PlaceID      *uint
	Place        Place `gorm:"references:id" valid:"-"`
	TimePeriodID *uint
	TimePeriod   TimePeriod `gorm:"references:id" valid:"-"`
	MemberID     *uint
	Member       Member `gorm:"references:id" valid:"-"`
	Tel          string `valid:"matches(^\\d{10}$)~เบอร์โทรติดต่อไม่ถูกต้อง, required~กรุณากรอกเบอร์โทรติดต่อ"`
	BDate        time.Time `valid:"notPast100min~วันที่ไม่ถูกต้อง"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("notFuture30min", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now().Add(time.Minute * 30))
	})

	govalidator.CustomTypeTagMap.Set("notPast100min", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().Add(time.Minute * -1000))
	})

}
