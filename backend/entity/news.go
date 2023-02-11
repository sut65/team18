package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
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
	govalidator.CustomTypeTagMap.Set("IsnotPast", func(i interface{}, context interface{}) bool {
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