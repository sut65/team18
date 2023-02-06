package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"

	"github.com/sut65/team18/entity"
)

// POST /member
func CreateMember(c *gin.Context) {

	var member entity.Member
	var typem entity.Typem
	var evidence entity.Evidence
	var gender entity.Gender
	var role entity.Role

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ x จะถูก bind เข้าตัวแปร member
	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//แทรกvilid
	if _, err := govalidator.ValidateStruct(member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา typem ด้วย id
	if tx := entity.DB().Where("id = ?", member.TypemID).First(&typem); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type not found"})
		return
	}

	// ค้นหา evidencet ด้วย id
	if tx := entity.DB().Where("id = ?", member.EvidenceID).First(&evidence); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Evidence not found"})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", member.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = 3", member.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Role not found"})
		return
	}
	//สร้าง ตารางMember
	md := entity.Member{
		Name:     member.Name,
		Email:    member.Email,
		Password: member.Password,
		Bdate:    member.Bdate,
		Age:      member.Age,
		Typem:    typem,
		Evidence: evidence,
		Gender:   gender,
		Role:   role,
	}

	// ขั้นตอนการ validate
	if _, err := govalidator.ValidateStruct(md); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// บันทึก
	if err := entity.DB().Create(&md).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": md})
}

// GET /Member/:id
func GetMember(c *gin.Context) {
	var member entity.Member
	id := c.Param("id")
	if err := entity.DB().Preload("Typem").Preload("Evidence").Preload("Gender").Preload("Role").Raw("SELECT * FROM members WHERE id = ?", id).Find(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}

func ListMember(c *gin.Context) {
	var member []entity.Member
	if err := entity.DB().Preload("Typem").Preload("Evidence").Preload("Gender").Preload("Role").Raw("SELECT * FROM members").Find(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}

// function สำหรับลบ member ด้วย ID
// DELETE /member/:id
func DeleteMember(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM members WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /member
func UpdateMember(c *gin.Context) {
	var member entity.Member
	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", member.ID).First(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	if err := entity.DB().Save(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": member})
}
