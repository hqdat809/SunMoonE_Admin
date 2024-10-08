import React, { useEffect, useState } from "react";
import * as collectionServices from "../../../services/collection-service";
import { ICollections } from "../../../interfaces/collection-interface";
import { ISelectOptions } from "../../../interfaces/common";
import { ICategory } from "../../../interfaces/category-interface";

interface IProps {
  categoryId: number;
}

const CategoryCustomer = ({ categoryId }: IProps) => {
  const [collections, setCollections] = useState<ICollections[]>();
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
