package entity

import (
	"time"

	"gorm.io/gorm"
)

type Recipient struct {
	gorm.Model
	Recipient string
	News      []News `gorm:"foreignKey:RecipientID"`
}

type NewsType struct {
	gorm.Model
	Type string
	News []News `gorm:"foreignKey:NewsTypeID"`
}

type News struct {
	gorm.Model
	Headline    string
	Body        string
	SDate       time.Time
	DDate       time.Time
	RecipientID *uint      `valid:"-"`
	Recipient   Recipient 
	NewsTypeID  *uint      `valid:"-"`
	NewsType    NewsType 
	EmployeeID  *uint      `valid:"-"`
	Employee    Employee
}
