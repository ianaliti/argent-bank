import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import './Transaction.css';

export default function Transaction() {
    const location = useLocation(); //allows a component to access the current URL location and any state that was passed through navigation.
    const { accountType, accountNumber, balance } = location.state || {};

    const [transactions, setTransactions] = useState([
        { id: 1, date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: 5.0, balance: 2082.79, category: 'Food', notes: '', expanded: false },
        { id: 2, date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: 10.0, balance: 2078.79, category: 'Food', notes: '', expanded: false },
        { id: 3, date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: 20.0, balance: 2097.79, category: 'Food', notes: '', expanded: false },
        { id: 4, date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: 30.0, balance: 2117.79, category: 'Food', notes: '', expanded: false },
        { id: 5, date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: 40.0, balance: 2147.79, category: 'Food', notes: '', expanded: false },
        { id: 6, date: 'June 20th, 2020', description: 'Golden Sun Bakery', amount: 50.0, balance: 2187.79, category: 'Food', notes: '', expanded: false },
    ]);

    const toggleExpand = (id) => {
        setTransactions(transactions.map(tx =>
            tx.id === id ? { ...tx, expanded: !tx.expanded } : tx
        ));
    };

    const handleCategoryChange = (id, value) => {
        setTransactions(transactions.map(tx =>
            tx.id === id ? { ...tx, category: value } : tx
        ));
    };

    const handleNotesChange = (id, value) => {
        setTransactions(transactions.map(tx =>
            tx.id === id ? { ...tx, notes: value } : tx
        ));
    };

    const toggleEditCategory = (id) => {
        setTransactions(transactions.map(tx =>
            tx.id === id ? { ...tx, editingCategory: !tx.editingCategory } : tx
        ));
    };

    const toggleEditNotes = (id) => {
        setTransactions(transactions.map(tx =>
            tx.id === id ? { ...tx, editingNotes: !tx.editingNotes } : tx
        ));
    };

    return (
        <div className="transaction-container">
            <div className='balance-container'>
                <h2>{accountType} ({accountNumber})</h2>
                <p className="balance">${balance}</p>
                <p>Available balance</p>
            </div>

            <table className="transaction-table">
                <thead>
                    <tr>
                        <th></th> 
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((tx) => (
                        <React.Fragment key={tx.id}>
                            <tr>
                                <td>
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        className={`expand-icon ${tx.expanded ? 'open' : ''}`}
                                        onClick={() => toggleExpand(tx.id)}
                                    />
                                </td>
                                <td>{tx.date}</td>
                                <td>{tx.description}</td>
                                <td>${tx.amount.toFixed(2)}</td>
                                <td>${tx.balance.toFixed(2)}</td>
                            </tr>

                            {/* Expanded Row for Editing */}
                            {tx.expanded && (
                                <tr>
                                    <td colSpan="5">
                                        <div className={`transaction-details ${tx.expanded ? 'active' : ''}`}>
                                            <p>
                                                <strong>Transaction Type:</strong> Electronic
                                            </p>
                                            <p>
                                                <strong>Category:</strong>
                                                {tx.editingCategory ? (
                                                    <>
                                                        <select
                                                            value={tx.category}
                                                            onChange={(e) => handleCategoryChange(tx.id, e.target.value)}
                                                        >
                                                            <option value="Food">Food</option>
                                                            <option value="Groceries">Groceries</option>
                                                            <option value="Shopping">Shopping</option>
                                                            <option value="Entertainment">Entertainment</option>
                                                            <option value="Transport">Transport</option>
                                                        </select>
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                            className="edit-icon"
                                                            onClick={() => toggleEditCategory(tx.id)}
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        {tx.category}
                                                        <FontAwesomeIcon
                                                            icon={faPencilAlt}
                                                            className="edit-icon"
                                                            onClick={() => toggleEditCategory(tx.id)}
                                                        />
                                                    </>
                                                )}
                                            </p>
                                            <p>
                                                <strong>Notes:</strong>
                                                {tx.editingNotes ? (
                                                    <>
                                                        <input
                                                            type="text"
                                                            value={tx.notes}
                                                            placeholder="Add a note..."
                                                            onChange={(e) => handleNotesChange(tx.id, e.target.value)}
                                                        />
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                            className="edit-icon"
                                                            onClick={() => toggleEditNotes(tx.id)}
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        {tx.notes || 'No notes'}
                                                        <FontAwesomeIcon
                                                            icon={faPencilAlt}
                                                            className="edit-icon"
                                                            onClick={() => toggleEditNotes(tx.id)}
                                                        />
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}