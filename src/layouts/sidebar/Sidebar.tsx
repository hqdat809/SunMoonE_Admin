/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderZipRoundedIcon from "@mui/icons-material/FolderZipRounded";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Icon } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/image/icon.jpg";
import * as storeIcon from "../../assets/image/sidebar";
import * as RoutePath from "../../routes/paths";
import "./Sidebar.scss";
interface ISidebarEl {
  name: string;
  src?: string;
  icon?: any;
  title?: string;
  route?: string;
  children?: ISidebarEl[];
}
const varSidebarElements: ISidebarEl[] = [
  {
    name: "Cửa hàng",
    title: "Cửa hàng",
    src: storeIcon.shopIcon,
    children: [
      { name: "Dashboard", icon: DashboardIcon, route: "dashboard" },
    ],
  },
  {
    name: "Bán hàng",
    title: "Bán hàng",
    src: storeIcon.orderIcon,
    children: [
      {
        name: "Danh sách đơn hàng",
        icon: ShoppingCartIcon,
        route: RoutePath.ORDERS,
      },
      {
        name: "Danh sách hóa đơn",
        icon: ReceiptRoundedIcon,
        route: RoutePath.INVOICES,
      },
    ],
  },
  {
    name: "K/Hàng",
    title: "Khách hàng",
    src: storeIcon.customerIcon,
    children: [
      {
        name: "Khách hàng KiotViet",
        route: RoutePath.CUSTOMERS,
        icon: RecentActorsIcon,
      },
      {
        name: "Khách hàng website",
        route: RoutePath.USER,
        icon: AccountBoxIcon,
      },
    ],
  },
  {
    name: "S/Phẩm",
    title: "Sản phẩm",
    src: storeIcon.productIcon,
    children: [
      {
        name: "Danh sách sản phẩm",
        route: RoutePath.PRODUCTS,
        icon: InventoryIcon,
      },
      {
        name: "Danh mục",
        route: RoutePath.COLLECTIONS,
        icon: FolderZipRoundedIcon,
      },
    ],
  },
];

interface ISidebarProps {
  isExpand: boolean;
  setIsExpand: (value: boolean) => void;
}

const Sidebar = ({ isExpand, setIsExpand }: ISidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeEl, setActiveEl] = useState<ISidebarEl | undefined>(
    varSidebarElements[0]
  );
  const [isCollapsed, setIsCollapsed] = useState(!isExpand);
  const [hoverEl, setHoverEl] = useState<ISidebarEl | undefined>(
    varSidebarElements[0]
  );

  useEffect(() => {
    setTimeout(() => {
      setIsCollapsed(!isExpand);
    }, 700);
  }, [isExpand]);

  useEffect(() => {
    setActiveEl(
      varSidebarElements.find((el) => {
        return el?.children?.find(
          (child) => child.route && location.pathname.includes(child.route)
        );
      })
    );
    setHoverEl(
      varSidebarElements.find(
        (el) => el.route && location.pathname.includes(el.route)
      )
    );
  }, [location.pathname]);

  return (
    <div className={`Sidebar`}>
      <div className="Sidebar__logo">
        <Avatar alt="logo" src={logo} sx={{ width: 30, height: 30 }} />
        <div
          className={`Sidebar__shopName ${isCollapsed && "displayNone"} ${isExpand && "display"
            }`}
        >
          SunMoonE
        </div>
      </div>
      <div className="Sidebar__menu">
        <div className="Sidebar__narrow">
          {varSidebarElements.map((el) => (
            <div
              className={`Sidebar__el ${(hoverEl?.name === el.name || activeEl?.name === el.name) &&
                "active"
                }`}
              onClick={() => {
                el.children &&
                  el.children[0].route &&
                  navigate(el.children[0].route);
                setActiveEl(el);
              }}
              onMouseEnter={() => {
                setIsExpand(true);
                if (el.name === activeEl?.name) {
                  setHoverEl(undefined);
                } else {
                  setHoverEl(el);
                }
              }}
            >
              <div className="Sidebar__el-icon">
                <img src={el.src} alt="" />
              </div>

              <div className="Sidebar__el-name">{el.name}</div>
            </div>
          ))}
        </div>
        <div
          className={`Sidebar__expand ${isExpand ? "expanded" : "collapsed"} ${isCollapsed && "displayNone"
            } ${isExpand && "display"}`}
          onMouseLeave={() => {
            setHoverEl(undefined);
          }}
        >
          <div
            className={`Sidebar__expand-title ${isCollapsed && "displayNone"} ${isExpand && "display"
              }`}
          >
            {hoverEl?.title || activeEl?.title}
          </div>

          <div className="Sidebar__list-children">
            {hoverEl?.children?.map((item) => (
              <div
                className={`Sidebar__item ${item.route &&
                  location.pathname.includes(item.route) &&
                  "active"
                  }`}
                onClick={() => {
                  setActiveEl(hoverEl);
                  item.route && navigate(item.route);
                }}
              >
                <div
                  className={`Sidebar__item-icon ${isCollapsed && "displayNone"
                    } ${isExpand && "display"}`}
                >
                  <Icon component={item.icon} sx={{ width: 20, height: 20 }} />
                </div>
                <div className={`Sidebar__item-name `}>{item.name}</div>
              </div>
            )) ||
              activeEl?.children?.map((item) => (
                <div
                  className={`Sidebar__item ${item.route &&
                    location.pathname.includes(item.route) &&
                    "active"
                    }`}
                  onClick={() => item.route && navigate(item.route)}
                >
                  <div
                    className={`Sidebar__item-icon ${isCollapsed && "displayNone"
                      } ${isExpand && "display"}`}
                  >
                    <Icon
                      component={item.icon}
                      sx={{ width: 20, height: 20 }}
                    />
                  </div>
                  <div className={`Sidebar__item-name `}>{item.name}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
