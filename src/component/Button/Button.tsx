import React from 'react'

interface ButtonProps {
    text: String
}


function Button(props: ButtonProps): JSX.Element {
    return (
        <div>{props.text}</div>
    )
}

export default Button