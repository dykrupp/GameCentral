import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import Image from '../components/image';
import SEO from '../components/SEO';

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Game Central Home" />
    <h1>Hi people</h1>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/using-typescript/">Go to &quot;Using TypeScript&quot;</Link>{' '}
    <br />
    <Link to="/products/">Go to products</Link> <br />
  </Layout>
);

export default IndexPage;
