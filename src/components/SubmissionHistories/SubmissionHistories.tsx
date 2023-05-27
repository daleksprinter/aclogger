import React, {Component} from 'react';
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
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import './App.css';
import {Submit} from "../../modules/submit";

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
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
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
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
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
export default class SubmissionHistories extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      page: 0,
      rowsperpage:5
    }
  }
  handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    this.setState({
      page:page
    })
  };

  handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      rowsperpage: parseInt(event.target.value, 10),
      page: 0
    })
  };
  render() {
    var keys = Object.keys(this.props.data);
    keys.sort();
    keys.reverse();

    return (
      <Paper className = 'log'>
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
            {(this.state.rowsperpage > 0
            ? this.props.data.slice(this.state.page * this.state.rowsperpage, this.state.page * this.state.rowsperpage + this.state.rowsperpage)
            : this.props.data
          ).map((s) => (
              <TableRow className = "subdet" key = 'hoge' onClick = {() => window.open(s.url, "_blank")}>
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
                count={this.props.data.length}
                rowsPerPage={this.state.rowsperpage}
                page={this.state.page}
                onPageChange={this.handleChangePage}
                onRowsPerPageChange={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
        </TableFooter>
        </Table>
      </Paper>
    );
  }
}


