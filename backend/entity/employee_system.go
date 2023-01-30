package entity

// Update Entity 26/01/2023
import (
	"time"

	"gorm.io/gorm"
)

type Education struct {
	gorm.Model
	Level string

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
	Name     string
	Tel      string
	Email    string
	Password string
	DOB      time.Time

	GenderID *uint
	Gender   Gender

	EducationID *uint
	Education   Education `gorm:"references:ID"`

	RoleID *uint
	Role   Role `gorm:"references:ID"`

	UserID *uint
	User   User

	News                 []News                 `gorm:"foreignKey:EmployeeID"`
	Schedule             []Schedule             `gorm:"foreignKey:EmployeeID"`
	TrainerBookingList   []TrainerBookingList   `gorm:"foreignKey:EmployeeID"`
	EquipmentBookingList []EquipmentBookingList `gorm:"foreignKey:EmployeeID"`
	PlaceInfolist        []PlaceInfolist        `gorm:"foreignKey:EmployeeID"`
}
