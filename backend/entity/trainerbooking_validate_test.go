package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)
func TestPassTr(t *testing.T) { //กรณีข้อมูลถูกทั้งหมด
	g := NewGomegaWithT(t)

	
	trblist := TrainerBookingList{
		Training_Time: time.Now().Add(3 * time.Hour),
	}


	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(trblist)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}
func TestTrainTimeNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	
	trblist := TrainerBookingList{
		
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(trblist)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกเวลาที่ใช้เทรน"))
}
func TestTraintime(t *testing.T) { 
	g := NewGomegaWithT(t)

	
	trblist := TrainerBookingList{
		Training_Time: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(trblist)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณาจองล่วงหน้า2ชม"))
}
