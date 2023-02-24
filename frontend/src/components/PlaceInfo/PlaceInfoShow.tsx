
import { Box, Button, Container, IconButton, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";

import { ListPlaceInfolist } from '../../services/PlaceInfoHttpClientService';
import { ExerciseProgramInterface } from '../../models/ExerciseProgram/IExerciseProgram';
import EditIcon from '@mui/icons-material/Edit';
import PlaceInfoDelete from './PlaceInfoDelete';
import { PlaceinfoInterface } from '../../models/IPlaceInfo';
import { id } from 'date-fns/locale';
import moment from 'moment';

function PlaceInfoShow() {


    const [placeinfolist, setPlaceInfolist] = useState<PlaceinfoInterface[]>([])
    const getPlaceInfolist = async () => {
        let res = await ListPlaceInfolist();
        if (res.data) {
            console.log(res)
            setPlaceInfolist(res.data);
        }
    };

    useEffect(() => {
        
        
        setPlaceInfolist(JSON.parse(localStorage.getItem("lid") || ""));
        
        getPlaceInfolist();

    }, []);

    const columns: GridColDef[] = [
        { field: "ID", headerName: "ID", width: 100, headerAlign: "center", align: "center" },
        
        { field: "Service.TypeP", headerName: "สถานบริการ", width: 200, headerAlign: "center", align: "center", renderCell: (params: GridRenderCellParams<any>) => {
            return <>{params.row.Service.TypeP}</>;
          },},
        { field: "Ocd.Days", headerName: "วันทำการ", width: 200, headerAlign: "center", align: "center", renderCell: (params: GridRenderCellParams<any>) => {
            return <>{params.row.Ocd.Days}</>;
          }, },
        { field: "Oct.Times", headerName: "ระยะเวลาเปิด - ปิด", width: 200, headerAlign: "center", align: "center", renderCell: (params: GridRenderCellParams<any>) => {
            return <>{params.row.Oct.Times}</>;
          }, },
        { field: "Hours", headerName: "จำนวนชั่วโมง", width: 130, headerAlign: "center", align: "center" },
        { field: "Detail", headerName: "รายละเอียดเพิ่มเติม", width: 200, headerAlign: "center", align: "center" },
        {
          field: "PDate",
          headerName: "วัน เวลา ที่ทำ",
          width: 220,
          align: "center",
          headerAlign: "center",
          renderCell: (params: GridRenderCellParams<any>) => {
            return (
              <>
                {`${moment(params.row.PDate).format(
                  "DD/MM/YYYY"
                )}    ${moment(params.row.PDate).format(
                  "HH:mm"
                )} น.`}
              </>
            );
          },
        },
        
        {
            field: "แก้ไขข้อมูล",
            align: "center",
            headerAlign: "center",
            width: 120,
            renderCell: ({ row }: Partial<GridRowParams>) =>
              <IconButton  component={RouterLink}
              to="/place/place_edit"
                  size="small"
                  color="primary"
                  onClick={() => {
                      console.log("ID", row.ID)
                      localStorage.setItem("pid", row.ID);
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
              return <PlaceInfoDelete params={params.row.ID} />;
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
                            รายการข้อมูลสถานที่
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/place/place_create"
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
                        rows={placeinfolist}
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
export default PlaceInfoShow