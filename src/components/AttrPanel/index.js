import classNames from "./index.css";
import { Icon } from "antd";
import { connect } from "dva";
import { eachBefore } from "../../utils/tree";
import Box from "../Box";
import Input from "../Input";
import { useState } from "react";

export default connect(
  (state) => ({
    components: state.slides.components,
    selectedId: state.slides.selectedId,
    selectedComponentId: state.slides.selectedComponentId,
    variables: state.slides.attributeVars,
    locales: state.global.locales,
    lang: state.global.lang,
  }),
  {
    changeAttr: (value, key, cmpId, rootId) => ({
      type: "slides/changeAttr",
      payload: { value, key, cmpId, rootId },
    }),
    deleteVarForCmp: (key, cmpId, rootId) => ({
      type: "slides/deleteVarForCmp",
      payload: { key, cmpId, rootId },
    }),
    selectVar: (id) => ({ type: "slides/selectVar", payload: { id } }),
  }
)(function({
  height,
  components,
  selectedId,
  selectedComponentId,
  changeAttr,
  variables,
  deleteVarForCmp,
  selectVar,
  locales,
  lang,
}) {
  const [dragover, setDragover] = useState("");
  const slide = components.find((item) => item.id === selectedId);
  let selectedCmp;
  selectedComponentId &&
    eachBefore(slide, (node) => {
      if (node.id === selectedComponentId) {
        selectedCmp = node;
      }
    });

  const attrs = getAttrs(selectedCmp);
  const inputByAttr = {
    fontSize: {
      type: "number",
      name: locales.FONT_SIZE[lang],
      icon: "font-size",
      range: [0, 500],
    },
    color: {
      type: "color",
      name: locales.FONT_COLOR[lang],
      icon: "font-colors",
    },
    backgroundColor: {
      type: "color",
      name: locales.BG_COLOR[lang],
      icon: "bg-colors",
    },
    flex: {
      type: "radio",
      name: locales.DIRECTION[lang],
      icon: "menu",
      hasIcon: false,
      list: [
        {
          name: locales.ROW[lang],
          value: "row",
        },
        {
          name: locales.COL[lang],
          value: "column",
        },
      ],
    },
    fontWeight: {
      type: "switch",
      name: locales.BOLD[lang],
      icon: "bold",
      yes: "bold",
    },
    padding: {
      type: "number",
      name: locales.PADDING[lang],
      icon: "border",
      range: [0, 100],
    },
    textAlign: {
      type: "radio",
      name: locales.H_ALIGNMENT[lang],
      icon: "profile",
      list: [
        {
          name: locales.LEFT[lang],
          value: "left",
          icon: "align-left",
        },
        {
          name: locales.CENTER[lang],
          value: "center",
          icon: "align-center",
        },
        {
          name: locales.RIGHT[lang],
          value: "right",
          icon: "align-right",
        },
      ],
    },
    verticalAlign: {
      type: "radio",
      name: locales.V_ALIGNMENT[lang],
      icon: "project",
      list: [
        {
          name: locales.TOP[lang],
          value: "top",
          icon: "vertical-align-top",
        },
        {
          name: locales.MIDDLE[lang],
          value: "center",
          icon: "vertical-align-middle",
        },
        {
          name: locales.BOTTOM[lang],
          value: "bottom",
          icon: "vertical-align-bottom",
        },
      ],
    },
    span: {
      type: "array",
      name: locales.RATIO[lang],
      icon: "layout",
    },
    displayMode: {
      type: "switch",
      name: locales.FULL_IMAGE[lang],
      icon: "fullscreen",
      yes: "scaleToFill",
    },
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
        const v = variables.find((item) => item.id === varId);
        attrValue = v.value;
      }
      const obj = {
        isVar,
        attrValue,
        varId,
        key,
      };
      return [...arr, obj];
    }, []);
  }

  function handleVarDrop(e, attr) {
    const [type, id] = e.dataTransfer.getData("attr").split("-");
    const mp = {
      color: ["color", "backgroundColor"],
      number: ["fontSize", "padding"],
    };
    const arr = mp[type];
    const index = arr.indexOf(attr);
    if (index === -1) alert(locales.TYPE_MISMATCH[lang]);
    else changeAttr(`$${id}`, attr, selectedComponentId, selectedId);
    setDragover("");
  }

  function scrollTo(id) {
    const a = document.createElement("a");
    a.href = `#${id}`;
    a.click();
  }

  return (
    <Box
      title={locales.STYLE[lang]}
      height={height}
      iconType="gold"
      nodataInfo={locales.NO_SELECTED_COMPONENT[lang]}
      nodata={attrs.length === 0}
      name="attr"
      url="https://github.com/gossip-ink/gossip#revising-style-and-variable"
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
              onDragOver={(e) => {
                if (item.key !== dragover) setDragover(item.key);
                e.preventDefault();
              }}
              onDragLeave={() => setDragover("")}
              onDrop={(e) => handleVarDrop(e, item.key)}
            >
              <Icon type={icon} />
              <span className={classNames.name}>{name}</span>
              <Input
                value={item.attrValue}
                onChange={(value) =>
                  changeAttr(value, item.key, selectedComponentId, selectedId)
                }
                disabled={item.isVar}
                {...rest}
              />
              {item.isVar && (
                <div className={classNames.btns}>
                  <Icon
                    type="eye"
                    className={classNames.icon}
                    onClick={() => {
                      selectVar(item.varId);
                      scrollTo(item.varId);
                    }}
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
