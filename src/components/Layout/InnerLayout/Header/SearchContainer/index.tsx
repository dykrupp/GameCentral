import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { ProductSearchUrl } from '../../../../../utils/constants';
import { navigate } from 'gatsby';

interface SearchContainerProps {
  shouldUseMobileComponents: boolean;
  setTabValue: (value: React.SetStateAction<number | false>) => void;
}

const SearchButton = styled(Button)`
  margin: 5px;
  color: white;
`;

export const SearchContainer: React.FC<SearchContainerProps> = ({
  shouldUseMobileComponents,
  setTabValue,
}) => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(event.target.value);

  return shouldUseMobileComponents ? (
    <MobileSearch
      setTabValue={setTabValue}
      searchText={searchText}
      handleTextChange={handleInputChange}
    />
  ) : (
    <Search
      searchText={searchText}
      handleTextChange={handleInputChange}
      setTabValue={setTabValue}
    />
  );
};

SearchContainer.propTypes = {
  shouldUseMobileComponents: PropTypes.bool.isRequired,
  setTabValue: PropTypes.func.isRequired,
};

const SearchDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 20px;
  align-items: center;
`;

const SearchInput = styled.input`
  border-radius: 5px;
  height: 35px;
  width: 175px;
`;

interface SearchProps {
  searchText: string;
  handleTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setTabValue: (value: React.SetStateAction<number | false>) => void;
}

const Search: React.FC<SearchProps> = ({
  searchText,
  handleTextChange,
  setTabValue,
}) => (
  <SearchDiv>
    <SearchInput value={searchText} onChange={handleTextChange} />
    <SearchButton
      color="secondary"
      variant="contained"
      onClick={() => {
        setTabValue(false);
        navigate(`${ProductSearchUrl}?title=${searchText}`);
      }}
    >
      Search
    </SearchButton>
  </SearchDiv>
);

Search.propTypes = {
  searchText: PropTypes.string.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  setTabValue: PropTypes.func.isRequired,
};

const MobileSearchDiv = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
`;

const MobileSearchInput = styled.input`
  border-radius: 5px;
  height: 35px;
  max-width: 500px;
  width: 100%;
`;

const MobileSearch: React.FC<SearchProps> = ({
  searchText,
  handleTextChange,
  setTabValue,
}) => (
  <MobileSearchDiv>
    <MobileSearchInput value={searchText} onChange={handleTextChange} />
    <SearchButton
      color="secondary"
      variant="contained"
      onClick={() => {
        setTabValue(false);
        navigate(`${ProductSearchUrl}?title=${searchText}`);
      }}
    >
      Search
    </SearchButton>
  </MobileSearchDiv>
);

MobileSearch.propTypes = {
  searchText: PropTypes.string.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  setTabValue: PropTypes.func.isRequired,
};
