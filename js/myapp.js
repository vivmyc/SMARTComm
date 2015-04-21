var phone, accessToken, myDHS, myDHSURL = '127.0.0.1:9001';
 
var xhrConfig = new XMLHttpRequest();
xhrConfig.open('GET', myDHSURL + "/config/");
xhrConfig.onreadystatechange = function() {
     if (xhrConfig.readyState == 4) {
          if (xhrConfig.status == 200) {
	        myDHS = JSON.parse(xhrConfig.responseText);
	    } else {
	        console.log(xhrConfig.responseText);
	    }
     }
}
xhrConfig.send();  
 
function createPhoneObject() {
    phone = ATT.rtc.Phone.getPhone();
    registerEvents();
}
 
function registerEvents() {
    phone.on('error', onError); 
}
 
function onError(data) {
    console.log(data.error);
}