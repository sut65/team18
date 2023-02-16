package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPassNotify(t *testing.T) { //กรณีข้อมูลถูกทั้งหมด
	g := NewGomegaWithT(t)

	notify := Notify{
		Problem: "เปิดเครื่องไม่ติด",
		Ddate:   time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(notify)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err ต้องเป็น nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestProblemNull(t *testing.T) { // Name ไม่ตรง format

	g := NewGomegaWithT(t)

	notify := Notify{
		Problem: "",
		Ddate:   time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(notify)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาระบุปัญหา"))
}

func TestTimeNow(t *testing.T) {
	g := NewGomegaWithT(t)

	notify := Notify{
		Problem: "เปิดเครื่องไม่ติด",
		Ddate:   time.Now().Add(-4 * time.Minute),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(notify)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("วันที่ไม่ถูกต้อง"))
}
func TestTimeNow2(t *testing.T) {
	g := NewGomegaWithT(t)

	notify := Notify{
		Problem: "เปิดเครื่องไม่ติด",
		Ddate:   time.Now().Add(+4 * time.Minute),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(notify)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("วันที่ไม่ถูกต้อง"))
}