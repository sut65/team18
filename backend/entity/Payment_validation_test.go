package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPassPayment(t *testing.T) {
	g := NewGomegaWithT(t)

	payment := Payment{
		Note: "",
		PayDate:    time.Now(), 
	}

	ok, err := govalidator.ValidateStruct(payment)

	g.Expect(ok).To(BeTrue())

	g.Expect(err).To(BeNil())

}

func TestPaydatePast(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Time เป็น อดีต
	payment := Payment{
		Note: "ร่างกายต้องการออกกำลังกาย",
		PayDate:    time.Now().Add(-6 * time.Minute), // เป็นอดีต
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(payment)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("วันที่และเวลาไม่ถูกต้อง"))
}

func TestPaydateFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	payment := Payment{
		Note: "ร่างกายต้องการออกกำลังกาย",
		PayDate:    time.Now().Add( +6 * time.Minute), // เป็นอนาคต
	}

	ok, err := govalidator.ValidateStruct(payment)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("วันที่และเวลาไม่ถูกต้อง"))
}


func TestNote(t *testing.T) {
	g := NewGomegaWithT(t)

	
	payment := Payment{
		Note: "ทรัพยากรทางธรรมชาติ เป็นสิ่งสำคัญที่อยู่คู่กับโลกของเรามาอย่างเนิ่นนาน ซึ่งมนุษย์ได้นำมาใช้เป็นวัตถุดิบ เพื่อสร้างความเจริญทางเศรษฐกิจของประเทศตนเอง ประเทศไหนมีความอุดมสมบูรณ์อัดแน่นไปด้วยทรัพยากรธรรมชาติ ประเทศนั้นจะเต็มไปด้วยความร่ำรวย มั่งคั่ง รวมทั้งมีความเจริญทางด้านเศรษฐกิจสูงมากกว่าประเทศที่มีทรัพยากรทางธรรมชาติน้อย แต่อย่างไรก็ตามข้อเสียของมันก็คือ ถ้ามนุษย์นำทรัพยากรธรรมชาติมาใช้อย่างไม่หาวิธีเก็บอนุรักษ์ไว้บ้าง ก็จะทำให้ทรัพยากรธรรมชาติสูญสิ้นไปจากโลกนี้ โดยไม่มีวันสร้างขึ้นมาได้อีก นอกจากใช้พลังงานอย่างอื่นเป็นเครื่องทดแทน",
		PayDate:  time.Now(), 
	}


	ok, err := govalidator.ValidateStruct(payment)

	
	g.Expect(ok).ToNot(BeTrue())

	
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ขนาดข้อความมีความยาวเกินไป ควรมีความยาวไม่เกิน 50 พยางค์"))
}