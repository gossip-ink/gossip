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
      vari: 1
    }
  },
  reducers: {
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
      if (g.indexOf(key) === -1 || g.some(d => state.show[d])) return state;
      g.forEach(d => d !== key && (state.show[d] = state.show[d] ? 0 : 1));
      return state;
    }
  }
};
