import React, { useEffect, useState } from "react";
import "./EditPage.scss";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { editShopInfo, getShopInfo } from "../../../services/shop-service";
import { IBankResponse, IShopResponse } from "../../../interfaces/common";
import { Button } from "@mui/material";
import { editBankInfo, getBankInfo } from "../../../services/bank-service";

const EditPage = () => {
  const [shop, setShop] = useState<IShopResponse>();
  const [bank, setBank] = useState<IBankResponse>();

  const validationShopSchema = Yup.object().shape({
    name: Yup.string(),
    phoneNumber: Yup.string(),
    email: Yup.string(),
    address: Yup.string(),
    facebookAddress: Yup.string(),
    youtubeAddress: Yup.string(),
  });

  const validationBankSchema = Yup.object().shape({
    name: Yup.string(),
    bankId: Yup.string(),
    fullName: Yup.string(),
  });

  const handleSubmitShop = (values: any) => {
    console.log("Submit form", values);
    if (shop?.id) {
      editShopInfo(shop.id, values, () => {
        window.location.reload();
      }).then((res) => {
        setShop(res?.data[0]);
      });
    }
  };

  const handleSubmitBank = (values: any) => {
    if (bank?.id) {
      editBankInfo(bank.id, values, () => {
        window.location.reload();
      }).then((res) => {
        setBank(res?.data[0]);
      });
    }
  };

  useEffect(() => {
    getShopInfo().then((res) => {
      setShop(res?.data[0]);
    });

    getBankInfo().then((res) => {
      setBank(res?.data[0]);
    });
  }, []);

  return (
    <div className="page-container">
      <div className="page-title">Chỉnh sửa thông tin</div>
      <div className="page-contents">
        <div className="Edit">
          {!shop ? (
            <div>Loading...</div>
          ) : (
            <div className="Edit__shop">
              <div className="Edit__shop-header">
                <div className="Edit__shop-title">Thông tin cửa hàng</div>
              </div>

              <div className="Edit__shop-contents">
                <Formik
                  initialValues={shop}
                  validationSchema={validationShopSchema}
                  onSubmit={handleSubmitShop}
                >
                  {(formikProps) => (
                    <Form className="Edit__shop-form">
                      <div className="Edit__shop-item">
                        <div className="Edit__shop-item-label">
                          Tên cửa hàng:
                        </div>
                        <div className="Edit__shop-item-input">
                          <Field
                            type="text"
                            name="name"
                            placeholder="Nhập tên cửa hàng"
                          />
                        </div>
                      </div>
                      <div className="Edit__shop-item">
                        <div className="Edit__shop-item-label">Email:</div>
                        <div className="Edit__shop-item-input">
                          <Field type="text" name="email" placeholder="Email" />
                        </div>
                      </div>
                      <div className="Edit__shop-item">
                        <div className="Edit__shop-item-label">Điện thoại:</div>
                        <div className="Edit__shop-item-input">
                          <Field
                            type="text"
                            name="phoneNumber"
                            placeholder="Số điện thoại"
                          />
                        </div>
                      </div>
                      <div className="Edit__shop-item">
                        <div className="Edit__shop-item-label">Địa chỉ:</div>
                        <div className="Edit__shop-item-input">
                          <Field
                            type="text"
                            name="address"
                            placeholder="Nhập địa chỉ"
                          />
                        </div>
                      </div>
                      <div className="Edit__shop-row">
                        <div className="Edit__shop-item">
                          <div className="Edit__shop-item-label">
                            Địa chỉ facebook:
                          </div>
                          <div className="Edit__shop-item-input">
                            <Field
                              type="text"
                              name="facebookAddress"
                              placeholder="Facebook address"
                            />
                          </div>
                        </div>
                        <div className="Edit__shop-item">
                          <div className="Edit__shop-item-label">
                            Địa chỉ youtube:
                          </div>
                          <div className="Edit__shop-item-input">
                            <Field
                              type="text"
                              name="youtubeAddress"
                              placeholder="Youtube address"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="Edit__shop-submit">
                        <Button
                          type="submit"
                          variant="contained"
                          color="success"
                          disabled={!formikProps.dirty}
                        >
                          Sửa
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          )}

          <div className="Edit__bank"></div>
        </div>
      </div>
      <div className="page-contents">
        <div className="Edit">
          {!bank ? (
            <div>Loading...</div>
          ) : (
            <div className="Edit__shop">
              <div className="Edit__shop-header">
                <div className="Edit__shop-title">Thông tin ngân hàng</div>
              </div>
              <div className="Edit__shop-contents">
                <Formik
                  initialValues={bank}
                  validationSchema={validationBankSchema}
                  onSubmit={handleSubmitBank}
                >
                  {(formikProps) => (
                    <Form className="Edit__shop-form">
                      <div className="Edit__shop-item">
                        <div className="Edit__shop-item-label">
                          Tên ngân hàng:
                        </div>
                        <div className="Edit__shop-item-input">
                          <Field
                            type="text"
                            name="name"
                            placeholder="Nhập tên ngân hàng"
                          />
                        </div>
                      </div>
                      <div className="Edit__shop-item">
                        <div className="Edit__shop-item-label">
                          Số tài khoản:
                        </div>
                        <div className="Edit__shop-item-input">
                          <Field
                            type="text"
                            name="bankId"
                            placeholder="Số tài khoản"
                          />
                        </div>
                      </div>
                      <div className="Edit__shop-item">
                        <div className="Edit__shop-item-label">Tên đầy đủ:</div>
                        <div className="Edit__shop-item-input">
                          <Field
                            type="text"
                            name="fullName"
                            placeholder="Họ và tên"
                          />
                        </div>
                      </div>
                      <div className="Edit__shop-submit">
                        <Button
                          type="submit"
                          variant="contained"
                          color="success"
                          disabled={!formikProps.dirty}
                        >
                          Sửa
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          )}

          <div className="Edit__bank"></div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
