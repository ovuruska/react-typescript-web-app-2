import React from 'react';

interface PageCardProps {
  children?: React.ReactNode;
  className?: string;
}

const PageCard: React.FC<PageCardProps> = ({children = null,className = ""}:PageCardProps) => {
  return <div data-testid={"page-card"} className={"page add-ons-page" + " " + className}>
    {children}
  </div>;
}

export default PageCard;
