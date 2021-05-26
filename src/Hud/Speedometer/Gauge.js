import { arc } from "d3-shape";
import * as d3 from 'd3';
import { useEffect, useRef } from "react";

function drawChart(height, width){
    d3.select("#chart")
        .append("text")
        .text("Hello D3")
}


const Gauge = ({ value = 50, min = 0, max = 100, label, units }) => {
  const backgroundArc = arc()
    .innerRadius(0.65)
    .outerRadius(1)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2)
    .cornerRadius(1)();

  const speedo = useRef(null);
  useEffect(() => {
    drawChart(400, 600);
  }, []);

  return (
    <div id="chart">
      <svg 
        width="9em"
        viewBox={[-1, -1, 2, 1].join(" ")}
        style={{ border: "1px solid pink" }}
        ref={speedo}
      >
        <path d={backgroundArc} fill="#dbdbe7" />
      </svg>
    </div>
  );
};

export default Gauge;
