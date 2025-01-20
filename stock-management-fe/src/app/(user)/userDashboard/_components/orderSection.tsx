"use client";
import CustomBarChart from "@/components/customBarChart";
import { RootState } from "@/store/store";
import { ExpandLess, FiberManualRecordSharp } from "@mui/icons-material";
import { Box, Typography, styled } from "@mui/material";
import { ChartOptions } from "chart.js";
import { useSelector } from "react-redux";

const OrderSection = () => {
  const { stockList } = useSelector((state: RootState) => state.userDashboard);
  const chart1 = stockList.length ? stockList[1] : [];
  const chart2 = stockList.length ? stockList[2] : [];
  const data = {
    labels: chart1.week,
    datasets: [
      {
        label: "",
        data: chart1.week_value,
        tension: 0.4,
        fill: true,
        barThickness: 12,
        backgroundColor: "rgb(25, 118, 210)",
        barRadius: 10,
      },
      {
        label: "",
        data: chart2.week_value,
        backgroundColor: "rgb(46, 125, 50)",
        tension: 0.4,
        fill: true,
        barThickness: 12,
        borderRadius: 10,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
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
      x: {
        grid: {
          offset: true,
        },
      },
      y: {
        grid: {
          offset: true,
        },
        display: false,
        title: {
          display: false,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 50,
      },
    },
  };
  return (
    <VisiterContainer>
      <OrderTitleBox>
        <OrderInfoBox>
          <AcquisitionTypo>Total Orders</AcquisitionTypo>
          <AcquisitionValue>453</AcquisitionValue>
          <DayBox>
            <ExpandLess />
            30.03%
          </DayBox>
        </OrderInfoBox>
        <Box>
          <StatusBox>
            <FiberManualRecordSharp className="dotIcon" color="primary" />
            <BarChatLabelTypo>
              <span title={chart1.stock_name}>{chart1.stock_name}</span>
            </BarChatLabelTypo>
          </StatusBox>
          <StatusBox>
            <FiberManualRecordSharp className="dotIcon" color="success" />{" "}
            <BarChatLabelTypo>
              <span title={chart2.stock_name}>{chart2.stock_name}</span>
            </BarChatLabelTypo>
          </StatusBox>
        </Box>
      </OrderTitleBox>

      <CustomBarChart data={data} options={options} />
    </VisiterContainer>
  );
};

export default OrderSection;

const VisiterContainer = styled(Box)({
  borderRadius: "10px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  "&:first-of-type": {
    borderRadius: "10px",
    background: "#fff",
  },
  "& .dotIcon": {
    fontSize: "14px",
  },
});

const OrderTitleBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px",
  borderBottom: ".0625rem solid #eaedf2",
});

const OrderInfoBox = styled(Box)({
  display: "flex",
  gap: 3,
  flexDirection: "column",
});

const AcquisitionTypo = styled(Box)({
  color: "rgb(74, 80, 115)",
  fontSize: "16px",
  fontWeight: 400,
});

const AcquisitionValue = styled(Typography)({
  fontSize: "24px",
  fontWeight: 600,
});

const DayBox = styled(`span`)({
  display: "flex",
  alignItems: "center",
  color: "green",
  flexDirection: "row",
});

const StatusBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 5,
  fontSize: "0.85rem",
});

const BarChatLabelTypo = styled(Box)({
  color: "rgb(74, 80, 115)",
  fontSize: "16px",
  fontWeight: 400,
  maxWidth: "120px",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
});
