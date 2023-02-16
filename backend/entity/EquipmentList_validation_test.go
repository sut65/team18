package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestDatail(t *testing.T) {
	g := NewGomegaWithT(t)

	equipmenlist := EquipmentList{
		Detail: "jordan1 mid",
		DateTime:    time.Now(), 
	}


	ok, err := govalidator.ValidateStruct(equipmenlist)


	g.Expect(ok).To(BeTrue())


	g.Expect(err).To(BeNil())

}

// ตรวจสอบค่าว่างของ detail แล้วต้องเจอ Error
func TestDetailNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	equipmenlist := EquipmentList{
		Detail: "",
		DateTime:    time.Now(), 
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(equipmenlist)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Detail cannot be blank"))
}

func TestDateTime(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Time เป็น อดีต
	equipmenlist := EquipmentList{
		Detail: "jordan1 mid",
		DateTime:    time.Now().Add(-6 * time.Minute), // เป็นอดีต
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(equipmenlist)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("วันที่และเวลาไม่ถูกต้อง"))
}