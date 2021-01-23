import React from "react";

const ProgressBar = props => {
  const { completed } = props;

  const containerStyles = {
    height: 20,
    width: "100%",
    backgroundColor: "#b6f2e4",
    borderRadius: 50,
    zIndex: -1
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: "#19cca3",
    borderRadius: 6,
    textAlign: "right"
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles} />
    </div>
  );
};

export default ProgressBar;
