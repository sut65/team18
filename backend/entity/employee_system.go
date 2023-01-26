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
}
type Employee struct {
	gorm.Model
	Name  string
	Tel   string
	Email string
	DOB   time.Time

	GenderID *uint
	Gender   Gender

	EducationID *uint
	Education   Education

	RoleID *uint
	Role   Role

	UserID *uint
	User   User

	News      []News `gorm:"foreignKey:EmployeeID"`
}
