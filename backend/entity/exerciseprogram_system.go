package entity

import (
	"gorm.io/gorm"
)

type WormUp struct {
	gorm.Model
	SetName          string
	ExercisePoseture string

	ExerciseProgramList []ExerciseProgramList `gorm:"foreignKey:WormUpID"`
}
type Exercise struct {
	gorm.Model
	SetName          string
	ExercisePoseture string

	ExerciseProgramList []ExerciseProgramList `gorm:"foreignKey:ExerciseID"`
}
type Stretch struct {
	gorm.Model
	SetName          string
	ExercisePoseture string

	ExerciseProgramList []ExerciseProgramList `gorm:"foreignKey:StretchID"`
}
type ExerciseProgramList struct {
	gorm.Model
	ProgramName string
	EmployeeID  *uint
	Employee    Employee 
	WormUpID    *uint
	WormUp      WormUp 
	ExerciseID  *uint
	Exercise    Exercise 
	StretchID   *uint
	Stretch     Stretch 
	Minute      int

	TrainerBookingList []TrainerBookingList `gorm:"foreignKey:ExerciseProgramListID"`
}
