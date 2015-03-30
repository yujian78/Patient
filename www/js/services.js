angular.module('starter.services', [])

.factory("ServerURL", function() {
  var baseUrl = "http://ciel.at/"

  return {
    login: baseUrl + "login.php",
    category: baseUrl + "category_info.php",
    dalocation: baseUrl + "datelocation_info.php",
    doctors: baseUrl + "doctors_info.php",
    confirmation: baseUrl + "confirmation.php",
    makeappointment: baseUrl + "makeappointment.php",
    appointmentInfo: baseUrl + "appointment_info.php",
    deleteApp: baseUrl + "deleteappointment.php",
    userInfo: baseUrl + "updateUserInfo.php",
    changePassword: baseUrl + "updatePassword.php"
  }
})

.factory('Login', function($http, ServerURL) {
  var login = function(username, password, callback) {
    $http
    .post(ServerURL.login, {"username": username, "password": password})
    .success(function(data) {
      callback(data);
    })
  }

  return {
    login: login
  }
})

.factory('DisplayCat', function($http, ServerURL) {
  var catRequest = function(callback){
    $http
    .post(ServerURL.category, {"requestForCategory": "true"})
    .success(function(data){
      callback(data);
    });
  } 

  return {
    catRequest: catRequest
  }
})

.factory('DisplayDateLoc', function($http, ServerURL) {
  var datelocRequest = function(catChoice, callback){
    $http
    .post(ServerURL.dalocation, {"requestForLad": catChoice})
    .success(function(data){
      callback(data);
    });
  } 

  return {
    datelocRequest: datelocRequest
  }
})

.factory('DisplayDoc', function($http, ServerURL) {
  var docRequest = function(date, clinic, category, callback){
    $http
    .post(ServerURL.doctors, {"selectDate": date, "selectClinic": clinic, "selectCategory": category})
    .success(function(data){
      callback(data);
    });
  } 

  return {
    docRequest: docRequest
  }
})

.factory('DisplayConfirmation', function($http, ServerURL) {
  var clinicRequest = function(doctorID, callback){
    $http
    .post(ServerURL.confirmation, {"Doctor": doctorID})
    .success(function(data){
      callback(data);
    });
  }

  return {
    clinicRequest: clinicRequest
  }
})

.factory('ConfirmAppointment', function($http, ServerURL) {
  var makeAppointment = function(Category, UserEmail, Date, Time, DoctorID, callback){
    $http
    .post(ServerURL.makeappointment, {"Category": Category, "UserEmail": UserEmail, "Date": Date, "Time": Time, "DoctorID": DoctorID})
    .success(function(data){
      callback(data);
    });
  } 

  return {
    makeAppointment: makeAppointment
  }
})

.factory('DisplayAppointment', function($http, ServerURL) {
  var appointmentRequest = function(userID, callback){
    $http
    .post(ServerURL.appointmentInfo, {"appRequest": userID})
    .success(function(data){
      callback(data);
    });
  }

  return {
    appointmentRequest: appointmentRequest
  }
})

.factory('DeleteAppointment', function($http, ServerURL) {
  var deleteRequest = function(appID, callback){
    $http
    .post(ServerURL.deleteApp, {"deleteRequest": appID})
    .success(function(data){
      callback(data);
    });
  }

  return {
    deleteRequest: deleteRequest
  }
})

.factory('UpdateUserInfo', function($http, ServerURL) {
  var userInfoRequest = function(phoneNo, name, email, callback){
    $http
    .post(ServerURL.userInfo, {"phoneNo": phoneNo, "name": name, "email": email})
    .success(function(data){
      callback(data);
    });
  }

  return {
    userInfoRequest: userInfoRequest
  }
})

.factory('UpdatePassword', function($http, ServerURL) {
  var passwordRequest = function(password, email, callback){
    $http
    .post(ServerURL.changePassword, {"password": password, "email": email})
    .success(function(data){
      callback(data);
    });
  }

  return {
    passwordRequest: passwordRequest
  }
})