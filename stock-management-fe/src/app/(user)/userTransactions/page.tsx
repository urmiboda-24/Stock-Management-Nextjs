"use client";
import CommonTextField from "@/components/customTextField";
import CommonNavigation from "@/components/navigation";
import { Search, Settings, MoreVert } from "@mui/icons-material";
import {
  Box,
  Menu,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  IconButton,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormLabel,
  TextField,
  Select,
  Button,
  FormHelperText,
  Paper,
  TableContainer,
  Typography,
  styled,
} from "@mui/material";
import page from "../userDashboard/page";
import { transactionColumns } from "@/utils/constants/userTransaction";
import {
  ITransactionAttr,
  ITransactionPayload,
} from "@/utils/interface/transactions";
import { useEffect, useState } from "react";
import { transactionSchema } from "@/utils/schema";
import { useFormik } from "formik";
import { showToast } from "@/components/toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getTransaction } from "@/store/thunk/transactions";

const Transactions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { total, transactionList } = useSelector(
    (state: RootState) => state.transaction
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleSettingClose = () => {
    setAnchorEl(null);
  };
  const [anchorElTable, setAnchorElTable] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<string | null | number>(null);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [orderBy, setOrderBy] = useState<string>("id");
  const [order, setOrder] = useState<"desc" | "asc">("asc");
  const [searchValue, setSearchValue] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [rowPerPagePage, setRowPerPagePage] = useState<number>(5);
  const [initialFormValue, setInitialFormValue] = useState({
    bill_for: "",
    status: "",
    id: "",
  });
  const { errors, touched, handleSubmit, getFieldProps, values } = useFormik({
    initialValues: initialFormValue,
    validationSchema: transactionSchema,
    enableReinitialize: true,
    onSubmit: (value) => {
      console.log("edit", value);
    },
  });

  const handleSettingOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRowOptionChange = (pageValue: number) => {
    setRowPerPagePage(pageValue);
    setPage(1);
  };

  const handleActionClick = (
    event: React.MouseEvent<HTMLElement>,
    rowId: number
  ) => {
    setAnchorElTable(event.currentTarget);
    setSelectedRow(rowId);
  };

  const handleActionClose = () => {
    setAnchorElTable(null);
  };

  const handleEditClick = (rowId: number) => {
    setEditOpen(true);
    // const transactionData = transactionList.filter((data) => data.id === rowId);
    // setInitialFormValue({
    //   bill_for: transactionData[0].bill_title,
    //   status: transactionData[0].status,
    //   id: rowId.toString(),
    // });
  };

  const handleEditDialogClose = () => {
    setEditOpen(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleSort = (columnId: string) => {
    const isAsc = orderBy === columnId && order === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    setOrderBy(columnId);
    setOrder(newOrder);
  };

  const getTransactionData = () => {
    dispatch(
      getTransaction({
        search: searchValue,
        sortBy: orderBy,
        sortOrder: order,
        page: page,
        pageSize: rowPerPagePage,
      })
    );
  };

  const handleSearchChange = (searchValue: string) => {
    setSearchValue(searchValue);
    setPage(1);
  };

  const handleDeleteClick = (rowId: number) => {
    // props.deleteTransactionRequest({
    //   value: { id: rowId.toString() },
    //   callback: onDeleteSuccess,
    // });
  };

  useEffect(() => {
    getTransactionData();
  }, [rowPerPagePage, order, orderBy, searchValue, page]);
  return (
    <>
      <CommonNavigation>
        <SearchWrapper>
          <CommonTextField
            value={searchValue}
            placeholder="Search"
            customStyle={{
              maxWidth: "520px",
              width: "100%",
              marginBottom: 0,
            }}
            startIcon={<Search />}
            onChange={(event) => handleSearchChange(event.target.value)}
          />
          <Box onClick={handleSettingOpen}>
            <Settings />
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleSettingClose}
            onClick={handleSettingClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem disabled>Row Per Page</MenuItem>
            {[5, 10, 15, 20].map((option) => (
              <MenuItem
                key={option}
                selected={rowPerPagePage === option}
                onClick={() => handleRowOptionChange(option)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </SearchWrapper>

        <TablePaper>
          <CustomTableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {transactionColumns.map((column) => {
                    if (column.id === "action" || column.id === "id") {
                      return (
                        <TableCell key={column.id} align={"left"}>
                          {column.label}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id} align={"left"}>
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : "asc"}
                          onClick={() => handleSort(column.id)}
                        >
                          {column.label}
                        </TableSortLabel>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionList.length !== 0 ? (
                  transactionList.map((row: ITransactionAttr) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {transactionColumns.map((column) => {
                          const value =
                            row[column.id as keyof ITransactionAttr];
                          if (column.id === "action") {
                            return (
                              <>
                                <TableCell key={column.id} align="left">
                                  <IconButton
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={(event) =>
                                      handleActionClick(
                                        event,
                                        row?.id as number
                                      )
                                    }
                                  >
                                    <MoreVert />
                                  </IconButton>
                                </TableCell>
                                <ActionMenu
                                  anchorEl={anchorElTable}
                                  open={
                                    Boolean(anchorElTable) &&
                                    selectedRow === row.id
                                  }
                                  onClose={handleActionClose}
                                  onClick={handleActionClose}
                                  transformOrigin={{
                                    horizontal: "right",
                                    vertical: "top",
                                  }}
                                  anchorOrigin={{
                                    horizontal: "right",
                                    vertical: "bottom",
                                  }}
                                >
                                  <MenuItem
                                  // onClick={() => handleEditClick(row.id)}
                                  >
                                    Edit
                                  </MenuItem>
                                  <MenuItem
                                  // onClick={() => handleDeleteClick(row.id)}
                                  >
                                    Delete
                                  </MenuItem>
                                </ActionMenu>
                              </>
                            );
                          }
                          return (
                            <TableCell key={column.id} align="left">
                              {column.id === "status" ? (
                                <span
                                  style={
                                    {
                                      // color: getStatusColor(value as string),
                                    }
                                  }
                                >
                                  {value}
                                </span>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7}>No data found!</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CustomTableContainer>
          <TablePagination
            count={total}
            rowsPerPage={rowPerPagePage}
            page={page - 1}
            onPageChange={handleChangePage}
            className="tablePagination"
            labelRowsPerPage={
              <Box style={{ marginRight: 50 }}>
                Rows per page: {rowPerPagePage}
              </Box>
            }
          />
        </TablePaper>
        <Dialog
          maxWidth="md"
          open={editOpen}
          fullWidth
          onClose={handleEditDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" variant="h5">
            Edit Stock
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <form onSubmit={handleSubmit}>
                <FieldContainer>
                  <FormLabel>Bill For</FormLabel>
                  <TextField
                    {...getFieldProps("bill_for")}
                    type="text"
                    name="bill_for"
                    fullWidth
                    variant="outlined"
                    placeholder="Enter bill for"
                    error={Boolean(errors.bill_for) && touched.bill_for}
                    helperText={(
                      touched.bill_for && errors.bill_for
                    )?.toString()}
                  />
                </FieldContainer>
                <FieldContainer>
                  <FormLabel>Status</FormLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...getFieldProps("status")}
                    fullWidth
                    error={Boolean(errors.status) && touched.status}
                  >
                    <MenuItem value="" disabled>
                      Select Status
                    </MenuItem>
                    <MenuItem value="Paid">Paid</MenuItem>
                    <MenuItem value="Due">Due</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                  <ErrorText>
                    {(touched.status && errors.status)?.toString()}
                  </ErrorText>
                </FieldContainer>
                <EditActionWrapper>
                  <SaveButton type="submit">Save</SaveButton>
                  <CancelButton onClick={handleEditDialogClose}>
                    Cancel
                  </CancelButton>
                </EditActionWrapper>
              </form>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </CommonNavigation>
    </>
  );
};

export default Transactions;

const NewTaskBox = styled(Box)({
  margin: "20px 0px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 10,
});

const ShareExportBox = styled(Box)({
  border: "1px solid #262b40",
  borderRadius: "10px",
  height: "31px",
  "& .export-btn": {
    borderLeft: "1px solid #262b40",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  "& .share-btn": {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
});

const ShareButton = styled(Button)({
  backgroundColor: "#fff",
  color: "#262b40",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: 0,
  maxWidth: "31px",
  height: "100%",
  "&:hover": {
    backgroundColor: "#262b40",
    color: "#fff",
  },
});

const TransactionTitle = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: 400,
});

const SearchWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const TablePaper = styled(Paper)({
  width: "100%",
  overflow: "hidden",
  marginTop: "30px",
  "& .tablePagination": {
    display: "flex",
    justifyContent: "end",
    width: "100%",
  },
  "& .MuiTablePagination-select": {
    display: "none", // Hides the dropdown select for rows per page
  },
});

const CustomTableContainer = styled(TableContainer)({
  maxHeight: 700,
});
const ActionMenu = styled(Menu)({
  "& .MuiPaper-root": {
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important",
  },
});
const FieldContainer = styled(Box)({
  marginTop: "20px",
});
const EditActionWrapper = styled(Box)({
  display: "flex",
  gap: 10,
  alignItems: "center",
  justifyContent: "flex-end",
  marginTop: 10,
});
const SaveButton = styled(Button)({
  backgroundColor: "#262b40",
  color: "#fff",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: "5px",
});

const CancelButton = styled(Button)({
  backgroundColor: "#fff",
  border: "1px solid #262b40",
  color: "#262b40",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: "5px",
});
const NoDataBox = styled(TableCell)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  color: "grey",
  margin: "20px 0",
});
const ErrorText = styled(FormHelperText)({
  color: "#d32f2f",
  margin: "3px 14px 0px 14px",
});
