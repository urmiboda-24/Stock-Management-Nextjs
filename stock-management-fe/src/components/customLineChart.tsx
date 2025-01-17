import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: ChartData<"line">;
  options?: ChartOptions<"line">;
  height?: number;
  width?: number;
  className?: string;
}

const CustomLineChart: React.FC<LineChartProps> = ({
  data,
  options,
  height,
  width,
  className,
}) => {
  return (
    <div className={className}>
      <Line
        data={data}
        options={options}
        height={height}
        width={width}
        className={className}
      />
    </div>
  );
};

export default CustomLineChart;
