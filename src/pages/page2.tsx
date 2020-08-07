import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/seo';

const SecondPage: React.FC = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <p>some stuff</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default SecondPage;
