package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Notify struct {
	gorm.Model
	Problem string    `valid:"required~กรุณาระบุปัญหา"`
	Ddate   time.Time `valid:"DelayNow3Min~วันที่ไม่ถูกต้อง"` //เซ็ตเวลาปัจจุบัน ห้ามอดีต ห้ามอนาคต

	// EquipmentnameID ทำหน้าที่เป็น FK
	EquipmentNameID *uint
	EquipmentName   EquipmentName `gorm:"references:id" valid:"-"`

	// RunnumberID ทำหน้าที่เป็น FK
	RunNumberID *uint
	RunNumber   RunNumber `gorm:"references:id" valid:"-"`

	// MemberID ทำหน้าที่เป็น FK
	MemberID *uint
	Member   Member `gorm:"references:id" valid:"-"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("DelayNow3Min", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		a := t.After(time.Now().Add(-3 * time.Minute))
		b := t.Before(time.Now().Add(+3 * time.Minute))
		sts := a && b
		println(a)
		println(b)
		return sts
	})
}
