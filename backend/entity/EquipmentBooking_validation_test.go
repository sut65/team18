package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestEquipmentBooking(t *testing.T) {
	g := NewGomegaWithT(t)

	equipmentBookingList := EquipmentBookingList{
		DateBooking: time.Now().AddDate(0, 0, 1),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(equipmentBookingList)
	//ok = nil
	// err = true

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).To(BeTrue())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err).To(BeNil())

}

func TestDateBookinTimeNotPast(t *testing.T) {
	g := NewGomegaWithT(t)
	equipmentBookingList := EquipmentBookingList{

		DateBooking: time.Now().AddDate(0, 0, -1),
	}
	ok, err := govalidator.ValidateStruct(equipmentBookingList)

	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Date booking must not be in the past"))
}
