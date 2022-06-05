import React from "react";
import { useParams } from "react-router";

const User = () => {
  const params = useParams();
  return <div>User ID: {params.id}</div>;
};

export default User;
