import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: ChartData<"bar">;
  options?: ChartOptions<"bar">;
  height?: number;
  width?: number;
  className?: string;
}

const CustomBarChart: React.FC<LineChartProps> = ({
  data,
  options,
  height,
  width,
  className,
}) => {
  return (
    <div className={className}>
      <Bar
        data={data}
        options={options}
        height={height}
        width={width}
        className={className}
      />
    </div>
  );
};

export default CustomBarChart;
