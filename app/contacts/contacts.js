'use strict';

angular.module('myContacts.contacts', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope,$firebaseArray) {

  var config = {
    apiKey: "AIzaSyBbG09zqsn_fe9GGeIK_hba044W3x6Ass0",
    authDomain: "mycontacts-d06b3.firebaseapp.com",
    databaseURL: "https://mycontacts-d06b3.firebaseio.com",
    projectId: "mycontacts-d06b3",
    storageBucket: "mycontacts-d06b3.appspot.com",
    messagingSenderId: "1077436729192"
  };
  firebase.initializeApp(config);
  var ref = firebase.database().ref();
  
  $scope.contacts = $firebaseArray(ref);

  $scope.showAddForm = function(){
    $scope.addFormShow = true; 
  }

  $scope.hide = function(){
    $scope.addFormShow = false; 
  }

	$scope.showContact = function(contact){
		console.log('Getting Contact...');

		$scope.name = contact.name;
		$scope.email = contact.email;
		$scope.company = contact.company;
		$scope.mobile_phone = contact.phones[0].mobile;
		$scope.home_phone = contact.phones[0].home;
		$scope.work_phone = contact.phones[0].work;
		$scope.street_address = contact.address[0].street_address;
		$scope.city = contact.address[0].city;
		$scope.state = contact.address[0].state;
		$scope.zipcode = contact.address[0].zipcode;

		$scope.contactShow = true;		
	}
  
  function clearFields(){
    $scope.name = '';
    $scope.name = '';
    $scope.company = '';
    $scope.mobile_phone = '';
    $scope.home_phone = '';
    $scope.work_phone = '';
    $scope.street_address = '';
    $scope.city = '';
    $scope.state = '';
    $scope.zipcode = '';
  }

  $scope.addFormSubmit = function(){
    console.log('Adding contact...');

    var name = $scope.name || null;
    var email = $scope.name || null;
    var company = $scope.company || null;
    var mobile_phone = $scope.mobile_phone || null;
    var home_phone = $scope.home_phone || null;
    var work_phone = $scope.work_phone || null;
    var street_address = $scope.street_address || null;
    var city = $scope.city || null;
    var state = $scope.state || null;
    var zipcode = $scope.zipcode || null;

    $scope.contacts.$add({
      name:name,
      email:email,
      company:company,
      phones: [
        {
          mobile:mobile_phone,
          home:home_phone,
          work:work_phone
        }
      ],
      address: [
        {
          street_address:street_address,
          city:city,
          state:state,
          zipcode:zipcode
        }
      ]
    }).then(function(ref){
    
      console.log('Contact has been added...');
      clearFields();
      $scope.addFormShow = false; 
      $scope.msg = 'Contact Added'; 
    });

  }
}]);