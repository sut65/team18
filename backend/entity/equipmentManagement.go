package entity

import (
	"time"

	"gorm.io/gorm"
	"github.com/asaskevich/govalidator"
)

type EquipmentName struct {
	gorm.Model

	Name          string			`valid:"required~Equipment name cannot be blank"`
	EquipmentList []EquipmentList 	`gorm:"foreignKey:EquipmentNameID"`
	Notify        []Notify        	`gorm:"foreignKey:EquipmentNameID"`
}

type RunNumber struct {
	gorm.Model

	Number        string			`valid:"minstringlength(4)~RunNumberต้องมี4ตัว, required~กรุณากรอกRunNumber"`
	EquipmentList []EquipmentList 	`gorm:"foreignKey:RunNumberID"`
	Notify        []Notify        	`gorm:"foreignKey:RunNumberID"`
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
	DateTime	time.Time	`valid:"notFuture30min~DateTime must not be in the future,notPast30min~DateTime must not be in the past"`

	EquipmentBookingList []EquipmentBookingList `gorm:"foreignKey:EquipmentListID"`
	
}
func init() {
	govalidator.CustomTypeTagMap.Set("notFuture30min", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now().Add(time.Minute * 30))
	})

	govalidator.CustomTypeTagMap.Set("notPast30min", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().Add(time.Minute * -30))
	})
}

