import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  Box, IconButton
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import './App.css';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
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

export default class SubmissionHistories extends Component {

  constructor() {
    super();
    this.state = {
      page: 0,
      rowsperpage: 30
    }
  }
  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    })
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsperpage: parseInt(event.target.value, 30),
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
          ).map((submit) => (
              <TableRow className = "subdet" key = 'hoge' onClick = {() => window.open(submit.url, "_blank")}>
                <TableCell align="left">{submit.getDateString()}</TableCell>
                <TableCell align="center" >{submit.getSite().getStr()}</TableCell>
                <TableCell align="center">{submit.contest}</TableCell>
                <TableCell align="center">{submit.title}</TableCell>
                <TableCell align="center">{submit.point}</TableCell>
                <TableCell align="center">{submit.result}</TableCell>
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
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
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


