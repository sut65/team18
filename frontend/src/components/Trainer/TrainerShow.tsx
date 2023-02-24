
import { Box, Button, Container, IconButton, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";

import { ListExPList } from '../../services/ExerciseprogramHttpClientService';
import { ExerciseProgramInterface } from '../../models/ExerciseProgram/IExerciseProgram';
import EditIcon from '@mui/icons-material/Edit';
import ProgramDelete from './TrainerDelete';
import { TrainerBookingInterface } from '../../models/Trainer/ITrainerBooking';
import { GetTrBListByID, GetTrBListByMemID, ListTrBList } from '../../services/TrainerHttpClientService';
import { MemberInterface } from '../../models/IMember';
import moment from 'moment';
import { id } from 'date-fns/locale';

function TrainerShow() {

    const [trbklist, setTrBklist] = useState<TrainerBookingInterface[]>([])
    const getTrBklist = async (id:any) => {
        let res = await GetTrBListByMemID(id);
        if (res.data) {
            console.log(res)
            setTrBklist(res.data);
        }
    };

    useEffect(() => {
        
        // getTrBklist()
        getTrBklist(JSON.parse(localStorage.getItem("lid") || "").ID);
        
    }, []);

    const columns: GridColDef[] = [
        { field: "ID", headerName: "ID", width: 150, headerAlign: "center", align: "center" },
        { field: "Member.Name", headerName: "สมาชิกที่จอง", width: 120, headerAlign: "center", align: "center", renderCell: (params: GridRenderCellParams<any>) => {
            return <>{params.row.Member.Name}</>},},
        { field: "Employee.Name", headerName: "เทรนเนอร์", width: 240, headerAlign: "center", align: "center", renderCell: (params: GridRenderCellParams<any>) => {
            return <>{params.row.Employee.Name}</>},},
        { field: "ExerciseProgramList.ProgramName", headerName: "โปรแกรมออกกำลังกาย", width: 240, headerAlign: "center", align: "center", renderCell: (params: GridRenderCellParams<any>) => {
            return <>{params.row.ExerciseProgramList.ProgramName}</>},},
        { field: "Training_Time", headerName: "เวลานัดเทรน", width: 240, headerAlign: "center", align: "center", valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY hh:mm A") },
        {
            field: "แก้ไขข้อมูล",
            align: "center",
            headerAlign: "center",
            width: 85,
            renderCell: ({ row }: Partial<GridRowParams>) =>
              <IconButton  component={RouterLink}
              to="/trainer/trainer_edit"
                  size="small"
                  color="primary"
                  onClick={() => {
                      console.log("ID", row.ID)
                      localStorage.setItem("tr_id", row.ID);
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
                            to="/trainer/trainer_create"
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
                        rows={trbklist}
                        getRowId={(row) => row.ID}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
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

export default TrainerShow