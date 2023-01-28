package controller

import (
	"net/http"

	//"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"

	"github.com/sut65/team18/entity"
)

//โครงสร้างตัวควบคุม database

// POST //Employee
func CreateEmployee(c *gin.Context) { // c รับข้อมูลมาจาก api
	var employee entity.Employee //การประกาศตัวแปรให้เป็นไทป์ที่เราสร้างขึ้นเอง
	var education entity.Education
	var role entity.Role

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร foodsickeness
	// c.ShouldBindJSON  คือการผูกข้อมูลที่ได้จากหน้า frontend ให้เข้ากับ structure(โครงสร้าง) ของ backend
	if err := c.ShouldBindJSON(&employee); err != nil {
		// c.JSON เปลี่ยนข้อมูลที่มีให้เป็นนข้อมูลแบบ json
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//tx.RowsAffected == 0 คือมัน err
	// : ค้นหา education ด้วย id
	if tx := entity.DB().Where("id = ?", employee.EducationID).First(&education); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "education not found"})
		return
	}

	// : ค้นหา role ด้วย id
	if tx := entity.DB().Where("id = ?", employee.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
		return
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(employee.Password), 14)

	// : สร้างตาราง Employee_System
	ps := entity.Employee{
		Name:           employee.Name,      // โยงความสัมพันธ์กับ Entity name
		Tel:        	employee.Tel,  		// โยงความสัมพันธ์กับ Entity email
		Email: 			employee.Email,    	// โยงความสัมพันธ์กับ Entity tel
		Password:		string(password),	// ตั้งค่าฟิลด์ password
		Gender: 		employee.Gender,	// โยงความสัมพันธ์กับ Entity gender
		Role: 			employee.Role,		// โยงความสัมพันธ์กับ Entity role
		Education: 		employee.Education,	// โยงความสัมพันธ์กับ Entity education
		DOB: 			employee.DOB,		// ตั้งค่าฟิลด์ DOB
	}	

	// : บันทึก
	if err := entity.DB().Create(&ps).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": ps}) //ส่ง ps กลับไปตรงที่ fetch ที่เราเรียกใช้
}

// GET /Employee/:id
func GetEmployee(c *gin.Context) {
	var employee entity.Employee
	id := c.Param("id") //มาจาก api จากใน main.go
	if tx := entity.DB().Where("id = ?", id).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

// GET /Employees 
func ListEmployees(c *gin.Context) {
	var employees []entity.Employee
	if err := entity.DB().Preload("Gender").Preload("Role").Preload("Education").Raw("SELECT * FROM employees").Find(&employees).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": employees})
}

// DELETE /Employees/:id
func DeleteEmployee(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM employees WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Employees 
func UpdateEmployee(c *gin.Context) {
	var employee entity.Employee
	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", employee.ID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}
	if err := entity.DB().Save(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}
