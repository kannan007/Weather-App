var app=angular.module('weatherapp',[]);
app.controller('weatherController',function($scope,$http)
{
	$("#data").hide();
	$("#error").hide();
	if (navigator.geolocation) 
{
 navigator.geolocation.getCurrentPosition(function(position) 
{
var latitude=position.coords.latitude;
var longitude=position.coords.longitude;
$http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude +"&lon="+ longitude + "&appid=508a34a1798dea14d67ff80d925b88cc").then(function(response) {
$("#data").show();	
$scope.content = response.data;
$scope.sunrise=new Date($scope.content.sys.sunrise*1000);
$scope.sunset=new Date($scope.content.sys.sunset*1000);
$scope.hoursrise=$scope.sunrise.getHours();
$scope.hoursset=$scope.sunset.getHours();
$scope.minsrise=$scope.sunrise.getMinutes();
$scope.minsset=$scope.sunset.getMinutes();
},function(response)
{
$("#data").hide();
$("#error").show();
$scope.statuscode = response.status;
$scope.statustext = response.statusText;            
});
 });
}
	$scope.pincode="";
	$scope.countrycode="";
	$scope.check=function()
	{
		$http.get("http://api.openweathermap.org/data/2.5/weather?zip=" + $scope.pincode +","+ $scope.countrycode + "&appid=508a34a1798dea14d67ff80d925b88cc").then(function(response)
		{
			$("#data").show();
			$scope.content=response.data;
			$scope.sunrise=new Date($scope.content.sys.sunrise*1000);
	    	$scope.sunset=new Date($scope.content.sys.sunset*1000);
    		$scope.hoursrise=$scope.sunrise.getHours();
    		$scope.hoursset=$scope.sunset.getHours();
    		$scope.minsrise=$scope.sunrise.getMinutes();
    		$scope.minsset=$scope.sunset.getMinutes();
		},function(response)
		{
			$("#data").hide();
			$("#error").show();
			$scope.statuscode = response.status;
			$scope.statustext = response.statusText;            		
		})
	}
$("#data").mouseenter(function()
{
    $(this).css({"color":"black","text-transform":"uppercase"}); 
    
  });
    $("#data").mouseleave(function()
{
 $(this).css({"color":"yellow","text-trasnform":"capitalize"});  
  });	
});