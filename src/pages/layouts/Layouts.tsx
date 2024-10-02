import { Outlet } from "react-router-dom";
import Sidebar from "../../layouts/sidebar/Sidebar";
import Navbar from "../../layouts/navbar/Navbar";
import "./Layouts.scss";
import { useEffect, useState } from "react";
import { getStorageToken } from "../../utils/storage-utils";

interface ILayoutsProps {
  setAccessToken: (token: string) => void;
}

const Layouts = ({ setAccessToken }: ILayoutsProps) => {
  const [isExpand, setIsExpand] = useState(true);

  useEffect(() => {
    if (isExpand) {
      localStorage.setItem("SIDE_BAR_STATUS", "expanded");
    } else {
      localStorage.setItem("SIDE_BAR_STATUS", "collapsed");
    }
  }, [isExpand]);

  useEffect(() => {
    setAccessToken(getStorageToken() || "");
  }, []);

  return (
    <div className="Layout">
      <div className={`Layout__navbar ${!isExpand ? "collapsed" : "expanded"}`}>
        <Navbar isExpand={isExpand} setIsExpand={setIsExpand} />
      </div>
      <div
        className={`Layout__sidebar ${!isExpand ? "collapsed" : "expanded"}`}
      >
        <Sidebar isExpand={isExpand} setIsExpand={setIsExpand} />
      </div>
      <div
        className={`Layout__contents ${!isExpand ? "collapsed" : "expanded"}`}
      >
        <div
          className={`Layout__outlet ${!isExpand ? "collapsed" : "expanded"}`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layouts;
