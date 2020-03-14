export default {
  namespace: "global",
  state: {
    dragId: -1,
    enterId: -1
  },
  reducers: {
    setDrag(state, action) {
      const { id } = action.payload;
      return { ...state, dragId: id };
    },
    setEnter(state, action) {
      const { id } = action.payload;
      return { ...state, enterId: id };
    }
  }
};
