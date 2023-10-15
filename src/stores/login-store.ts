import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', {
  state: () => ({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    userToken: localStorage.getItem('userToken'),
  }),
  actions: {
    userLogin(token: string) {
      localStorage.setItem('userToken', token);
      localStorage.setItem('isAuthenticated', 'true');
      this.isAuthenticated = true;
    },

    userLogout() {
      localStorage.removeItem('userToken');
      localStorage.removeItem('isAuthenticated');
      this.isAuthenticated = false;
    },
  },
});
