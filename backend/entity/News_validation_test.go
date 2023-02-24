package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPassNews(t *testing.T) {
	g := NewGomegaWithT(t)

	news := News{
		Headline: "ปิดปรับปรุงสนามฟุตบอล ตั้งแต่วันที่ 15 กุมภาพันธ์ 2566 - 20 กุมภาพันธ์ 2566",
		SDate:    time.Date(2023, 2, 14, 0, 0, 0, 0, time.Now().Location()),
		DDate:    time.Date(2023, 3, 20, 0, 0, 0, 0, time.Now().Location()),
	}

	ok, err := govalidator.ValidateStruct(news)

	g.Expect(ok).To(BeTrue())
	g.Expect(err).To(BeNil())
}

func TestHeadlineNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูล Time เป็น อดีต
	news := News{
		Headline: "",
		SDate:    time.Date(2023, 2, 14, 0, 0, 0, 0, time.Now().Location()),
		DDate:    time.Date(2023, 3, 20, 0, 0, 0, 0, time.Now().Location()),
	}

	ok, err := govalidator.ValidateStruct(news)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกหัวข้อข่าวสาร"))
}

func TestHeadlineLength(t *testing.T) {
	g := NewGomegaWithT(t)

	news := News{
		Headline: "ทรัพยากรทางธรรมชาติ เป็นสิ่งสำคัญที่อยู่คู่กับโลกของเรามาอย่างเนิ่นนาน ซึ่งมนุษย์ได้นำมาใช้เป็นวัตถุดิบ เพื่อสร้างความเจริญทางเศรษฐกิจของประเทศตนเอง ประเทศไหนมีความอุดมสมบูรณ์อัดแน่นไปด้วยทรัพยากรธรรมชาติ ประเทศนั้นจะเต็มไปด้วยความร่ำรวย มั่งคั่ง รวมทั้งมีความเจริญทางด้านเศรษฐกิจสูงมากกว่าประเทศที่มีทรัพยากรทางธรรมชาติน้อย แต่อย่างไรก็ตามข้อเสียของมันก็คือ ถ้ามนุษย์นำทรัพยากรธรรมชาติมาใช้อย่างไม่หาวิธีเก็บอนุรักษ์ไว้บ้าง ก็จะทำให้ทรัพยากรธรรมชาติสูญสิ้นไปจากโลกนี้ โดยไม่มีวันสร้างขึ้นมาได้อีก นอกจากใช้พลังงานอย่างอื่นเป็นเครื่องทดแทน",
		SDate:    time.Date(2023, 2, 14, 0, 0, 0, 0, time.Now().Location()),
		DDate:    time.Date(2023, 3, 20, 0, 0, 0, 0, time.Now().Location()),
	}

	ok, err := govalidator.ValidateStruct(news)

	g.Expect(ok).ToNot(BeTrue())

	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("หัวข้อพาดข่าวมีความยาวเกินไป"))
}

func TestSdateNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	news := News{
		Headline: "ปิดปรับปรุงสนามฟุตบอล ตั้งแต่วันที่ 15 กุมภาพันธ์ 2566 - 20 กุมภาพันธ์ 2566",
		DDate:    time.Date(2023, 3, 20, 0, 0, 0, 0, time.Now().Location()),
	}

	ok, err := govalidator.ValidateStruct(news)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาเลือกวันที่ให้ครบ"))
}

func TestDdateNotNull(t *testing.T) {
	g := NewGomegaWithT(t)

	news := News{
		Headline: "ปิดปรับปรุงสนามฟุตบอล ตั้งแต่วันที่ 15 กุมภาพันธ์ 2566 - 20 กุมภาพันธ์ 2566",
		SDate:    time.Date(2023, 2, 14, 0, 0, 0, 0, time.Now().Location()),
	}

	ok, err := govalidator.ValidateStruct(news)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาเลือกวันที่ให้ครบ"))
}

func TestDdateIsFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	news := News{
		Headline: "ปิดปรับปรุงสนามฟุตบอล ตั้งแต่วันที่ 15 กุมภาพันธ์ 2566 - 20 กุมภาพันธ์ 2566",
		SDate:    time.Date(2023, 2, 10, 0, 0, 0, 0, time.Now().Location()),
		DDate:    time.Now(),
	}

	ok, err := govalidator.ValidateStruct(news)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("วันที่ยกเลิกแสดงควรเป็นอนาคต"))
}
