package entity

import (
	"time"

	"gorm.io/gorm"
)

type Typem struct {
	gorm.Model
	Ttype string `gorm:"uniqueIndex"`
	Tpay  int
	// 1  Ttype เป็น Member ได้หลายครั้ง
	Member []Member `gorm:"foreignKey:TypemID"`
}

type Evidence struct {
	gorm.Model
	Etype string `gorm:"uniqueIndex"`
	// 1 evidence เป็น Member ได้หลายครั้ง
	Member []Member `gorm:"foreignKey:EvidenceID"`
}

type Gender struct {
	gorm.Model
	Gtype string `gorm:"uniqueIndex"`
	// 1 gender เป็น Member ได้หลายครั้ง
	Member   []Member   `gorm:"foreignKey:GenderID"`
	Employee []Employee `gorm:"foreignKey:GenderID"`
}
type Member struct {
	gorm.Model
	Name     string
	Email    string `gorm:"uniqueIndex"`
	Password string
	Bdate    time.Time
	Age      int
	// TypemID ทำหน้าที่เป็น FK
	TypemID *uint
	Typem   Typem 

	// EvidencetID ทำหน้าที่เป็น FK
	EvidenceID *uint
	Evidence   Evidence 

	// GenderID ทำหน้าที่เป็น FK
	GenderID *uint
	Gender   Gender 

	RoleID *uint
	Role   Role

	UserID *uint
	User   User

	Notify               []Notify               `gorm:"foreignKey:MemberID"`
	Bill                 []Bill                 `gorm:"foreignKey:MemberID"`
	TrainerBookingList   []TrainerBookingList   `gorm:"foreignKey:MemberID"`
	EquipmentBookingList []EquipmentBookingList `gorm:"foreignKey:MemberID"`
	BookInfolist         []BookInfolist         `gorm:"foreignKey:MemberID"`
}
