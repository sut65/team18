package entity

// Update Entity 26/01/2023
import (
	"time"

	"gorm.io/gorm"
)

type Duty struct {
	gorm.Model
	Name string

	Schedule []Schedule `gorm:"foreignKey:DutyID"`
}

type Time struct {
	gorm.Model
	Range string

	Schedule []Schedule `gorm:"foreignKey:TimeID"`
}

type Schedule struct {
	gorm.Model

	//ใส่ใน struct ของคนอื่น <-- ทำแล้ว
	EmployeeID 	*uint
	Employee	Employee 

	//ใส่ใน struct ของคนอื่น <-- ทำแล้ว
	RoleID 	*uint
	Role	Role 

	//DutyID ทำหน้าที่เป็น FK
	DutyID 	*uint
	Duty	Duty `gorm:"reference:ID"`

	//ใส่ใน struct ของคนอื่น <-- ทำแล้ว
	OcdID 	*uint
	Ocd		Ocd 

	TimeID 	*uint
	Time 	Time `gorm:"reference:ID"`

	//ใส่ใน struct ของคนอื่น <-- ทำแล้ว
	PlaceInfolistID *uint
	PlaceInfolist	PlaceInfolist 

	Record_Time time.Time
}