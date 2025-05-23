import { MenuItem, TextField } from "@mui/material";
import * as _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Table from "../../components/table/Table";
import { productColumns } from "../../components/table/table-data";
import { ICollections } from "../../interfaces/collection-interface";
import { IKiotResponse, ISelectOptions } from "../../interfaces/common";
import {
  IProductRequest,
  IProductResponse,
} from "../../interfaces/product-interface";
import * as collectionServices from "../../services/collection-service";
import * as productService from "../../services/product-service";
import "./Products.scss";

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

const initialFilter = {
  pageSize: 20,
  currentItem: 0,
  categoryId: "",
  orderBy: "createdDate",
  orderDirection: "DESC",
  name: "",
  isActive: "",
};

const Products = () => {
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number | undefined>(0);
  const [products, setProducts] = useState<IProductResponse[]>([]);
  const [collections, setCollections] = useState<ISelectOptions[]>([]);
  const [collectionId, setCollectionId] = useState(location.state?.categoryId);

  const [filtered, setFiltered] = useState<IProductRequest>(initialFilter);

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
    debouncedFetch(values);
  };

  const debouncedFetch = useCallback(
    _.debounce(
      (values) => setFiltered({ ...filtered, currentItem: 0, name: values }),
      1000
    ), // 500ms debounce
    [filtered]
  );

  const handleGetProducts = () => {
    productService
      .getProducts(filtered)
      .then((res: IKiotResponse<IProductResponse> | undefined) => {
        if (res && products) {
          setProducts(res.data);
          setTotal(res?.total);
        }
        setTimeout(() => {
          setLoading(false);
        }, 700);
      });
  };

  const handleGetCollections = () => {
    collectionServices
      .getCollections({ hierachicalData: true, pageSize: 100 })
      .then((data) => {
        localStorage.setItem("collections", JSON.stringify(data?.data));
        setCollections(convertToSelectOptions(data?.data || [], true));
        if (collectionId) {
          setFiltered({ ...filtered, categoryId: collectionId });
        }
      });
  };

  const handleSetCurrentItem = useCallback(
    _.debounce((index) => {
      setFiltered({ ...filtered, currentItem: index });
    }, 500),
    [filtered]
  );

  useEffect(() => {
    if (
      collectionId &&
      filtered.categoryId === import.meta.env.VITE_COLLECTION_PARENT_ID
    ) {
      return;
    }
    setLoading(true);
    handleGetProducts();
  }, [filtered]);

  useEffect(() => {
    handleGetCollections();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-title">
          Danh sách sản phẩm{" "}
          {filtered.categoryId &&
            `"${collections
              .find((c) => c.value == filtered.categoryId)
              ?.label.replace("--> ", "")}"`}
        </div>

      </div>
      <div className="page-contents">
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
                  if (event.target.value === "visible") {
                    setFiltered({
                      ...filtered,
                      currentItem: 0,
                      isActive: true,
                    });
                  } else if (event.target.value === "invisible") {
                    setFiltered({
                      ...filtered,
                      currentItem: 0,
                      isActive: false,
                    });
                  } else if (event.target.value === "default") {
                    setFiltered({ ...filtered, currentItem: 0, isActive: "" });
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
                defaultValue={collectionId ? collectionId : "default"}
                disabled={loading}
                helperText=""
                onChange={(event) => {
                  setCollectionId(undefined);
                  if (event.target.value !== "default") {
                    setFiltered({
                      ...filtered,
                      currentItem: 0,
                      categoryId: event.target.value,
                    });
                  } else {
                    setFiltered({
                      ...filtered,
                      currentItem: 0,
                      categoryId: "",
                    });
                  }
                }}
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
              currentItem={filtered.currentItem}
              isLoading={loading}
              total={total}
              pageSize={filtered.pageSize}
              handleSetCurrentItem={handleSetCurrentItem}
              columns={productColumns}
              rows={products}
              className="DataTable"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
