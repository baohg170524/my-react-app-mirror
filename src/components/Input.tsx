import React from 'react'

function Input( props: { label: string, placeholder: string }) {
  return (
    <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">{props.label}</label>
        <input type="text" className="w-full border border-gray-300 rounded-md p-2" placeholder={props.placeholder} />
    </div>
  )
}

export default Input