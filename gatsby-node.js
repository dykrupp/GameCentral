const path = require('path');

exports.createPages = ({ actions }) => {
    const { createPage } = actions;

    createPage({
        path: '/product-search',
        matchPath: '/product-search/*',
        component: path.resolve('src/dynamic_pages/product-search.tsx')
    });
};