import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Button from '@material-ui/core/Button';
import Graph from "./Graph";

function createData(
  conversation_count,
  missed_chat_count,
  visitors_with_conversation_count,
  date
) {
  return {
    conversation_count,
    missed_chat_count,
    visitors_with_conversation_count,
    date
  };
}

let rows = [
  createData(11, 1, 11, "2017-05-02"),
  createData(10, 4, 9, "2017-05-03"),
  createData(9, 3, 9, "2017-05-04"),
  createData(7, 2, 7, "2017-05-05"),
  createData(9, 3, 9, "2017-05-08"),
  createData(13, 3, 13, "2017-05-09"),
  createData(9, 7, 9, "2017-05-10")
];

console.log("Rows", rows[0]);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  { id: "date", numeric: true, disablePadding: false, label: "Date" },
  {
    id: "conversation_count",
    numeric: true,
    disablePadding: true,
    label: "conversation_count"
  },
  {
    id: "visitors_with_conversation_count",
    numeric: true,
    disablePadding: false,
    label: "visitors_with_conversation_count"
  },
  {
    id: "missed_chat_count",
    numeric: true,
    disablePadding: false,
    label: "missed_chat_count"
  }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "95%",
    margin: "1px auto",
    /* border: "1px solid red" */
  },
  table: {
    alignItems: "center",
    minWidth: "760px"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));

export default function DashboardTable({ chatData }) {
  console.log("Inside Table");

  const [isGraph, setIsGraph] = useState(false);

  if (chatData) {
    rows = chatData.map(d =>
      createData(
        d.conversation_count,
        d.missed_chat_count,
        d.visitors_with_conversation_count,
        d.date
      )
    );
    console.log("New Rows", rows);
  }

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      
        {isGraph ? (
          <Button variant="contained" color="primary" onClick={() => setIsGraph(!isGraph)}>Visualize Data as a Table</Button>
        ) : (
          <Button variant="contained" color="primary" onClick={() => setIsGraph(!isGraph)}>Visualize Data as a Graph</Button>
        )}
        {isGraph ? (
          <Graph graphData={rows}/>
        ) : (
          <>
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size="medium"
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow hover tabIndex={-1} key={row.date}>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            
                            align="right"
                           
                          >
                            {row.date}
                          </TableCell>
                          <TableCell align="right" >{row.conversation_count}</TableCell>
                          <TableCell align="right" >
                            {row.visitors_with_conversation_count}
                          </TableCell>
                          <TableCell align="right" >
                            {row.missed_chat_count}
                          </TableCell>
                         
                         
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 33 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
            />
          </>
        )}
     
    </div>
  );
}
