function createPhoneObject() {
    phone = ATT.rtc.Phone.getPhone();
    registerEvents();
    // createPhoneObjectButton.hidden = true;
    // createPhoneSuccessButton.hidden = false;
    // loginInput.hidden = false; // Added in Step 2
    // loginButton.hidden = false; // Added in Step 2
    console.log("Requesting oauth token...")
    createAccessToken();
}
    
function onError(data) {
    console.log(data.error);
}

function registerEvents() {
    phone.on('error', onError); 
    phone.on('session:ready', onSessionReady); // Added in Step 2
    phone.on('session:disconnected', onSessionDisconnected); // Added in Step 2
    phone.on('call:incoming', onIncomingCall); // Added in Step 3
    phone.on('call:connected', onConnectedCall); // Added in Step 3
}
    
// Step 2b: Login and Logout
function onSessionReady() {
    // loginButton.hidden = true;
    // logoutButton.hidden = false;
    // callToInput.hidden = false; // Added in Step 3
    // makeCallButton.hidden = false; // Added in Step 3
    console.log("We are logged in!")
    console.log("Making call to operator...")
    $('#pleaseHold').addClass('showthis').removeClass('hidethis');
    main.hidden = true;
    // hangup_btn = false;
    makeCall();
    }
    
function onSessionDisconnected() {
    // loginButton.hidden = false;
    // logoutButton.hidden = true;
    callToInput.hidden = true; // Added in Step 3
    makeCallButton.hidden = true; // Added in Step 3
}
       
function createAccessToken() {
    var xhrToken = new XMLHttpRequest();
        xhrToken.open('POST', myDHS.app_token_url);
        xhrToken.setRequestHeader("Content-Type", "application/json");
        xhrToken.onreadystatechange = function() {
            if (xhrToken.readyState == 4) {
                if (xhrToken.status == 200) {
                    console.log(xhrToken.responseText);
                    accessToken = (JSON.parse(xhrToken.responseText));
                    associateAccessToken();
                } else {
                    console.log(xhrToken.responseText);
                }
            }
        }
        xhrToken.send(JSON.stringify({app_scope: "ACCOUNT_ID"}));
}
    
function associateAccessToken() {
    phone.associateAccessToken({
        userId: "EversourceTech",
        token: accessToken.access_token,
        success: login,
        error: onError
    }); 
}

function login() {
    phone.login({token: accessToken.access_token});
}
    
function logout() {
    phone.logout();
}

// Step 3b: Make and Answer Call
function onIncomingCall () {
    makeCallButton.hidden = true;
    answerCallButton.hidden = false;
}
    
function onConnectedCall () {
    // callToInput.value = "" ;
    // makeCallButton.hidden = true; 
    // answerCallButton.hidden = true;
    $('#pleaseHold').addClass('hidethis').removeClass('showthis');
    $('#hangupCallButton').addClass('showthis').removeClass('hidethis');
    $('#holdCallButton').addClass('showthis').removeClass('hidethis');
    $('#muteCallButton').addClass('showthis').removeClass('hidethis');
}
    
function makeCall() {
    phone.dial({
    destination: phone.cleanPhoneNumber("16095588307"),
 // destination: phone.cleanPhoneNumber("18663095847"),
    mediaType: 'audio',
    localMedia: document.getElementById('local'),
    remoteMedia: document.getElementById('remote')
    });
}

function answerCall() {
    phone.answer({
    mediaType: 'audio',
    localMedia: document.getElementById('local'),
    remoteMedia: document.getElementById('remote')
    });
} 