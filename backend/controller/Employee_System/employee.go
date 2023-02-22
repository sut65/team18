package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"

	"github.com/sut65/team18/entity"
)

func SetupPasswordHash(pwd string) string {
	var password, _ = bcrypt.GenerateFromPassword([]byte(pwd), 14)
	return string(password)
}

// โครงสร้างตัวควบคุม database
// POST //Employee
func CreateEmployee(c *gin.Context) { // c รับข้อมูลมาจาก api
	var employee entity.Employee //การประกาศตัวแปรให้เป็นไทป์ที่เราสร้างขึ้นเอง
	var education entity.Education
	var role entity.Role
	var gender entity.Gender

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร foodsickeness
	// c.ShouldBindJSON  คือการผูกข้อมูลที่ได้จากหน้า frontend ให้เข้ากับ structure(โครงสร้าง) ของ backend
	if err := c.ShouldBindJSON(&employee); err != nil {
		// c.JSON เปลี่ยนข้อมูลที่มีให้เป็นนข้อมูลแบบ json
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//แทรกvilid
	if _, err := govalidator.ValidateStruct(employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//tx.RowsAffected == 0 คือมัน err
	// : ค้นหา education ด้วย id
	if tx := entity.DB().Where("id = ?", employee.EducationID).First(&education); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Education not found"})
		return
	}

	// : ค้นหา role ด้วย id
	if tx := entity.DB().Where("id = ?", employee.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Role not found"})
		return
	}

	// : ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", employee.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}

	createuserlogin := entity.User{
		Name:     employee.Email,
		Password: SetupPasswordHash(employee.Password),
		Role:     role,
	}
	password, _ := bcrypt.GenerateFromPassword([]byte(employee.Password), 14)

	// : สร้างตาราง Employee_System
	ps := entity.Employee{
		Name:      employee.Name,    // โยงความสัมพันธ์กับ Entity name
		Tel:       employee.Tel,     // โยงความสัมพันธ์กับ Entity email
		Email:     employee.Email,   // โยงความสัมพันธ์กับ Entity tel
		Password:  string(password), // ตั้งค่าฟิลด์ password
		Gender:    gender,           // โยงความสัมพันธ์กับ Entity gender
		Role:      role,             // โยงความสัมพันธ์กับ Entity role
		Education: education,        // โยงความสัมพันธ์กับ Entity education
		DOB:       employee.DOB,     // ตั้งค่าฟิลด์ DOB
		User:      createuserlogin,
	}


	// ขั้นตอนการ validate
	if _, err := govalidator.ValidateStruct(ps); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// : บันทึก
	if err := entity.DB().Create(&ps).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": ps}) //ส่ง ps กลับไปตรงที่ fetch ที่เราเรียกใช้
}

//--------------------- ดึงข้อมูล --------------------

// GET /Employee/:id
func GetEmployee(c *gin.Context) {
	var employee entity.Employee
	id := c.Param("id") //มาจาก api จากใน main.go
	if err := entity.DB().Preload("Education").Preload("Role").Preload("Gender").Raw("SELECT * FROM employees WHERE id = ?", id).Scan(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

//------- ค้นหา id 
func GetEmployeebyID(c *gin.Context) {
	var employee []entity.Employee
	id := c.Param("id")		// .Preload("id") -> ดึงตารางย่อยมา												// WHERE user_id = ? จะค้นหาเฉพาะข้อมูลของ user(admin) ที่ login เข้ามาใช้งาน
	if err := entity.DB().Preload("Education").Preload("Role").Preload("Gender").Raw("SELECT * FROM employees", id).Find(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

// ค้าหา id แบบตัว GetEmployeebyID
// สร้าง id ของ user ที่เพิ่มเข้าไป
func GetEmployeeByUserID(c *gin.Context) {
	var employee entity.Employee
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM employees WHERE user_id = ?", id).Scan(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

// GET /Employees
func ListEmployees(c *gin.Context) {																		// WHERE deleted_at is null เพิ่มล่าสุด
	var employees []entity.Employee																			// .Scan -> .Find  ทำให้สามารถโชข้อมูลหน้า show รูปแบบ string ได้
	if err := entity.DB().Preload("Education").Preload("Role").Preload("Gender").Raw("SELECT * FROM employees WHERE deleted_at is null").Find(&employees).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": employees})
}

// DELETE /Employees/:id
func DeleteEmployee(c *gin.Context) {
	id := c.Param("id")
	// var employee entity.Employee
	// if err := entity.DB().Raw("SELECT * FROM employees WHERE id = ?", id).Scan(&employee).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	// var user entity.User
	// if err := entity.DB().Raw("SELECT * FROM users WHERE id = ?", employee.UserID).Scan(&user).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// // UPDATE user SET deleted_at="now" WHERE id = ?;
	// if tx := entity.DB().Where("id = ?", user.ID).Delete(&user); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
	// 	return
	// }
	// // UPDATE member SET deleted_at="now" WHERE id = ?;
	// if tx := entity.DB().Where("id = ?", employee.ID).Delete(&employee); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
	// 	return
	// }
	
	if tx := entity.DB().Exec("DELETE FROM employees WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}



// PATCH or PUT /Employees
func UpdateEmployee(c *gin.Context) {
	var employee entity.Employee
	var newEmployee entity.Employee


	if err := c.ShouldBindJSON(&newEmployee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", newEmployee.ID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "employee not found"})
		return
	}

	//-------Id ของ Combobox------------------------
	var education entity.Education
	var role entity.Role
	var gender entity.Gender

	// : ค้นหา education ด้วย id
	if tx := entity.DB().Where("id = ?", newEmployee.EducationID).First(&education); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Education not found"})
		return
	}

	// : ค้นหา role ด้วย id
	if tx := entity.DB().Where("id = ?", newEmployee.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Role not found"})
		return
	}

	// : ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", newEmployee.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}

	//Combobox
	employee.Education = education
	employee.Role = role
	employee.Gender = gender

	//TextField
	employee.Name = newEmployee.Name
	employee.Tel = newEmployee.Tel
	employee.Email = newEmployee.Email
	employee.Password = newEmployee.Password
	employee.DOB = newEmployee.DOB


	if err := entity.DB().Save(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

