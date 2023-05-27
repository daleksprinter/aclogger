import React, {Component, useState} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  Box, IconButton
} from '@mui/material';
import {TablePagination} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import {Submit} from "../../modules/submit";
import {FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage} from "@mui/icons-material";

function TablePaginationActions(props: any) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

interface AppProps{
    data: Submit[]
}
interface AppState{
    page:number
    rowsperpage: number
}
const SubmissionHistories = (props: AppProps) => {
  const [page, setPage] = useState(0)
  const [rowsperpage, setRowsperpage] = useState(5)
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        setPage(page)
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
     setPage(0)
     setRowsperpage(parseInt(event.target.value, 10))
  };
    return (
      <Paper style={{position:"relative", padding:'1%'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Submission Date</TableCell>
              <TableCell align="center">Judge</TableCell>
              <TableCell align="center">Contest Name</TableCell>
              <TableCell align="center">Problem Name</TableCell>
              <TableCell align="center">Point</TableCell>
              <TableCell align="center">Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsperpage > 0
            ? props.data.slice(page * rowsperpage, page * rowsperpage + rowsperpage)
            : props.data
            ).map((s) => (
              <TableRow key = 'hoge' onClick = {() => window.open(s.url, "_blank")}>
                <TableCell align="left">{s.getDateString()}</TableCell>
                <TableCell align="center" >{s.getSite().getStr()}</TableCell>
                <TableCell align="center">{s.contest}</TableCell>
                <TableCell align="center">{s.title}</TableCell>
                <TableCell align="center">{s.point}</TableCell>
                <TableCell align="center">{s.result.getStatus()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={props.data.length}
                  rowsPerPage={rowsperpage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
}
export default SubmissionHistories;
