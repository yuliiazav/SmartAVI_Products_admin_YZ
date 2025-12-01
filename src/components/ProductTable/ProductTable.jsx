import React from "react";
import "./productTable.css";

export default function ProductTable({ data }) {
  const isEmpty = data.length === 0;

  return (
    <table className="products-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Part Number</th>
          <th>Description</th>
          <th>MSRP</th>
          <th>Max Distance</th>
          <th>UPC</th>
          <th>Effective</th>
        </tr>
      </thead>

      <tbody>
        {isEmpty ? (
          <tr>
            <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
              No results found
            </td>
          </tr>
        ) : (
          data.map((item, index) => (
            <tr key={item.partNumber}>
              <td>{index + 1}</td>
              <td>{item.partNumber}</td>

              <td>{item.description}</td>
              <td>{item.msrp}</td>
              <td>{item.maxDistance || "-"}</td>
              <td>{item.upc || "-"}</td>
              <td>{item.effective}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
