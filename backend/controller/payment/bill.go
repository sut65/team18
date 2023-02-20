package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)
//---------------ไว้สำหรับสร้างข้อมูล----------------------------------
// POST /payment..........................

func CreateBill(c *gin.Context) {
	var bill entity.Bill
	var member entity.Member
	var status entity.Status   

	if err := c.ShouldBindJSON(&bill); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//9: ค้นหา member ด้วย id //tx.RowsAffected ตรวจสอบแถว
	if  tx := entity.DB().Raw("SELECT * FROM members where id = ?", bill.Member.ID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bill not found"})
		return
	}
	//9: ค้นหา status ด้วย id
	if tx := entity.DB().Where("id = 2", bill.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "method not found"})
		return
	}

	
	bi := entity.Bill{
		Member:       bill.Member,               // โยงความสัมพันธ์
		Status:       status,         // โยงความสัมพันธ์	
		PayableAM:    bill.PayableAM,
	}
	if err := entity.DB().Create(&bi).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bi})

}


//--------------ดังข้อมูล------------------------
func GetBill(c *gin.Context) {
	var bill entity.Bill
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM bills WHERE id = ?", id).Scan(&bill).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": bill})
}

func ListBill(c *gin.Context) {

	var bill []entity.Bill

	if err := entity.DB().Preload("Member").Preload("Status").Raw("SELECT * FROM bills").Find(&bill).Error; err != nil {

		//ดึงตารางย่อยมา .preload

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": bill})
}

func ListBillByStatus(c *gin.Context) {

	var bill []entity.Bill
	id := c.Param("id")

	if err := entity.DB().Preload("Member").Preload("Status").Raw("SELECT * FROM bills where status_id = 2 AND member_id = ?",id).Find(&bill).Error; err != nil {

		//ดึงตารางย่อยมา .preload

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": bill})
}

//-------------อัพเดรทค่า------------
func UpdateBill(c *gin.Context) {
	var bill entity.Bill
	var bi entity.Bill
	var member entity.Member
	var status entity.Status

	if err := c.ShouldBindJSON(&bill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", bill.ID).First(&bi); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "watchvideo not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", bill.MemberID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bill not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", bill.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bill not found"})
		return
	}

	bi.Member = member
	bi.Status = status

	if err := entity.DB().Save(&bi).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
  
	c.JSON(http.StatusOK, gin.H{"data": bi})
}