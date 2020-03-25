import classNames from "./index.css";
import { Icon } from "antd";
import { connect } from "dva";
import { eachBefore } from "../../utils/tree";
import Box from "../Box";
import Input from "../Input";
import { useState } from "react";

export default connect(
  state => ({
    components: state.slides.components,
    selectedId: state.slides.selectedId,
    selectedComponentId: state.slides.selectedComponentId,
    variables: state.slides.attributeVars
  }),
  {
    changeAttr: (value, key, cmpId, rootId) => ({
      type: "slides/changeAttr",
      payload: { value, key, cmpId, rootId }
    }),
    deleteVarForCmp: (key, cmpId, rootId) => ({
      type: "slides/deleteVarForCmp",
      payload: { key, cmpId, rootId }
    }),
    selectVar: id => ({ type: "slides/selectVar", payload: { id } })
  }
)(function({
  height,
  components,
  selectedId,
  selectedComponentId,
  changeAttr,
  variables,
  deleteVarForCmp,
  selectVar
}) {
  const [dragover, setDragover] = useState("");
  const slide = components.find(item => item.id === selectedId);
  let selectedCmp;
  selectedComponentId &&
    eachBefore(slide, node => {
      if (node.id === selectedComponentId) {
        selectedCmp = node;
      }
    });

  const attrs = getAttrs(selectedCmp);
  const inputByAttr = {
    fontSize: {
      type: "number",
      name: "字体大小",
      icon: "font-size",
      range: [0, 500]
    },
    color: {
      type: "color",
      name: "字体颜色",
      icon: "font-colors"
    },
    backgroundColor: {
      type: "color",
      name: "背景颜色",
      icon: "bg-colors"
    },
    flex: {
      type: "radio",
      name: "排列方式",
      icon: "menu",
      hasIcon: false,
      list: [
        {
          name: "水平",
          value: "row"
        },
        {
          name: "垂直",
          value: "column"
        }
      ]
    },
    fontWeight: {
      type: "switch",
      name: "加粗",
      icon: "bold",
      yes: "bold"
    },
    padding: {
      type: "number",
      name: "内边距",
      icon: "border",
      range: [0, 100]
    },
    textAlign: {
      type: "radio",
      name: "水平对齐",
      icon: "profile",
      list: [
        {
          name: "左边",
          value: "left",
          icon: "align-left"
        },
        {
          name: "居中",
          value: "center",
          icon: "align-center"
        },
        {
          name: "右边",
          value: "right",
          icon: "align-right"
        }
      ]
    },
    verticalAlign: {
      type: "radio",
      name: "垂直对齐",
      icon: "project",
      list: [
        {
          name: "顶部",
          value: "top",
          icon: "vertical-align-top"
        },
        {
          name: "中间",
          value: "center",
          icon: "vertical-align-middle"
        },
        {
          name: "底部",
          value: "bottom",
          icon: "vertical-align-bottom"
        }
      ]
    },
    span: {
      type: "array",
      name: "比例",
      icon: "layout"
    },
    displayMode: {
      type: "switch",
      name: "充满容器",
      icon: "fullscreen",
      yes: "scaleToFill"
    }
  };

  function getAttrs(selectedCmp) {
    if (!selectedCmp || !selectedCmp.attrs) return [];
    return Object.keys(selectedCmp.attrs).reduce((arr, key) => {
      if (key === "isTitle" || key === "fontFamily") return arr;
      let isVar = false;
      let varId = null;
      let attrValue = selectedCmp.attrs[key];
      if (typeof attrValue === "string" && attrValue[0] === "$") {
        isVar = true;
        varId = parseInt(attrValue.slice(1));
        const v = variables.find(item => item.id === varId);
        attrValue = v.value;
      }
      const obj = {
        isVar,
        attrValue,
        varId,
        key
      };
      return [...arr, obj];
    }, []);
  }

  function handleVarDrop(e, attr) {
    const [type, id] = e.dataTransfer.getData("attr").split("-");
    const mp = {
      color: ["color", "backgroundColor"],
      number: ["fontSize", "padding"]
    };
    const arr = mp[type];
    const index = arr.indexOf(attr);
    if (index === -1) alert("类型不匹配");
    else changeAttr(`$${id}`, attr, selectedComponentId, selectedId);
    setDragover("");
  }

  return (
    <Box
      title="样式"
      height={height}
      iconType="gold"
      nodataInfo="没有选择任何的组件～"
      nodata={attrs.length === 0}
      name="attr"
    >
      <ul className={classNames.container}>
        {attrs.map((item, index) => {
          const { icon, name, ...rest } = inputByAttr[item.key];
          return (
            <li
              key={index}
              className={classNames.item}
              style={{ background: item.key === dragover && "#4091f7" }}
              onDragEnter={() => setDragover(item.key)}
              onDragOver={e => {
                if (item.key !== dragover) setDragover(item.key);
                e.preventDefault();
              }}
              onDragLeave={() => setDragover("")}
              onDrop={e => handleVarDrop(e, item.key)}
            >
              <Icon type={icon} />
              <span className={classNames.name}>{name}</span>
              <Input
                value={item.attrValue}
                onChange={value =>
                  changeAttr(value, item.key, selectedComponentId, selectedId)
                }
                disabled={item.isVar}
                {...rest}
              ></Input>
              {item.isVar && (
                <div className={classNames.btns}>
                  <Icon
                    type="eye"
                    className={classNames.icon}
                    onClick={() => selectVar(item.varId)}
                  />
                  <Icon
                    type="delete"
                    onClick={() =>
                      deleteVarForCmp(item.key, selectedComponentId, selectedId)
                    }
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Box>
  );
});
