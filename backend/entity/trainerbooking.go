package entity

import (
	"time"

	"gorm.io/gorm"
)

type TrainerBookingList struct {
	gorm.Model
	EmployeeID *uint
	Employee   Employee

	MemberID *uint
	Member   Member

	ExerciseProgramListID *uint
	ExerciseProgramList   ExerciseProgramList

	Training_Time time.Time
}
