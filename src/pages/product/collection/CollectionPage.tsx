import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import { collectionsColumns } from "../../../components/table/table-data";
import {
  ICollections,
  IGetCollectionRequest,
} from "../../../interfaces/collection-interface";
import {
  getCollections
} from "../../../services/collection-service";

const CollectionPage = () => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [collections, setCollections] = useState<ICollections[]>([]);

  const [filtered, setFiltered] = useState<IGetCollectionRequest>({
    pageSize: 20,
    currentItem: 0,
    orderBy: "parentId",
    orderDirection: "ASC",
    hierachicalData: false,
  });

  const handleSetCurrentItem = useCallback(
    _.debounce((index) => {
      setFiltered({ ...filtered, currentItem: index });
    }, 500),
    [filtered]
  );

  const handleGetCollections = () => {
    getCollections(filtered).then((res) => {
      if (res) {
        setTotal(res?.total);
        setCollections(res?.data || []);
      }
      setTimeout(() => {
        setLoading(false);
      }, 700);
    });
  };

  useEffect(() => {
    setLoading(true);
    handleGetCollections();
  }, [filtered]);

  useEffect(() => {
    getCollections({ hierachicalData: true, pageSize: 100 }).then((data) => {
      localStorage.setItem("collections", JSON.stringify(data?.data));
    });
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-title">Danh mục</div>
      </div>
      <div className="page-contents">
        <div className="Collections">
          <div className="Collections__filter"></div>
          <div className="">
            <Table
              tableId="categoryId"
              currentItem={filtered.currentItem}
              isLoading={loading}
              total={total}
              pageSize={filtered.pageSize}
              handleSetCurrentItem={handleSetCurrentItem}
              columns={collectionsColumns}
              rows={collections}
              className="DataTable"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
