module.exports = function(name){
    return `
import React from 'react'

class ${name} extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    
    render(){
        return(
            <div>
                Example Component
            </div>
        )
    }
}

export default ${name}
`
} 

