export default {
  state: {
    isFormVisible: false,
    notesFromCreator: [],
  },
  mutations: {
    switchForm(state) {
      state.isFormVisible = !state.isFormVisible;
    },
    collectNotes(state, payload) {
      state.notesFromCreator.push(payload);
    },
  },
  actions: {},
  getters: {
    formStatus(state) {
      return state.isFormVisible;
    },
    allNotesFromCreator(state) {
      return state.notesFromCreator;
    },
  },
};
