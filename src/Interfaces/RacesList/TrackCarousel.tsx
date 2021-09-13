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
import { useEffect, useRef, useState } from "react";

export enum state {
  hiddenLeft = "hiddenLeft",
  prev = "prev",
  selected = "selected",
  next = "next",
  hiddenRight = "hiddenRight",
}

interface race {
  name: string;
  image: string;
  state: state;
}

const TrackCarousel: React.FC = () => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const tempRef = useRef(null);

  const [images, setImages] = useState<any>([
    {
      name: "Eclipse Tour",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Santa Maria Beach",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Eclipse Tour",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Eclipse Tour",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Eclipse Tour",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Eclipse Tour",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Eclipse Tour",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Eclipse Tour",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Eclipse Tour",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Eclipse Tour",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
    {
      name: "Eclipse Tour",
      image: "http://naivoe.go.ro:8080/409da47d65a26d782320.png",
      state: "hidden",
    },
  ]);

  const resetImages = () => {
    let _prevImages = [...images];
    _prevImages.forEach((race: race) => {
      race.state = state.hiddenLeft;
    });
    setImages(_prevImages);
  };

  const updateCarousel = (_imageIndex: number) => {
    resetImages();
    let prevImages = [...images];

    let hiddenLeft: race = prevImages[_imageIndex - 2];
    let prev: race = prevImages[_imageIndex - 1];
    let selected: race = prevImages[_imageIndex];
    let next: race = prevImages[_imageIndex + 1];
    let hiddenRight: race = prevImages[_imageIndex + 2];

    if (hiddenLeft != undefined) {
      hiddenLeft.state = state.hiddenLeft;
    }
    if (prev != undefined) {
      prev.state = state.prev;
    }
    selected.state = state.selected;
    next.state = state.next;
    hiddenRight.state = state.hiddenRight;
    setImages(prevImages);
  };

  useEffect(() => {
    resetImages();
    updateCarousel(imageIndex);
  }, []);

  const moveCarousel = (direction: string) => {
    switch (direction) {
      case "left":
        if (imageIndex <= 0) return;
        let newIndex = imageIndex - 1;
        setImageIndex(newIndex);
        updateCarousel(newIndex);
        break;
      case "right":
        if (imageIndex >= images.length - 1) return;
        let _newIndex = imageIndex + 1;
        setImageIndex(_newIndex);
        updateCarousel(_newIndex);
        console.log(images);
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
      <TrackImagesContainer ref={tempRef}>
        {images.map((race: race) => {
          return (
            <>
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
            </>
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
