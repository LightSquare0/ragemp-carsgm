import * as d3 from "d3";
import { scaleLinear } from "d3-scale";
import { Arc, arc } from "d3-shape";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import {
  InfoText,
  SpeedoContainer,
  Speedo,
  GearContainer,
  GearText,
  GearBubble,
  SpeedText,
} from "./SpeedometerStyles";

interface GaugeProps {
  visible: boolean;
  currentSpeed: number | any;
  currentRpm: number;
  currentGear: number;
  min: number;
  max: number;
  label?: string | number;
  units?: string | number;
}

const Gauge: React.FC<GaugeProps> = ({
  visible,
  currentSpeed,
  currentRpm,
  currentGear,
  min,
  max,
  label,
  units,
}) => {
  const backgroundArc: Arc<any, any> = arc()
    .innerRadius(0.86)
    .outerRadius(1)
    .startAngle(-Math.PI / 1.1)
    .endAngle(Math.PI / 2.7)
    .cornerRadius(0.07);

  const percentScale = scaleLinear().domain([min, max]).range([0, 1]);

  const percent = percentScale(currentRpm);

  const angleScale = scaleLinear()
    .domain([0, 1])
    .range([-Math.PI / 1.1, Math.PI / 2.7])
    .clamp(true);

  const angle = angleScale(percent);

  const filledArc: Arc<any, any> = arc()
    .innerRadius(0.86)
    .outerRadius(1)
    .startAngle(-Math.PI / 1.1)
    .endAngle(angle)
    .cornerRadius(0.07);

  const rpmPath = useRef();
  const [willChange, setWillChange] = useState(false);

  useEffect(() => {
    setWillChange(!willChange);
  }, [currentGear]);

  return (
    <>
      <Speedo visible={visible}>
        <SpeedoContainer>
          <svg width="15rem" viewBox={[-1, -1, 2, 2].join(" ")}>
            <path d={backgroundArc("d")} fill="#9191918d" />
            <path
              ref={rpmPath}
              d={filledArc(angle)}
              style={{ transition: "fill 0.3s ease", opacity: "0.7" }}
              fill={
                currentRpm > 8000
                  ? "#EC1506"
                  : currentRpm > 7000
                  ? "#EDB504"
                  : "#ffffff"
              }
            />
          </svg>
          <InfoText>
            <GearContainer>
              <GearBubble>
                <GearText currentGear={currentGear} willChange={willChange}>
                  {currentGear == 0 ? "N" : currentGear}
                </GearText>
              </GearBubble>
            </GearContainer>
          </InfoText>
          <InfoText>
            <SpeedText>{currentSpeed}</SpeedText>
          </InfoText>
        </SpeedoContainer>
      </Speedo>
    </>
  );
};

export default Gauge;
