import { Upload, Icon, Button } from "antd";

export default function({ attrs, value, width, height, edit, onValueChange }) {
  function handleImageChange(data) {
    const file = data.file.originFileObj;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      const imageURL = reader.result;
      onValueChange(imageURL);
    };
  }
  return (
    <div
      style={{
        ...attrs,
        width,
        height
      }}
    >
      <img src={value} style={{ maxHeight: height, maxWidth: width }} />
      {edit && (
        <div>
          <Upload
            accept="image/*"
            onChange={handleImageChange}
            showUploadList={false}
            customRequest={() => {}}
          >
            <Button>
              <Icon type="upload" /> 上传图片
            </Button>
          </Upload>
        </div>
      )}
    </div>
  );
}
