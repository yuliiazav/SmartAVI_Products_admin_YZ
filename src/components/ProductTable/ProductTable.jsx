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
          {/* <th>Effective</th> */}
          <th>Resources</th>
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
              {/* <td>{item.effective}</td> */}
              <td className="resources-cell">
                {item.resources ? (
                  <div className="links-container">
                    {item.resources.brochure && (
                      <a
                        href={item.resources.brochure}
                        download
                        target="_blank"
                      >
                        Brochure
                      </a>
                    )}
                    {item.resources.manual && (
                      <a href={item.resources.manual} download target="_blank">
                        Manual
                      </a>
                    )}
                    {item.resources.quickStartGuide && (
                      <a
                        href={item.resources.quickStartGuide}
                        download
                        target="_blank"
                      >
                        Quick Start Guide
                      </a>
                    )}
                    {item.resources.photoFront && (
                      <a
                        href={item.resources.photoFront}
                        download
                        target="_blank"
                      >
                        Front Photo
                      </a>
                    )}
                    {item.resources.diagram && (
                      <a href={item.resources.diagram} download target="_blank">
                        Diagram
                      </a>
                    )}

                    {item.resources.imagesZIP && (
                      <a
                        href={item.resources.imagesZIP}
                        download
                        target="_blank"
                      >
                        [ALL files ZIP]
                      </a>
                    )}
                  </div>
                ) : (
                  // If item.resources === null
                  <span>N/A</span>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
