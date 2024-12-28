import { Box, Button, TextareaAutosize, TextField } from "@mui/material";
import React from "react";
import "./CreateProductPage.scss";

const CreateProductPage = () => {
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Get values by field name
    const name = formData.get("name");
    const descriptions = formData.get("descriptions");

    // Display values in console (or use as needed)
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-title">Tạo sản phẩm</div>
        <div className="page-header-actions"></div>
      </div>
      <div className="CreateProduct">
        <Box
          component="form"
          onSubmit={(e) => handleSubmitForm(e)} // Attach the submit handler
        >
          <div className="BasicInfo CreateProduct__blocks">
            <div className="BasicInfo__title">Thông tin cơ bản</div>
            <div className="BasicInfo__contents">
              <div className="BasicInfo__field">
                <TextField
                  id="my-input"
                  className="form-field"
                  size="small"
                  label="Tên sản phẩm"
                  variant="outlined"
                  name="name"
                />
              </div>
              <div className="BasicInfo__field">
                <div className="BasicInfo__field-label">Nội dung sản phẩm:</div>
                <TextareaAutosize
                  id="my-input"
                  className="textarea-field"
                  minRows={10}
                  name="descriptions"
                />
              </div>
            </div>
          </div>
          <div className="Images CreateProduct__blocks">
            <div className="Images__title">Hình ảnh sản phẩm</div>
            <div className="Images__contents"></div>
          </div>
          <div className="CreateProduct__submit">
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default CreateProductPage;
