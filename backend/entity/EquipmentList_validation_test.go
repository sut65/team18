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
		Detail:   "jordan1 mid",
		DateTime: time.Now(),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(equipmenlist)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).To(BeTrue())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err).To(BeNil())

}

func TestDetailNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	equipmenlist := EquipmentList{
		Detail: "",
	}

	ok, err := govalidator.ValidateStruct(equipmenlist)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Detail cannot be blank"))
}

func EquipmentNameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	equipmenlist := EquipmentName{
		Name: "",
	}

	ok, err := govalidator.ValidateStruct(equipmenlist)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	g.Expect(err.Error()).To(Equal("Equipment name cannot be blank"))
}

func TestRunNumber(t *testing.T) {
	g := NewGomegaWithT(t)

	member := RunNumber{
		Number: "A01",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(member)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("RunNumberต้องมี4ตัว"))
}
