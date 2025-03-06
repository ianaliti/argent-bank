import React from 'react'
import './Account.css'

export default function Account({ accountType, accountNumber, balance, description }) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{accountType} ({accountNumber})</h3>
        <p className="account-amount">${balance}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}