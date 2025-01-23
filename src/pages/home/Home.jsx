import React from 'react'
import Hero from '../../components/hero/Hero'
import './Home.css'
import Features from '../../components/features/Features'
import iconChat from '../../assets/img/icon-chat.png'
import iconMoney from '../../assets/img/icon-money.png'
import iconSecurity from '../../assets/img/icon-security.png'

export default function Home() {
    return (
        <div>
            <div className="hero">
                <Hero />
            </div>
            <Features icon={iconChat} title="You are our #1 priority" text="Need to talk to a representative? You can get in touch through our
                    24/7 chat or through a phone call in less than 5 minutes." />
            <Features icon={iconMoney} title="More savings means higher rates" text="The more you save with us, the higher your interest rate will be!" />
            <Features icon={iconSecurity} title="Security you can trust" text="We use top of the line encryption to make sure your data and money
                    is always safe." />
        </div>
    )
}



