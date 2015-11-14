// Generated by CoffeeScript 1.10.0
var dependencies;

dependencies = ['ionic', 'chart.js', 'starter.controllers', 'starter.services'];

angular.module('starter', dependencies).run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  }).state('app.error', {
    url: '/error',
    views: {
      'menuContent': {
        templateUrl: 'templates/error.html'
      }
    }
  }).state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  }).state('app.browse', {
    url: '/browse',
    views: {
      'menuContent': {
        templateUrl: 'templates/browse.html'
      }
    }
  }).state('app.nodes', {
    url: '/nodes',
    views: {
      'menuContent': {
        templateUrl: 'templates/nodes.html',
        controller: 'NodesController',
        resolve: {
          nodes: function(NodeService) {
            return NodeService.getNodes();
          }
        }
      }
    }
  }).state('app.node_sensor', {
    url: '/sensor/:sensorId',
    views: {
      'menuContent': {
        templateUrl: 'templates/sensor.html',
        controller: 'SensorController',
        resolve: {
          sensor: function(SensorService, $stateParams) {
            return SensorService.getSensor($stateParams);
          },
          readings: function(SensorService, $stateParams) {
            return SensorService.getReadings($stateParams);
          }
        }
      }
    }
  });
  $urlRouterProvider.otherwise('/app/nodes');
});