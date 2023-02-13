package entity

import (
	"time"

	"gorm.io/gorm"
)

type Notify struct {
	gorm.Model
	Problem string
	Ddate    time.Time

	// EquipmentnameID ทำหน้าที่เป็น FK
	EquipmentNameID *uint
	EquipmentName   EquipmentName 

	// RunnumberID ทำหน้าที่เป็น FK
	RunNumberID *uint
	RunNumber   RunNumber 

	// MemberID ทำหน้าที่เป็น FK
	MemberID *uint
	Member   Member 
}
