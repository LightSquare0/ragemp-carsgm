import React, { useRef } from "react";
import { useState } from "react";
import Gauge from "./Gauge";

const Speedometer: React.FC = () => {
  const [speed, setSpeed] = useState<number>(0);
  const [rpm, setRpm] = useState<number>(0);
  const [gear, setGear] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const renders = useRef(0);

  mp.events.add("react:updateVehicleData", (vehicleSpeed, vehicleRpm, vehicleGear) => {
    if (speed == vehicleSpeed && rpm == vehicleRpm)
    return;

    setSpeed(vehicleSpeed);
    setRpm(vehicleRpm);
    setGear(vehicleGear);
  });

  mp.events.add("react:updateSpeedoState", (visible) => {
    setVisible(visible);
  });

    // console.log("renders: ", renders.current++);
  return (
    <>
      <Gauge
        visible={visible}
        currentSpeed={speed}
        currentRpm={rpm}
        currentGear={gear}
        min={0}
        max={10000}
      />
    </>
  );
};

export default Speedometer;
