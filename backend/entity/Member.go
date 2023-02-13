package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
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
	Name     string `gorm:"uniqueIndex" valid:"required~กรุณากรอกชื่อ-นามสกุล"`
	Email    string `gorm:"uniqueIndex" valid:"email, required~Email: กรุณากรอกอีเมล"`
	Password string `valid:"minstringlength(6)~Passwordต้องมีอย่างน้อย6ตัว, required~กรุณากรอกPassword"`
	Bdate    time.Time
	Age      int `valid:"range(15|100)~อายุไม่ต่ำกว่า 15"`
	// TypemID ทำหน้าที่เป็น FK
	TypemID *uint
	Typem   Typem `gorm:"references:id" valid:"-"`

	// EvidencetID ทำหน้าที่เป็น FK
	EvidenceID *uint
	Evidence   Evidence `gorm:"references:id" valid:"-"`

	// GenderID ทำหน้าที่เป็น FK
	GenderID *uint
	Gender   Gender `gorm:"references:id" valid:"-"`

	RoleID *uint
	Role   Role `gorm:"references:id" valid:"-"`

	UserID *uint
	User   User `gorm:"references:id" valid:"-"`

	Notify               []Notify               `gorm:"foreignKey:MemberID"`
	Bill                 []Bill                 `gorm:"foreignKey:MemberID"`
	TrainerBookingList   []TrainerBookingList   `gorm:"foreignKey:MemberID"`
	EquipmentBookingList []EquipmentBookingList `gorm:"foreignKey:MemberID"`
	BookInfolist         []BookInfolist         `gorm:"foreignKey:MemberID"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("IsPast", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now().AddDate(-15, 0, 0))
	})

}
