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

	database, err := gorm.Open(sqlite.Open("Team18.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	database.AutoMigrate(
		//signin
		&User{},

		//employee system
		&Education{},
		&Role{},
		&Gender{},
		&Employee{},

		//Member system
		&Typem{},
		&Evidence{},
		&Member{},

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

		//Equipment menagement system
		&EquipmentName{},
		&RunNumber{},
		&EquipmentList{},

		//Equiment booking list
		&EquipmentBookingList{},

		//exerciseprogram system
		&WormUp{},
		&Exercise{},
		&Stretch{},
		&ExerciseProgramList{},

		//traniner booking
		&TrainerBookingList{},

		//Notify system
		&Notify{},

		//Place system
		&Service{},
		&Ocd{},
		&Oct{},
		&PlaceInfolist{},

		//Schedule
		&Time{},
		&Duty{},
		&Schedule{},

		//BookInfo sys
		&Place{},
		&TimePeriod{},
		&BookInfolist{},
	)
	db = database

	//------------------------------- Roles -----------------------
	admin := Role{
		Name: "admin",
	}
	db.Model(&Role{}).Create(&admin)

	trainer := Role{
		Name: "trainer",
	}
	db.Model(&Role{}).Create(&trainer)

	employee := Role{
		Name: "employee",
	}
	db.Model(&Role{}).Create(&employee)

	member := Role{
		Name: "member",
	}
	db.Model(&Role{}).Create(&member)

	//--------Password ----------//
	password, err := bcrypt.GenerateFromPassword([]byte("123456"), bcrypt.DefaultCost)
	if err != nil {
		return
	}

	//--------- User for Signin --------//
	//--Admin--//
	uAdmin := User{
		Name:     "Admin",
		Password: string(password),
		Role:     admin,
	}
	db.Model(&User{}).Create(&uAdmin)

	userAdmin := User{
		Name:     "Tanphat@email.com",
		Password: string(password),
		Role:     admin,
	}
	db.Model(&User{}).Create(&userAdmin)

	//--Trainer--//
	uTrainer := User{
		Name:     "Trainer",
		Password: string(password),
		Role:     trainer,
	}
	db.Model(&User{}).Create(&uTrainer)
	userTrainer := User{
		Name:     "Napakan@email.com",
		Password: string(password),
		Role:     trainer,
	}
	db.Model(&User{}).Create(&userTrainer)

	//--Employee--//
	uEmployee := User{
		Name:     "Employee",
		Password: string(password),
		Role:     employee,
	}
	db.Model(&User{}).Create(&uEmployee)
	userEmployee := User{
		Name:     "Employee@email.com",
		Password: string(password),
		Role:     employee,
	}
	db.Model(&User{}).Create(&userEmployee)

	//--Member--//
	uMember := User{
		Name:     "Somchai@email.com",
		Password: string(password),
		Role:     member,
	}
	db.Model(&User{}).Create(&uMember)
	userMember := User{
		Name:     "Baifern@email.com",
		Password: string(password),
		Role:     member,
	}
	db.Model(&User{}).Create(&userMember)

	///////////////// ระบบพนักงาน ////////////////

	//--gender--//
	Female := Gender{
		Gtype: "หญิง",
	}
	db.Model(&Gender{}).Create(&Female)

	Male := Gender{
		Gtype: "ชาย",
	}
	db.Model(&Gender{}).Create(&Male)

	//--Education--//

	hs := Education{
		Education: "มัธยมศึกษา",
	}
	db.Model(&Education{}).Create(&hs)

	baDg := Education{
		Education: "ปริญญาตรี",
	}
	db.Model(&Education{}).Create(&baDg)

	maDg := Education{
		Education: "ปริญญาโท",
	}
	db.Model(&Education{}).Create(&maDg)

	//--------- Employees -------//
	admin1 := Employee{
		Name:      "Max",
		Tel:       "060000000",
		Email:     "Max@email.com",
		Password: 	"123456",
		Gender:    Male,
		Role:      admin,
		Education: hs,
		DOB:       time.Date(2001, 9, 24, 0, 0, 0, 0, time.Now().Location()),
		User:      uAdmin,
	}
	db.Model(&Employee{}).Create(&admin1)

	admin2 := Employee{
		Name:      "Tanaphat",
		Tel:       "090000000",
		Email:     "Tanaphat@email.com",
		Password: 	"123456",
		Gender:    Male,
		Role:      admin,
		Education: baDg,
		//DOB:       time.Now(),
		DOB: 		time.Date(2022, 12, 10, 0, 0, 0, 0, time.Now().Location()),
		User:      userAdmin,
	}
	db.Model(&Employee{}).Create(&admin2)

	tr1 := Employee{
		Name:      "BoonChoo",
		Tel:       "060000000",
		Email:     "BoonChoo@email.com",
		Password: 	"123456",
		Gender:    Male,
		Role:      trainer,
		Education: hs,
		DOB:       time.Date(2003, 9, 24, 0, 0, 0, 0, time.Now().Location()),
		User:      uTrainer,
	}
	db.Model(&Employee{}).Create(&tr1)

	tr2 := Employee{
		Name:      "Napakan",
		Tel:       "060000000",
		Email:     "Napakan@email.com",
		Password: 	"123456",
		Gender:    Male,
		Role:      trainer,
		Education: hs,
		DOB:       time.Date(2005, 8, 22, 0, 0, 0, 0, time.Now().Location()),
		User:      userTrainer,
	}
	db.Model(&Employee{}).Create(&tr2)

	em1 := Employee{
		Name:      "Tanapon",
		Tel:       "060000000",
		Email:     "Tanapon@email.com",
		Password: 	"123456",
		Gender:    Male,
		Role:      employee,
		Education: hs,
		DOB:       time.Date(2001, 4, 1, 0, 0, 0, 0, time.Now().Location()),
		User:      uEmployee,
	}
	db.Model(&Employee{}).Create(&em1)

	em2 := Employee{
		Name:      "Siriprapa",
		Tel:       "060000000",
		Email:     "Siriprapa@email.com",
		Password: 	"123456",
		Gender:    Female,
		Role:      employee,
		Education: hs,
		DOB:       time.Date(2001, 3, 5, 0, 0, 0, 0, time.Now().Location()),
		User:      userEmployee,
	}
	db.Model(&Employee{}).Create(&em2)

	em3 := Employee{
		Name:      "Manatpong",
		Tel:       "060000000",
		Email:     "Manatpong@email.com",
		Password: 	"123456",
		Gender:    Male,
		Role:      employee,
		Education: hs,
		DOB:       time.Date(2001, 7, 18, 0, 0, 0, 0, time.Now().Location()),
		User:      userEmployee,
	}
	db.Model(&Employee{}).Create(&em3)

	em4 := Employee{
		Name:      "Kantaya",
		Tel:       "060000000",
		Email:     "Kantaya@email.com",
		Password: 	"123456",
		Gender:    Female,
		Role:      employee,
		Education: hs,
		DOB:       time.Date(2001, 9, 11, 0, 0, 0, 0, time.Now().Location()),
		User:      userEmployee,
	}
	db.Model(&Employee{}).Create(&em4)

	///////////////// ระบบข้อมูลสถานที่ ///////////////
	//----บริการ----
	service := Service{
		TypeP: "Fitness Room",
	}
	db.Model(&Service{}).Create(&service)
	service1 := Service{
		TypeP: "Batminton court",
	}
	db.Model(&Service{}).Create(&service1)
	service2 := Service{
		TypeP: "Basketball corut",
	}
	db.Model(&Service{}).Create(&service2)
	service3 := Service{
		TypeP: "Football court",
	}
	db.Model(&Service{}).Create(&service3)
	service4 := Service{
		TypeP: "Futsal court",
	}
	db.Model(&Service{}).Create(&service4)
	//----วันเวลาเปิดปิด----
	ocd := Ocd{
		Days: "Monday",
	}
	db.Model(&Ocd{}).Create(&ocd)
	ocd1 := Ocd{
		Days: "Tuesday",
	}
	db.Model(&Ocd{}).Create(&ocd1)
	ocd2 := Ocd{
		Days: "Wednesday",
	}
	db.Model(&Ocd{}).Create(&ocd2)
	ocd3 := Ocd{
		Days: "Thursday",
	}
	db.Model(&Ocd{}).Create(&ocd3)
	ocd4 := Ocd{
		Days: "Friday",
	}
	db.Model(&Ocd{}).Create(&ocd4)
	ocd5 := Ocd{
		Days: "Saturday",
	}
	db.Model(&Ocd{}).Create(&ocd5)
	ocd6 := Ocd{
		Days: "Sunday",
	}
	db.Model(&Ocd{}).Create(&ocd6)
	//----ช่วงเวลาเปิดปิด----
	oct := Oct{
		Times: "08:00 - 17:00",
	}
	db.Model(&Oct{}).Create(&oct)
	oct1 := Oct{
		Times: "08:00 - 18:00",
	}
	db.Model(&Oct{}).Create(&oct1)
	oct2 := Oct{
		Times: "08:00 - 19:00",
	}
	db.Model(&Oct{}).Create(&oct2)
	oct3 := Oct{
		Times: "08:00 - 20:00",
	}
	db.Model(&Oct{}).Create(&oct3)
	//----สร้างตารางให้บริการ----
	placeinfo := PlaceInfolist{
		Service:  service1,
		Ocd:      ocd1,
		Oct:      oct1,
		Employee: em3,
		Hours:    10,
		PDate:    time.Date(2022, 12, 10, 0, 0, 0, 0, time.Now().Location()),
		Detail:   "สนามมี 3 คอร์ท",
	}
	db.Model(&PlaceInfolist{}).Create(&placeinfo)
	placeinfo1 := PlaceInfolist{
		Service:  service,
		Ocd:      ocd,
		Oct:      oct,
		Employee: em3,
		Hours:    9,
		PDate:    time.Date(2022, 12, 10, 1, 0, 0, 0, time.Now().Location()),
		Detail:   "อุปกรณ์ชำรุด 4 เครื่อง",
	}
	db.Model(&PlaceInfolist{}).Create(&placeinfo1)

	//////////////// ระบบตารางงาน /////////////////
	//--Time--//
	q1 := Time{
		Range: "08:00 - 10:00",
	}
	db.Model(&Time{}).Create(&q1)

	q2 := Time{
		Range: "10:00 - 12:00",
	}
	db.Model(&Time{}).Create(&q2)

	q3 := Time{
		Range: "13:00 - 15:00",
	}
	db.Model(&Time{}).Create(&q3)

	q4 := Time{
		Range: "15:00 - 17:00",
	}
	db.Model(&Time{}).Create(&q4)

	//--Duty--//
	d_cleaner := Duty{
		Name: "ทำความสะอาด",
	}
	db.Model(&Duty{}).Create(&d_cleaner)

	d_checker := Duty{
		Name: "เช็คอุปกรณ์",
	}
	db.Model(&Duty{}).Create(&d_checker)

	d_fixeder := Duty{
		Name: "ซ่อมบำรุง",
	}
	db.Model(&Duty{}).Create(&d_fixeder)

	d_trainer := Duty{
		Name: "เทรนสมาชิก",
	}
	db.Model(&Duty{}).Create(&d_trainer)

	//--สถานที่--
	place := Place{
		Locate: "Fitness Room",
	}
	db.Model(&Place{}).Create(&place)
	place1 := Place{
		Locate: "คอร์ท 1",
	}
	db.Model(&Place{}).Create(&place1)
	place2 := Place{
		Locate: "คอร์ท 2",
	}
	db.Model(&Place{}).Create(&place2)
	place3 := Place{
		Locate: "สนามล่าง 1",
	}
	db.Model(&Place{}).Create(&place3)
	place4 := Place{
		Locate: "สนามล่าง 2",
	}
	db.Model(&Place{}).Create(&place4)
	place5 := Place{
		Locate: "สนามฟุตซอลยิม",
	}
	db.Model(&Place{}).Create(&place5)
	place6 := Place{
		Locate: "สนามบาส 1",
	}
	db.Model(&Place{}).Create(&place6)
	place7 := Place{
		Locate: "สนามบาส 2",
	}
	db.Model(&Place{}).Create(&place7)

	//-------Schedule---------//
	schedule_1 := Schedule{
		Employee:      admin2,
		Role:          employee,
		Duty:          d_checker,
		Ocd:           ocd3,
		Time:          q1,
		Place: 		   place,
	}
	db.Model(&Schedule{}).Create(&schedule_1)

	///////////////// ระบบสมัครสมาชิก //////////////////
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

	//---------------- member data1 -------------//
	db.Model(&Member{}).Create(&Member{
		Name:     "Somchai Jaidi",
		Email:    "Somchai@email.com",
		Password: "123456",
		Bdate:    time.Date(2001, 7, 11, 0, 0, 0, 0, time.Now().Location()),
		Age:      21,
		Gender:   Male,
		Evidence: Student,
		Typem:    Temporary,
		Role:     member,
		User:     uMember,
	})
	//member data2
	db.Model(&Member{}).Create(&Member{
		Name:     "Baifern Pimdao",
		Email:    "Baifern@email.com",
		Password: "456789",
		Bdate:    time.Date(2001, 9, 24, 0, 0, 0, 0, time.Now().Location()),
		Age:      21,
		Gender:   Female,
		Evidence: Identification,
		Typem:    Temporary,
		Role:     member,
		User:     userMember,
	})

	var Somchai Member
	var Baifern Member
	db.Raw("SELECT * FROM members WHERE email = ?", "Somchai@email.com").Scan(&Somchai)
	db.Raw("SELECT * FROM members WHERE email = ?", "Baifern@email.com").Scan(&Baifern)

	///////////// ระบบโปรแกรมออกกำลังกาย ////////////////
	//-- worm up --//
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
	//-- exercise --//
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
	//-- stratch --//
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
	//------------ Exercise Progam -------------//
	exeprogram1 := ExerciseProgramList{
		ProgramName: "Program_A",
		Employee:    tr1,
		WormUp:      worm1,
		Exercise:    exer1,
		Stretch:     stre1,
		Minute:      60,
	}
	db.Model(&ExerciseProgramList{}).Create(&exeprogram1)
	exeprogram2 := ExerciseProgramList{
		ProgramName: "Program_B",
		Employee:    tr2,
		WormUp:      worm2,
		Exercise:    exer1,
		Stretch:     stre3,
		Minute:      90,
	}
	db.Model(&ExerciseProgramList{}).Create(&exeprogram2)

	////////////// ระบบจองเทรนเนอร์ //////////////
	trbk1 := TrainerBookingList{
		Employee:            tr1,
		Member:              Somchai,
		ExerciseProgramList: exeprogram1,
		Training_Time:       time.Date(2001, 9, 24, 0, 0, 0, 0, time.Now().Location()),
	}
	db.Model(&TrainerBookingList{}).Create(&trbk1)
	trbk2 := TrainerBookingList{
		Employee:            tr2,
		Member:              Baifern,
		ExerciseProgramList: exeprogram2,
		Training_Time:       time.Date(2001, 9, 24, 0, 0, 0, 0, time.Now().Location()),
	}
	db.Model(&TrainerBookingList{}).Create(&trbk2)

	///////////// ระบบข้อมูลอุปกรณ์ //////////////////
	//-- equipment name --//
	equipmentNameFitness1 := EquipmentName{
		Name: "ลู่วิ่ง",
	}
	db.Model(&EquipmentName{}).Create(&equipmentNameFitness1)

	equipmentNameFitness2 := EquipmentName{
		Name: "จักรยานออกกำลังกาย",
	}
	db.Model(&EquipmentName{}).Create(&equipmentNameFitness2)

	equipmentNameFitness3 := EquipmentName{
		Name: "ม้านั่งออกกำลังกาย",
	}
	db.Model(&EquipmentName{}).Create(&equipmentNameFitness3)

	equipmentNameFitness4 := EquipmentName{
		Name: "สมิทแมชชีน",
	}
	db.Model(&EquipmentName{}).Create(&equipmentNameFitness4)

	equipmentNameBasketball1 := EquipmentName{
		Name: "รองเท้าบาสเกตบอล",
	}
	db.Model(&EquipmentName{}).Create(&equipmentNameBasketball1)

	equipmentNameBasketball2 := EquipmentName{
		Name: "ลูกบาสเกตบอล",
	}
	db.Model(&EquipmentName{}).Create(&equipmentNameBasketball2)

	equipmentNameBadminton1 := EquipmentName{
		Name: "รองเท้าแบดมินตัน",
	}
	db.Model(&EquipmentName{}).Create(&equipmentNameBadminton1)

	equipmentNameBadminton2 := EquipmentName{
		Name: "ไม้แบดมินตัน",
	}
	db.Model(&EquipmentName{}).Create(&equipmentNameBadminton2)

	equipmentNameFootball1 := EquipmentName{
		Name: "รองเท้าฟุตบอล",
	}
	db.Model(&EquipmentName{}).Create(&equipmentNameFootball1)

	equipmentNameFootball2 := EquipmentName{
		Name: "ลูกฟุตบอล",
	}
	db.Model(&EquipmentName{}).Create(&equipmentNameFootball2)

	equipmentNameFutsal1 := EquipmentName{
		Name: "รองเท้าฟุตซอล",
	}
	db.Model(&EquipmentName{}).Create(&equipmentNameFutsal1)

	equipmentNameFutsal2 := EquipmentName{
		Name: "ลูกฟุตซอล",
	}
	db.Model(&EquipmentName{}).Create(&equipmentNameFutsal2)

	equipmentNameVolleyball1 := EquipmentName{
		Name: "รองเท้าวอลเลย์บอล",
	}
	db.Model(&EquipmentName{}).Create(&equipmentNameVolleyball1)

	equipmentNameVolleyball2 := EquipmentName{
		Name: "ลูกวอลเลย์บอล",
	}
	db.Model(&EquipmentName{}).Create(&equipmentNameVolleyball2)

	//-------- run number --------

	run1 := RunNumber{
		Number: "A001",
	}
	db.Model(&RunNumber{}).Create(&run1)

	run2 := RunNumber{
		Number: "A002",
	}
	db.Model(&RunNumber{}).Create(&run2)

	run3 := RunNumber{
		Number: "A003",
	}
	db.Model(&RunNumber{}).Create(&run3)

	run4 := RunNumber{
		Number: "A004",
	}
	db.Model(&RunNumber{}).Create(&run4)

	run5 := RunNumber{
		Number: "A005",
	}
	db.Model(&RunNumber{}).Create(&run5)

	run6 := RunNumber{
		Number: "A006",
	}
	db.Model(&RunNumber{}).Create(&run6)

	run7 := RunNumber{
		Number: "A007",
	}
	db.Model(&RunNumber{}).Create(&run7)

	run8 := RunNumber{
		Number: "A008",
	}
	db.Model(&RunNumber{}).Create(&run8)

	run9 := RunNumber{
		Number: "A009",
	}
	db.Model(&RunNumber{}).Create(&run9)

	run10 := RunNumber{
		Number: "A010",
	}
	db.Model(&RunNumber{}).Create(&run10)

	//-------- equipmet list --------

	EquipmentList1 := EquipmentList{
		Detail:        "ม้านั่งออกกำลังกาย xiaomi",
		Employee:      em1,
		EquipmentName: equipmentNameFitness3,
		RunNumber:     run3,
		DateTime:      time.Now(),
	}
	db.Model(&EquipmentList{}).Create(&EquipmentList1)

	EquipmentList2 := EquipmentList{
		Detail:        "รองเท้าบาสเกตบอล size 10 us",
		Employee:      em1,
		EquipmentName: equipmentNameBasketball1,
		RunNumber:     run1,
		DateTime:      time.Now(),
	}
	db.Model(&EquipmentList{}).Create(&EquipmentList2)

	////////////////// ระบบแจ้งชำรุด ///////////////////
	db.Model(&Notify{}).Create(&Notify{
		Problem:       "เครื่องเปิดไม่ติด",
		Ddate:          time.Date(2022, 12, 10, 0, 0, 0, 0, time.Now().Location()),
		Member:        Somchai,
		EquipmentName: equipmentNameFitness1,
		RunNumber:     run1,
	})
	db.Model(&Notify{}).Create(&Notify{
		Problem:       "ลูกบอลรั่ว",
		Ddate:          time.Date(2022, 12, 21, 0, 0, 0, 0, time.Now().Location()),
		Member:        Baifern,
		EquipmentName: equipmentNameFootball2,
		RunNumber:     run2,
	})

	///////////////// ระบบจองอุปกรณ์ ///////////////////

	db.Model(&EquipmentBookingList{}).Create(&EquipmentBookingList{
		Member:        Somchai,
		EquipmentList: EquipmentList1,
		Employee:      em1,
	})

	db.Model(&EquipmentBookingList{}).Create(&EquipmentBookingList{
		Member:        Baifern,
		EquipmentList: EquipmentList2,
		Employee:      em1,
	})

	///////////// ระบบจองสถานที่ ///////////////
	//---ช่วงเวลาการจอง---
	tp := TimePeriod{
		Period: "08:00 - 10:00",
	}
	db.Model(&TimePeriod{}).Create(&tp)
	tp1 := TimePeriod{
		Period: "10:00 - 12:00",
	}
	db.Model(&TimePeriod{}).Create(&tp1)
	tp2 := TimePeriod{
		Period: "12:00 - 14:00",
	}
	db.Model(&TimePeriod{}).Create(&tp2)
	tp3 := TimePeriod{
		Period: "14:00 - 16:00",
	}
	db.Model(&TimePeriod{}).Create(&tp3)
	tp4 := TimePeriod{
		Period: "16:00 - 18:00",
	}
	db.Model(&TimePeriod{}).Create(&tp4)
	tp5 := TimePeriod{
		Period: "18:00 - 20:00",
	}
	db.Model(&TimePeriod{}).Create(&tp5)

	bookinfo := BookInfolist{
		Service:    service1,
		Place:      place,
		TimePeriod: tp,
		Member:     Somchai,
		BDate:      time.Date(2022, 12, 10, 0, 0, 0, 0, time.Now().Location()),
	}
	db.Model(&BookInfolist{}).Create(&bookinfo)
	bookinfo1 := BookInfolist{
		Service:    service2,
		Place:      place1,
		TimePeriod: tp1,
		Member:     Baifern,
		BDate:      time.Date(2022, 12, 10, 0, 0, 0, 0, time.Now().Location()),
	}
	db.Model(&BookInfolist{}).Create(&bookinfo1)

	////////////// ระบบประชาสัมพันธ์ ////////////////
	//-------- Recipient------
	everyone := Recipient{
		Recipient: "Everyone",
	}
	db.Model(&Recipient{}).Create(&everyone)
	employ := Recipient{
		Recipient: "Employee",
	}
	db.Model(&Recipient{}).Create(&employ)
	members := Recipient{
		Recipient: "Member",
	}
	db.Model(&Recipient{}).Create(&members)
	//---------NewsType-------
	typeI := NewsType{
		Type: "ทั่วไป",
	}
	db.Model(&NewsType{}).Create(&typeI)
	typeII := NewsType{
		Type: "กีฬาและออกกำลังกาย",
	}
	db.Model(&NewsType{}).Create(&typeII)
	typeIII := NewsType{
		Type: "สมาคม",
	}
	db.Model(&NewsType{}).Create(&typeIII)
	//----------News------
	news1 := News{
		Headline:  "แจ้งหยุดพนักงาน",
		Body:      "เนื่องจากเป็นวันสำคัญทางศาสนา จึงให้พนักงานหยุดระหว่างวันที่  2021-01-05 - 2021-01-06",
		SDate:     time.Date(2023, 2, 2, 10, 0, 0, 0, time.Now().Location()),
		DDate:     time.Date(2023, 3, 10, 10, 0, 0, 0, time.Now().Location()),
		Recipient: employ,
		NewsType:  typeI,
		Employee:  em2,
	}
	db.Model(&News{}).Create(&news1)
	news2 := News{
		Headline:  "เลื่อนเวลาปิด",
		Body:      "แจ้งสมาชิกทุกวัน เนื่องจากมีการแพร่ระบาดโควิด ทางสถานกีฬาจะเลื่อนเวลาปิดเป็น 18.00 น.",
		SDate:     time.Date(2023, 2, 2, 10, 0, 0, 0, time.Now().Location()),
		DDate:     time.Date(2023, 3, 10, 10, 0, 0, 0, time.Now().Location()),
		Recipient: members,
		NewsType:  typeI,
		Employee:  em2,
	}
	db.Model(&News{}).Create(&news2)
	news3 := News{
		Headline:  "แจ้งการปรับปรุงห้องน้ำสนามกีฬา",
		Body:      "มีการปรับปรุงห้องน้ำที่ 7 กรุณาใช้ห้องน้ำถัดไป",
		SDate:     time.Date(2023, 2, 3, 10, 0, 0, 0, time.Now().Location()),
		DDate:     time.Date(2023, 2, 10, 10, 0, 0, 0, time.Now().Location()),
		Recipient: everyone,
		NewsType:  typeI,
		Employee:  em2,
	}
	db.Model(&News{}).Create(&news3)

	news4 := News{
		Headline:  "แจ้งปิดห้องน้ำสนามกีฬา",
		Body:      "มีการปิดห้องน้ำที่ 18 เนื่องจากไม่มีการใช้งาน",
		SDate:     time.Date(2023, 2, 3, 10, 0, 0, 0, time.Now().Location()),
		DDate:     time.Date(2023, 3, 10, 10, 0, 0, 0, time.Now().Location()),
		Recipient: everyone,
		NewsType:  typeI,
		Employee:  em2,
	}
	db.Model(&News{}).Create(&news4)

	////////////// ระบบชำระเงิน /////////////////
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
		Status:    Status1,
		Member:    Somchai,
		PayableAM: 500,
	}
	db.Model(&Bill{}).Create(&Bill1)
	Bill2 := Bill{
		Status:    Status1,
		Member:    Baifern,
		PayableAM: 500,
	}
	db.Model(&Bill{}).Create(&Bill2)
	Bill3 := Bill{
		Status:    Status2,
		Member:    Somchai,
		PayableAM: 500,
	}
	db.Model(&Bill{}).Create(&Bill3)

	Bill4 := Bill{
		Status:    Status2,
		Member:    Baifern,
		PayableAM: 2999,
	}
	db.Model(&Bill{}).Create(&Bill4)

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
		Note:          "",
	}
	db.Model(&Payment{}).Create(&Payment1)
	Payment2 := Payment{
		Bill:          Bill2,
		PaymentMethod: Credit,
		Payee:         Payee2,
		PayDate:       time.Date(2022, 3, 2, 10, 0, 0, 0, time.Now().Location()),
		Note:          "",
	}
	db.Model(&Payment{}).Create(&Payment2)

}
