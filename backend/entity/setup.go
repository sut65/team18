package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)
var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("Ambulance.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	database.AutoMigrate(
		//signin
		&User{},
		
		//employee system
		&Gender{},
		&Education{},
		&Role{},
		&Employee{},


	)
	db = database

	admin := Role{
		Name: "admin",
	}
	db.Model(&Role{}).Create(admin)
	trainer := Role{
		Name: "trainer",
	}
	db.Model(&Role{}).Create(&trainer)

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), bcrypt.DefaultCost)
	if err != nil {
		return
	}
	userAdmin := User{
		Name: "Admin",
		Password: string(password),
	}
	db.Model(&User{}).Create(&userAdmin)

	//ระบบพนักงาน
	male := Gender{
		Name: "ชาย",
	}
	db.Model(&Gender{}).Create(&male)
	female := Gender{
		Name: "หญิง",
	}
	db.Model(&Gender{}).Create(&female)
	baDg := Education{
		Level: "ปริญญาตรี",
	}
	db.Model(&Education{}).Create(&baDg)
	maDg := Education{
		Level: "ปริญญาโท",
	}
	db.Model(&Education{}).Create(&maDg)
	admin1em := Employee{
		Name: "Amin1em",
		Tel: "090000000",
		Email: "admin@email.com",
		DOB: time.Now(),
		Gender: male,
		Education: baDg,
		Role: admin,
		User: userAdmin,
	}
	db.Model(&Employee{}).Create(&admin1em)
	//ระบบตารางงาน
	//ระบบสมัครสมาชิก
	//ระบบแจ้งชำรุด
	//ระบบโปรแกรมออกกำลังกาย
	// worm up
	worm1 := WormUp{
		SetName:          "Set_AA",
		ExercisePoseture: "Scapula Retraction, Chin in",
	}
	db.Model(&WormUp{}).Create(&worm1)
	worm2 := WormUp{
		SetName:          "Set_AB",
		ExercisePoseture: "Wall Slide, Cat Camel",
	}
	db.Model(&WormUp{}).Create(&worm2)
	worm3 := WormUp{
		SetName:          "Set_AC",
		ExercisePoseture: "Chin In, Wall Slide",
	}
	db.Model(&WormUp{}).Create(&worm3)
	// exercise
	exer1 := Exercise{
		SetName:          "Set_BA",
		ExercisePoseture: "Cable Row, Dumpbell Press, Lat Pulldown",
	}
	db.Model(&Exercise{}).Create(&exer1)
	exer2 := Exercise{
		SetName:          "Set_BB",
		ExercisePoseture: "Cable Face Pull, DB Reverse Fly, Plank",
	}
	db.Model(&Exercise{}).Create(&exer2)
	exer3 := Exercise{
		SetName:          "Set_BC",
		ExercisePoseture: "Cable Row, DB Reverse Fly, Plank",
	}
	db.Model(&Exercise{}).Create(&exer3)
	// stratch
	stre1 := Stretch{
		SetName:          "Set_CA",
		ExercisePoseture: "Seated Erector Stretch, Neck Stretch",
	}
	db.Model(&Stretch{}).Create(&stre1)
	stre2 := Stretch{
		SetName:          "Set_CB",
		ExercisePoseture: "Front Delt Stretch, Lying Twist Chest Stretch",
	}
	db.Model(&Stretch{}).Create(&stre2)
	stre3 := Stretch{
		SetName:          "Set_CC",
		ExercisePoseture: "Levetor Stretch, Chest Wall Stretch",
	}
	db.Model(&Stretch{}).Create(&stre3)
	// Order
	exeprogram1 := ExerciseProgramList{
		ProgramName: "Program_A",
		Employee:    admin1em,
		WormUp:      worm1,
		Exercise:    exer1,
		Stretch:     stre1,
		Minute:      60,
	}
	db.Model(&ExerciseProgramList{}).Create(&exeprogram1)
	exeprogram2 := ExerciseProgramList{
		ProgramName: "Program_B",
		Employee:    admin1em,
		WormUp:      worm2,
		Exercise:    exer1,
		Stretch:     stre3,
		Minute:      90,
	}
	db.Model(&ExerciseProgramList{}).Create(&exeprogram2)
	//ระบบเทรนเนอร์
	//ระบบข้อมูลอุปกรณ์
	//ระบบจองอุปกรณ์
	//ระบบข้อมูลสถานที่
	//ระบบจองสถานที่
	//ระบบประชาสัมพันธ์
	//ระบบชำระเงิน
}