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
	Headline    string     `valid:"required~กรุณากรอกหัวข้อข่าวสาร, stringlength(0|100)~หัวข้อพาดข่าวมีความยาวเกินไป"`
	Body        string
	SDate       time.Time  `valid:"required~กรุณาเลือกวันที่ให้ครบ"`
	DDate       time.Time  `valid:"IsFuture~วันที่ยกเลิกแสดงควรเป็นอนาคต, required~กรุณาเลือกวันที่ให้ครบ"`
	RecipientID *uint      
	Recipient   Recipient  `gorm:"references:id" valid:"-"`
	NewsTypeID  *uint      
	NewsType    NewsType   `gorm:"references:id" valid:"-"`
	EmployeeID  *uint      
	Employee    Employee   `gorm:"references:id" valid:"-"`
}


func init() {
	
	govalidator.CustomTypeTagMap.Set("IsFuture", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().AddDate(0, 0, 1))
	})
	
}