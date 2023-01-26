package entity

import (
	"time"

	"gorm.io/gorm"
)

type EquipmentName struct {
	gorm.Model

	Name	string
	EquipmentList	[]EquipmentList	`gorm:"foreignKey:EquipmentNameID"`

}

type RunNumber struct{
	gorm.Model

	Number	string
	EquipmentList	[]EquipmentList `gorm:"foreignKey:RunNamberID"`

}

type EquipmentList struct{
	gorm.Model

	EmployeeID 		*uint
	Employee 		Employee

	EquipmentNameID	*uint
	EquipmentName	EquipmentName

	RunNumberID		*uint
	RunNumber		RunNumber

	dateTime 		time.Time
}

