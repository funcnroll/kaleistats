import React from "react";

type Props = {
  children: React.ReactNode;
};

function H1H2Spacing({ children }: Props) {
  return <div className="space-y-4 mb-6">{children}</div>;
}

export default H1H2Spacing;
