package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestEmployeePassAll(t *testing.T) { //กรณีข้อมูลถูกทั้งหมด
	g := NewGomegaWithT(t)

	employee := Employee{
		Name:      "BoonChoo",
		Tel:       "060000000",
		Email:     "BoonChoo@email.com",
		Password: 	"123456",
		//Gender:    Male,
		//Role:      trainer,
		//Education: hs,
		DOB:       time.Date(2003, 9, 24, 0, 0, 0, 0, time.Now().Location()),
		//User:      uTrainer,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(employee)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestEmployeeNameNull(t *testing.T) { // Name ไม่ตรง format

	g := NewGomegaWithT(t)

	employee := Employee{
		Name:      "", //Faluse Variable
		Tel:       "060000000",
		Email:     "BoonChoo@email.com",
		Password: 	"123456",
		//Gender:    Male,
		//Role:      trainer,
		//Education: hs,
		DOB:       time.Date(2003, 9, 24, 0, 0, 0, 0, time.Now().Location()),
		//User:      uTrainer,
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

func TestEmployeeEmail(t *testing.T) { // email ไม่ตรง format

	g := NewGomegaWithT(t)

	employee := Employee{
		Name:      "BoonChoo",
		Tel:       "060000000",
		Email:     "BoonChoo.com", //Faluse Variable
		Password: 	"123456",
		//Gender:    Male,
		//Role:      trainer,
		//Education: hs,
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
	g.Expect(err.Error()).To(Equal("Email: Somchai.com does not validate as email"))
}

func TestEmployeeEmailNull(t *testing.T) { // email ไม่ตรง format

	g := NewGomegaWithT(t)

	employee := Employee{
		Name:      "BoonChoo",
		Tel:       "060000000",
		Email:     "",
		Password: 	"123456",
		//Gender:    Male,
		//Role:      trainer,
		//Education: hs,
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
	g.Expect(err.Error()).To(Equal("Email: กรุณากรอกอีเมล"))
}

func TestEmployeeAge(t *testing.T) { // อายุผิด

	g := NewGomegaWithT(t)

	employee := Employee{
		Name:      "BoonChoo",
		Tel:       "060000000",
		Email:     "BoonChoo@email.com",
		Password: 	"123456",
		//Gender:    Male,
		//Role:      trainer,
		//Education: hs,
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
	g.Expect(err.Error()).To(Equal("อายุไม่ต่ำกว่า 20"))
}

func TestEmployeePassword(t *testing.T) {
	g := NewGomegaWithT(t)

	employee := Employee{
		Name:      "BoonChoo",
		Tel:       "060000000",
		Email:     "BoonChoo@email.com",
		Password: 	"12345",
		//Gender:    Male,
		//Role:      trainer,
		//Education: hs,
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
	g.Expect(err.Error()).To(Equal("Passwordต้องมีอย่างน้อย6ตัว"))
}

func TestEmployeePasswordNull(t *testing.T) {
	g := NewGomegaWithT(t)

	employee := Employee{
		Name:      "BoonChoo",
		Tel:       "060000000",
		Email:     "BoonChoo@email.com",
		Password: 	"",
		//Gender:    Male,
		//Role:      trainer,
		//Education: hs,
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
	g.Expect(err.Error()).To(Equal("กรุณากรอกPassword"))
}
