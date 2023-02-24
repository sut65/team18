
import { Box, Button, Container, IconButton, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";

import { ListExPList } from '../../services/ExerciseprogramHttpClientService';
import { ExerciseProgramInterface } from '../../models/ExerciseProgram/IExerciseProgram';
import EditIcon from '@mui/icons-material/Edit';
import ProgramDelete from './ProgramDelete';

function ProgramShow() {


    const [explist, setExplist] = useState<ExerciseProgramInterface[]>([])
    const getExPList = async () => {
        let res = await ListExPList();
        if (res.data) {
            console.log(res)
            setExplist(res.data);
        }
    };

    useEffect(() => {
        
        
        setExplist(JSON.parse(localStorage.getItem("lid") || ""));
        
        getExPList();

    }, []);

    const columns: GridColDef[] = [
        { field: "ID", headerName: "รายการ", width: 50, headerAlign: "center", align: "center" },
        { field: "ProgramName", headerName: "ชื่อโปรแกรม", width: 210, headerAlign: "center", align: "center", renderCell: (params: GridRenderCellParams<any>) => {
            return <>{params.row.ProgramName}</>},
        },
        { field: "Employee.Name", headerName: "ชื่อเทรนเนอร์", width: 120, headerAlign: "center", align: "center", renderCell: (params: GridRenderCellParams<any>) => {
            return <>{params.row.Employee.Name}</>},
        },
        { field: "WormUp.SetName", headerName: "เซ็ตวอร์มอัพ", width: 150, headerAlign: "center", align: "center", renderCell: (params: GridRenderCellParams<any>) => {
            return <>{params.row.WormUp.SetName}</>;
          },},
        { field: "Exercise.SetName", headerName: "เซ็ตออกกำลังกาย", width: 150, headerAlign: "center", align: "center", renderCell: (params: GridRenderCellParams<any>) => {
            return <>{params.row.Exercise.SetName}</>;
          }, },
        { field: "Stretch.SetName", headerName: "เซ็ตยืดกล้ามเนื้อ", width: 150, headerAlign: "center", align: "center", renderCell: (params: GridRenderCellParams<any>) => {
            return <>{params.row.Stretch.SetName}</>;
          }, },
        { field: "Minute", headerName: "เวลาที่ใช้(นาที)", width: 100, headerAlign: "center", align: "center" },
        {
            field: "แก้ไขข้อมูล",
            align: "center",
            headerAlign: "center",
            width: 85,
            renderCell: ({ row }: Partial<GridRowParams>) =>
              <IconButton  component={RouterLink}
              to="/program/program_edit"
                  size="small"
                  color="primary"
                  onClick={() => {
                      console.log("ID", row.ID)
                      localStorage.setItem("ep_id", row.ID);
                  }}
              >
                <EditIcon />
              </IconButton >,
          },
          {
            field: "ลบ",
            align: "center",
            headerAlign: "center",
            width: 85,
            renderCell: (params: GridRenderCellParams<any>) => {
              return <ProgramDelete params={params.row.ID} />;
            },
            sortable: false,
            description: "ลบ",
          },

    ];



    return (
        <div>
            <Container className="container" maxWidth="lg">
            <Paper
            className="paper"
            elevation={6}
            sx={{
              padding: 2.5,
              borderRadius: 3,
            }}
          >
                <Box
                    display="flex"
                >
                    <Box flexGrow={1}>
                        <Typography
                            component="h2"
                            variant="h5"
                            color="primary"
                            sx={{ fontWeight: 'bold' }}
                            gutterBottom
                        >
                            โปรแกรมออกกำลังกาย
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/program/program_create"
                            variant="contained"
                            color="primary"
                            sx={{ borderRadius: 20, '&:hover': { color: '#065D95', backgroundColor: '#e3f2fd' } }}
                        >
                            เพิ่มข้อมูล
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ borderRadius: 20 }}>
                    <DataGrid
                        rows={explist}
                        getRowId={(row) => row.ID}
                        columns={columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        autoHeight={true}
                        density={'comfortable'}
                        sx={{ mt: 2, backgroundColor: '#fff' }}
                    />
                </Box>
                </Paper>
            </Container>
        </div>
    )
}

export default ProgramShow