package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type EquipmentName struct {
	gorm.Model

	Name          string
	EquipmentList []EquipmentList `gorm:"foreignKey:EquipmentNameID"`
	Notify        []Notify        `gorm:"foreignKey:EquipmentNameID"`
}

type RunNumber struct {
	gorm.Model

	Number        string
	EquipmentList []EquipmentList `gorm:"foreignKey:RunNumberID"`
	Notify        []Notify        `gorm:"foreignKey:RunNumberID"`
}

type EquipmentList struct {
	gorm.Model

	Detail 	string	`valid:"required~Detail cannot be blank"`
	
	EmployeeID *uint	
	Employee   Employee 	`gorm:"references:id" valid:"-"`

	EquipmentNameID *uint
	EquipmentName   EquipmentName 	`gorm:"references:id" valid:"-"`

	RunNumberID *uint
	RunNumber   RunNumber	`gorm:"references:id" valid:"-"`
	DateTime	time.Time	`valid:"DelayNow3Min~วันที่และเวลาไม่ถูกต้อง"`

	EquipmentBookingList []EquipmentBookingList `gorm:"foreignKey:EquipmentListID"`
	
}
func init() {
	govalidator.CustomTypeTagMap.Set("IsFuture", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("IsPresent", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().AddDate(0, 0, -1)) && t.Before(time.Now().AddDate(0, 0, 1))
	})

	govalidator.CustomTypeTagMap.Set("IsPast", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})
	govalidator.CustomTypeTagMap.Set("IsnotPast", func(i interface{}, o interface{}) bool {
		t := i.(time.Time)
		// ย้อนหลังไม่เกิน 1 วัน
		return t.After(time.Now().AddDate(0, 0, -1))
	})
	govalidator.CustomTypeTagMap.Set("DelayNow3Min", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		a := t.After(time.Now().Add(-5 * time.Minute))
		b := t.Before(time.Now().Add(+5 * time.Minute))
		sts := a && b
		println(a)
		println(b)
		return sts
	})
}