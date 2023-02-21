package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"

	"github.com/sut65/team18/entity"
)

// POST /equipmentList
func CreateEquipmentList(c *gin.Context) {
	var employee entity.Employee
	var equipmentList entity.EquipmentList
	var equipmentName entity.EquipmentName
	var runNumber entity.RunNumber

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ x จะถูก bind เข้าตัวแปร member
	if err := c.ShouldBindJSON(&equipmentList); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา typem ด้วย id
	if tx := entity.DB().Where("id = ?", equipmentList.EquipmentNameID).First(&equipmentName); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Equipment name not found"})
		return
	}

	// ค้นหา evidencet ด้วย id
	if tx := entity.DB().Where("id = ?", equipmentList.RunNumberID).First(&runNumber); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Run number not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", equipmentList.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
		return
	}

	//สร้าง ตารางequipmentList
	el := entity.EquipmentList{

		Detail: 		equipmentList.Detail,
		Employee:      	employee,
		EquipmentName: 	equipmentName,
		RunNumber:     	runNumber,
		DateTime: 		equipmentList.DateTime,
	}
	// ขั้นตอนการ validate
	if _, err := govalidator.ValidateStruct(el); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&el).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": el})

}

// GET /equiment/:id
func GetEquipmentList(c *gin.Context) {
	var equipmentList entity.EquipmentList
	id := c.Param("id")
	if err := entity.DB().Preload("Employee").Preload("RunNumber").Preload("EquipmentName").
	Raw("SELECT * FROM equipment_lists WHERE id = ?", id).Find(&equipmentList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmentList})
}

func GetEquipmentListShow(c *gin.Context) {
	var equipmentList []entity.EquipmentList
	id := c.Param("id")
	if err := entity.DB().Preload("Employee").Preload("RunNumber").Preload("EquipmentName").
	Raw("SELECT * FROM equipment_lists WHERE employee_id = ? = ?", id).Find(&equipmentList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmentList})
}

func ListEquipmentList(c *gin.Context) {
	var equipmentList []entity.EquipmentList
	if err := entity.DB().Preload("Employee").Preload("RunNumber").Preload("EquipmentName").
	Raw("SELECT * FROM equipment_lists").Find(&equipmentList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmentList})
}

// function สำหรับลบ equipmentList ด้วย ID
// DELETE /equipmentList/:id
func DeleteEquipmentList(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM equipment_lists WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "equipment_lists not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /equipmentList
func UpdateEquipmentList(c *gin.Context) {
	var equipmentList entity.EquipmentList
	var newEquipmentList entity.EquipmentList

	if err := c.ShouldBindJSON(&newEquipmentList); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", newEquipmentList.ID).First(&equipmentList); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "equipment_lists not found"})
		return
	}

	var employee entity.Employee
	var equipmentname entity.EquipmentName
	var runnumber entity.RunNumber

	// ค้นหา employee ด้วย id
	if tx := entity.DB().Where("id = ?", newEquipmentList.EmployeeID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Employee not found"})
		return
	}

	// ค้นหา equipmentname ด้วย id
	if tx := entity.DB().Where("id = ?", newEquipmentList.EquipmentNameID).First(&equipmentname); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Equipmentname not found"})
		return
	}

	// ค้นหาrunnumber ด้วย id
	if tx := entity.DB().Where("id = ?", newEquipmentList.RunNumberID).First(&runnumber); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Runnumber not found"})
		return
	}
	equipmentList.Employee = employee
	equipmentList.Detail	= newEquipmentList.Detail
	equipmentList.EquipmentName = equipmentname
	equipmentList.RunNumber = runnumber
	equipmentList.DateTime	= newEquipmentList.DateTime

	if _, err := govalidator.ValidateStruct(equipmentList); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&equipmentList).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipmentList})
}
