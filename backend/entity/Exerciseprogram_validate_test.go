package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)
func TestPassExp(t *testing.T) { //กรณีข้อมูลถูกทั้งหมด
	g := NewGomegaWithT(t)

	
	exprlist := ExerciseProgramList{
		ProgramName: "Program_A",
		Minute: 60,

	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(exprlist)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}
func TestExPNameNotBlank(t *testing.T) { //กรณีชื่อว่าง
	g := NewGomegaWithT(t)

	
	exprlist := ExerciseProgramList{
		ProgramName: "",
		Minute: 60,

	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(exprlist)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อโปรแกรม"))
}
func TestExPMinute(t *testing.T) { //กรณีเวลาไม่อยู่ตรงตามที่กำหนด
	g := NewGomegaWithT(t)

	
	exprlist := ExerciseProgramList{
		ProgramName: "Program_A",
		Minute: 6,

	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(exprlist)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("เวลาต้องอยู่ระหว่าง 30-360 นาที"))
}
func TestExPMinuteNotNull(t *testing.T) { //กรณีเวลาไม่อยู่ตรงตามที่กำหนด
	g := NewGomegaWithT(t)

	
	exprlist := ExerciseProgramList{
		ProgramName: "Program_A",

	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(exprlist)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกเวลาที่ใช้"))
}
