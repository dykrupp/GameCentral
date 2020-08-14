import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import ps4Icon from '../../../../images/ps4.png';
import xboxIcon from '../../../../images/xbox.png';
import nintendoIcon from '../../../../images/nintendo.png';
import pcIcon from '../../../../images/pc.png';
import vrIcon from '../../../../images/vr.png';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import { headerHeight } from '../../constants';

const ProductTabs = styled(Tabs)`
  margin-right: 155px;
`;

const StyledTab = styled(Tab)`
  height: ${headerHeight};
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TabIcon = styled.img`
  width: 35px;
  margin: 0 auto;
  margin-right: 10px;
`;

export const NavigationTabs: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: React.ChangeEvent<any>, newValue: any) => {
    setTabValue(newValue);
  };

  return (
    <ProductTabs value={tabValue} onChange={handleChange} variant="fullWidth">
      <StyledTab
        onClick={() => navigate('/products')}
        label={
          <TabContainer>
            <TabIcon src={ps4Icon} />
            PS4
          </TabContainer>
        }
      />
      <StyledTab
        label={
          <TabContainer>
            <TabIcon src={xboxIcon} />
            Xbox One
          </TabContainer>
        }
      />
      <StyledTab
        label={
          <TabContainer>
            <TabIcon src={nintendoIcon} />
            Nintendo Switch
          </TabContainer>
        }
      />
      <StyledTab
        label={
          <TabContainer>
            <TabIcon src={pcIcon} />
            PC Gaming
          </TabContainer>
        }
      />
      <StyledTab
        label={
          <TabContainer>
            <TabIcon src={vrIcon} />
            Virtual Reality
          </TabContainer>
        }
      />
    </ProductTabs>
  );
};
