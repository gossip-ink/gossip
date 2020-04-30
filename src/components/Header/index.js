import classNames from "./index.css";
import { Upload, Icon } from "antd";
import router from "umi/router";
import { connect } from "dva";
import { useState } from "react";

function Item({ icon, name, onClick }) {
  return (
    <span className={classNames.item} onClick={onClick}>
      <span className={classNames.title}>
        <Icon type={icon} className={classNames.icon} key={icon} />
        {name}
      </span>
    </span>
  );
}

export default connect(
  null,
  {
    createNewFile: () => ({ type: "slides/createNewFile" }),
    download: () => ({ type: "slides/download" }),
    upload: (data) => ({ type: "slides/upload", payload: { data } }),
    save: () => ({ type: "slides/save" }),
    help: () => ({ type: "slides/createHelp" }),
    example: () => ({ type: "slides/createExample" }),
    setSelected: (id) => ({ type: "slides/setSelected", payload: { id } }),
  }
)(function({
  height,
  createNewFile,
  download,
  upload,
  save,
  help,
  example,
  setSelected,
}) {
  const [show, setShow] = useState(false);
  const styles = {
    header: {
      height,
      lineHeight: height + "px",
    },
  };

  const btns = [
    {
      icon: "play-circle",
      onClick: () => {
        fullscreen(document.documentElement);
        setSelected(1);
        router.push("/present");
      },
      name: "从头播放",
    },
    {
      icon: "play-square",
      onClick: () => {
        fullscreen(document.documentElement);
        router.push("/present");
      },
      name: "从此播放",
    },
    {
      icon: "file-add",
      onClick: createNewFile,
      name: "新建",
    },
    {
      icon: "save",
      onClick: save,
      name: "保存",
    },
    {
      icon: "download",
      onClick: download,
      name: "下载",
    },
    {
      icon: "upload",
      onClick: handleUploadFile,
      type: "upload",
      name: "打开",
    },
    {
      icon: "read",
      name: "案例",
      type: "select",
      onClick: (e) => {
        setShow(!show);
        e.stopPropagation();
      },
      items: [
        { name: "介绍", onClick: help, icon: "fire" },
        { name: "教程", onClick: example, icon: "thunderbolt" },
      ],
    },
    {
      icon: "github",
      onClick: gotoGithub,
      name: "github",
    },
  ];

  function fullscreen(element) {
    if (element.requestFullScreen) {
      element.requestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    }
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

  function gotoGithub() {
    const url = "https://github.com/pearmini/gossip";
    window.open(url);
  }

  return (
    <div
      className={classNames.container}
      style={styles.header}
      onMouseLeave={() => show && setShow(false)}
    >
      <header className={classNames.header}>
        <div className={classNames.left}>
          <div className={classNames.logo} onClick={gotoGithub}>
            Gossip
          </div>
          <div className={classNames.intro}>
            一个快速和高效创建 PPT 的用户界面🔥
          </div>
        </div>
        <div className={classNames.btns}>
          {btns.map(({ type, onClick, icon, name, items }) =>
            type === "upload" ? (
              <Upload
                onChange={handleUploadFile}
                key={name}
                showUploadList={false}
              >
                <Item icon={icon} name={name} />
              </Upload>
            ) : type === "select" ? (
              <div className={classNames.selectWrapper} key={name}>
                <Item icon={icon} name={name} onClick={onClick} />
                {show && (
                  <ul onClick={onClick} className={classNames.select}>
                    {items.map((i) => (
                      <li className={classNames.selectItem} key={i.name}>
                        <Item icon={i.icon} onClick={i.onClick} name={i.name} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Item icon={icon} onClick={onClick} name={name} key={name} />
            )
          )}
        </div>
      </header>
    </div>
  );
});
