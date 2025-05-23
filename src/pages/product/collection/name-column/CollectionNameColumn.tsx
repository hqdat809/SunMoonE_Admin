import { useNavigate } from "react-router-dom";
import { ICollections } from "../../../../interfaces/collection-interface";
import * as RoutePath from "../../../../routes/paths";
import "./CollectionNameColumn.scss";

interface IProps {
  name?: string;
  collectionId?: number;
}

const CollectionNameColumn = ({ name, collectionId }: IProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${RoutePath.PRODUCTS}`, { state: { categoryId: collectionId } });
  };

  const handleRenderCategoryName = () => {
    const collections: ICollections[] = JSON.parse(
      localStorage.getItem("collections") || ""
    );
    if (!name) {
      const parent = collections.find((col) => col.categoryId === collectionId);
      return parent?.categoryName;
    }
    return name;
  };

  return (
    <div className="CollectionNameColumn" onClick={handleClick}>
      {handleRenderCategoryName()}
    </div>
  );
};

export default CollectionNameColumn;
