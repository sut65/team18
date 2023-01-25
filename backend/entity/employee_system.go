package entity

import (
	"time"

	"gorm.io/gorm"
)
type Education struct{
	gorm.Model
	Level string

	Employee []Employee `gorm:"foreignKey:EducationID"`
}
type Role struct{
	gorm.Model
	Name string

	Employee []Employee `gorm:"foreignKey:RoleID"`
}
type Employee struct{
	gorm.Model
	Name string
	Tel string
	Email string
	DOB time.Time

	GenderID *uint
	Gender Gender

	EducationID *uint
	Education Education

	RoleID *uint
	Role Role

	UserID *uint
	User User
	
}