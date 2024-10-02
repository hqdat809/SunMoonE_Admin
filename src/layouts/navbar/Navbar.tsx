import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchButton from "../../components/search-button/SearchButton";
import "./Navbar.scss";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { Avatar } from "@mui/material";

interface INavbarProps {
  isExpand: boolean;
  setIsExpand: (value: boolean) => void;
}

const Navbar = ({ isExpand, setIsExpand }: INavbarProps) => {
  const onToggleExpand = () => {
    setIsExpand(!isExpand);
  };

  return (
    <div className={`Navbar ${isExpand ? "expanded" : "collapsed"}`}>
      <div className="Navbar__left-side">
        <div className="Navbar__menu" onClick={onToggleExpand}>
          <MenuRoundedIcon />
        </div>
        <div className="Navbar__search">
          {/* <TextField
            className="Navbar__search-textField"
            size="small"
            placeholder="Tìm kiếm chức năng..."
            variant="standard"
            sx={{ width: "160px" }}
            fullWidth
          /> */}
          <SearchButton />
        </div>
      </div>
      <div className="Navbar__right-side">
        <div className="Navbar__notification">
          <NotificationsNoneRoundedIcon />
        </div>
        <div className="Navbar__message">
          <MessageOutlinedIcon />
        </div>
        <div className="Navbar__profile">
          <div className="Navbar__profile-avatar">
            <Avatar alt="logo" sx={{ width: 30, height: 30 }} />
          </div>
          <div className="Navbar__profile-name">Admin</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
