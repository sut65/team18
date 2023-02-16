package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPassAll(t *testing.T) { //กรณีข้อมูลถูกทั้งหมด
	g := NewGomegaWithT(t)

	
	member := Member{
		Name:     "Somchai Jaidi",
		Email:    "Somchai@email.com",
		Password: "123456",
		Bdate:   time.Date(2001, 7, 11, 0, 0, 0, 0, time.Now().Location()),
		Age:      21,                  
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(member)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}


func TestNameNull(t *testing.T) { // Name ไม่ตรง format

	g := NewGomegaWithT(t)

	member := Member{
		Name:     "",
		Email:    "Somchai@email.com",
		Password: "123456",
		Bdate:   time.Date(2001, 7, 11, 0, 0, 0, 0, time.Now().Location()),
		Age:      21,                  
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(member)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อ-นามสกุล"))
}


func TestEmail(t *testing.T) { // email ไม่ตรง format

	g := NewGomegaWithT(t)

	member := Member{
		Name:     "Somchai Jaidi",
		Email:    "Somchai.com",
		Password: "123456",
		Bdate:   time.Date(2001, 7, 11, 0, 0, 0, 0, time.Now().Location()),
		Age:      21,                  
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(member)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Email: Somchai.com does not validate as email"))
}

func TestEmailNull(t *testing.T) { // email ไม่ตรง format

	g := NewGomegaWithT(t)

	member := Member{
		Name:     "Somchai Jaidi",
		Email:    "",
		Password: "123456",
		Bdate:   time.Date(2001, 7, 11, 0, 0, 0, 0, time.Now().Location()),
		Age:      21,                  
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(member)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Email: กรุณากรอกอีเมล"))
}


func TestAge(t *testing.T) { // อายุผิด

	g := NewGomegaWithT(t)

	member := Member{
		Name:     "Somchai Jaidi",
		Email:    "Somchai@email.com",
		Password: "123456",
		Bdate:   time.Date(2001, 7, 11, 0, 0, 0, 0, time.Now().Location()),
		Age:      14,                  
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(member)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("อายุไม่ต่ำกว่า 15"))
}

func TestPassword(t *testing.T) { 
	g := NewGomegaWithT(t)

	
	member := Member{
		Name:     "Somchai Jaidi",
		Email:    "Somchai@email.com",
		Password: "12345",
		Bdate:   time.Date(2001, 7, 11, 0, 0, 0, 0, time.Now().Location()),
		Age:      21,                  
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(member)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Passwordต้องมีอย่างน้อย6ตัว"))
}

func TestPasswordNull(t *testing.T) { 
	g := NewGomegaWithT(t)

	
	member := Member{
		Name:     "Somchai Jaidi",
		Email:    "Somchai@email.com",
		Password: "",
		Bdate:   time.Date(2001, 7, 11, 0, 0, 0, 0, time.Now().Location()),
		Age:      21,                  
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(member)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกPassword"))
}