
'use strict';

/**
 
 * 
 * @author : amar
 * */
angular.module('webdcs.warranty.warrantySupportPortal', ['webdcs.common', 'ui.router', 'ui.bootstrap'])
	.config(function($stateProvider) {
	$stateProvider.state('webdcs.warranty.warrantySupportPortal', {}); 
     
	 //   Search
	$stateProvider.state('webdcs.warranty.warrantySupportPortal.warrantySupport', {
        url: '/warrantySupport', 
        data : {
	        title : 'Warranty Support Portal'
        },
        views : {
            "content@webdcs" : {
                templateUrl : "warranty/warrantySupportPortal/tmpl/warrantySupport.html?ver=" + new Date().getTime(),
                controller : 'warrantySupportCtrl',
	            controllerAs : 'warrantySupport'
            }
        }
        
        
    });
	
	//Account Profile
	$stateProvider.state('webdcs.warranty.warrantySupportPortal.accountProfile', {
	    url: '/accountProfile',
	    data : {
	    	breadcrumbs : [ 'Warranty', 'Warranty Support Portal', 'Account Profile' ],
	        title : '[Create] Account Profile'
	    },
	    views : {
	        "content@webdcs" : {
	            templateUrl : "warranty/warrantySupportPortal/tmpl/accountProfile.html?ver=" + new Date().getTime(),
	            controller : 'accountProfileCtrl',
	            controllerAs: 'accountProfile'
	        }
	    }
	});

	 
	
});
 




	
	
	
	
	
	
	
	
