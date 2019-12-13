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
      number: ["fontSize"]
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
  console.log(selectedCmp);

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
                    {[10, 20, 30, 40, 50, 60, 70, 80, 200].map((size, idx) => (
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
            }
          })}
      </div>
    </div>
  );
});
