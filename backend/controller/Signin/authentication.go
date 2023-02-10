package controller

import (

	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team18/entity"
	"github.com/sut65/team18/services"
	
)

type LoginPayload struct {
	User     string `json:"username"`
	Password string `json:"password"`
}

type EmResponse struct {
	Token    string  
	UserID   uint   `json:"user_id"`
	EmpID    entity.Employee   `json:"user"`
	RoleName string `json:"role_name"`
}

type MemberResponse struct {
	Token    string        
	UserID       uint      `json:"user_id"`
	MemID	entity.Member   `json:"user"`
	RoleName string        `json:"role_name"`
}


// POST /signin
func Signin(c *gin.Context) {
	var payload LoginPayload
	var user entity.User
	

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ค้นหา login ด้วย Username ที่ผู้ใช้กรอกมา
	if err := entity.DB().Preload("Role").Raw("SELECT * FROM users WHERE name = ?", payload.User).Find(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ตรวจสอบ Password
	err := services.VerifyPassword(user.Password, payload.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user credentials"})
		return
	}

	jwtWrapper := services.JwtWrapper{
		SecretKey:      "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:         "AuthService",
		ExpirationHour: 24,
	}

	
	var AdminRole entity.Role
	var MemberRole entity.Role
	var StaffRole entity.Role
	var TrainerRole entity.Role
	entity.DB().Raw("SELECT * FROM roles WHERE name = ?", "admin").First(&AdminRole)
	entity.DB().Raw("SELECT * FROM roles WHERE name = ?", "member").First(&MemberRole)
	entity.DB().Raw("SELECT * FROM roles WHERE name = ?", "staff").First(&StaffRole)
	entity.DB().Raw("SELECT * FROM roles WHERE name = ?", "trainer").First(&TrainerRole)

	signedToken, err := jwtWrapper.GenerateToken(user.ID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}


	if  user.Role.ID == MemberRole.ID{
		var member entity.Member
		if tx := entity.DB().
			Raw("SELECT * FROM members WHERE user_id = ?", user.ID).Find(&member); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "memberrs not found"})
			return
		}

		tokenResponse := MemberResponse {
			Token:   signedToken,
			UserID:   user.ID,         
			MemID:	   member,          
			RoleName: MemberRole.Name,        
		}
		c.JSON(http.StatusOK, gin.H{"data": tokenResponse})

	} else if user.Role.ID  ==  AdminRole.ID {
		
        var em entity.Employee
		if tx := entity.DB().
			Raw("SELECT * FROM employees WHERE user_id = ?", user.ID).Find(&em); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "admins not found"})
			return
		}
		tokenResponse := EmResponse{
			Token:      signedToken,
			EmpID:      em,
			UserID:     user.ID,
			RoleName:   AdminRole.Name,
		}
		c.JSON(http.StatusOK, gin.H{"data": tokenResponse})

	} else if user.Role.ID  ==  StaffRole.ID {
		
        var em entity.Employee
		if tx := entity.DB().
			Raw("SELECT * FROM employees WHERE user_id = ?", user.ID).Find(&em); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "admins not found"})
			return
		}
		tokenResponse := EmResponse{
			Token:      signedToken,
			EmpID:      em,
			UserID:     user.ID,
			RoleName:   StaffRole.Name,
		}
		c.JSON(http.StatusOK, gin.H{"data": tokenResponse})

	} else if user.Role.ID  ==  TrainerRole.ID {
		
        var em entity.Employee
		if tx := entity.DB().
			Raw("SELECT * FROM employees WHERE user_id = ?", user.ID).Find(&em); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "admins not found"})
			return
		}
		tokenResponse := EmResponse{
			Token:      signedToken,
			EmpID:      em,
			UserID:     user.ID,
			RoleName:   TrainerRole.Name,
		}
		c.JSON(http.StatusOK, gin.H{"data": tokenResponse})

	}
	

}

// GET /valid
// validation token
func Validation(c *gin.Context) {
	clientToken := c.Request.Header.Get("Authorization")
	if clientToken == "" {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "No Authorization header provided",
		})
		return
	}

	extractedToken := strings.Split(clientToken, "Bearer ")

	if len(extractedToken) == 2 {
		clientToken = strings.TrimSpace(extractedToken[1])
	} else {
		c.JSON(http.StatusBadGateway, gin.H{"error": "Incorrect Format of Authorization Token", "len": extractedToken})
		return
	}

	jwtWrapper := services.JwtWrapper{
		SecretKey: "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:    "AuthService",
	}

	claims, err := jwtWrapper.ValidateToken(clientToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "Valid Ok",
		"data":   claims,
	})
}
