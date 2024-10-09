import { Button, MenuItem, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { productColumns } from "../../components/table/table-data";
import { ICollections } from "../../interfaces/collection-interface";
import { IKiotResponse, ISelectOptions } from "../../interfaces/common";
import { IProductResponse } from "../../interfaces/product-interface";
import * as collectionServices from "../../services/collection-service";
import * as productService from "../../services/product-service";
import "./Products.scss";
import CircularProgress from "@mui/material/CircularProgress";
import * as _ from "lodash";
import { useNavigate } from "react-router-dom";
import * as RoutePaths from "../../routes/paths";

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
  const navigate = useNavigate();

  const [collections, setCollections] = useState<ISelectOptions[]>([]);
  const [products, setProducts] = useState<IProductResponse[]>([]);
  const [total, setTotal] = useState<number | undefined>(0);
  const [currentItem, setCurrentItem] = useState(0);
  const [status, setStatus] = useState<boolean>();
  const [filteredProduct, setFilteredProduct] = useState<
    IProductResponse[] | undefined
  >(undefined);
  const [selectedProduct, setSelectedProduct] = useState<IProductResponse[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState();
  const [categoryId, setCategoryId] = useState<string>("");
  const [parentId, setParentId] = useState<string>("");
  const [collectionCustomer, setCollectionCustomer] = useState<
    ISelectOptions[]
  >([]);

  const convertToSelectOptions = (data: ICollections[], getChildren = true) => {
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
      if (d.children && d.children.length > 0 && getChildren) {
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

  const handleInputSearchText = (values: string) => {
    setProducts([]);
    setFilteredProduct(undefined);
    setCurrentItem(0);
    debouncedFetch(values);
  };

  const debouncedFetch = useCallback(
    _.debounce((values) => setSearchText(values), 1000), // 500ms debounce
    []
  );

  const handleGetProducts = () => {
    let payload = null;
    if (searchText) {
      payload = {
        orderDirection: "DESC",
        orderBy: "createdDate",
        pageSize: 200,
        currentItem: currentItem,
        name: searchText,
      };
    } else {
      payload = {
        orderDirection: "DESC",
        orderBy: "createdDate",
        pageSize: 200,
        currentItem: currentItem,
      };
    }

    productService
      .getProducts(payload)
      .then((res: IKiotResponse<IProductResponse> | undefined) => {
        if (res && products) {
          const newData = [...products, ...res.data];
          console.log("call: ", newData);
          setProducts(newData);
          setTotal(res?.total);
          setCurrentItem(currentItem + 200);
        }
      });
    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  const handleGetCollections = () => {
    collectionServices
      .getCollections({ hierachicalData: true, pageSize: 100 })
      .then((data) => {
        localStorage.setItem("collections", JSON.stringify(data?.data));
        setCollections(convertToSelectOptions(data?.data || []));
        setCollectionCustomer(convertToSelectOptions(data?.data || [], false));
      });
  };

  const handleNavigateCreateProductPage = () => {
    navigate(RoutePaths.PRODUCTS_CREATE);
  };

  useEffect(() => {
    if (searchText != undefined) {
      setLoading(true);
      handleGetProducts();
    }
  }, [searchText]);

  useEffect(() => {
    if (products.length > 0) {
      setLoading(true);
      let newData: IProductResponse[] = [];
      newData = products;

      // filter status field
      if (status !== undefined) {
        const filteredData = newData.filter((p) => p.isActive === status);
        newData = filteredData;
      } else {
        newData = products;
      }

      // filter category field
      if (categoryId !== "default" && categoryId) {
        const filteredData = newData.filter(
          (p) => p.categoryId === parseInt(categoryId)
        );
        newData = filteredData;
      }

      // filter customer field
      if (parentId !== "default" && parentId) {
        const collections: ICollections[] = JSON.parse(
          localStorage.getItem("collections") || ""
        );

        console.log(parentId);

        const childrenCollections: ICollections[] | undefined =
          collections.find(
            (collect) => collect.categoryId == parseInt(parentId)
          )?.children;

        const childrenCollectionsId = childrenCollections?.map(
          (collect) => collect.categoryId
        );

        newData = newData.filter((product) =>
          childrenCollectionsId?.includes(product.categoryId)
        );
      }

      console.log("newData: ", newData);
      console.log("products: ", products);

      setFilteredProduct(newData);
      setTotal(newData.length);
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  }, [status, categoryId, parentId]);

  useEffect(() => {
    if (total && currentItem < total && currentItem > 0) {
      handleGetProducts();
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  }, [products]);

  useEffect(() => {
    setLoading(true);
    handleGetCollections();
    handleGetProducts();
  }, []);

  const renderProduct = () => {
    if (filteredProduct === undefined) {
      return products;
    } else if (filteredProduct && filteredProduct.length === 0) {
      return filteredProduct;
    } else {
      return filteredProduct;
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-title">Danh sách sản phẩm</div>
        <div className="page-header-actions">
          <div className="add-action">
            <Button
              variant="contained"
              onClick={handleNavigateCreateProductPage}
            >
              Tạo sản phẩm mới
            </Button>
          </div>
        </div>
      </div>
      <div className="page-contents">
        {/* {loading && (
          <div className="layout-loading">
            <CircularProgress size="3rem" />
          </div>
        )} */}

        <div className="Products">
          <div className="Products__filter">
            <div className="Products__filter-item">
              <TextField
                id="outlined-basic"
                label="Tìm kiếm"
                variant="outlined"
                disabled={loading}
                size="small"
                onChange={(e) => handleInputSearchText(e.target.value)}
              />
            </div>
            <div className="Products__filter-item">
              <TextField
                id="outlined-select-currency"
                select
                label="Trạng thái"
                size="small"
                defaultValue="default"
                disabled={loading}
                helperText=""
                onChange={(event) => {
                  console.log(event.target.value);
                  if (event.target.value === "visible") {
                    setStatus(true);
                  } else if (event.target.value === "invisible") {
                    setStatus(false);
                  } else if (event.target.value === "default") {
                    setStatus(undefined);
                  }
                }}
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
                disabled={loading}
                helperText=""
                onChange={(event) => {
                  console.log(event.target.value);
                  setCategoryId(event.target.value);
                }}
              >
                {collections.map((option) => (
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
                label="Nhóm khách hàng"
                size="small"
                defaultValue="default"
                helperText=""
                disabled={loading}
                onChange={(event) => {
                  setParentId(event.target.value);
                }}
              >
                {collectionCustomer.map((option) => (
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
              rows={renderProduct()}
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
