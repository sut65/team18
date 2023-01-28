package entity

import (
	"time"

	"gorm.io/gorm"
)

type Status struct {
	gorm.Model
	Type string
	Bill []Bill `gorm:"foreignKey:StatusID"`
}

type Bill struct {
	gorm.Model
	MemberID  *uint
	Member    Member
	StatusID  *uint
	Status    Status
	PayableAM int
	Payment   []Payment `gorm:"foreignKey:BillID"`
}

type PaymentMethod struct {
	gorm.Model
	Method  string
	Payment []Payment `gorm:"foreignKey:PaymentMethodID"`
}

type Payee struct {
	gorm.Model
	AccountNo   string
	AccountName string
	Bank        string
	Payment     []Payment `gorm:"foreignKey:PayeeID"`
}

type Payment struct {
	gorm.Model
	BillID          *uint
	Bill            Bill
	PaymentMethodID *uint
	PaymentMethod   PaymentMethod
	PayeeID         *uint
	Payee           Payee
	PayDate         time.Time
}
