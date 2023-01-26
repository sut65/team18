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

		//Member system
		&Member{},
		&Typem{},
		&Evidence{},
		&Gender{},
        
		//News system
		&Recipient{},
		&NewsType{},
		&News{},

		//Payment system
		&Status{}, 
		&Bill{}, 
		&PaymentMethod{}, 
		&Payee{}, 
		&Payment{},
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
		Name:     "Admin",
		Password: string(password),
	}
	db.Model(&User{}).Create(&userAdmin)

	//ระบบพนักงาน

	//--gender--//
	Female := Gender{
		Gtype: "หญิง",
	}
	db.Model(&Gender{}).Create(&Female)

	Male := Gender{
		Gtype: "ชาย",
	}
	db.Model(&Gender{}).Create(&Male)
	
	baDg := Education{
		Level: "ปริญญาตรี",
	}
	db.Model(&Education{}).Create(&baDg)
	maDg := Education{
		Level: "ปริญญาโท",
	}
	db.Model(&Education{}).Create(&maDg)
	admin1em := Employee{
		Name:      "Amin1em",
		Tel:       "090000000",
		Email:     "admin@email.com",
		DOB:       time.Now(),
		Gender:    Male,
		Education: baDg,
		Role:      admin,
		User:      userAdmin,
	}
	db.Model(&Employee{}).Create(&admin1em)
	//ระบบตารางงาน

	//ระบบสมัครสมาชิก
	//--- ประเภทสมาชิก ---//
	Temporary := Typem{
		Ttype: "ชั่วคราว",
		Tpay:  500,
	}
	db.Model(&Typem{}).Create(&Temporary)

	Permanent := Typem{
		Ttype: "ถาวร",
		Tpay:  2999,
	}
	db.Model(&Typem{}).Create(&Permanent)

	//--- ชนิดหลักฐาน ---//
	Identification := Evidence{
		Etype: "บัตรประจำตัวประชาชน",
	}
	db.Model(&Evidence{}).Create(&Identification)

	Student := Evidence{
		Etype: "บัตรนักศึกษา",
	}
	db.Model(&Evidence{}).Create(&Student)

	Driving := Evidence{
		Etype: "ใบขับขี่",
	}
	db.Model(&Evidence{}).Create(&Driving)

	Document := Evidence{
		Etype: "สำเนาทะเบียนบ้าน",
	}
	db.Model(&Evidence{}).Create(&Document)


	//member data1
	db.Model(&Member{}).Create(&Member{
		Name:     "Somcai Jaidi",
		Email:    "Somcai@gmail.com",
		Password: "123456",
		Bdate:    time.Date(2001, 7, 11, 0, 0, 0, 0, time.Now().Location()),
		Age:      21,
		Gender:   Male,
		Evidence: Student,
		Typem:    Temporary,
	})
	//member data2
	db.Model(&Member{}).Create(&Member{
		Name:     "Baifern Pimdao",
		Email:    "Baifern@gmail.com",
		Password: "456789",
		Bdate:    time.Date(2001, 9, 24, 0, 0, 0, 0, time.Now().Location()),
		Age:      21,
		Gender:   Female,
		Evidence: Identification,
		Typem:    Temporary,
	})

	var Somcai Member
	var Baifern Member
	db.Raw("SELECT * FROM members WHERE email = ?", "Somcai@gmail.com").Scan(&Somcai)
	db.Raw("SELECT * FROM members WHERE email = ?", "Baifern@gmail.com").Scan(&Baifern)

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
	//-------- Recipient------
	everyone := Recipient{
		Recipient:    "Everyone",
	}
	db.Model(&Recipient{}).Create(&everyone)
	employ := Recipient{
		Recipient:    "Employee",
	}
	db.Model(&Recipient{}).Create(&employ)
	members := Recipient{
		Recipient:    "Member",
	}
	db.Model(&Recipient{}).Create(&members)
    //---------NewsType-------
	typeI := NewsType{
		Type:    "ทั่วไป",
	}
	db.Model(&NewsType{}).Create(&typeI)
	typeII := NewsType{
		Type:    "กีฬาและออกกำลังกาย",
	}
	db.Model(&NewsType{}).Create(&typeII)
	typeIII := NewsType{
		Type:    "สมาคม",
	}
	db.Model(&NewsType{}).Create(&typeIII)
	//----------News------
	news1 := News{
		Headline:   "แจ้งหยุดพนักงาน",
		Body:       "เนื่องจากเป็นวันสำคัญทางศาสนา จึงให้พนักงานหยุดระหว่างวันที่  2021-01-05 - 2021-01-06",
		SDate:      time.Date(2023, 1, 2, 10, 0, 0, 0, time.Now().Location()),
		DDate:      time.Date(2023, 1, 6, 10, 0, 0, 0, time.Now().Location()),
		Recipient:  employ,
		NewsType:   typeI,
        Employee:   admin1em,
	}
	db.Model(&News{}).Create(&news1)
	news2 := News{
		Headline:   "เลื่อนเวลาปิด",
		Body:       "แจ้งสมาชิกทุกวัน เนื่องจากมีการแพร่ระบาดโควิด ทางสถานกีฬาจะเลื่อนเวลาปิดเป็น 18.00 น.",
		SDate:      time.Date(2023, 3, 2, 10, 0, 0, 0, time.Now().Location()),
		DDate:      time.Date(2023, 5, 2, 10, 0, 0, 0, time.Now().Location()),
		Recipient:  members,
		NewsType:   typeI,
        Employee:   admin1em,
	}
	db.Model(&News{}).Create(&news2)
	news3 := News{
		Headline:   "แจ้งการปรับปรุงห้องน้ำสนามกีฬา",
		Body:       "มีการปรับปรุงห้องน้ำที่ 7 กรุณาใช้ห้องน้ำถัดไป",
		SDate:      time.Date(2023, 2, 3, 10, 0, 0, 0, time.Now().Location()),
		DDate:      time.Date(2023, 2, 10, 10, 0, 0, 0, time.Now().Location()),
		Recipient:  everyone,
		NewsType:   typeI,
        Employee:   admin1em,
	}
	db.Model(&News{}).Create(&news3)


	//ระบบชำระเงิน
	//----Status-----
	Status1 := Status{
		Type: "ชำระเรียบร้อย",
	}
	db.Model(&Status{}).Create(&Status1)
	Status2 := Status{
		Type: "ค้างชำระ",
	}
	db.Model(&Status{}).Create(&Status2)

	//----Bill-----
	Bill1 := Bill{
		Status: Status1,
		Member: Somcai,
	}
	db.Model(&Bill{}).Create(&Bill1)
	Bill2 := Bill{
		Status: Status1,
		Member: Baifern,
	}
	db.Model(&Bill{}).Create(&Bill2)
	Bill3 := Bill{
		Status: Status2,
		Member: Somcai,
	}
	db.Model(&Bill{}).Create(&Bill3)

	//----method
	Transfer := PaymentMethod{
		Method: "Transfer",
	}
	db.Model(&PaymentMethod{}).Create(&Transfer)
	PromptPay := PaymentMethod{
		Method: "PromptPay",
	}
	db.Model(&PaymentMethod{}).Create(&PromptPay)
	Credit := PaymentMethod{
		Method: "Credit Card",
	}
	db.Model(&PaymentMethod{}).Create(&Credit)
	Debit := PaymentMethod{
		Method: "Debit card",
	}
	db.Model(&PaymentMethod{}).Create(&Debit)

	//-------payee
	Payee1 := Payee{
		AccountNo:   "110-0-00000-0",
		AccountName: "สมาคมกีฬา",
		Bank:        "กรุงไทย",
	}
	db.Model(&Payee{}).Create(&Payee1)
	Payee2 := Payee{
		AccountNo:   "120-0-00000-0",
		AccountName: "สมาคมกีฬา",
		Bank:        "กสิกร",
	}
	db.Model(&Payee{}).Create(&Payee2)

	//-----payment----
	Payment1 := Payment{
		Bill:          Bill1,
		PaymentMethod: Transfer,
		Payee:         Payee2,
		PayDate:       time.Date(2022, 1, 2, 10, 0, 0, 0, time.Now().Location()),
	}
	db.Model(&Payment{}).Create(&Payment1)
	Payment2 := Payment{
		Bill:          Bill2,
		PaymentMethod: Credit,
		Payee:         Payee2,
		PayDate:       time.Date(2022, 3, 2, 10, 0, 0, 0, time.Now().Location()),
	}
	db.Model(&Payment{}).Create(&Payment2)

}
