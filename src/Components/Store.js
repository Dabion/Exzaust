import React from "react";
import { Link } from "react-router-dom";
import "./StyleSheets/Store.css";


export default function Store() {
  return (
    <div className="info">
      <div className="content">
        <div className="head">
          <h1>Ready for new stuff</h1>
          <p>Buy new stock at reasonable cost</p>
          <Link to="/Products">
            <button>Gear Up</button>
          </Link>
        </div>
      </div>
      <div className="pic"></div>
    </div>
  );
}