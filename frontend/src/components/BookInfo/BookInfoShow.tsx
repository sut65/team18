
import { Box, Button, Container, IconButton, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";

import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import { BookInfoInterface } from '../../models/IBookInfo';
import { GetBookInfolist, ListBookInfobyMember } from '../../services/BookInfoHttpClientService';
import BookInfoDelete from './BookInfoDelete';
import { id } from 'date-fns/locale';
import { MemberInterface } from '../../models/IMember';

function BookInfoShow() {


    const [bookinfolist, setBookInfolist] = useState<BookInfoInterface[]>([])
    const [member, setMember] = useState<MemberInterface>({});
    const getBookInfolist = async (id:any) => {
      console.log(bookinfolist)
        let res = await ListBookInfobyMember(id);
        if (res) {
            console.log(res.data)
            setBookInfolist(res);
        }
        console.log(bookinfolist)
    };

    useEffect(() => {
      const getToken = localStorage.getItem("token");
        if (getToken) {
        
        
        
        const x = JSON.parse(localStorage.getItem("lid") || "")
        setMember(x)
        console.log(x)
        getBookInfolist(x.ID);
        }
    }, []);

    const columns: GridColDef[] = [
        { field: "ID", headerName: "ID", width: 100, headerAlign: "center", align: "center" },
        
        { field: "Service.TypeP", headerName: "สถานบริการ", width: 200, headerAlign: "center", align: "center", renderCell: (params: GridRenderCellParams<any>) => {
            return <>{params.row.Service.TypeP}</>;
          },},
        { field: "Place.Locate", headerName: "จุดบริการ", width: 200, headerAlign: "center", align: "center", renderCell: (params: GridRenderCellParams<any>) => {
            return <>{params.row.Place.Locate}</>;
          }, },
        { field: "TimePeriod.Period", headerName: "ระยะเวลาการจอง", width: 200, headerAlign: "center", align: "center", renderCell: (params: GridRenderCellParams<any>) => {
            return <>{params.row.TimePeriod.Period}</>;
          }, },
        { field: "Tel", headerName: "เบอร์โทรติดต่อ", width: 200, headerAlign: "center", align: "center" },
        {
          field: "BDate",
          headerName: "วัน เวลา ที่ทำการจอง",
          width: 220,
          align: "center",
          headerAlign: "center",
          renderCell: (params: GridRenderCellParams<any>) => {
            return (
              <>
                {`${moment(params.row.BDate).format(
                  "DD/MM/YYYY"
                )}    ${moment(params.row.BDate).format(
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
              to="/place_booking/place_booking_edit"
                  size="small"
                  color="primary"
                  onClick={() => {
                      console.log("ID", row.ID)
                      localStorage.setItem("bid", row.ID);
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
              return <BookInfoDelete params={params.row.ID} />;
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
                            รายการจองข้อมูลสถานที่
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/place_booking/place_booking_create"
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
                        rows={bookinfolist}
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

export default BookInfoShow