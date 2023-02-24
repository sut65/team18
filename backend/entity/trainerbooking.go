package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type TrainerBookingList struct {
	gorm.Model
	EmployeeID *uint
	Employee   Employee	`gorm:"references:id" valid:"-"`

	MemberID *uint
	Member   Member	`gorm:"references:id" valid:"-"`

	ExerciseProgramListID *uint
	ExerciseProgramList   ExerciseProgramList	`gorm:"references:id" valid:"-"`

	Training_Time time.Time	`valid:"required~กรุณากรอกเวลาที่ใช้เทรน, Before2Hours~กรุณาจองล่วงหน้า2ชม"`
}
func init() {
	
	govalidator.CustomTypeTagMap.Set("Before2Hours", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().Add(+2 *time.Hour))
	})
	
}