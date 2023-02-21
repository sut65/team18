package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func Test_EmployeeAllPass(t *testing.T) { //กรณีข้อมูลถูกทั้งหมด
	g := NewGomegaWithT(t)

	
	employee := Employee{
		Name:      "Boonchoo", //Faluse Variable
		Tel:       "0600000000",
		Email:     "BoonChoo@email.com",
		Password: 	"123456",
		DOB:       time.Date(2003, 9, 24, 0, 0, 0, 0, time.Now().Location()),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func Test_EmployeeNameNull(t *testing.T) { // Tel ไม่ตรง format

	g := NewGomegaWithT(t)

	employee := Employee{
		Name:      "", //Faluse Variable
		Tel:       "0600000000",
		Email:     "BoonChoo@email.com",
		Password: 	"123456",
		DOB:       time.Date(2003, 9, 24, 0, 0, 0, 0, time.Now().Location()),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)
	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อ-นามสกุล"))
}

func Test_EmployeeTel(t *testing.T) { //กรณีข้อมูลถูกทั้งหมด
	g := NewGomegaWithT(t)

	employee := Employee{
		Name:      "BoonChoo",
		Tel:       "060000000",
		Email:     "BoonChoo@email.com",
		Password:  "123456",
		DOB:       time.Date(2003, 9, 24, 0, 0, 0, 0, time.Now().Location()),
		//User:      uTrainer,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)
	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Tel does not validate as matches(^\\d{10}$)"))
}

func Test_EmployeeTelNull(t *testing.T) { // Tel ไม่ตรง format

	g := NewGomegaWithT(t)

	employee := Employee{
		Name:      "BoonChoo", //Faluse Variable
		Tel:       "",
		Email:     "BoonChoo@email.com",
		Password: 	"123456",
		DOB:       time.Date(2003, 9, 24, 0, 0, 0, 0, time.Now().Location()),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)
	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกเบอร์โทร"))
}


func Test_EmployeeEmail(t *testing.T) { // email ไม่ตรง format

	g := NewGomegaWithT(t)

	employee := Employee{
		Name:      "BoonChoo",
		Tel:       "060000000",
		Email:     "BoonChoo.com", //Faluse Variable
		Password: 	"123456",
		DOB:       time.Date(2003, 9, 24, 0, 0, 0, 0, time.Now().Location()),
		
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Email: BoonChoo.com does not validate as email"))
}

func Test_EmployeeEmailNull(t *testing.T) { // email ไม่ตรง format

	g := NewGomegaWithT(t)

	employee := Employee{
		Name:      "BoonChoo",
		Tel:       "0600000000",
		Email:     "",
		Password: 	"123456",
		DOB:       time.Date(2003, 9, 24, 0, 0, 0, 0, time.Now().Location()),
		
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Email: กรุณากรอกอีเมล"))
}

func Test_EmployeePassword(t *testing.T) {
	g := NewGomegaWithT(t)

	employee := Employee{
		Name:      "BoonChoo",
		Tel:       "060000000",
		Email:     "BoonChoo@email.com",
		Password: 	"12345",
		DOB:       time.Date(2003, 9, 24, 0, 0, 0, 0, time.Now().Location()),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Password ต้องมีอย่างน้อย6ตัว"))
}

func Test_EmployeePasswordNull(t *testing.T) {
	g := NewGomegaWithT(t)

	employee := Employee{
		Name:      "BoonChoo",
		Tel:       "0600000000",
		Email:     "BoonChoo@email.com",
		Password: 	"",
		DOB:       time.Date(2003, 9, 24, 0, 0, 0, 0, time.Now().Location()),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกPassword"))
}
