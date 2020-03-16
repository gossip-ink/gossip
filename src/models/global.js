export default {
  namespace: "global",
  state: {
    dragId: -1,
    enterId: -1,
    isDragIdea: false,
    scale: 1
  },
  reducers: {
    setDrag(state, action) {
      const { id } = action.payload;
      return { ...state, dragId: id };
    },
    setEnter(state, action) {
      const { id } = action.payload;
      return { ...state, enterId: id };
    },
    setDragIdea(state, action) {
      const { drag } = action.payload;
      return { ...state, isDragIdea: drag };
    },
    setScale(state, action) {
      const { scale } = action.payload;
      return { ...state, scale };
    }
  }
};
