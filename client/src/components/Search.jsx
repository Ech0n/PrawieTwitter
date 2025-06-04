import React from "react";

export function Search() {
  return (
    <input
      id="search-box"
      type="text"
      value=""
      placeholder="Search"
      style={{
        boxSizing: "border-box",
        display: "block",
        width: "calc(100%)",
        padding: "1rem",
        margin: "0 0 1rem 0"
      }}
    />
  );
}
