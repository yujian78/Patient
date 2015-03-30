// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.status', {
    cache: false,
    url: '/status',
    views: {
      'tab-status': {
        templateUrl: 'templates/tab-status.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.status-category', {
    cache: false,

    url: '/status/category',
    views: {
      'tab-status': {
        templateUrl: 'templates/status-category.html',
        controller: 'appotCategoryCtrl'
      }
    }
  })
  .state('tab.status-lad', {
    cache: false,
    url: '/status/category/lad',
    views: {
      'tab-status': {
        templateUrl: 'templates/status-locationdate.html',
        controller: 'DateLocationCtrl'
      }
    }
  })
  .state('tab.status-doctors', {
    cache: false,
    url: '/status/category/lad/doctors',
    views: {
      'tab-status': {
        templateUrl: 'templates/status-doctors.html',
        controller: 'DoctorsCtrl'
      }
    }
  })

  .state('tab.status-doctors-specific', {
      cache: false,
      url: '/status/category/lad/doctors/specific',
      views: {
        'tab-status': {
          templateUrl: 'templates/status-doctors-specific.html',
          controller: 'DoctorsSpecificCtrl'
        }
      }
  })

  .state('tab.status-confirmation', {
    cache: false,
    url: '/status/confirmation',
    views: {
      'tab-status': {
        templateUrl: 'templates/status-confirmation.html',
        controller: 'ConfirmationCtrl'
      }
    }
  })

  .state('tab.appointments', {
      cache: false,
      url: '/appointments',
      views: {
        'tab-appointments': {
          templateUrl: 'templates/tab-appointments.html',
          controller: 'AppointmentsCtrl'
        }
      }
    })
  
  .state('tab.appointments-detail', {
      cache: false,
      url: '/appointments/detail',
      views: {
        'tab-appointments': {
          templateUrl: 'templates/appointments-detail.html',
          controller: 'AppointmentsDetailCtrl'
        }
      }
    })


  .state('tab.account', {
    cache: false,
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.account-contactInfo', {
    url: '/account/contactInfo',
    views: {
      'tab-account': {
        templateUrl: 'templates/account-contactInfo.html',
        controller: 'AccountContactCtrl'
      }
    }
  })

  .state('tab.account-password', {
    url: '/account/password',
    views: {
      'tab-account': {
        templateUrl: 'templates/account-password.html',
        controller: 'PasswordCtrl'
      }
    }
  })

  .state('tab.account-reminder', {
    url: '/account/reminder',
    views: {
      'tab-account': {
        templateUrl: 'templates/account-reminder.html',
        controller: 'ReminderCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
