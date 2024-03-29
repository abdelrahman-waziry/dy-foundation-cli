module.exports = function(){
    return `
import React from 'react'

/**
 * Defines module routes, you can use react-router-dom route parameters
 * as properties in each object in routes array for example "exact: true"
 * 
 * Each route lazy loads a component if its path matches the current path. 
 */

const routes = [
    {
        path: '/path/here',
        component: React.lazy(() => import ('path/to/component'))
    },

]

export default routes
`
}