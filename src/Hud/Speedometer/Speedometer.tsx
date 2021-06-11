import { useCallback, useEffect, useMemo, useState } from "react";
import Gauge from "./Gauge";

const getSpeed = () => {
  
}


const Speedometer = () => {
  const [speed, setSpeed] = useState<number>(0);
  const [rpm, setRpm] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);

  //@ts-ignore
  mp.events.add("react:updateVehicleSpeed", (speed) => {
    setSpeed(speed);
  });

  //@ts-ignore
  mp.events.add("react:updateVehicleRpm", (rpm) => {
    setRpm(rpm);
  });
  //@ts-ignore
  mp.events.add("react:updateSpeedoState", (visible) => {
    setVisible(visible);
  });

  return (
    <>
      <Gauge
        visible={visible}
        currentSpeed={speed}
        currentRpm={rpm}
        min={0}
        max={230}
      />
    </>
  );
};

export default Speedometer;
