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
	Headline string
	Body     string
	SDate    time.Time
	DDate    time.Time
	RecipientID *uint
	Recipient   Recipient
	NewsTypeID  *uint
	NewsType    NewsType
	EmployeeID *uint
	Employee Employee
}
