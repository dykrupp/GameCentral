import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Header from './Header';
import styled from 'styled-components';

interface LayoutProps {
  children: ReactNode;
}

const LayoutContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainRoot = styled.div`
  display: flex;
  justify-content: center;
`;

const MainContainer = styled.main`
  flex-grow: 1;
  margin-top: 64px;
  max-width: 750px;
`;

const Footer = styled.footer`
  text-align: center;
  margin-bottom: 20px;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <LayoutContainer>
      <Header siteTitle={data.site.siteMetadata.title} />
      <MainRoot>
        <MainContainer>{children}</MainContainer>
      </MainRoot>
      <Footer>Made with ❤️ by Dylan Krupp, August 2020</Footer>
    </LayoutContainer>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
