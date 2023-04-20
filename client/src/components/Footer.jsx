import React from 'react'

const Footer = () => {
  return (
    <div style={
        {
            backgroundColor:'whitesmoke',
            // position:'sticky',
            bottom:'0'
        }
    } className='footer-container'>
        <h3 style={{
            textAlign:'center',
            padding:'1rem'
        }}>
        Made with 💙 by Sharmas
        </h3>
    </div>
  )
}

export default Footer