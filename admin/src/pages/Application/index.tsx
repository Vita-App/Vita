import React from "react";
import { useParams } from "react-router-dom";

const Application = () => {
  const { id } = useParams();

  return <div>Application: {id}</div>;
};

export default Application;
