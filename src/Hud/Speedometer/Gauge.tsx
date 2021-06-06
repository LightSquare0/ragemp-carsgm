import { scaleLinear } from "d3-scale";
import { Arc, arc } from "d3-shape";
import {
  InfoText,
  SpeedText,
  SpeedoContainer,
  RpmText,
  Speedo,
} from "./SpeedometerStyles";

interface GaugeProps {
  visible: boolean;
  currentSpeed: number | any;
  currentRpm: number;
  min: number;
  max: number;
  label?: string | number;
  units?: string | number;
}

const Gauge: React.FC<GaugeProps> = ({
  visible,
  currentSpeed,
  currentRpm,
  min,
  max,
  label,
  units,
}) => {

  const backgroundArc: Arc<any, any> = arc()
    .innerRadius(0.82)
    .outerRadius(1)
    .startAngle(-Math.PI)
    .endAngle(Math.PI / 2)
    .cornerRadius(0.02);

  const percentScale = scaleLinear().domain([min, max]).range([0, 1]);

  const percent = percentScale(currentSpeed);

  const angleScale = scaleLinear()
    .domain([0, 1])
    .range([-Math.PI, Math.PI / 2])
    .clamp(true);

  const angle = angleScale(percent);

  const filledArc: Arc<any, any> = arc()
    .innerRadius(0.82)
    .outerRadius(1)
    .startAngle(-Math.PI)
    .endAngle(angle)
    .cornerRadius(0.02);

  return (
    <>
      <Speedo visible={visible}>
        <SpeedoContainer>
          <svg width="15rem" viewBox={[-1, -1, 2, 2].join(" ")}>
            <path d={backgroundArc("d")} fill="#9191918d" />
            <path d={filledArc("d")} fill="#ffffff" />
          </svg>
          <InfoText>
            <SpeedText>{currentSpeed}</SpeedText>
          </InfoText>
          <InfoText>
            <RpmText>{currentRpm}</RpmText>
          </InfoText>
        </SpeedoContainer>
      </Speedo>
    </>
  );
};

export default Gauge;
