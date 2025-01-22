import React from 'react'
import Hero from '../../components/hero/Hero'
import './Home.css'
import Features from '../../components/features/Features'

export default function Home() {
  return (
    <div>
        <div className="hero">
            <Hero />
            <Features />
        </div>
    </div>
  )
}


  
    