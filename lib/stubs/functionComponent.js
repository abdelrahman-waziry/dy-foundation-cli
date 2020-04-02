module.exports = function(name) {
    return `
import React from 'react'

const ${name} = (props) => {
    return(
        <div>
            Example Component
        </div>
    )
}

export default ${name}
`
}  