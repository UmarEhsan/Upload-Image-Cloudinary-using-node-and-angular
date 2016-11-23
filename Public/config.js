/**
 * Created by LAPTECH on 10/22/2016.
 */
(function () {
  angular
    .module('AdminApp')
    .config(['$stateProvider', '$urlRouterProvider','$httpProvider', config])

  function config($stateProvider, $urlRouterProvider, $httpProvider){
    //   $urlRouterProvider.other
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url:'/home',
        templateUrl: 'components/home/home.view.html',
        controller: 'homeCtrl',
      })
      .state('register',{
        url:'/register',
        templateUrl: 'components/register/register.view.html',
        controller: 'registerCtrl',
      })

      .state('admin',{
        url : '/admin',
        templateUrl: 'components/admin/admin.view.html'
      })

      .state('admin.addDoctors',{
        url:'/addDoctors',
        templateUrl: 'components/doctors/doctors.html',
        params: {
          obj: null
        },
        controller: 'doctorCtrl',

      })
        .state('admin.departmentHospitals',{
          url         : '/departmentHospitals',
          templateUrl : 'components/departmentHospitals/departmentHospitals.html',
          controller  : 'deprtHosCtrl'
        })
        .state('admin.addHospitals',{
          url : '/addHospitals',
          templateUrl: 'components/Hospital/hospital.html',
          controller: 'hospitalCtrl'
        })
        .state('admin.departments',{
          url : '/addDepartments',
          templateUrl: 'components/departments/departments.html',
          controller: 'departmentCtrl'
        })

      .state('admin.viewDoctors',{
        url :'/viewDoctors',
        templateUrl: 'components/view/viewDoctor.html',
        controller: 'ViewDoctor'
      })

      .state('login',{
        url : '/login',
        templateUrl: 'components/login/login.view.html',
        controller: 'loginCtrl'
      })
    $httpProvider.interceptors.push('AuthInterceptor');
    // $locationProvider.html5Mode(true)
  }
})();
