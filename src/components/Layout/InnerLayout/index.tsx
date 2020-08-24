import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Header from './Header';
import styled from 'styled-components';

interface InnerLayoutProps {
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
  flex: 1;
  background-color: #21d4fd;
  background-image: linear-gradient(325deg, #21d4fd 0%, #b721ff 100%);
  flex-direction: column;
  align-items: center;
`;

const MainContainer = styled.main`
  flex-grow: 1;
  max-width: 750px;
  margin-left: 25px;
  margin-right: 25px;
  width: 100%;
`;

const Footer = styled.footer`
  text-align: center;
  color: white;
`;

const InnerLayout: React.FC<InnerLayoutProps> = ({ children }) => {
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
        <Footer>Made with ❤️ by Dylan Krupp, August 2020</Footer>
      </MainRoot>
    </LayoutContainer>
  );
};

InnerLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InnerLayout;
