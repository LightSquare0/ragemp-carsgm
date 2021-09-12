import {
  ArrowButton,
  TrackCarouselContainer,
  TrackImage,
  TrackDiv,
  TrackImagesContainer,
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
    images.forEach((race: race) => {
      let prevImages = [...images];
      let currentIndex = images.indexOf(race);

      let hiddenLeft = currentIndex - 2;
      let prev = currentIndex - 1;
      let selected = currentIndex;
      let next = currentIndex + 1;
      let hiddenRight = currentIndex + 2;
      if (currentIndex == _imageIndex) {
        if (hiddenLeft > 0) {
          prevImages[hiddenLeft].state = state.hiddenLeft;
        }
        if (prev > -1) {
          prevImages[prev].state = state.prev;
        }
        prevImages[selected].state = state.selected;
        // if (next < prevImages.length - 1) {
          prevImages[next].state = state.next;
        // }
        // if (hiddenRight < prevImages.length - 2) {
          prevImages[hiddenRight].state = state.hiddenRight;
        // }
        setImages(prevImages);
      }
    });
  };

  useEffect(() => {
    resetImages();
    updateCarousel(imageIndex);
    console.log(imageIndex);
    console.log("sa dat treiger la efefct");
  }, []);

  console.log(images);

  const moveCarousel = (direction: string) => {
    switch (direction) {
      case "left":
        if (imageIndex <= 0) return;
        let newIndex = imageIndex - 1;
        setImageIndex(newIndex);
        resetImages();
        updateCarousel(newIndex);
        break;
      case "right":
        let prevImages = [...images];
        let _imageIndex = imageIndex;
        if (11 == _imageIndex) return;
        console.log("old index ", imageIndex);
        let _newIndex = imageIndex + 1;
        setImageIndex(_newIndex);
        resetImages();
        updateCarousel(_newIndex);
        // console.log("index ", imageIndex -1, images.length);
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
