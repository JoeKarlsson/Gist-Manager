'use strict';

  const urlQuery = (fields) => {
    fields = (fields.substring(1));
    fields = fields.split("&");
    fields = fields.map(function(element){
      return element.split("=");
    });

    let fieldsObj = {};

    fields.forEach(function(element){
      fieldsObj[element[0]] = decodeURIComponent(element[1]);
    });
    return fieldsObj;
  };

  module.exports = {
    login() {
      if (localStorage.token) {
        return;
      }
      let userData = urlQuery(window.location.search);
      localStorage.token = JSON.stringify(userData);
    },

    getToken() {
      return localStorage.token;
    },

    logout(cb) {
      delete localStorage.token;
      if (cb) cb();
      this.onChange(false);
    },

    loggedIn() {
      return !!localStorage.token;
    },

    onChange() {}
};