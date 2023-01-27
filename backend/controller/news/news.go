package controller

import (
	"github.com/sut65/team18/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)
//---------------ไว้สำหรับสร้างข้อมูล----------------------------------
// POST /news..........................

func CreateNews(c *gin.Context) {

	var news entity.News
	var employee entity.Employee
	var nt entity.NewsType
	var recipient entity.Recipient

	if err := c.ShouldBindJSON(&news); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//9: ค้นหา bill ด้วย id //tx.RowsAffected ตรวจสอบแถว
	if tx := entity.DB().Where("id = ?", news.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	//9: ค้นหา method ด้วย id
	if tx := entity.DB().Where("id = ?", news.NewsTypeID).First(&nt); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "NewsType not found"})
		return
	}

	//9: ค้นหา payees ด้วย id
	if tx := entity.DB().Where("id = ?", news.RecipientID).First(&recipient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "recipient not found"})
		return
	}

	ne := entity.News{
		Employee:       employee,               // โยงความสัมพันธ์
		Recipient:      recipient,          // โยงความสัมพันธ์
		NewsType:       nt,             // โยงความสัมพันธ์
		Headline:       news.Headline,
	    Body:           news.Body,
	    SDate:          news.SDate,
	    DDate:          news.DDate,    // ตั้งค่าฟิลด์ 
	}

	if err := entity.DB().Create(&ne).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": ne})

}

//---------------ไว้สำหรับดึงข้อมูล--------------------------------------
func GetNews(c *gin.Context) {
	var news entity.News
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM news WHERE id = ?", id).Scan(&news).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": news})
}

func ListNews(c *gin.Context) {

	var news []entity.News

	if err := entity.DB().Preload("Employee").Preload("Recipient").Preload("NewsType").Raw("SELECT * FROM news").Find(&news).Error; err != nil {

		//ดึงตารางย่อยมา .preload

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": news})
}

//--------ไว้สำหรับลบข้อมูล---------------------
// DELETE /news/:id
func DeleteNews(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM news WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "news not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

//-------------อัพเดรทค่า------------
func UpdateNews(c *gin.Context) {
	var news entity.News
	if err := c.ShouldBindJSON(&news); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", news.ID).First(&news); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "news not found"})
		return
	}
    

	if err := entity.DB().Save(&news).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": news})
}
