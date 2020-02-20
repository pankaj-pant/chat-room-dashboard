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
import Button from "@material-ui/core/Button";
import Graph from "./Graph";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

/* Table sorting functions - Material UI*/
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

/* Table head data - Material UI */
const headCells = [
  { id: "date", numeric: true, disablePadding: false, label: "Date" },
  {
    id: "conversation_count",
    numeric: true,
    disablePadding: true,
    label: "Conversation count"
  },
  {
    id: "visitors_with_conversation_count",
    numeric: true,
    disablePadding: false,
    label: "Visitors with conversation count"
  },
  {
    id: "missed_chat_count",
    numeric: true,
    disablePadding: false,
    label: "Missed chat count"
  }
];

/* Function for rendering the Table Head - Material UI */
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

/* Table head prop type - Material UI */
EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

/* Table styling */
const useStyles = makeStyles(theme => ({
  root: {
    width: "95%",
    margin: "1px auto"
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

/* Function for rendering the Table */
const DashboardTable = ({ chatData }) => {
  /* Sorting and Pagination states */
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  /* Display graph or table state */
  const [isGraph, setIsGraph] = useState(false);
  /* Popup state */
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: ""
  });

  /* Functions for sorting and pagination */
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /* Function for switching data visualisation to either table or graph
     also displays a warning when graph display has too much data which
     affects readibility.
     
     !!!Console error 'Attribute Width' appears if more than 21 entries 
     are displayed on the graph!!!
  */
  const handleVisualizeData = () => {
    if (!isGraph && rows.length > 16) {
      setPopup({
        open: true,
        severity: "warning",
        message: `Consider selecting a shorter date range (< 16 days) for better readibility!`
      });
    }
    setIsGraph(!isGraph);
  };

  /* Function for rendering Visualise data button */
  const visualiseDataButton = text => {
    return (
      <Button variant="contained" color="primary" style={{backgroundColor:"#7357FF"}} onClick={handleVisualizeData}>
        {text}
      </Button>
    );
  };

  /* Function for closing popup */
  const handleAlertClose = event => {
    setPopup(false);
  };

  let rows = [];
  if (chatData) {
    rows = chatData;
  }

  const rowsPerPage = 5;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* Visualise data button */}
      {isGraph
        ? visualiseDataButton("Visualize Data as a Table")
        : visualiseDataButton("Visualize Data as a Graph")}

      {isGraph ? (
        /* Render Graph */
        <Graph data={rows} />
      ) : (
        /* Render Table */
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
                        <TableCell align="right">
                          {row.conversation_count}
                        </TableCell>
                        <TableCell align="right">
                          {row.visitors_with_conversation_count}
                        </TableCell>
                        <TableCell align="right">
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
      {/* Popup */}
      <Snackbar
        open={popup.open}
        autoHideDuration={5000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity={popup.severity}>
          {popup.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DashboardTable;
