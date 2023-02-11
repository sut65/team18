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
	BillID          *uint  `valid:"-"`
	Bill            Bill 
	PaymentMethodID *uint   `valid:"-"`
	PaymentMethod   PaymentMethod 
	PayeeID         *uint   `valid:"-"`
	Payee           Payee 

	PayDate         time.Time  `valid:"DelayNow3Min~วันที่และเวลาไม่ถูกต้อง"`
	Note            string    `valid:"stringlength(0|50)~ขนาดข้อความมีความยาวเกินไป ควรมีความยาวไม่เกิน 50 พยางค์"`
	
}

func init() {
	govalidator.CustomTypeTagMap.Set("IsFuture", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("IsPresent", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().AddDate(0, 0, -1)) && t.Before(time.Now().AddDate(0, 0, 1))
	})

	govalidator.CustomTypeTagMap.Set("IsPast", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})
	govalidator.CustomTypeTagMap.Set("IsnotPast", func(i interface{}, o interface{}) bool {
		t := i.(time.Time)
		// ย้อนหลังไม่เกิน 1 วัน
		return t.After(time.Now().AddDate(0, 0, -1))
	})
	govalidator.CustomTypeTagMap.Set("DelayNow3Min", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		a := t.After(time.Now().Add(-5 * time.Minute))
		b := t.Before(time.Now().Add(+5 * time.Minute))
		sts := a && b
		println(a)
		println(b)
		return sts
	})
}


