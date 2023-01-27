package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)
//---------------ไว้สำหรับสร้างข้อมูล----------------------------------
// POST /payment..........................

func CreatePayment(c *gin.Context) {

	var payment entity.Payment
	var bill entity.Bill
	var method entity.PaymentMethod
	var payee entity.Payee

	if err := c.ShouldBindJSON(&payment); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//9: ค้นหา bill ด้วย id //tx.RowsAffected ตรวจสอบแถว
	if tx := entity.DB().Where("id = ?", payment.BillID).First(&bill); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bill not found"})
		return
	}

	//9: ค้นหา method ด้วย id
	if tx := entity.DB().Where("id = ?", payment.PaymentMethodID).First(&method); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "method not found"})
		return
	}

	//9: ค้นหา payees ด้วย id
	if tx := entity.DB().Where("id = ?", payment.PayeeID).First(&payee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payee not found"})
		return
	}

	py := entity.Payment{
		Bill:       bill,               // โยงความสัมพันธ์
		PaymentMethod:  method,          // โยงความสัมพันธ์
		Payee:     payee,             // โยงความสัมพันธ์
		PayDate: payment.PayDate, // ตั้งค่าฟิลด์ 
	}

	if err := entity.DB().Create(&py).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": py})

}

//---------------ไว้สำหรับดึงข้อมูล--------------------------------------
func GetPayment(c *gin.Context) {
	var payment entity.Payment
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM payments WHERE id = ?", id).Scan(&payment).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": payment})
}

func ListPayment(c *gin.Context) {

	var payment []entity.Payment

	if err := entity.DB().Preload("Bill").Preload("PaymentMethod").Preload("Payee").Raw("SELECT * FROM payments").Find(&payment).Error; err != nil {

		//ดึงตารางย่อยมา .preload

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": payment})
}

//--------ไว้สำหรับลบข้อมูล---------------------
// DELETE /member/:id
func DeletePayment(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM payments WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}
