"use client";
import { visitRows } from "@/utils/constants/userDashboard";
import { ArrowDownward } from "@mui/icons-material";
import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
  styled,
  Typography,
  TableHead,
} from "@mui/material";

const PageVisiter = () => {
  const getPageVisitRate = (rate: number, arrowColor: string) => {
    return (
      <RateBox>
        <ArrowDownward style={{ color: arrowColor }} /> {rate}%
      </RateBox>
    );
  };
  return (
    <VisiterContainer>
      <VisitTitleBox>
        <SeeAllTypo>Page Visit</SeeAllTypo>
        <SeeAllButton>See All</SeeAllButton>
      </VisitTitleBox>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <VisitTableHead>
            <TableRow>
              <TableCell>Page Name</TableCell>
              <TableCell align="right">Page Views</TableCell>
              <TableCell align="right">Page Value</TableCell>
              <TableCell align="right">Bounce rate</TableCell>
            </TableRow>
          </VisitTableHead>
          <TableBody>
            {visitRows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.view}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
                <TableCell align="right">
                  {getPageVisitRate(row.rate.value, row.rate.color)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </VisiterContainer>
  );
};

export default PageVisiter;

const VisiterContainer = styled(Box)({
  borderRadius: "10px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  "&:first-child": {
    borderRadius: "10px",
    background: "#fff",
  },
  "& .dotIcon": {
    fontSize: "14px",
  },
});

const VisitTitleBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  height: "72px",
  justifyContent: "space-between",
  padding: "0 20px",
});

const SeeAllButton = styled(Button)({
  backgroundColor: "#61dafb",
  color: "#262b40",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: "0.5rem",
  height: "31px",
  "&:hover": {
    backgroundColor: "#262b40",
    color: "#fff",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "14px",
  },
});

const SeeAllTypo = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: 600,
});

const VisitTableHead = styled(TableHead)({
  backgroundColor: "#f8f8f8",
  borderBottom: "1px solid #262b40",
});

const RateBox = styled(Box)({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-end",
});
