package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestBookAll(t *testing.T) { //กรณีข้อมูลถูกทั้งหมด
	g := NewGomegaWithT(t)

	bookinfo := BookInfolist{
		Tel: "0817819456",
		BDate: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(bookinfo)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestTelNull(t *testing.T) { //Tel ต้องไม่เป็น null
	g := NewGomegaWithT(t)

	bookinfo := BookInfolist{
		Tel: "",
		BDate: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(bookinfo)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกเบอร์โทรติดต่อ"))
}

func TestTelPattern(t *testing.T) { // Tel ต้องมี 10 digits
	g := NewGomegaWithT(t)

	bookinfo := BookInfolist{
		Tel: "08978",
		BDate: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(bookinfo)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เบอร์โทรติดต่อไม่ถูกต้อง"))
}

func TestBookTime(t *testing.T) {
	g := NewGomegaWithT(t)

	bookinfo := BookInfolist{
		Tel: "0817819456",
		BDate:  time.Now().AddDate(0, 0, -1),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(bookinfo)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("วันที่ไม่ถูกต้อง"))
}

