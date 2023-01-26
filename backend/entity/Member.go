package entity

import (
	"time"

	"gorm.io/gorm"
)

type Typem struct {
	gorm.Model
	Ttype string
	Tpay  int
	// 1  Ttype เป็น Member ได้หลายครั้ง
	Member []Member `gorm:"foreignKey:TypemID"`
}

type Evidence struct {
	gorm.Model
	Etype string
	// 1 evidence เป็น Member ได้หลายครั้ง
	Member []Member `gorm:"foreignKey:EvidencetID"`
}

type Gender struct {
	gorm.Model
	Gtype string
	// 1 gender เป็น Member ได้หลายครั้ง
	Member   []Member   `gorm:"foreignKey:GenderID"`
	Employee []Employee `gorm:"foreignKey:GenderID"`
}
type Member struct {
	gorm.Model
	Name     string
	Email    string
	Password string
	Bdate    time.Time
	Age      int
	// TypemID ทำหน้าที่เป็น FK
	TypemID *uint
	Typem   Typem `gorm:"references:ID"`

	// EvidencetID ทำหน้าที่เป็น FK
	EvidenceID *uint
	Evidence   Evidence `gorm:"references:ID"`

	// GenderID ทำหน้าที่เป็น FK
	GenderID *uint
	Gender   Gender `gorm:"references:ID"`

	RoleID *uint
	Role   Role

	Notify []Notify `gorm:"foreignKey:MemberID"`
	Bill   []Bill   `gorm:"foreignKey:MemberID"`
}
