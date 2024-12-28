import { useEffect, useState } from "react";
import { ICollections } from "../../../interfaces/collection-interface";

interface IProps {
  categoryId: number;
}

const CategoryCustomer = ({ categoryId }: IProps) => {
  const [categoryParent, setCategoryParent] = useState<ICollections>();

  const handleGetCollections = () => {
    const collections: ICollections[] = JSON.parse(
      localStorage.getItem("collections") || ""
    );

    const parentCollection = collections?.find((collection: ICollections) =>
      collection?.children?.find(
        (child: ICollections) => child.categoryId === categoryId
      )
    );

    setCategoryParent(parentCollection);

    // collectionServices
    //   .getDetailCollection(categoryId)
    //   .then((res) => {

    // const category = data?.data.find(
    //   (cate) => cate.categoryId === categoryId
    // );

    // console.log(category?.parentId);

    // if (category?.parentId) {
    //   setCategoryParent(
    //     data?.data.find((cate) => cate.categoryId === category?.parentId)
    //   );
    //   console.log(
    //     data?.data.find((cate) => cate.categoryId === category?.parentId)
    //   );
    // }
    //   });
  };

  useEffect(() => {
    handleGetCollections();
  }, []);

  return <div>{categoryParent?.categoryName}</div>;
};

export default CategoryCustomer;
