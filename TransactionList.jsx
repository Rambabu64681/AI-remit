function TransactionList({ transfers }) {
  return (
    <div>
      <h2>Transaction History</h2>
      <p className="muted">
        Transfers are stored in backend memory for demo purposes.
      </p>

      {transfers.length === 0 ? (
        <div className="empty">No transfers created yet.</div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Receiver</th>
                <th>Country</th>
                <th>Amount</th>
                <th>Gets</th>
                <th>Status</th>
                <th>Risk</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer.id}>
                  <td>{transfer.receiverName}</td>
                  <td>{transfer.receiverCountry}</td>
                  <td>
                    {transfer.quote.sendAmount} {transfer.quote.sendCurrency}
                  </td>
                  <td>
                    {transfer.quote.receiveAmount} {transfer.quote.receiveCurrency}
                  </td>
                  <td>
                    <span className="pill">{transfer.status}</span>
                  </td>
                  <td>
                    <span className={`risk ${transfer.risk.riskLevel.toLowerCase()}`}>
                      {transfer.risk.riskLevel} ({transfer.risk.riskScore})
                    </span>
                  </td>
                  <td>{new Date(transfer.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
