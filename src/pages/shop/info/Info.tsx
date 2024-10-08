import "./Info.scss";
import logo from "../../../assets/image/icon.jpg";
import { useEffect, useState } from "react";
import { getProducts } from "../../../services/product-service";
import { IProductResponse } from "../../../interfaces/product-interface";
import noProductImage from "../../../assets/image/no-product-image.png";
import QRCode from "../../../assets/image/QRCode.png";
import { getShopInfo } from "../../../services/shop-service";
import { IBankResponse, IShopResponse } from "../../../interfaces/common";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useNavigate } from "react-router-dom";
import * as RoutePath from "../../../routes/paths";
import { getBankInfo } from "../../../services/bank-service";

const Info = () => {
  const [products, setProducts] = useState<IProductResponse[]>();
  const [shop, setShop] = useState<IShopResponse>();
  const [bank, setBank] = useState<IBankResponse>();

  const navigate = useNavigate();

  const payload = {
    categoryId: 1738133,
    pageSize: 10,
  };

  useEffect(() => {
    getProducts(payload).then((res) => {
      setProducts(res?.data);
    });

    getShopInfo().then((res) => {
      setShop(res?.data[0]);
    });

    getBankInfo().then((res) => {
      setBank(res?.data[0]);
    });
  }, []);

  const handleNavigateEditPage = () => {
    navigate(RoutePath.EDIT_SHOP);
  };

  const handleNavigateProductPage = () => {
    navigate(RoutePath.PRODUCTS);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-title">Thông tin cửa hàng</div>
      </div>
      <div className="InformationPage">
        <div className="Config">
          <div className="Information">
            <div className="Shop">
              <div className="Shop__title">Thông tin cửa hàng</div>
              <div className="Shop__contents">
                <div className="Shop__image">
                  <img src={logo} alt="Logo cửa hàng" />
                </div>
                <div className="Shop__name">{shop?.name}</div>
                <div className="Shop__other">
                  <div className="Shop__other-phone">
                    {shop?.phoneNumber} / {"  "}
                  </div>
                  <div className="Shop__other-email">{shop?.email}</div>
                </div>
                <div className="Shop__address">{shop?.address}</div>
                <div className="Shop__facebook">
                  Facebook: {"  "}
                  <a href={shop?.facebookAddress}>{shop?.facebookAddress}</a>
                </div>
                <div className="Shop__youtube">
                  Youtube: {"  "}
                  <a href={shop?.youtubeAddress}>{shop?.youtubeAddress}</a>
                </div>
              </div>
              <div className="Shop__edit" onClick={handleNavigateEditPage}>
                <EditRoundedIcon className="Shop__edit-icon" />
                <div className="Shop__edit-text">
                  Chỉnh sửa thông tin cửa hàng
                </div>
              </div>
            </div>
            <div className="Bank">
              <div className="Bank__title">Thông tin ngân hàng</div>
              <div className="Bank__contents">
                <div className="Bank__item">
                  <div className="Bank__item-label">Tên ngân hàng:</div>
                  <div className="Bank__item-value">
                    {"  "}
                    {bank?.name}
                  </div>
                </div>
                <div className="Bank__item">
                  <div className="Bank__item-label">Số tài khoản:</div>
                  <div className="Bank__item-value">
                    {"  "}
                    {bank?.bankId}
                  </div>
                </div>
                <div className="Bank__item">
                  <div className="Bank__item-label">Họ và tên:</div>
                  <div className="Bank__item-value">
                    {"  "}
                    {bank?.fullName}
                  </div>
                </div>
                <div className="Bank__item-image">
                  <img src={QRCode} alt="QRCode" />
                </div>
              </div>
              <div className="Bank__edit" onClick={handleNavigateEditPage}>
                <EditRoundedIcon className="Bank__edit-icon" />
                <div className="Bank__edit-text">
                  Chỉnh sửa thông tin ngân hàng
                </div>
              </div>
            </div>
          </div>
          <div className="Domain">
            <div className="Domain__title">Thông tin tên miền</div>
            <div className="Domain__contents">...</div>
          </div>
        </div>
        <div className="NewProducts">
          <div className="NewProducts__title">Sản phẩm mới</div>
          <div className="NewProducts__contents">
            <div className="NewProducts__list">
              {products?.map((product: IProductResponse) => (
                <div className="NewProducts__item">
                  <div className="NewProducts__item-image">
                    <img
                      src={product.images ? product.images[0] : noProductImage}
                      alt={product.name}
                    />
                  </div>
                  <div className="NewProducts__item-info">
                    <div className="NewProducts__item-name">{product.name}</div>
                    <div className="NewProducts__item-discount">
                      Khuyến mãi: 0.0%
                    </div>
                  </div>
                  <div className="NewProducts__item-prices">
                    <div className="NewProducts__item-price">
                      {product.basePrice}
                    </div>
                    <div className="NewProducts__item-old-price">
                      {product.basePrice}
                    </div>
                  </div>
                  {/* <div className="NewProducts__item-quantity">
                    {product.quantity} sản phẩm
                  </div> */}
                </div>
              ))}
            </div>
            <div
              className="NewProducts__other"
              onClick={handleNavigateProductPage}
            >
              Xem tất cả sản phẩm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
