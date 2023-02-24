package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPlaceAll(t *testing.T) { //กรณีข้อมูลถูกทั้งหมด
	g := NewGomegaWithT(t)

	placeinfo := PlaceInfolist{
		Hours: 10,
		Detail: "เครื่องชำรุด",
		PDate: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(placeinfo)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestDetailNull(t *testing.T) { //Detail ต้องไม่เป็น null
	g := NewGomegaWithT(t)

	placeinfo := PlaceInfolist{
		Hours: 10,
		Detail: "",
		PDate: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(placeinfo)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกDetail"))
}

func TestHours(t *testing.T) { //Hour ไม่เกิน 12 ชม.
	g := NewGomegaWithT(t)

	placeinfo := PlaceInfolist{
		Hours: 13,
		Detail: "เครื่องชำรุด",
		PDate: time.Now(),
	}

	ok, err := govalidator.ValidateStruct(placeinfo)

	
	g.Expect(ok).ToNot(BeTrue())

	
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ชั่วโมงไม่เกิน 12"))
}

func TestPlaceTime(t *testing.T) {
	g := NewGomegaWithT(t)

	placeinfo := PlaceInfolist{
		Hours: 10,
		Detail: "เครื่องชำรุด",
		PDate: time.Now().Add(-1 * time.Minute),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(placeinfo)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("วันที่ไม่เป็นอดีต"))
}

