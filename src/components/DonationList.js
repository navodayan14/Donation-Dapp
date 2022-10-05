import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const DonationList = ({ donationsreq ,path}) => {
  return (
    <div className="dlist">
      <ul>
        {donationsreq.map((drequest) => (
          <li key={drequest.id}>
            <div className="dlist-container">
              <p className="dlist-paragraph">Id :{drequest.id}</p>
              <p className="dlist-paragraph">{drequest.name}</p>
              <p className="dlist-paragraph"><Link to={path} state={{ data: drequest.id}}>Details</Link></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonationList;