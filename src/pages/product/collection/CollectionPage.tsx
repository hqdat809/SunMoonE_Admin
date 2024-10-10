import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import { collectionsColumns } from "../../../components/table/table-data";
import {
  ICollections,
  IGetCollectionRequest,
} from "../../../interfaces/collection-interface";
import {
  getCollections,
  getDetailCollection,
} from "../../../services/collection-service";
import { IKiotResponse } from "../../../interfaces/common";

const CollectionPage = () => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [collections, setCollections] = useState<ICollections[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<
    ICollections[]
  >([]);

  const [filtered, setFiltered] = useState<IGetCollectionRequest>({
    pageSize: 25,
    currentItem: 0,
    orderBy: "modifiedDate",
    orderDirection: "DESC",
    hierachicalData: true,
  });

  const handleSetCurrentItem = useCallback(
    _.debounce((index) => {
      console.log("debounced setCurrentItem: ", index);
      setFiltered({ ...filtered, currentItem: index });
    }, 500),
    [filtered]
  );

  const handleGetOrders = () => {
    getCollections().then((res) => {
      if (res) {
        console.log(res.children);
        setTotal(res?.children?.length || 0);
        setCollections(res?.children || []);
      }
      setTimeout(() => {
        setLoading(false);
      }, 700);
    });
  };

  useEffect(() => {
    setLoading(true);
    handleGetOrders();
  }, [filtered]);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-title">CollectionPage</div>
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
              setSelection={setSelectedCollections}
              className="Customer__table"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
