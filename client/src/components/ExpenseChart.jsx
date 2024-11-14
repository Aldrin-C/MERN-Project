import { useEffect } from "react";
import * as d3 from "d3";

const ExpenseChart = ({ width, height, data }) => {

const marginTop = 50;
const marginBottom = 70;
const marginLeft = 50;
const marginRight = 25;

  const chartBottomY = height - marginBottom;

  // Create the horizontal scale and its axis generator.
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

  // Create the vertical scale and its axis generator.
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.amount)])
    .nice()
    .range([chartBottomY, marginTop]);

  const yAxis = d3.axisLeft(yScale);

  // const sum = d3
  //   .rollup(data, (D) => D.length, (d) => d.amount)

  useEffect(() => {
    d3.select(".x-axis")
      .call(xAxis)
      .selectAll("text")
      .attr("font-size", "14px")
      // Rotate the labels to make them easier to read.
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end")
      .attr("fill", "dodgerblue");
      
    d3.select(".y-axis")
      .call(yAxis)
      .selectAll("text")
      .attr("font-size", "14px")
      .attr("fill", "dodgerblue");
    
  }, [xAxis, yAxis]);


  return (
    <div className="container pb-3">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="viz"
      >
        <g className="bars">
          {data.map((d) => (
            <rect
              key={d.amount}
              x={xScale(d.name)}
              y={yScale((d.amount))}
              height={chartBottomY - yScale(d.amount)}
              width={xScale.bandwidth()}
              fill="#6baed6"
            />
          ))}
        </g>
        <g className="labels">
          {data.map((d) => (
            <text
              key={d.name}
              x={xScale(d.name) + xScale.bandwidth() / 2}
              y={yScale(d.amount)-10}
              textAnchor="middle"
              fontSize={15}
              fill="dodgerblue"
            >
              {Number((d.amount).toFixed(1)).toLocaleString()}
            </text>
          ))}
        </g>
        <g className="x-axis" transform={`translate(0,${chartBottomY})`}></g>
        <g className="y-axis" transform={`translate(${marginLeft},0)`}></g>
      </svg>
    </div>
  );
};

export default ExpenseChart;