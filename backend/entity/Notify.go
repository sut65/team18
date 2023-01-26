package entity

import (
	"time"

	"gorm.io/gorm"
)

type Notify struct {
	gorm.Model
	Problem string
	Date    time.Time

	// EquipmentnameID ทำหน้าที่เป็น FK
	EquipmentNameID *uint
	EquipmentName   EquipmentName `gorm:"references:ID"`

	// RunnumberID ทำหน้าที่เป็น FK
	RunNumberID *uint
	RunNumber   RunNumber `gorm:"references:ID"`

	// MemberID ทำหน้าที่เป็น FK
	MemberID *uint
	Member   Member `gorm:"references:ID"`
}
