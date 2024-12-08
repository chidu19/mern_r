import React, { useState, useEffect } from "react";
import { getTransactions } from "../services/api";
import "./TransactionList.css"; // Import the CSS

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [month, setMonth] = useState(1); // Default month (January)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Fetch transactions for the given month and search query
    getTransactions(month, page, perPage, search)
      .then((response) => {
        setTransactions(response.data.transactions); // API should provide `transactions` data
      })
      .catch(() => {
        setError("Error fetching transactions");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [month, search, page, perPage]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 when searching
  };

  const handleMonthChange = (e) => {
    setMonth(Number(e.target.value));
    setPage(1); // Reset to page 1 when changing month
  };

  if (loading) {
    return <div className="loading">Loading transactions...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }
  var w = 700;
  return (
    <div className="transaction-list">
      <div className="search-button">
        {/* Search bar */}
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by title or description"
        />
      </div>
      {/* Month selector */}
      <select value={month} onChange={handleMonthChange}>
        {[...Array(12).keys()].map((i) => (
          <option key={i} value={i + 1}>
            {new Date(0, i).toLocaleString("en-US", { month: "long" })}
          </option>
        ))}
      </select>

      {/* Table to display transactions */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction._id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
              <td>
                <img
                  src={transaction.imageUrl}
                  alt={transaction.title}
                  className="thumbnail"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TransactionList;
