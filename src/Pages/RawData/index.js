import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columnNames = ["Year", "US", "Canada", "UK", "Moldova"];
const allData = [
  ["1...150", "N/A", "N/A", "N/A", "N/A"],
  [151, "test", "test", "test", "test"],
  [152, "test", "test", "test", "test"],
  [153, "test", "test", "test", "test"],
  [151, "test", "test", "test", "test"],
  [152, "test", "test", "test", "test"],
  [153, "test", "test", "test", "test"],
  [151, "test", "test", "test", "test"],
];
const columns = columnNames.map((column) => {
  return {
    id: column.toLowerCase(),
    label: column,
    minWidth: 70,
    align: "left",
  };
});

function createData(row) {
  var result = {};
  row.forEach((key, i) => (result[columnNames[i].toLowerCase()] = key));
  return result;
}
const rows = allData.map((row) => {
  return createData(row);
});

export default function RawData() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={1}>
                Chronology
              </TableCell>
              <TableCell align="center" colSpan={5}>
                Countries
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
