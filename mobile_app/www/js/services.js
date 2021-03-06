// Generated by CoffeeScript 1.10.0
angular.module('starter.services', []).service("UserService", function($http, $rootScope, EVENTS, API) {
  var LOCAL_TOKEN_KEY, currentUser, endpoints, isAuthenticated;
  LOCAL_TOKEN_KEY = "TEST_LOCAL_KEY";
  currentUser = isAuthenticated = false;
  endpoints = {
    host: API.host,
    authenticate: function() {
      return endpoints.host + "/api/user/authenticate";
    },
    removeAuthenticatedUser: function() {
      return endpoints.host + "/api/user/authenticate/remove";
    },
    create: function() {
      return endpoints.host + "/api/user/create";
    }
  };
  this.authenticate = function(username, pass) {
    var req, user;
    user = {
      username: username,
      pass: pass
    };
    req = $http.post(endpoints.authenticate(), user);
    return req.then(function(result) {
      var authUser;
      authUser = result.data;
      window.localStorage.setItem(LOCAL_TOKEN_KEY, authUser.token);
      $http.defaults.headers.common['X-Auth-Token'] = authUser.token;
      currentUser.isAuthenticated = true;
      $rootScope.$broadcast(EVENTS.auth.authenticated);
      return result.data;
    });
  };
  this.logout = function() {
    var req, user;
    user = {
      token: window.localStorage.getItem(LOCAL_TOKEN_KEY)
    };
    console.log(user);
    req = $http.post(endpoints.removeAuthenticatedUser(), user);
    return req.then((function(result) {
      console.log("token removed from server");
      currentUser.isAuthenticated = false;
      $http.defaults.headers.common['X-Auth-Token'] = void 0;
      return window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }), (function(response) {
      currentUser.isAuthenticated = false;
      $http.defaults.headers.common['X-Auth-Token'] = void 0;
      return window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }));
  };
  this.create = function(username, pass, email) {
    var req, user;
    user = {
      username: username,
      pass: pass,
      email: email
    };
    req = $http.post(endpoints.create(), user);
    return req.then(function(result) {
      var authUser;
      authUser = result.data;
      window.localStorage.setItem(LOCAL_TOKEN_KEY, authUser.token);
      $http.defaults.headers.common['X-Auth-Token'] = authUser.token;
      currentUser.isAuthenticated = true;
      $rootScope.$broadcast(EVENTS.auth.authenticated);
      return result.data;
    });
  };
  this.isCurrentUserAuthenticated = function() {
    console.log(window.localStorage.getItem(LOCAL_TOKEN_KEY));
    return window.localStorage.getItem(LOCAL_TOKEN_KEY) !== null;
  };
  this.getUser = function(userId) {
    var req;
    req = $http.get("http://localhost:85/api/user/1");
    return req.then(function(result) {
      return result.data;
    });
  };
  return this;
}).service("NodeService", function($http, API) {
  var endpoints;
  endpoints = {
    host: API.host,
    getNodes: function() {
      return endpoints.host + "/api/view/nodes";
    },
    getNodeDetails: function(params) {
      return endpoints.host + "/api/node/" + params.nodeId;
    },
    toggleLight: function(id, status) {
      return endpoints.host + "/api/node/" + id + "/light/" + status;
    },
    toggleWater: function(id, status) {
      return endpoints.host + "/api/node/" + id + "/water/" + status;
    }
  };
  this.getNodes = function() {
    var req;
    req = $http.get(endpoints.getNodes());
    return req.then(function(result) {
      return result.data;
    });
  };
  this.getNodeDetails = function(params) {
    var req;
    req = $http.get(endpoints.getNodeDetails(params));
    return req.then(function(result) {
      return result.data;
    });
  };
  this.toggleLight = function(id, status) {
    var req;
    req = $http.post(endpoints.toggleLight(id, status));
    return req.then(function(result) {
      return result.data;
    });
  };
  this.toggleWater = function(id, status) {
    var req;
    req = $http.post(endpoints.toggleWater(id, status));
    return req.then(function(result) {
      return result.data;
    });
  };
  return this;
}).service("SensorService", function($http, API) {
  var endpoints;
  endpoints = {
    host: API.host,
    getSensor: function(params) {
      return endpoints.host + "/api/sensor/" + params.sensorId;
    },
    getReadings: function(params) {
      return endpoints.host + "/api/view/sensor/" + params.sensorId + "/readings";
    }
  };
  this.getSensor = function(params) {
    var req;
    req = $http.get(endpoints.getSensor(params));
    return req.then(function(result) {
      return result.data;
    });
  };
  this.getReadings = function(params) {
    var req;
    req = $http.get(endpoints.getReadings(params));
    return req.then(function(result) {
      return result.data;
    });
  };
  return this;
}).factory("AuthInspector", function($rootScope, $q, EVENTS) {
  return {
    responseError: function(response) {
      if (response.status === 403) {
        $rootScope.$broadcast(EVENTS.auth.notAuthenticated);
      }
      return $q.reject(response);
    }
  };
}).config(function($httpProvider) {
  return $httpProvider.interceptors.push('AuthInspector');
});
