package entity

// Update Entity 26/01/2023
import (
	"time"

	"gorm.io/gorm"
)

type Education struct {
	gorm.Model
	Education string

	Employee []Employee `gorm:"foreignKey:EducationID"`
}
type Role struct {
	gorm.Model
	Name string

	Employee []Employee `gorm:"foreignKey:RoleID"`
	Member   []Member   `gorm:"foreignKey:RoleID"`
	Schedule []Schedule `gorm:"foreignKey:RoleID"`
}
type Employee struct {
	gorm.Model
	Name     string `valid:"required~กรุณากรอกชื่อ-นามสกุล"`
	Tel      string `valid:"matches(^\\d{10}$)~Tel does not validate as matches(^\\d{10}$), required~กรุณากรอกเบอร์โทร"`
	Email    string `gorm:"uniqueIndex" valid:"email, required~Email: กรุณากรอกอีเมล"`
	Password string `valid:"minstringlength(6)~Password ต้องมีอย่างน้อย6ตัว, required~กรุณากรอกPassword"`
	DOB      time.Time 

	GenderID *uint
	Gender   Gender `gorm:"references:id" valid:"-"`

	EducationID *uint
	Education   Education `gorm:"references:id" valid:"-"`

	RoleID *uint
	Role   Role `gorm:"references:id" valid:"-"`

	UserID *uint
	User   User `gorm:"references:id" valid:"-"`

	News                 []News                 `gorm:"foreignKey:EmployeeID"`
	Schedule             []Schedule             `gorm:"foreignKey:EmployeeID"`
	TrainerBookingList   []TrainerBookingList   `gorm:"foreignKey:EmployeeID"`
	EquipmentBookingList []EquipmentBookingList `gorm:"foreignKey:EmployeeID"`
	PlaceInfolist        []PlaceInfolist        `gorm:"foreignKey:EmployeeID"`
}
