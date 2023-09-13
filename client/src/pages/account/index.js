import React from "react";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

function index() {
  const { userDetails } = useSelector((state) => state.user);
  return <div>Account</div>;
}

export default index;
