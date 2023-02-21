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
	EmployeeID *uint
	Employee   Employee `gorm:"references:id" valid:"-"`

	//ใส่ใน struct ของคนอื่น <-- ทำแล้ว
	RoleID *uint
	Role   Role `gorm:"references:id" valid:"-"`

	//DutyID ทำหน้าที่เป็น FK
	DutyID *uint
	Duty   Duty  `gorm:"references:id" valid:"-"`

	//ใส่ใน struct ของคนอื่น <-- ทำแล้ว
	OcdID *uint
	Ocd   Ocd `gorm:"references:id" valid:"-"`

	TimeID *uint
	Time   Time  `gorm:"references:id" valid:"-"`

	//ใส่ใน struct ของคนอื่น <-- ทำแล้ว
	PlaceID  *uint
	Place  Place  `gorm:"references:id" valid:"-"`

	Record_Time time.Time
}
