package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
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
	Bill            Bill    `gorm:"references:id" valid:"-"`
	PaymentMethodID *uint   
	PaymentMethod   PaymentMethod  `gorm:"references:id" valid:"-"`
	PayeeID         *uint   
	Payee           Payee   `gorm:"references:id" valid:"-"`

	PayDate         time.Time  `valid:"DelayNow2Min~วันที่และเวลาไม่ถูกต้อง"`
	Note            string    `valid:"stringlength(0|50)~ขนาดข้อความมีความยาวเกินไป ควรมีความยาวไม่เกิน 50 พยางค์"`
	
}

func init() {
	
	govalidator.CustomTypeTagMap.Set("DelayNow2Min", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		a := t.After(time.Now().Add(-2 * time.Minute))
		b := t.Before(time.Now().Add(+2 * time.Minute))
		sts := a && b
		println(a)
		println(b)
		return sts
	})
}


