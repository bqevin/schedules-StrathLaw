// app.js

    // create the module and name it app
    var app = angular.module('sls', ['ngRoute'])
       // configure our routes
  .config(function($routeProvider, $httpProvider) {
        $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        $routeProvider
        // route for the home page
        // route for the Login
        // .when('/', {
        //     templateUrl : 'pages/login.html',
        //     controller  : 'loginController'
        // })
        //After login
        .when('/admin', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })
        // route for the advocates page
        .when('/advocates', {
            templateUrl : 'pages/advocates.html',
            controller  : 'advocatesController'
        })
        // route for the composing new message page
        .when('/compose', {
            templateUrl : 'pages/compose.html',
            controller  : 'composeController'
        })
        // route for the groups page
        .when('/groups', {
            templateUrl : 'pages/groups.html',
            controller  : 'groupsController'
        })

        // route for the lecturers page
        .when('/lecturers', {
            templateUrl : 'pages/lecturers.html',
            controller  : 'lecturersController'
        })
        // route for the rooms page
        .when('/rooms', {
            templateUrl : 'pages/rooms.html',
            controller  : 'roomsController'
        })
        // route for the sent page
        .when('/sent', {
            templateUrl : 'pages/sent.html',
            controller  : 'sentController'
        })
        // route for the units page
        .when('/units', {
            templateUrl : 'pages/units.html',
            controller  : 'unitsController'
        })
        .otherwise({
          redirectTo: '/admin'
        });
    })

    // create the controller and inject Angular's $scope
    .controller('mainController', function($scope,$http) {
      //$scope.loading = true;
      //Retrieving classrooms
      $scope.reloadRooms = function () {
            $http({
            method : 'GET',
            url : 'http://schedulesapp.azurewebsites.net/api/classrooms?schoolid=sls'
            }).success(function(data) {
            //Other Params includes: status, headers, config
            $scope.rooms = data;
          //  console.log(data);
            }).error(function(data) {
              //Call Sweet alert with error
              swal(
               'Oops..',
               'Please check your internet connection',
               'error'
             );
          });
        };
    //Retrieving lecturers
     $scope.reloadLecturers = function(){
      $http({
        method : 'GET',
        url : 'http://schedulesapp.azurewebsites.net/api/lecturers?schoolid=sls'
      }).success(function(data) {
        //Other Params includes: status, headers, config
        $scope.lecturers = data;
        //console.log(data);
      }).error(function(data) {
        //Call Sweet alert with error
        swal(
         'Oops..',
         'Please check your internet connection',
         'error'
       );
      });
    };
    //Retrieving Units
    $scope.reloadUnits = function () {
      $http({
          method : 'GET',
          url : 'http://schedulesapp.azurewebsites.net/api/units?schoolid=sls'
          }).success(function(data) {
          //Other Params includes: status, headers, config
          $scope.units = data;
          //console.log(data);
          }).error(function(data) {
          alert( "Please check your internet connection");
          //Call Sweet alert with error
          swal(
           'Oops..',
           'Please check your internet connection',
           'error'
         );
          });
    };
    //Saving Prosecutor Schedule
    $scope.addProsecutorSched = function(){
      //Auto generate repeated schedules
      var RepeatSchedules = (function() {
      //Schedules Holder
      var schedules = []
      var repeat = function (period, times){
        //Collect parameters
        this.period = period;
        this.times = times;
        //If checked, assign number of weeks user has selected. 
        //else insert ONLY 1 entry.
        if (typeof times == 'undefined') {
          times = 1;
        }
        //console.log(times);
        //Set position from -1
        pos = 0;
        //Loop through adding a value in every data object then push
        for(i = 0; i < times; i++ ){
          schedules.push({
            UnitName: $scope.unitName.Name,
            UnitCode: "",
            Group: 3,
            IsNewAppointment: false,
            Lecturer: $scope.lecturerName.Name,
            Location: $scope.roomName.Name,
            AppointmentType: 0,
            Schoolid: "sls",
            StartTime:  new Date((((new Date($scope.startTime).getTime()))+(period*pos)*1000)).toISOString().replace("Z", "-03:00"),
            Notes: "",
            EndTime:  new Date((((new Date($scope.endTime).getTime()))+(period*pos)*1000)).toISOString().replace("Z", "-03:00")
          })
          pos++;
        }
        //console.log(schedules)
        return schedules;
      }
      //Public functions
      return {
        repeat
      };
    })();
      // Writing it to the server
      var data = RepeatSchedules.repeat(604800,$scope.times);
      console.log(data);
      $http.post('http://schedulesapp.azurewebsites.net/api/schedules', data )
      .success(function(data) {
        $scope.message = data;
        //Call Sweet alert after successful Saving
        swal(
         'Successful!',
         'The Schedule has been added to calender.',
         'success'
       );
        console.log("Successfully Saved:" + data.Name + " !");
      })
      .error(function(data) {
        console.log(data);
        //Call Sweet alert with error
        swal(
         'Successful!',
         'The Schedule has been added to calender.',
         'success'
       );
      });
      // Making the fields empty
      $scope.unitName = '';
      //$scope.unitCode = '';
      $scope.lecturerName = '';
      $scope.roomName = '';
      $scope.startTime = '';
      $scope.endTime = '';
      $scope.times = '';
  };
    // //Initialize Rooms
    // $scope.reloadRooms();
    // //Initialize Lecturers
    // $scope.reloadLecturers();
    // //Initialize Units
    // $scope.reloadUnits();

    })
    .controller('advocatesController', function($scope,$http) {
          //Retrieving classrooms
          $scope.reloadRooms = function () {
                $http({
                method : 'GET',
                url : 'http://schedulesapp.azurewebsites.net/api/classrooms?schoolid=sls'
                }).success(function(data) {
                //Other Params includes: status, headers, config
                $scope.rooms = data;
              //  console.log(data);
                }).error(function(data) {
                  //Call Sweet alert with error
                  swal(
                   'Oops..',
                   'Please check your internet connection',
                   'error'
                 );
              });
            };
        //Retrieving lecturers
         $scope.reloadLecturers = function(){
          $http({
            method : 'GET',
            url : 'http://schedulesapp.azurewebsites.net/api/lecturers?schoolid=sls'
          }).success(function(data) {
            //Other Params includes: status, headers, config
            $scope.lecturers = data;
            //console.log(data);
          }).error(function(data) {
            //Call Sweet alert with error
            swal(
             'Oops..',
             'Please check your internet connection',
             'error'
           );
          });
        };
        //Retrieving Units
        $scope.reloadUnits = function () {
          $http({
              method : 'GET',
              url : 'http://schedulesapp.azurewebsites.net/api/units?schoolid=sls'
              }).success(function(data) {
              //Other Params includes: status, headers, config
              $scope.units = data;
              //console.log(data);
              }).error(function(data) {
              alert( "Please check your internet connection");
              //Call Sweet alert with error
              swal(
               'Oops..',
               'Please check your internet connection',
               'error'
             );
              });
        };
        //Saving Prosecutor Schedule
        $scope.addAdvocateSched = function(){
          // Writing it to the server
          //Auto generate repeated schedules
          var RepeatSchedules = (function() {
          //Schedules Holder
          var schedules = [];
          var repeat = function (period, times){
            //Collect parameters
            this.period = period;
            this.times = times;
            //If checked, assign number of weeks user has selected. 
              //else insert ONLY 1 entry.
              if (typeof times == 'undefined') {
                times = 1;
              }
            //Set position from -1
            pos = 0;
            //Loop through adding a value in every data object then push
            for(i = 0; i < times; i++ ){
              schedules.push({
                UnitName: $scope.unitName.Name,
                UnitCode: "",
                Group: 4,
                IsNewAppointment: false,
                Lecturer: $scope.lecturerName.Name,
                Location: $scope.roomName.Name,
                AppointmentType: 0,
                Schoolid: "sls",
                StartTime:  new Date((((new Date($scope.startTime).getTime()))+(period*pos)*1000)).toISOString().replace("Z", "-03:00"),
                Notes: "",
                EndTime:  new Date((((new Date($scope.endTime).getTime()))+(period*pos)*1000)).toISOString().replace("Z", "-03:00")
              })
              pos++;
            }
            //console.log(schedules)
            return schedules;
          }
          //Public functions
          return {
            repeat
          };
        })();
        // Writing it to the server
        var data = RepeatSchedules.repeat(604800,$scope.times);

          console.log(data);
          $http.post('http://schedulesapp.azurewebsites.net/api/schedules', data )
          .success(function(data) {
            $scope.message = data;
            //Call Sweet alert after successful Saving
            swal(
             'Successful!',
             'The Schedule has been added to calender.',
             'success'
           );
            //console.log("Successfully Saved:" + data.Name + " !");
          })
          .error(function(data) {
            console.log(data);
            //Call Sweet alert with error
            swal(
             'Successful!',
             'The Schedule has been added to calender.',
             'success'
           );
          });
          // Making the fields empty
          $scope.unitName = '';
          //$scope.unitCode = '';
          $scope.lecturerName = '';
          $scope.roomName = '';
          $scope.startTime = '';
          $scope.endTime = '';
          $scope.times = '';
      };
        // //Initialize Rooms
        // $scope.reloadRooms();
        // //Initialize Lecturers
        // $scope.reloadLecturers();
        // //Initialize Units
        // $scope.reloadUnits();

        })
    .controller('lecturersController', function($scope, $http){
      $scope.loading = true;
      $scope.reload = function(){
      $http({
  			method : 'GET',
  			url : 'http://schedulesapp.azurewebsites.net/api/lecturers?schoolid=sls'
  		}).success(function(data) {
        $scope.loading = false;
        //Other Params includes: status, headers, config
  			$scope.lecturers = data;
        console.log(data);
  		}).error(function(data) {
        //Call Sweet alert with error
        swal(
         'Oops..',
         'Please check your internet connection',
         'error'
       );
  		});
    };

      //Saving Lecturer
      $scope.addLecturer = function(){
        // Writing it to the server
        var data = { "Name": $scope.lecturerName, "Schoolid": "sls" }
        $http.post('http://schedulesapp.azurewebsites.net/api/lecturers/', data )
        .success(function(data) {
          $scope.message = data;
          //Call Sweet alert after successful Saving
          swal(
           'Successful!',
           'The lecturer "'+data.Name+'" has been added.',
           'success'
         );
          console.log("Successfully Saved:" + data.Name + " !");
          $scope.reload();
        })
        .error(function(data) {
          console.log(data);
          //Call Sweet alert with error
          swal(
           'Oops..',
           'There was an error please try again',
           'error'
         );
        });
        // Making the fields empty
        $scope.lecturerName='';
    };

    //Deleting Lecturer
    $scope.removeLecturer = function(lec_id){
      $http.delete("http://schedulesapp.azurewebsites.net/api/lecturers/"+lec_id)
      .success(function(data) {
        //Call Sweet alert after successful removing
        swal(
         'Successful!',
         'The Lecturer has been removed.',
         'success'
       );
        console.log("Successfully Deleted ID:" + data + " !");
        $scope.reload();
      })
      .error(function(data) {
        console.log(data);
        //Call Sweet alert with error
        swal(
         'Oops..',
         'There was an error please try again',
         'error'
       );
      });
    };
    //Init Data load
    $scope.reload();

    })
    .controller('groupsController', function($scope, $http){
      $scope.loading = true;
      $scope.reload = function(){
        $http({
        method : 'GET',
        url : 'http://schedulesapp.azurewebsites.net/api/groups?schoolid=sls'
        }).success(function(data) {
        $scope.loading = false;
        //Other Params includes: status, headers, config
        $scope.groups = data;
        console.log(data);
        }).error(function(data) {
          //Call Sweet alert with error
          swal(
           'Oops..',
           'Please check your internet connection',
           'error'
         );
        });
      };

      //Saving  Group
      $scope.addGroup = function(){
        // Writing it to the server
        var data = { "Name": $scope.groupName, "Schoolid": "sls" }
        $http.post('http://schedulesapp.azurewebsites.net/api/groups/', data )
        .success(function(data) {
          $scope.message = data;
          //Call Sweet alert after successful Saving
          swal(
           'Successful!',
           'The group "'+data.Name+'" has been added.',
           'success'
         );
          console.log("Successfully Saved:" + data.Name + " !");
          $scope.reload();
        })
        .error(function(data) {
          console.log(data);
          //Call Sweet alert with error
          swal(
           'Oops..',
           'There was an error please try again',
           'error'
         );
        });
        // Making the fields empty
        $scope.groupName='';
      };

      //Deleting Units
      $scope.removeGroup = function(group_id){
        $http.delete("http://schedulesapp.azurewebsites.net/api/groups/"+group_id)
        .success(function(data) {
          //Call Sweet alert after successful removing
          swal(
           'Successful!',
           'The group has been removed.',
           'success'
         );
          console.log("Successfully Deleted ID:" + data + " !");
          $scope.reload();
        })
        .error(function(data) {
          console.log(data);
          //Call Sweet alert with error
          swal(
           'Oops..',
           'There was an error please try again',
           'error'
         );
        });
      };
      //Init Data load
      $scope.reload();

    })
    .controller('unitsController', function($scope, $http){
        $scope.loading = true;
        //Retrieving Units
        $scope.reload = function () {
          $http({
              method : 'GET',
              url : 'http://schedulesapp.azurewebsites.net/api/units?schoolid=sls'
              }).success(function(data) {
              //Other Params includes: status, headers, config
              $scope.loading = false;
              $scope.units = data;
              console.log(data);
              }).error(function(data) {
                //Call Sweet alert with error
                swal(
                 'Oops..',
                 'Please check your internet connection',
                 'error'
               );
              });
        };
      //Saving Units
      $scope.addUnit = function(){
        // Writing it to the server
        var data = { "Name": $scope.unitName,"Code": $scope.unitCode, "Schoolid": "sls" }
        $http.post('http://schedulesapp.azurewebsites.net/api/units/', data )
        .success(function(data) {
          $scope.loading = false;
          $scope.message = data;
          //Call Sweet alert after successful Saving
          swal(
           'Successful!',
           'Unit "'+data.Name+'" has been added.',
           'success'
         );
          console.log("Successfully Saved:" + data.Name + " !");
          $scope.reload();
        })
        .error(function(data) {
          console.log(data);
          //Call Sweet alert with error
          swal(
           'Oops..',
           'There was an error please try again',
           'error'
         );
        });
        // Making the fields empty
        $scope.unitName='';
        $scope.unitCode='';
      };

      //Deleting Units
      $scope.removeUnit = function(unit_id){
        $http.delete("http://schedulesapp.azurewebsites.net/api/units/"+unit_id)
        .success(function(data) {
          //Call Sweet alert after successful removing
          swal(
           'Successful!',
           'The Unit has been removed.',
           'success'
         );
          console.log("Successfully Deleted ID:" + data + " !");
          $scope.loading = false;
          $scope.reload();
        })
        .error(function(data) {
          console.log(data);
          //Call Sweet alert with error
          swal(
           'Oops..',
           'There was an error please try again',
           'error'
         );
        });
      };
      //Init Data load
      $scope.reload();
    })
    .controller('roomsController', function($scope, $http, $interval){
      $scope.loading = true;
      //Retrieving classrooms
      $scope.reload = function () {
            $http({
            method : 'GET',
            url : 'http://schedulesapp.azurewebsites.net/api/classrooms?schoolid=sls'
            }).success(function(data) {
              $scope.loading = false;
            //Other Params includes: status, headers, config
            $scope.rooms = data;
            console.log(data);
            }).error(function(data) {
              //Call Sweet alert with error
              swal(
               'Oops..',
               'Please check your internet connection',
               'error'
             );
          });
        };

        //Saving Classrooms
        $scope.addRoom = function(){
        	// Writing it to the server
          var data = { "Name": $scope.roomName, "Schoolid": "sls" }
        	$http.post('http://schedulesapp.azurewebsites.net/api/classrooms/', data )
        	.success(function(data) {
            $scope.loading = false;
        		$scope.message = data;
            //Call Sweet alert after successful Saving
            swal(
             'Successful!',
             'The room "'+data.Name+'" has been added.',
             'success'
           );
            console.log("Successfully Saved:" + data.Name + " !");
            $scope.reload();
        	})
        	.error(function(data) {
            console.log(data);
            //Call Sweet alert with error
            swal(
             'Oops..',
             'There was an error please try again',
             'error'
           );
        	});
        	// Making the fields empty
        	$scope.roomName='';
        };

        //Deleting Classrooms
        $scope.removeRoom = function(room_id){
          //alert(room_id);
          $http.delete("http://schedulesapp.azurewebsites.net/api/classrooms/"+room_id)
          .success(function(data) {
            //Call Sweet alert after successful Deleting
            swal(
             'Successful!',
             'The room has been removed.',
             'success'
           );
            console.log("Successfully Deleted ID:" + data + " !");
            $scope.loading = false;
            $scope.reload();
        	})
          .error(function(data) {
            console.log(data);
            //Call Sweet alert with error
            swal(
             'Oops..',
             'There was an error please try again',
             'error'
           );
        	});
        };
        //Init Data load
        $scope.reload();
        // //Auto-Reloading Data
        // $interval(function(){
        //   $scope.reload();
        // }, 3000);

    });
