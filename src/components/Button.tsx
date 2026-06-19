import React from 'react'

function Button( props: { style: string, label: string }) {
  return (
    <button className={props.style}>{props.label}</button>
  )
}

export default Button