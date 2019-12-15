import { Upload, Button } from "antd";

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
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <img src={value} style={{ maxHeight: height, maxWidth: width }} />
      {edit && (
        <div
          style={{
            position: "absolute",
            transformOrigin: "left top",
            transform: "scale(2)"
          }}
        >
          <Upload
            accept="image/*"
            onChange={handleImageChange}
            showUploadList={false}
            customRequest={() => {}}
          >
            <Button type="primary" icon="upload"></Button>
          </Upload>
        </div>
      )}
    </div>
  );
}
