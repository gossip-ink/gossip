import { connect } from "dva";
import classNames from "./index.css";
import { Icon } from "antd";
import Box from "../Box";
import Node from "../Node";
import Input from "../Input";
import { useState, useEffect } from "react";

export default connect(
  (state) => ({
    variables: state.slides.attributeVars,
    selectedAttributeId: state.slides.selectedAttributeId,
    locales: state.global.locales,
    lang: state.global.lang,
  }),
  {
    deleteVar: (id) => ({ type: "slides/deleteVar", payload: { id } }),
    addVar: (type) => ({ type: "slides/addVar", payload: { type } }),
    selectVar: (id) => ({ type: "slides/selectVar", payload: { id } }),
    changeVar: (value, type) => ({
      type: "slides/changeVar",
      payload: { value, type },
    }),
  }
)(function({
  height,
  variables,
  selectedAttributeId,
  deleteVar,
  addVar,
  selectVar,
  changeVar,
  locales,
  lang,
}) {
  const [edit, setEdit] = useState(-1);
  const icon = {
    color: "bg-colors",
    number: "number",
  };

  const items = [
    { name: locales.COLOR[lang], value: "color", type: "bg-colors" },
    { name: locales.NUMBER[lang], value: "number", type: "number" },
  ];

  const content = (
    <ul className={classNames.list}>
      {items.map((item, index) => (
        <li
          key={index}
          onClick={() => addVar(item.value)}
          style={{ cursor: "pointer" }}
          className={classNames.item}
        >
          <Icon className={classNames.icon} type={item.type} />
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );

  function handleDragStart(e, item) {
    selectVar(item.id);
    e.dataTransfer.setData("attr", `${item.type}-${item.id}`);
  }

  function scrollTo(id) {
    const a = document.createElement("a");
    a.href = `#${id}`;
    a.onclick = () => false;
    a.click();
  }

  useEffect(
    () => {
      scrollTo(selectedAttributeId);
    },
    [selectedAttributeId]
  );

  return (
    <Box
      height={height}
      title={locales.VARIABLE[lang]}
      iconType="shop"
      popover={content}
      nodata={variables.length === 0}
      nodataInfo={locales.NO_VARIABLE[lang]}
      name="vari"
      url="https://github.com/gossip-ink/gossip#revising-style-and-variable"
    >
      {variables.map((item) => (
        <div
          key={item.id}
          className={classNames.node}
          onDragStart={(e) => handleDragStart(e, item)}
          draggable
          onClick={() => selectedAttributeId !== item.id && selectVar(item.id)}
        >
          <Node
            id={item.id}
            height="2em"
            onDelete={() => deleteVar(item.id)}
            edit={item.id === edit}
            highlight={selectedAttributeId === item.id}
            hasDelete={item.canDelete}
            onMouseLeave={() => edit !== -1 && setEdit(-1)}
            onEdit={() => {
              if (item.id === edit) {
                setEdit(-1);
              } else {
                setEdit(item.id);
                selectVar(item.id);
              }
            }}
          >
            <div className={classNames.wrapper}>
              <Icon type={icon[item.type]} />
              <div className={classNames.name}>
                {edit === item.id ? (
                  <input
                    value={item.name}
                    onChange={(e) => changeVar(e.target.value, "name")}
                  />
                ) : (
                  <div>{item.name}</div>
                )}
              </div>
              <Input
                type={item.type}
                value={item.value}
                onChange={(value) => changeVar(value, "value")}
                range={[0, 500]}
              />
            </div>
          </Node>
        </div>
      ))}
    </Box>
  );
});
