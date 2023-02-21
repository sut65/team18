package entity

import (
	"time"

	"gorm.io/gorm"
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
	DateTime	time.Time	

	EquipmentBookingList []EquipmentBookingList `gorm:"foreignKey:EquipmentListID"`
	
}

