package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"

	"github.com/sut65/team18/entity"
	"golang.org/x/crypto/bcrypt"
)

func SetupPasswordHash(pwd string) string {
	var password, _ = bcrypt.GenerateFromPassword([]byte(pwd), 14)
	return string(password)
}

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
	if tx := entity.DB().Where("id = 4", member.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Role not found"})
		return
	}

	createuserlogin := entity.User{
		Name:     member.Email,
		Password: SetupPasswordHash(member.Password),
		Role:     role,
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
		Role:     role,
		User:     createuserlogin,
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
	if err := entity.DB().Preload("Typem").Preload("Evidence").Preload("Gender").Preload("Role").
		Raw("SELECT * FROM members WHERE deleted_at is null").Find(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": member})
}

// function สำหรับลบ member ด้วย ID
// DELETE /member/:id
func DeleteMember(c *gin.Context) {
	id := c.Param("id")
	var member entity.Member
	if err := entity.DB().Raw("SELECT * FROM members WHERE id = ?", id).Scan(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var user entity.User
	if err := entity.DB().Raw("SELECT * FROM users WHERE id = ?", member.UserID).Scan(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// UPDATE user SET deleted_at="now" WHERE id = ?;
	if tx := entity.DB().Where("id = ?", user.ID).Delete(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}
	// UPDATE member SET deleted_at="now" WHERE id = ?;
	if tx := entity.DB().Where("id = ?", member.ID).Delete(&member); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	// if tx := entity.DB().Exec("DELETE FROM users WHERE id = ?", member.UserID); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
	// 	return
	// }
	// if tx := entity.DB().Exec("DELETE FROM members WHERE id = ?", id); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
	// 	return
	// }

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// / PUT /member
func UpdateMember(c *gin.Context) {
	var member entity.Member
	var newmember entity.Member
	var typem entity.Typem
	var evidence entity.Evidence
	var gender entity.Gender
	var user entity.User

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", member.ID).First(&newmember); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	//---------------------------------------ค้นหา id ของ combobox แล้วupdate-------------------------------
	if tx := entity.DB().Where("id = ?", member.TypemID).First(&typem); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Type not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", member.EvidenceID).First(&evidence); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Evidence not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", member.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", member.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
		return
	}

	//-------------------------------------------------------------------------------------------
	newmember.Name = member.Name
	newmember.Email = member.Email
	newmember.Password = member.Password
	newmember.Bdate = member.Bdate
	newmember.Age = member.Age
	newmember.Typem = typem
	newmember.Gender = gender
	newmember.Evidence = evidence
	newmember.User = user

	user.Name = newmember.Email
	user.Password = SetupPasswordHash(newmember.Password)

	if err := entity.DB().Save(&newmember).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Save(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newmember})
}
