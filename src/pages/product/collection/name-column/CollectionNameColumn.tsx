import React from "react";
import "./CollectionNameColumn.scss";
import { useNavigate } from "react-router-dom";
import * as RoutePath from "../../../../routes/paths";

interface IProps {
  name: string;
  collectionId: number;
}

const CollectionNameColumn = ({ name, collectionId }: IProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${RoutePath.PRODUCTS}`, { state: { categoryId: collectionId } });
  };

  return (
    <div className="CollectionNameColumn" onClick={handleClick}>
      {name}
    </div>
  );
};

export default CollectionNameColumn;
