import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ICollections } from "../../interfaces/collection-interface";
import { IKiotResponse, ISelectOptions } from "../../interfaces/common";
import * as collectionServices from "../../services/collection-service";
import "./Products.scss";
import Table from "../../components/table/Table";
import * as productService from "../../services/product-service";
import { IProductResponse } from "../../interfaces/product-interface";
import { productColumns } from "../../components/table/table-data";

const listStatus: ISelectOptions[] = [
  {
    value: "default",
    label: "---none---",
  },
  {
    value: "visible",
    label: "Đang hiện",
  },
  {
    value: "invisible",
    label: "Đang ẩn",
  },
];

const Products = () => {
  const [collections, setCollections] = useState<ISelectOptions[]>([]);
  const [products, setProducts] = useState<IProductResponse[]>();
  const [total, setTotal] = useState<number | undefined>(0);
  const [currentItem, setCurrentItem] = useState(0);
  const [calledItems, setCalledItems] = useState<number[]>([0]);
  const [selectedProduct, setSelectedProduct] = useState<IProductResponse[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const convertToSelectOptions = (data: ICollections[]) => {
    const result: ISelectOptions[] = [
      {
        value: "default",
        label: "---none---",
      },
    ];

    data.map((d) => {
      result.push({
        value: d.categoryId,
        label: d.categoryName,
      });
      if (d.children && d.children.length > 0) {
        d.children.map((c: ICollections) => {
          result.push({
            value: c.categoryId,
            label: `--> ${c.categoryName}`,
          });
        });
      }
    });
    return result;
  };

  useEffect(() => {
    if (!calledItems.includes(currentItem)) {
      setLoading(true);
      productService
        .getProducts(
          {
            orderDirection: "DESC",
            orderBy: "createdDate",
            currentItem: currentItem,
          },
          () => {}
        )
        .then((res: IKiotResponse<IProductResponse> | undefined) => {
          console.log(currentItem);
          if (products && res) {
            setProducts([...products, ...res.data]);
            setCalledItems([...calledItems, currentItem]);
          }
          setTotal(res?.total);
          setTimeout(() => {
            setLoading(false);
          }, 200);
        });
    }
  }, [currentItem]);

  useEffect(() => {
    collectionServices
      .getCollections({ hierachicalData: true, pageSize: 100 })
      .then((data) => {
        setCollections(convertToSelectOptions(data?.data || []));
      });

    setLoading(true);
    productService
      .getProducts(
        {
          orderDirection: "DESC",
          orderBy: "createdDate",
        },
        () => {}
      )
      .then((res: IKiotResponse<IProductResponse> | undefined) => {
        setProducts(res?.data);
        setTotal(res?.total);
        setTimeout(() => {
          setLoading(false);
        }, 200);
      });
  }, []);

  useEffect(() => {}, [loading]);

  return (
    <div className="page-container">
      <div className="page-title">Danh sách sản phẩm</div>
      <div className="page-contents">
        <div className="Products">
          <div className="Products__filter">
            <div className="Products__filter-item">
              <TextField
                id="outlined-basic"
                label="Tìm kiếm"
                variant="outlined"
                size="small"
              />
            </div>
            <div className="Products__filter-item">
              <TextField
                id="outlined-select-currency"
                select
                label="Trạng thái"
                size="small"
                defaultValue="default"
                helperText=""
              >
                {listStatus.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="Products__filter-item">
              <TextField
                id="outlined-select-currency"
                select
                label="Danh mục"
                size="small"
                defaultValue="default"
                helperText=""
              >
                {collections.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className="Products__table">
            <Table
              isLoading={loading}
              total={total}
              pageSize={20}
              columns={productColumns}
              rows={products}
              currentItem={currentItem}
              setCurrentItem={setCurrentItem}
              setSelection={setSelectedProduct}
              className="Product__table"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
