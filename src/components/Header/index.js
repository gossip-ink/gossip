import classNames from "./index.css";
import { Button, Upload } from "antd";
import router from "umi/router";
import { connect } from "dva";
export default connect(null, {
  createNewFile: () => ({ type: "slides/createNewFile" }),
  download: () => ({ type: "slides/download" }),
  upload: data => ({ type: "slides/upload", payload: { data } }),
  save: () => ({ type: "slides/save" })
})(function({ height, createNewFile, download, upload, save, setShowHelp }) {
  const url = "https://github.com/pearmini/uidea";

  const styles = {
    header: {
      height,
      lineHeight: height + "px"
    }
  };

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
    <div className={classNames.container} style={styles.header}>
      <header className={classNames.header}>
        <div className={classNames.logo}>uIdea</div>
        <div className={classNames.btns}>
          <Button
            icon="play-circle"
            onClick={() => router.push("/present")}
            className={classNames.item}
          />
          <Button
            icon="save"
            onClick={() => save()}
            className={classNames.item}
          />
          <Button
            icon="file-add"
            onClick={() => createNewFile()}
            className={classNames.item}
          />
          <Button
            icon="download"
            onClick={() => download()}
            className={classNames.item}
          />
          <Upload onChange={handleUploadFile} className={classNames.item}>
            <Button icon="upload" />
          </Upload>
          <Button
            icon="question-circle"
            className={classNames.item}
            onClick={() => setShowHelp(true)}
          />
          <Button
            icon="github"
            className={classNames.item}
            onClick={() => window.open(url)}
          />
        </div>
      </header>
    </div>
  );
});
