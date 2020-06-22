import firebaseAPI from '../../firebase';
export default {
  state: {
    tasks: [],
    currentTask: {},
  },
  mutations: {
    updateTasks(state, tasksArray) {
      state.tasks = tasksArray;
    },
    updateCurrentTask(state, currentTaskSubject) {
      state.currentTask = currentTaskSubject;
    },
    addNote(state, payload) {
      state.currentTask = payload;
    },
    removeNote(state, payload) {
      state.currentTask = payload;
    },
  },
  actions: {
    fetchTasks({ commit }) {
      let tasksArray = [];
      firebaseAPI
        .database()
        .ref('tasks')
        .on('child_added', (snapshot) => {
          tasksArray.push(snapshot.val());
        });
      commit('updateTasks', tasksArray);
    },

    fetchTaskById({ commit }, id) {
      firebaseAPI
        .database()
        .ref(`/tasks/${id}`)
        .on('value', (snapshot) => {
          // let snapshotKeys = Object.keys(snapshot.val());
          // let snapshotValues = Object.values(snapshot.val());
          // let currentTask = [];
          // snapshotKeys.forEach((key, index) =>
          //   currentTask.push(snapshotValues[index])
          // );
          commit('updateCurrentTask', snapshot.val());
        });
    },

    removeTask({ commit }, id) {
      let tasksArray = [];
      firebaseAPI
        .database()
        .ref('tasks')
        .on('child_added', (snapshot) => {
          if (snapshot.val().id === id) {
            firebaseAPI
              .database()
              .ref(`tasks/${snapshot.val().id}`)
              .remove();
          }
          if (snapshot.val().id !== id) {
            tasksArray.push(snapshot.val());
          }
        });
      commit('updateTasks', tasksArray);
    },
  },
  getters: {
    allTasks(state) {
      return state.tasks;
    },
    currentTask(state) {
      return state.currentTask;
    },
  },
};
