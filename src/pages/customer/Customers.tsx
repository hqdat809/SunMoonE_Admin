import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import "./Customers.scss";
const listRank = [
  {
    value: "default",
    label: "---none---",
  },
  {
    value: "customer",
    label: "Thành viên",
  },
  {
    value: "silver",
    label: "Bạc",
  },
  {
    value: "gold",
    label: "Vàng",
  },
  {
    value: "diamond",
    label: "Kim",
  },
];

const listCreatedDate = [
  {
    value: "default",
    label: "---none---",
  },
  {
    value: "today",
    label: "Hôm nay",
  },
  {
    value: "yesterday",
    label: "Hôm qua",
  },
  {
    value: "thisWeek",
    label: "Tuần này",
  },
  {
    value: "lastWeek",
    label: "Tuần trước",
  },
  {
    value: "7daysLasted",
    label: "7 ngày gần đây",
  },
  {
    value: "30daysLasted",
    label: "30 ngày gần đây",
  },
  {
    value: "thisMonth",
    label: "Tháng này",
  },
  {
    value: "lastMonth",
    label: "Tháng trước",
  },
];

const listPrice = [
  {
    value: "default",
    label: "---none---",
  },
  {
    value: "ctv",
    label: "Bảng giá CTV",
  },
  {
    value: "ctv1",
    label: "Bảng giá CTV1",
  },
  {
    value: "ctv2",
    label: "Bảng giá CTV2",
  },
  {
    value: "ctv3",
    label: "Bảng giá CTV3",
  },
  {
    value: "ctv4",
    label: "Bảng giá CTV4",
  },
];

const Customers = () => {
  return (
    <div className="page-container">
      <div className="page-title">Danh sách khách hàng</div>
      <div className="page-contents">
        <div className="Customer">
          <div className="Customer__filter">
            <div className="Customer__filter-item">
              <TextField
                id="outlined-basic"
                label="Tìm kiếm"
                variant="outlined"
                size="small"
              />
            </div>
            <div className="Customer__filter-item">
              <TextField
                id="outlined-select-currency"
                select
                label="Hạng thành viên"
                size="small"
                defaultValue="default"
                helperText=""
              >
                {listRank.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="Customer__filter-item">
              <TextField
                id="outlined-select-currency"
                select
                label="Bảng giá"
                size="small"
                defaultValue="default"
                helperText=""
              >
                {listPrice.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="Customer__filter-item">
              <TextField
                id="outlined-select-currency"
                select
                label="Ngày tạo"
                size="small"
                defaultValue="default"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthRoundedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                helperText=""
              >
                {listCreatedDate.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className="Customer__table"></div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
