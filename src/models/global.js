export default {
  namespace: "global",
  state: {
    dragId: -1,
    enterId: -1,
    isDragIdea: false
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
    }
  }
};
