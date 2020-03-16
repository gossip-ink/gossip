import classNames from "./index.css";
import { Upload, Icon } from "antd";
import router from "umi/router";
import { connect } from "dva";

function Wrapper({ upload, children, onChange }) {
  return upload ? (
    <Upload onChange={onChange}>{children}</Upload>
  ) : (
    <>{children}</>
  );
}

export default connect(null, {
  createNewFile: () => ({ type: "slides/createNewFile" }),
  download: () => ({ type: "slides/download" }),
  upload: data => ({ type: "slides/upload", payload: { data } }),
  save: () => ({ type: "slides/save" }),
  help: () => ({ type: "slides/createHelp" })
})(function({ height, createNewFile, download, upload, save, help }) {
  const styles = {
    header: {
      height,
      lineHeight: height + "px"
    }
  };

  const btns = [
    {
      icon: "play-circle",
      onClick: () => router.push("/present"),
      upload: false,
      name: "放映"
    },
    {
      icon: "file-add",
      onClick: createNewFile,
      upload: false,
      name: "新建"
    },
    {
      icon: "save",
      onClick: save,
      upload: false,
      name: "保存"
    },
    {
      icon: "download",
      onClick: download,
      upload: false,
      name: "下载"
    },
    {
      icon: "upload",
      onClick: handleUploadFile,
      upload: true,
      name: "上传"
    },
    {
      icon: "read",
      upload: false,
      name: "教程",
      onClick: help
    },
    {
      icon: "github",
      onClick: gotoGithub,
      upload: false,
      name: "github"
    }
  ];

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

  function gotoGithub() {
    const url = "https://github.com/pearmini/uidea";
    window.open(url);
  }

  return (
    <div className={classNames.container} style={styles.header}>
      <header className={classNames.header}>
        <div className={classNames.logo} onClick={gotoGithub}>
          uIdea
        </div>
        <div className={classNames.btns}>
          {btns.map(({ upload, onClick, icon, name }) => (
            <Wrapper upload={upload} onChange={onClick} key={icon}>
              <span
                className={classNames.item}
                onClick={() => !upload && onClick()}
              >
                <span className={classNames.title}>
                  <Icon type={icon} className={classNames.icon} key={icon} />
                  {name}
                </span>
              </span>
            </Wrapper>
          ))}
        </div>
      </header>
    </div>
  );
});
