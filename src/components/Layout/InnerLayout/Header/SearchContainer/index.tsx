import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

interface SearchContainerProps {
  shouldUseMobileComponents: boolean;
}

const SearchButton = styled(Button)`
  margin: 5px;
  color: white;
`;

export const SearchContainer: React.FC<SearchContainerProps> = ({
  shouldUseMobileComponents,
}) => (shouldUseMobileComponents ? <MobileSearch /> : <Search />);

SearchContainer.propTypes = {
  shouldUseMobileComponents: PropTypes.bool.isRequired,
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

const Search: React.FC = () => (
  <SearchDiv>
    <SearchInput />
    <SearchButton color="secondary" variant="contained">
      Search
    </SearchButton>
  </SearchDiv>
);

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

const MobileSearch: React.FC = () => (
  <MobileSearchDiv>
    <MobileSearchInput />
    <SearchButton color="secondary" variant="contained">
      Search
    </SearchButton>
  </MobileSearchDiv>
);
