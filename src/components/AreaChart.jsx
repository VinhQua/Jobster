import React from "react";
import { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
const AreaChartContainer = ({ data }) => {
  return (
    <AreaChart width={900} height={400} data={data} margin={"2rem auto"}>
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />

      <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
};

export default AreaChartContainer;
