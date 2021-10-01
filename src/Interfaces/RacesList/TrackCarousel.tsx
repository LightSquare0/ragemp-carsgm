import {
  ArrowButton,
  TrackCarouselContainer,
  TrackImage,
  TrackDiv,
  TrackImagesContainer,
  TrackName,
} from "./TrackCarouselStyles";
import demo_map from "../../Static/Demo_map.png";
import Icon from "../../Utils/Icon";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export enum state {
  hiddenLeft = "hiddenLeft",
  prev = "prev",
  selected = "selected",
  next = "next",
  hiddenRight = "hiddenRight",
}

export interface race {
  name: string;
  image: string;
  state: state;
}

interface TrackCarousel {
  images: race[];
  setImages: Dispatch<SetStateAction<object[]>>;
  imageIndex: number;
  setImageIndex: Dispatch<SetStateAction<number>>;
  updateCarousel: any;
  resetImages: any;
}

const TrackCarousel: React.FC<TrackCarousel> = ({
  images,
  setImages,
  imageIndex,
  setImageIndex,
  updateCarousel,
  resetImages,
}) => {
  const moveCarousel = (direction: string) => {
    switch (direction) {
      case "left":
        if (imageIndex <= 0) return;
        let newIndex = imageIndex - 1;
        setImageIndex(newIndex);
        updateCarousel(images, newIndex);
        break;
      case "right":
        if (imageIndex >= images.length - 1) return;
        let _newIndex = imageIndex + 1;
        setImageIndex(_newIndex);
        updateCarousel(images, _newIndex);
        break;
      default:
        break;
    }
  };

  return (
    <TrackCarouselContainer>
      <ArrowButton onClick={() => moveCarousel("left")}>
        <Icon
          icon="angle-double-left-solid"
          size="1.5625rem"
          color="var(--middle-gray)"
        />
      </ArrowButton>
      <TrackImagesContainer>
        {images.map((race: race, index: number) => {
          return (
            <div key={index}>
              <TrackDiv
                currentIndex={imageIndex}
                index={images.indexOf(race)}
                state={race.state}
              >
                <TrackImage
                  currentIndex={imageIndex}
                  index={images.indexOf(race)}
                  src={race.image}
                />
              </TrackDiv>
              <TrackName state={race.state}>{race.name}</TrackName>
            </div>
          );
        })}
      </TrackImagesContainer>
      <ArrowButton onClick={() => moveCarousel("right")}>
        <Icon
          icon="angle-double-right-solid"
          size="1.5625rem"
          color="var(--middle-gray)"
        />
      </ArrowButton>
    </TrackCarouselContainer>
  );
};

export default TrackCarousel;
