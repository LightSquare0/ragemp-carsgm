import ReactSlider from "react-slider";
import styled from "styled-components";

const StyledSlider = styled(ReactSlider)`
  width: 13.75rem;
  height: 0.1875rem;
  display: flex;
  align-items: center;
`;

const StyledThumb = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.375rem;
  width: 1.375rem;
  text-align: center;
  background-color: var(--middle-yellow);
  border: 0.0625rem solid black;
  color: transparent;
  border-radius: 50%;
  cursor: grab;
  outline: none;
`;

const Thumb = (props: any, state: any) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
);

const StyledTrack = styled.div<any>`
  top: 0;
  bottom: 0;
  background: var(--background-gray);
`;

const Track = (props: any, state: any) => (
  <StyledTrack {...props} index={state.index} />
);

interface Slider {
  min?: number;
  max?: number;
  currentValue: number | readonly number[];
  onChange: (value: number | readonly number[], index: number) => void;
}

const Slider: React.FC<Slider> = ({min, max, currentValue, onChange }) => {
  return (
    <StyledSlider renderTrack={Track} renderThumb={Thumb} min={min} max={max} value={currentValue} onChange={onChange} />
  );
};

export default Slider;
