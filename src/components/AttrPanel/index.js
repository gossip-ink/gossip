import styles from "./index.css";
import { Select, Radio } from "antd";
import { connect } from "dva";
import Attribute from "../Attribute/index";

const { Option } = Select;

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
  function dfs(node, cb) {
    cb(node);
    node.children &&
      node.children.forEach(item => {
        dfs(item, cb);
      });
  }

  function handleAttrChange(value, key) {
    changeAttr(value, key, selectedComponentId, selectedId);
  }

  // 变成普通的变量
  function handleDeleteVarForCmp(attr) {
    deleteVarForCmp(attr, selectedComponentId, selectedId);
  }

  function handleVarDrop(type, id, attr) {
    const mp = {
      color: ["color"],
      number: ["fontSize", "padding"]
    };

    const arr = mp[type];
    const index = arr.indexOf(attr);
    if (index === -1) {
      alert("类型不匹配");
      return;
    }

    changeAttr(`$${id}`, attr, selectedComponentId, selectedId);
  }

  const slide = components.find(item => item.id === selectedId);
  let selectedCmp;
  selectedComponentId &&
    dfs(slide, node => {
      if (node.id === selectedComponentId) {
        selectedCmp = node;
      }
    });

  return (
    <div style={{ height }} className={styles.container}>
      <h1>AttrPanel</h1>
      <div>
        {selectedCmp &&
          selectedCmp.attrs &&
          Object.keys(selectedCmp.attrs).map((item, index) => {
            let isVar = false;
            let varId = null;
            // 对数值进行一下转化，和全局变量联系起来
            let attrValue = selectedCmp.attrs[item];

            if (typeof attrValue === "string" && attrValue[0] === "$") {
              isVar = true;
              varId = parseInt(attrValue.slice(1));
              const v = variables.find(item => item.id === varId);
              attrValue = v.value;
            }

            if (item === "fontSize") {
              return (
                <Attribute
                  key={index}
                  onVarDrop={(type, id) => handleVarDrop(type, id, item)}
                  isVar={isVar}
                  onVarDelete={() => handleDeleteVarForCmp(item)}
                  onVarSelect={() => selectVar(varId)}
                >
                  字体大小
                  <Select
                    value={attrValue}
                    onChange={value => handleAttrChange(value, item)}
                    style={{ width: 70 }}
                    disabled={isVar}
                  >
                    {[
                      10,
                      20,
                      30,
                      40,
                      50,
                      60,
                      70,
                      80,
                      90,
                      100,
                      110,
                      120,
                      130,
                      140,
                      150,
                      160,
                      170,
                      180,
                      190,
                      200
                    ].map((size, idx) => (
                      <Option value={size} key={idx}>
                        {size}
                      </Option>
                    ))}
                  </Select>
                </Attribute>
              );
            } else if (item === "color") {
              return (
                <Attribute
                  key={index}
                  onVarDrop={(type, id) => handleVarDrop(type, id, item)}
                  isVar={isVar}
                  onVarDelete={() => handleDeleteVarForCmp(item)}
                  onVarSelect={() => selectVar(varId)}
                >
                  颜色
                  <input
                    value={attrValue}
                    type="color"
                    onChange={e => handleAttrChange(e.target.value, item)}
                    disabled={isVar}
                  />
                </Attribute>
              );
            } else if (item === "span") {
              return (
                <div key={index} style={{ display: "flex" }}>
                  <div>比例</div>
                  <div>
                    {selectedCmp.attrs[item].length === 0 ? (
                      <p>100%</p>
                    ) : (
                      selectedCmp.attrs[item].map((span, i) => (
                        <input
                          type="number"
                          value={span}
                          key={i}
                          style={{ width: 35, marginLeft: 10 }}
                          onChange={e => {
                            const value = e.target.value;
                            const number = parseInt(value);
                            if (isNaN(number) || number < 1) {
                              return;
                            }
                            const arr = [...selectedCmp.attrs[item]];
                            arr.splice(i, 1, number);
                            handleAttrChange(arr, item);
                          }}
                        />
                      ))
                    )}
                  </div>
                </div>
              );
            } else if (item === "flex") {
              return (
                <div key={index}>
                  布局
                  <Radio.Group
                    onChange={e => handleAttrChange(e.target.value, item)}
                    value={selectedCmp.attrs[item]}
                  >
                    <Radio value="row" key={1}>
                      row
                    </Radio>
                    <Radio value="column" key={2}>
                      column
                    </Radio>
                  </Radio.Group>
                </div>
              );
            } else if (item === "textAlign") {
              return (
                <div key={index}>
                  左右
                  <Radio.Group
                    onChange={e => handleAttrChange(e.target.value, item)}
                    value={selectedCmp.attrs[item]}
                  >
                    <Radio value="left" key={1}>
                      left
                    </Radio>
                    <Radio value="center" key={2}>
                      center
                    </Radio>
                    <Radio value="right" key={3}>
                      right
                    </Radio>
                  </Radio.Group>
                </div>
              );
            } else if (item === "verticalAlign") {
              return (
                <div key={index}>
                  上下
                  <Radio.Group
                    onChange={e => handleAttrChange(e.target.value, item)}
                    value={selectedCmp.attrs[item]}
                  >
                    <Radio value="top" key={1}>
                      top
                    </Radio>
                    <Radio value="center" key={2}>
                      center
                    </Radio>
                    <Radio value="bottom" key={3}>
                      bottom
                    </Radio>
                  </Radio.Group>
                </div>
              );
            } else if (item === "padding") {
              return (
                <Attribute
                  key={index}
                  onVarDrop={(type, id) => handleVarDrop(type, id, item)}
                  isVar={isVar}
                  onVarDelete={() => handleDeleteVarForCmp(item)}
                  onVarSelect={() => selectVar(varId)}
                >
                  内边距
                  <Select
                    value={attrValue}
                    onChange={value => handleAttrChange(value, item)}
                    style={{ width: 70 }}
                    disabled={isVar}
                  >
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
                      (size, idx) => (
                        <Option value={size} key={idx}>
                          {size}
                        </Option>
                      )
                    )}
                  </Select>
                </Attribute>
              );
            } else if (item === "displayMode") {
              return (
                <div key={index}>
                  模式
                  <Radio.Group
                    onChange={e => handleAttrChange(e.target.value, item)}
                    value={selectedCmp.attrs[item]}
                  >
                    <Radio value="normal" key={1}>
                      normal
                    </Radio>
                    <Radio value="scaleToFill" key={2}>
                      scaleToFill
                    </Radio>
                  </Radio.Group>
                </div>
              );
            } else if (item === "fontWeight") {
              return (
                <div key={index}>
                  粗细
                  <Radio.Group
                    onChange={e => handleAttrChange(e.target.value, item)}
                    value={selectedCmp.attrs[item]}
                  >
                    <Radio value="normal" key={1}>
                      normal
                    </Radio>
                    <Radio value="bold" key={2}>
                      bold
                    </Radio>
                  </Radio.Group>
                </div>
              );
            }
          })}
      </div>
      <div>{!selectedCmp && <p>没有选中的组件~</p>}</div>
    </div>
  );
});
