import React from 'react'
import './Features.css'

export default function Features({ icon, title, text}) {
    return (
        <div className="features">
            <h2 className="sr-only">Features</h2>
            <div className="feature-item">
                <img src={icon} alt="Feature Icon" className="feature-icon" />
                <h3 className="feature-item-title">{title}</h3>
                <p>{text}</p>
            </div>
        </div >
    )
}
