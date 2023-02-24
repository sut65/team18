package entity

import (
	"gorm.io/gorm"
)

type WormUp struct {
	gorm.Model
	SetName          string `gorm:"uniqueIndex"`
	ExercisePoseture string

	ExerciseProgramList []ExerciseProgramList `gorm:"foreignKey:WormUpID"`
}
type Exercise struct {
	gorm.Model
	SetName          string `gorm:"uniqueIndex"`
	ExercisePoseture string

	ExerciseProgramList []ExerciseProgramList `gorm:"foreignKey:ExerciseID"`
}
type Stretch struct {
	gorm.Model
	SetName          string `gorm:"uniqueIndex"`
	ExercisePoseture string

	ExerciseProgramList []ExerciseProgramList `gorm:"foreignKey:StretchID"`
}
type ExerciseProgramList struct {
	gorm.Model
	ProgramName string	`gorm:"uniqueIndex" valid:"required~กรุณากรอกชื่อโปรแกรม"`
	EmployeeID  *uint	
	Employee    Employee `gorm:"references:id" valid:"-"`
	WormUpID    *uint	
	WormUp      WormUp `gorm:"references:id" valid:"-"`
	ExerciseID  *uint	
	Exercise    Exercise `gorm:"references:id" valid:"-"`
	StretchID   *uint	
	Stretch     Stretch `gorm:"references:id" valid:"-"`
	Minute      int	`valid:"range(30|360)~เวลาต้องอยู่ระหว่าง 30-360 นาที, required~กรุณากรอกเวลาที่ใช้"`

	TrainerBookingList []TrainerBookingList `gorm:"foreignKey:ExerciseProgramListID"`
}
