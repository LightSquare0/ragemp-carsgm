import React, { Dispatch, SetStateAction } from "react";
import Icon from "../../Utils/Icon";
import {
  SearchBox,
  SearchButton,
  SearchInput,
  SearchLabel,
  SearchWrapper,
} from "./SearchStyles";

interface Search {
  label: string;
  placeholder: string;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  style?: any;
  filterTrackImages: any;
}

const Search: React.FC<Search> = ({
  label,
  placeholder,
  searchText,
  setSearchText,
  style,
  filterTrackImages
}) => {
  const handleChange = (event: any) => {
    setSearchText(event.target.value);
    filterTrackImages();
  };

  return (
    <SearchWrapper style={style}>
      <SearchLabel>{label}</SearchLabel>
      <SearchBox>
        <SearchInput
          placeholder={placeholder}
          onChange={(event: any) => handleChange(event)}
        />
        <SearchButton>
          <Icon icon="search-solid" size="1rem" color="white" />
        </SearchButton>
      </SearchBox>
    </SearchWrapper>
  );
};

export default Search;
