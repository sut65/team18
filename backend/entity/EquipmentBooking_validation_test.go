package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestDateBookingTimeNotPast(t *testing.T) {
	g := NewGomegaWithT(t)
	EquipmentBookingList := EquipmentBookingList{

		DateBooking: time.Now().AddDate(0,-1,0),

	}
	ok, err := govalidator.ValidateStruct(EquipmentBookingList)

	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("DateBooking must not be in the now;DateBooking must not be in the past"))
}

func TestDateBookingTimeNotNow(t *testing.T) {
	g := NewGomegaWithT(t)
	EquipmentBookingList := EquipmentBookingList{

		DateBooking: time.Now(),

	}
	ok, err := govalidator.ValidateStruct(EquipmentBookingList)

	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("DateBooking must not be in the now"))
}