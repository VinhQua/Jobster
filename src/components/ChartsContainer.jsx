import React, { useState } from "react";
import Wrapper from "../assets/wrappers/ChartsContainer";
// import BarChart from "./BarChart";
// import AreaChart from "./AreaChart";
import { useSelector } from "react-redux";
import AreaChartContainer from "./AreaChart";
import BarChartContainer from "./BarChart";
const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useSelector((store) => store.allJobs);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? (
        <BarChartContainer data={data} />
      ) : (
        <AreaChartContainer data={data} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
