import React from "react";

type Props = {};

export default function Rating({ data }: Props) {
  return (
    <div>
      <span style={{ paddingLeft: "30px" }}>
        {data.Source} : {data.Value}
      </span>
    </div>
  );
}
