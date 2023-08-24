import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const BarChartContainer = ({ data }) => {
  return (
    <BarChart width={900} height={400} data={data} margin={"2rem auto"}>
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey="date" />
      <YAxis dataKey="count" />
      <Cell />
      <Tooltip />
      {/* <Legend /> */}
      <Bar dataKey="count" fill="#8884d8" />
      {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
    </BarChart>
  );
};

export default BarChartContainer;
