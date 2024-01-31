import React from "react";

type Props = {};

export default function ErrorMessage({ error }: Props) {
  return <div className="error">{error}</div>;
}
