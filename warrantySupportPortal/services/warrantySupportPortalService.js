/**
 * ""Warranty Support Portal Service
 * ($http.post(C), $http.put(U), $http.get(R), $http.delete(D))
 * (get/create/modify/delete)
 * 
 * @author shchoi
 */
angular.module('webdcs.warranty.warrantySupportPortal')
	.service('warrantySupportPortalService', function($http, CommonUtil) {
		var service = this;
		
		var httpParams = {
			url: '',
			method: 'POST',
			headers: {'Content-Type' : 'application/json; charset=utf-8'},
			params: ''
		};
		
		
		// HMA Get Account Profile Info
		service.getDB2AccountProfileInfo = function(paramObj) {
			var url = '/irj/servlet/prt/portal/prtroot/com.hma.webdcs.warranty.portalSupport.PortalSupportController?prtmode=getDB2AccountProfileInfo';
			url = CommonUtil.getCheckedLocalDevelopUrl(url);
			httpParams.url = url;
			httpParams.params = paramObj;

			return $http(httpParams);
		};

		
		// HMA Update or Insert Account Profile Info
		service.doUpdateDB2AccountProfileInfo = function(paramObj) {
			var url = '/irj/servlet/prt/portal/prtroot/com.hma.webdcs.warranty.portalSupport.PortalSupportController?prtmode=updateDB2AccountProfileInfo';
			url = CommonUtil.getCheckedLocalDevelopUrl(url);
			httpParams.url = url;
			httpParams.params = paramObj;

			return $http(httpParams);
		};


	});