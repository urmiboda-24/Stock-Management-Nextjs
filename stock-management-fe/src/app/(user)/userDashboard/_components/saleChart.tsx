import CustomLineChart from "@/components/customLineChart";
import { RootState } from "@/store/store";
import { ExpandLess } from "@mui/icons-material";
import { Typography, Button, Divider, styled, Box } from "@mui/material";
import { ChartOptions } from "chart.js";
import { useState } from "react";
import { useSelector } from "react-redux";

const SaleChat = () => {
  const { stockList } = useSelector((state: RootState) => state.userDashboard);
  const saleChartData = stockList.length > 0 ? stockList[0] : [];
  const [isWeek, setIsWeek] = useState<boolean>(true);
  const onWeekMonthClick = (type: string) => {
    setIsWeek(type !== "Month");
  };

  const getData = () => {
    return {
      labels: isWeek ? saleChartData.week : saleChartData.month,
      datasets: [
        {
          label: "",
          data: isWeek ? saleChartData.week_value : saleChartData.month_value,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          tension: 0.4,
          fill: true,
        },
      ],
    };
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        display: false,
        title: {
          display: false,
        },
      },
    },
  };

  return (
    <SaleCharContainer>
      <SaleInfoBox>
        <InfoBox>
          <Typography variant="h6">Sales Value</Typography>
          <ValueTypo variant="h5">$90.75</ValueTypo>
          <DayTypo variant="h5">
            Yesterday{" "}
            <DayBox>
              <ExpandLess />
              30.03%
            </DayBox>
          </DayTypo>
        </InfoBox>
        <SaleButtonBox>
          <Button
            onClick={() => onWeekMonthClick("Week")}
            className={isWeek ? "selectedButton" : "notSelectedBtn"}
          >
            Week
          </Button>
          <Button
            onClick={() => onWeekMonthClick("Month")}
            className={!isWeek ? "selectedButton" : "notSelectedBtn"}
          >
            Month
          </Button>
        </SaleButtonBox>
      </SaleInfoBox>
      <Divider />
      <CustomLineChart
        data={getData()}
        options={options}
        className="chartBox"
      />
    </SaleCharContainer>
  );
};

export default SaleChat;

const SaleCharContainer = styled(Box)({
  backgroundColor: "#acebfd",
  borderRadius: "10px",
  margin: "10px 0 1.5rem 0",
  padding: "20px",
  "& .chartBox": {
    maxHeight: 300,
    width: "100% !important",
  },
});

const SaleInfoBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 25,
});

const InfoBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const ValueTypo = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "bold",
  lineHeight: 1.6,
});

const DayTypo = styled(Typography)({
  fontSize: "0.875em",
  fontWeight: 400,
  lineHeight: 1.6,
  display: "flex",
  alignItems: "center",
});

const DayBox = styled(`span`)({
  display: "flex",
  alignItems: "center",
  color: "green",
  flexDirection: "row",
});

const SaleButtonBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  height: "31px",
  "& .selectedButton": {
    backgroundColor: "#61dafb",
    color: "#262b40",
    fontSize: 14,
    fontWeight: 600,
    textTransform: "none",
    borderRadius: "0.5rem",
    height: "100%",
    "&:hover": {
      backgroundColor: "#61dafb",
      color: "#262b40",
    },
  },
  "& .notSelectedBtn": {
    backgroundColor: "#262b40",
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    textTransform: "none",
    borderRadius: "0.5rem",
    height: "100%",
    "&:hover": {
      backgroundColor: "#262b40",
      color: "#fff",
    },
  },
});
