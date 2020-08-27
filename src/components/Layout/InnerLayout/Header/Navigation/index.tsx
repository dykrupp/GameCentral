import React from 'react';
import styled from 'styled-components';
import { NavigationMenu } from './NavigationMenu';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import { headerHeight } from '../../constants';
import { NavigationTabs } from './NavigationTabs';

const NavSkeleton = styled(Skeleton)`
  height: ${headerHeight};
  display: flex;
  flex: 1;
  margin: 20px;
`;

interface NavigationProps {
  isQueryReady: boolean;
  tabValue: number | false;
  setTabValue: (value: number | false) => void;
  shouldUseMobileComponent: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  isQueryReady,
  tabValue,
  setTabValue,
  shouldUseMobileComponent,
}) =>
  shouldUseMobileComponent ? (
    <MobileNavigation isQueryReady={isQueryReady} />
  ) : (
    <DesktopNavigation
      isQueryReady={isQueryReady}
      tabValue={tabValue}
      setTabValue={setTabValue}
    />
  );

Navigation.propTypes = {
  isQueryReady: PropTypes.bool.isRequired,
  tabValue: PropTypes.any.isRequired,
  setTabValue: PropTypes.func.isRequired,
  shouldUseMobileComponent: PropTypes.bool.isRequired,
};

interface DesktopNavProps {
  isQueryReady: boolean;
  tabValue: number | false;
  setTabValue: (value: number | false) => void;
}

const NavigationContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const DesktopNavigation: React.FC<DesktopNavProps> = ({
  isQueryReady,
  tabValue,
  setTabValue,
}) => (
  <NavigationContainer>
    {!isQueryReady ? (
      <NavSkeleton animation="wave" />
    ) : (
      <NavigationTabs tabValue={tabValue} setTabValue={setTabValue} />
    )}
  </NavigationContainer>
);

DesktopNavigation.propTypes = {
  isQueryReady: PropTypes.bool.isRequired,
  tabValue: PropTypes.any.isRequired,
  setTabValue: PropTypes.func.isRequired,
};

interface MobileNavigationProps {
  isQueryReady: boolean;
}

const MobileNavigationContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isQueryReady,
}) => (
  <MobileNavigationContainer>
    {!isQueryReady ? <NavSkeleton animation="wave" /> : <NavigationMenu />}
  </MobileNavigationContainer>
);

MobileNavigation.propTypes = {
  isQueryReady: PropTypes.bool.isRequired,
};
