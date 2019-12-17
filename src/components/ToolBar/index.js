import { Button, Upload } from "antd";
import router from "umi/router";
import { connect } from "dva";
export default connect(null, {
  createNewFile: () => ({ type: "slides/createNewFile" }),
  download: () => ({ type: "slides/download" }),
  upload: data => ({ type: "slides/upload", payload: { data } }),
  save: ()=>({type: "slides/save"})
})(function({ createNewFile, download, upload, save }) {
  function handleClickPlay(e) {
    router.push("/present");
  }

  function handleAddFile() {
    createNewFile();
  }

  function handleDownload() {
    download();
  }

  function handleSave(){
    save();
  }

  function handleUploadFile(e) {
    const { file } = e;
    const reader = new FileReader();
    reader.onload = function(e) {
      const data = e.target.result;
      const slides = JSON.parse(data);
      upload(slides);
    };
    reader.readAsText(file.originFileObj, "UTF-8");
  }
  return (
    <div>
      <Button
        type="primary"
        shape="circle"
        icon="play-circle"
        onClick={handleClickPlay}
      />
      <Button
        type="primary"
        shape="circle"
        icon="save"
        onClick={handleSave}
      />
      <Button
        type="primary"
        shape="circle"
        icon="file-add"
        onClick={handleAddFile}
      />
      <Button
        type="primary"
        shape="circle"
        icon="download"
        onClick={handleDownload}
      />
      <Upload onChange={handleUploadFile}>
        <Button icon="upload" type="primary" shape="circle" />
      </Upload>
    </div>
  );
});
