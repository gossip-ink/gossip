import { getLang } from "../utils/utils";

function getHelp() {
  try {
    const help = localStorage.getItem("help");
    return help;
  } catch {
    return false;
  }
}

export default {
  namespace: "global",
  state: {
    dragId: -1,
    enterId: -1,
    hoveredId: -1,
    scale: 1,
    help: getHelp(),
    show: {
      idea: 1,
      structure: 1,
      attr: 1,
      vari: 1,
    },
    lang: getLang(),
    locales: {
      HEADER_INFO: {
        en:
          "An online user interface to create awesome presentation efficiently",
        zh: "一个快速和高效创建 PPT 的用户界面",
      },
      PLAY_HEAD: {
        en: "Play All",
        zh: "从头播放",
      },
      PLAY_CURRENT: {
        en: "Play Current",
        zh: "从此播放",
      },
      NEW_FILE: {
        en: "New",
        zh: "新建",
      },
      SAVE_FILE: {
        en: "Save",
        zh: "保存",
      },
      DOWNLOAD_FILE: {
        en: "Download",
        zh: "下载",
      },
      UPLOAD_FILE: {
        en: "Upload",
        zh: "上传",
      },
      DESCRIPTION: {
        en: "Breif",
        zh: "介绍",
      },
      TUTORIALS: {
        en: "Demo",
        zh: "教程",
      },
      LANG: {
        en: "Language",
        zh: "语言",
      },
      EXAMPLE: {
        en: "Example",
        zh: "案例",
      },
      LANG_EN: {
        en: "English",
        zh: "英文",
      },
      LANG_ZN: {
        en: "Chinese",
        zh: "中文",
      },
      OUTLINE: {
        en: "Outline",
        zh: "大纲",
      },
      THUMBNAILS: {
        en: "Thumnails",
        zh: "缩略图",
      },
      THOUGHT: {
        en: "Thought",
        zh: "想法",
      },
      THOUGHT_TEXT: {
        en: "Word",
        zh: "文字",
      },
      THOUGHT_IMAGE: {
        en: "Image",
        zh: "图片",
      },
      THOUGHT_CANVAS: {
        en: "Canvas",
        zh: "画布",
      },
      THOUGHT_CONTAINER: {
        zh: "容器",
        en: "Container",
      },
      CHOOSE_TYPE: {
        en: "Choose a Type",
        zh: "选择一种类型",
      },
      NO_IDEA: {
        zh: "快来写下第一个独一无二的想法吧～",
        en: "Write your first thought",
      },
      ELEMENT: {
        zh: "元素",
        en: "Element",
      },
      NO_SELECTED_SLICE: {
        zh: "没有选择任何幻灯片～",
        en: "No selected slice",
      },
      FONT_SIZE: {
        zh: "字体大小",
        en: "Font Size",
      },
      STYLE: {
        zh: "样式",
        en: "Style",
      },
      NO_SELECTED_COMPONENT: {
        zh: "没有选择的组件",
        en: "No selected component",
      },
      FONT_COLOR: {
        zh: "字体颜色",
        en: "Font Color",
      },
      BG_COLOR: {
        zh: "背景颜色",
        en: "BG Color",
      },
      BOLD: {
        zh: "加粗",
        en: "Bold",
      },
      PADDING: {
        zh: "内边距",
        en: "Paddnig",
      },
      FULL_IMAGE: {
        zh: "充满容器",
        en: "Full",
      },
      RATIO: {
        zh: "比例",
        en: "Ratio",
      },
      DIRECTION: {
        zh: "排列方式",
        en: "Direction",
      },
      ROW: {
        zh: "水平排列",
        en: "Row",
      },
      COL: {
        zh: "竖直排列",
        en: "Col",
      },
      H_ALIGNMENT: {
        zh: "水平排列",
        en: "H Alignment",
      },
      V_ALIGNMENT: {
        zh: "竖直排列",
        en: "V Alignment",
      },
      LEFT: {
        zh: "左边",
        en: "Left",
      },
      CENTER: {
        zh: "中间",
        en: "Center",
      },
      RIGHT: {
        zh: "右边",
        en: "Right",
      },
      TOP: {
        zh: "顶部",
        en: "Top",
      },
      MIDDLE: {
        zh: "中间",
        en: "Middle",
      },
      BOTTOM: {
        zh: "底部",
        en: "Bottom",
      },
      COLOR: {
        zh: "颜色",
        en: "Color",
      },
      NUMBER: {
        zh: "数值",
        en: "Number",
      },
      VARIABLE: {
        zh: "变量",
        en: "Variable",
      },
      NO_VARIABLE: {
        zh: "没有变量",
        en: "No Variable",
      },
      TYPE_MISMATCH: {
        zh: "类型不匹配",
        en: "Type Mismatch",
      },
      NO_DATA: {
        zh: "没有数据",
        en: "No Data",
      },
      RUNTIME_ERROR: {
        zh: "代码运行出现了问题！",
        en: "Runtime Error",
      },
      TRY_DEBUG: {
        zh: "可以打开控制台进行调试～",
        en: "Open console to debug",
      },
      NO_IMAGE: {
        zh: "图片被一阵风吹走了...",
        en: "Load image failed",
      },
      LOCAL_IMAGE: {
        zh: "本地图片",
        en: "Local Image",
      },
      NETWORK_IMAGE: {
        zh: "网络图片",
        en: "Network Image",
      },
      INPUT_IMAGE_URL: {
        zh: "请输入图片地址",
        en: "Please input image URL",
      },
      CONFIRM: {
        zh: "确认",
        en: "Confirm",
      },
      CANCEL: {
        zh: "取消",
        en: "Cancel",
      },
      NO_EMPTY_IMAGE_URL: {
        zh: "图片地址不能为空！",
        en: "Image URL can't be empty",
      },
      BIG_SCREEN: {
        zh: "请去大屏设备上使用",
        en: "Use a bigger screen",
      },
      NEW_POINT: {
        zh: "新的观点",
        en: "New Point",
      },
      ROW_CONTAINER: {
        zh: "水平容器",
        en: "Row Container",
      },
      COL_CONTSINER: {
        zh: "竖直容器",
        en: "Col Container",
      },
      NO_TITLE: {
        zh: "没有标题",
        en: "No title",
      },
      ONLY_CONTAINER: {
        zh: "只能插入到布局节点到后面～",
        en: "Only can append to container",
      },
      ROOT_NO_BROTHER: {
        zh: "根节点没有兄弟",
        en: "Root can't have brother",
      },
      SAVE_SUCCESS: {
        zh: "保存成功",
        en: "Saved successfully",
      },
      SAVE_FAIL: {
        zh: "保存失败，请下载到本地",
        en: "Saved fail, please download",
      },
      FIRSET_PAGE: {
        zh: "已经是第一页了",
        en: "Already at first page",
      },
      LAST_PAGE: {
        zh: "已经是第一页了",
        en: "Already at last page",
      },
      SAY_TEXT: {
        zh: "说点啥...",
        en: "Say something...",
      },
      NO_NAME: {
        zh: "未命名",
        en: "No Name",
      },
      NEW_FILE_NAME: {
        zh: "有趣的东西",
        en: "Awesome",
      },
      NEW_FILE_CREATOR: {
        zh: "伟大的创造者",
        en: "Great Creator",
      },
      NEW_FILE_BG_COLOR: {
        zh: "背景颜色",
        en: "bg color",
      },
      NEW_FILE_H1: {
        zh: "大标题字号",
        en: "h1 font size",
      },
      NEW_FILE_H2: {
        zh: "小标题字号",
        en: "h2 font size",
      },
      NEW_FILE_CONTENT: {
        zh: "内容字号",
        en: "p font size",
      },
      NEW_FILE_FONT_COLOR: {
        zh: "字体颜色",
        en: "font color",
      },
      NEW_FILE_PADDING: {
        zh: "页面内边距",
        en: "page padding",
      },
      NEW_FILE_THOUGHT: {
        zh: "小想法",
        en: "little idea",
      },
    },
  },
  effects: {
    *setLocales(_, { select, put }) {
      const { locales, lang } = yield select((state) => state.global);
      yield put({
        type: "slides/setLocales",
        payload: {
          locales,
          lang,
        },
      });
    },
    *setLang(action, { put }) {
      const { lang } = action.payload;
      yield put({
        type: "setLangState",
        payload: {
          lang,
        },
      });
      yield put({
        type: "slides/setLang",
        payload: {
          lang,
        },
      });
    },
  },
  reducers: {
    setLangState(state, action) {
      const { lang } = action.payload;
      return { ...state, lang };
    },
    setHovered(state, action) {
      const { id } = action.payload;
      return { ...state, hoveredId: id };
    },
    setDrag(state, action) {
      const { id } = action.payload;
      return { ...state, dragId: id };
    },
    setEnter(state, action) {
      const { id } = action.payload;
      return { ...state, enterId: id };
    },
    setScale(state, action) {
      const { scale } = action.payload;
      return { ...state, scale };
    },
    setHelp(state, action) {
      localStorage.setItem("help", true);
      return { ...state, help: true };
    },
    toggleShow(state, action) {
      const { key } = action.payload;
      state.show[key] = state.show[key] ? 0 : 1;
      const g = ["vari", "attr", "structure"];
      if (g.indexOf(key) === -1 || g.some((d) => state.show[d])) return state;
      g.forEach((d) => d !== key && (state.show[d] = state.show[d] ? 0 : 1));
      return state;
    },
  },
};
