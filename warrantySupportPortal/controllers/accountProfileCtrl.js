'use strict';

/**
 * 
 * @author : Carlos Torres
 * */

angular.module('webdcs.warranty.warrantySupportPortal')
	.controller('accountProfileCtrl', function($scope, $stateParams, $state, CommonUtil, PopupService, warrantySupportPortalService, RETURN_JSON_ATTR) {
		/*result[RETURN_JSON_ATTR.retMsg]*/
		var accountProfile = this;
		var sState = $state.current.name;


		$scope.menuPermission = CommonUtil.getMenuPermission(sState);

		var dealerInfo = document.getElementsByClassName("dcs_user ng-scope")[0].children[0].children[0].innerText;
		
		document.getElementById("dealerId").innerText = dealerInfo;
		
		console.log(CommonUtil.getLoginInfo().userInfo)
		
		
		accountProfile.dealerId = CommonUtil.getDealerCode();
		accountProfile.userId = CommonUtil.getLoginInfo().userInfo.userId;
		accountProfile.firstName = "";
		accountProfile.lastName = "";
		accountProfile.displayName = "";
		accountProfile.email = "";
		accountProfile.primaryPhone = "";
		accountProfile.alternatePhone = "";
		accountProfile.priorApprovalNotificationOptIn = "";
		accountProfile.warrantyTechnicalCenterPartRequestOptIn = "";
		accountProfile.warrantyCallCenterNotificationOptIn = "";
		accountProfile.warrantyPortalUpdatesOptIn = "";
		
		
		var params = {
			USER : accountProfile.userId,
			DELR : accountProfile.dealerId
		};
		
			
		warrantySupportPortalService.getDB2AccountProfileInfo(params).then(function(result) {
			if (result && result.data && result.data[RETURN_JSON_ATTR.result]) {
				result = result.data[RETURN_JSON_ATTR.result];
				// Success
				if ('S' == result.retCd) {
					if (result[RETURN_JSON_ATTR.retData]) {
						var retData = result.retData;
						CommonUtil.alertModalSuccess({
							content: "Account Profile Information Found!"
						});
						
						accountProfile.firstName = sanitizeAndCapitalize(retData.firstName);
						accountProfile.lastName = sanitizeAndCapitalize(retData.lastName);
						accountProfile.displayName = sanitizeAndCapitalize(retData.displayName);
						accountProfile.email = sanitizeAndCapitalize(retData.emailAddress);
						accountProfile.primaryPhone = sanitizeAndCapitalize(retData.primaryPhone);
						accountProfile.alternatePhone = sanitizeAndCapitalize(retData.alternatePhone);
						accountProfile.priorApprovalNotificationOptIn = sanitizeAndCapitalize(retData.priorApprovalNotificationOptIn);
						accountProfile.warrantyTechnicalCenterPartRequestOptIn = sanitizeAndCapitalize(retData.warrantyTechnicalCenterPartRequestOptIn);
						accountProfile.warrantyCallCenterNotificationOptIn = sanitizeAndCapitalize(retData.warrantyCallCenterNotificationOptIn);
						accountProfile.warrantyPortalUpdatesOptIn = sanitizeAndCapitalize(retData.warrantyPortalUpdatesOptIn);

					}
				}
				else {
					CommonUtil.alertModalWarning({
						title: 'Exception',
						content: "Account Profile Information Not Found Please Enter the information Below!"
					});
				}
			}
		}, function(reson) {

		});
				


		function sanitizeAndCapitalize(value) {
		    if (typeof value === 'string') {
		        return value.trim().toLowerCase().replace(/\b\w/g, function(char) {
		            return char.toUpperCase();
		        });
		    }
		    return value; 
		}



		accountProfile.showAlert = function(message) {
			alert(message);
		};

		accountProfile.confirmSubmit = function() {
			if (!accountProfile.firstName || !accountProfile.lastName || !accountProfile.displayName ||
				!accountProfile.email || !accountProfile.primaryPhone) {
				CommonUtil.alertModalWarning({
					content: "Please fill out all required fields."
				});
				return;
			}

			var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailPattern.test(accountProfile.email)) {
				CommonUtil.alertModalWarning({
					content: "Please enter a valid email address."
				});
				return;
			}

			var phonePattern = /^\d{10}$/;
			if (!phonePattern.test(accountProfile.primaryPhone)) {
				CommonUtil.alertModalWarning({
					content: "Primary phone number must be 10 digits."
				});
				return;
			}

			if (!accountProfile.priorApprovalNotificationOptIn) {
				CommonUtil.alertModalWarning({
					content: "Please select an option for Prior Approval Notification Opt-In."
				});
				return;
			}

			if (!accountProfile.warrantyTechnicalCenterPartRequestOptIn) {
				CommonUtil.alertModalWarning({
					content: "Please select an option for Warranty Technical Center Part Request Opt-In."
				});
				return;
			}

			if (!accountProfile.warrantyCallCenterNotificationOptIn) {
				CommonUtil.alertModalWarning({
					content: "Please select an option for Warranty Call Center Notification Opt-In."
				});
				return;
			}

			if (!accountProfile.warrantyPortalUpdatesOptIn) {
				CommonUtil.alertModalWarning({
					content: "Please select an option for Warranty Portal Updates Opt-In."
				});
				return;
			}
			
			var paramObj = {
				dealerId: accountProfile.dealerId,
				userId: accountProfile.userId,
			    firstName: accountProfile.firstName,
			    lastName: accountProfile.lastName,
			    displayName: accountProfile.displayName,
			    email: accountProfile.email,
			    primaryPhone: accountProfile.primaryPhone,
			    alternatePhone: accountProfile.alternatePhone,
			    priorApprovalNotificationOptIn: accountProfile.priorApprovalNotificationOptIn,
			    warrantyTechnicalCenterPartRequestOptIn: accountProfile.warrantyTechnicalCenterPartRequestOptIn,
			    warrantyCallCenterNotificationOptIn: accountProfile.warrantyCallCenterNotificationOptIn,
			    warrantyPortalUpdatesOptIn: accountProfile.warrantyPortalUpdatesOptIn
			};
			

			warrantySupportPortalService.doUpdateDB2AccountProfileInfo(paramObj)
			    .then(function(result) {
			        if (result && result.data && result.data[RETURN_JSON_ATTR.result]) {
			            result = result.data[RETURN_JSON_ATTR.result];
						if (result[RETURN_JSON_ATTR.retData]) {
							var retData = result.retData;
							// Success
							if ('S' == result.retCd) {
								CommonUtil.alertModalSuccess({
								    content: "Profile Submitted Successfully!"
								});
							}
							else {
								CommonUtil.alertModalWarning({
									title: 'Exception',
									content: "Account Profile Information Not Submitted"
								});
							}
						}
			        }
			    }, function(reson) {
			        // Handle error case
			    });

			
			// Scroll to the top of the page
			window.scrollTo(0, 0);

			// Set focus to the firstName input field
			$scope.$applyAsync(function() {
			    document.getElementById('firstName').focus();
			});

		};

	});
