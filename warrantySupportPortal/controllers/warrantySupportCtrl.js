'use strict';

/**
 
 * 
 * @author : Sadhana
 * */

/*
 * 29/10/2024 
 * Fetch data:
 *   select * from tb_service_warrantymaster where dealercode = 'MO030' and vinnumber = 'KMHCM36C69U107589' and 
 *   CAUSALPARTNUMBER like '%00275%'
 *   29/10/2024
 */

 
angular.module('webdcs.warranty.warrantySupportPortal')
.controller('warrantySupportCtrl', 
		function($scope, $state, $stateParams, dealerInformationService, PopupService, warrantyDealerInformationService, CommonUtil, RETURN_JSON_ATTR) {	
	var warrantySupport = this;
	//Get State
	var sState = $state.current.name;
	
//	console.log("CAUSALPARTNUMBER: "+warrantySupport.master.CAUSALPARTNUMBER)
	
	// 17-10-2024
//	$scope.menuPermission = CommonUtil.getMenuPermission($scope.menuCurrentStateName);
	warrantySupport.searchOptions = {};
	warrantySupport.dealerInfo = {};
	warrantySupport.executestart = false;
	
	warrantySupport.getDealerInformation = function() {
		if(!warrantySupport.searchOptions.dealerId) {
			CommonUtil.alertModalWarning({
				title: 'Warning',
				content: $scope.webdcsLang.admin.ms_alert_notAssignedDealerCode
			});
			return;
		}
		warrantySupport.dealerInfo = {};
		warrantySupport.dealerInfoHistory = [];		
		
		console.log("#############   ---------------------  ##############")
		
		warrantyDealerInformationService.getDealerInformation(warrantySupport.searchOptions).then(function(result) {
			if (result && result.data && result.data[RETURN_JSON_ATTR.result]) {
				result = result.data[RETURN_JSON_ATTR.result];
				
				// Success
				if ('S' == result[RETURN_JSON_ATTR.retCode]) {
					if (result[RETURN_JSON_ATTR.retData]) {
						var retData = result[RETURN_JSON_ATTR.retData];
						// Dealer Info
						if (retData) {
							warrantySupport.dealerInfo = retData.data;
							warrantySupport.dealerInfoHistory = retData.list;
						}
					}
				}
				else {
					// Exception
					CommonUtil.alertModalWarning({
						title: 'Exception',
						content: result[RETURN_JSON_ATTR.retMsg]
					});
				}
			}
			else {
				CommonUtil.alertModalWarning({
					title: 'Exception',
					content: $scope.webdcsLang.common.ms_alert_noResponse
				});
			}
		}, function (reson) {
			CommonUtil.alertModalWarning({
				title: 'Exception',
				content: $scope.webdcsLang.common.ms_alert_failConnection
			});
		});	
		
		
		dealerInformationService.getDealerInformation(warrantySupport.searchOptions).then(function(result) {
			if (result && result.data && result.data[RETURN_JSON_ATTR.result]) {
				result = result.data[RETURN_JSON_ATTR.result];
				
				// Success
				if ('S' == result[RETURN_JSON_ATTR.retCode]) {
					if (result[RETURN_JSON_ATTR.retData]) {
						var retData = result[RETURN_JSON_ATTR.retData];
						
						// Dealer Info
						if (retData) {
							warrantySupport.dealerInfo = retData;							
							Object.assign(warrantySupport.dealerInfo, retData);
						}
					}
				}
				else {
					// Exception
					CommonUtil.alertModalWarning({
						title: 'Exception',
						content: result[RETURN_JSON_ATTR.retMsg]
					});
				}
			}
			else {
				CommonUtil.alertModalWarning({
					title: 'Exception',
					content: $scope.webdcsLang.common.ms_alert_noResponse
				});
			}
		}, function (reson) {
			CommonUtil.alertModalWarning({
				title: 'Exception',
				content: $scope.webdcsLang.common.ms_alert_failConnection
			});
		});	
		
		
	}
	// Document Ready
	angular.element(document).ready(function(){
		 
		console.log(CommonUtil.dealerInfo);
	 
		warrantySupport.searchOptions['dealerId'] = CommonUtil.dealerInfo.dealerCode;
		warrantySupport.searchOptions['dealercode'] = CommonUtil.dealerInfo.dealerName; 
		
		warrantySupport.getInfo();
		 
	});
	
	//29/10/2024
	//29/10/2024
	
	//17-10-2024 
	 
		$scope.warrantySupportForm = function(){
			var dealerInformation = this;
			dealerInformation.dealerInfo = {};
			
			document.getElementById('support_body').style.display = "block";
			document.getElementById('dealer_body').style.display = "none";
			document.getElementById('knowledgeBase').style.display = "none";
		}
		
		$scope.dealerInfo = function(){
	        document.getElementById('support_body').style.display = "none";
			document.getElementById('dealer_body').style.display = "block"; 
			document.getElementById('knowledgeBase').style.display = "none";
			
		}
		$scope.knowledgeBase = function(){
			//	$scope.knowledgeUrl = "https://www.hyundaidealer.com/";
				
			//	console.log(knowledgeUrl)
			document.getElementById('knowledgeBase').style.display = "block";
			document.getElementById('support_body').style.display = "none";
			document.getElementById('dealer_body').style.display = "none";			
		}
		
		
		//Select Option Event
		warrantySupport.selectOption = function(){

			console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
			console.log("Selected Option: "+warrantySupport.formData.assistanceType) 
			
			if(warrantySupport.formData.assistanceType == "PA"){
				document.getElementById('PA').style.display = "block";
				document.getElementById('WCC').style.display = "none";
				document.getElementById('WTC').style.display = "none";
				
			}else if(warrantySupport.formData.assistanceType == "WCC"){
				document.getElementById('PA').style.display = "none";
				document.getElementById('WCC').style.display = "block";
				document.getElementById('WTC').style.display = "none";
				
			}
			else{
 
				document.getElementById('PA').style.display = "none";
				document.getElementById('WCC').style.display = "none";
				document.getElementById('WTC').style.display = "block";
			}
			
		};
		
		// Vin Search 팝업 Open
		warrantySupport.openVinSearchPop = function () {
			console.log(warrantySupport.searchOptions.vinLast);
			if(warrantySupport.searchOptions.vinLast.length == 8){
				PopupService.openVinSearchPop(warrantySupport.searchOptions.vinLast, warrantySupport.vinSearchPopCallback);
			}
		};
		
		// 팝업 Callback
		warrantySupport.vinSearchPopCallback = function (returnObj) {
			if (returnObj) {
				console.log(warrantySupport.searchVinLast);
				console.log(returnObj);
				document.getElementById('pa_searchVinLast').value = returnObj.vin; 
				document.getElementById('wcc_searchVinLast').value = returnObj.vin; 
				document.getElementById('wtc_searchVinLast').value = returnObj.vin; 
				// Set Vin Info
				warrantySupport.searchOptions.searchVinLast = returnObj.vin;	
			}
		};
		
		warrantySupport.validateVin = function(){
			warrantySupport.inValidVin = false;
			warrantySupport.msg.searchVinLast = warrantySupport.msg.vin;
			
			var sPrtMode = "validateVin";
			
			var sVin =  $.trim(warrantySupport.searchOptions.searchVinLast);
			if(sVin.length == 17){	
				var oParam = {
						vinNumber : warrantySupport.searchOptions.searchVinLast
				};
				
				CommonUtil.getServiceData(sPrtMode, oParam)
				.then(function(result) {
					if (result && result.data.result.retCd == 'S') {
						warrantySupport.doSearchDetail();
					}else if(result.data.result.retCd == '38I01'){
						warrantySupport.inValidVin = true;
						warrantySupport.msg.searchVinLast = result.data.result.retMsg;
						warrantySupport.viewControl.showDetail = false;
					}else{
						warrantySupport.msg.errorSumMsg = [result.data.result.retMsg]; 
						warrantySupport.viewControl.showDetail = false;
					}
				}, function (reson) {
					//초기화
					CommonUtil.alertModalWarning({
						title: 'Exception',
						content: 'Validate Vin Fail to call service.'
					});
					warrantySupport.viewControl.showDetail = false;
				});
			}else{
				warrantySupport.inValidVin = true;
				warrantySupport.viewControl.showDetail = false;
			}
		};
});

 
