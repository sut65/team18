package entity
import (
	"gorm.io/gorm"
)
type User struct {
	gorm.Model
	Name		string
	Password	string

	Employee []Employee `gorm:"foreignKey:UserID"`
	// Member []Member `gorm:"foreignKey:UserID"`
}