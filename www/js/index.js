var server="http://api-ticketeo.herokuapp.com/"

$(document).ready(function() {
    $("#map").gmap3({
         map:{
         options:{
         center: [45, 0],
         zoom: 12
         }
         }});
}); 

$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    //for testing in Chrome browser uncomment
    onDeviceReady();
});

var loc

function onDeviceReady() {
    loc=navigator.geolocation.getCurrentPosition(onSuccess, onError, {maximumAge: 10000, timeout: 300000, enableHighAccuracy: true});
}




function onSuccess(position) {
    var element = document.getElementById('geolocation');
        element.innerHTML =
        'Latitude:          '+ position.coords.latitude+'<br/>'+
        'Longitude:         '+ position.coords.longitude+'<br/>'+
        'Altitude:          '+ position.coords.altitude+'<br/>'+
        'Accuracy:          '+ position.coords.accuracy+'<br/>'+
        'Altitude Accuracy: '+ position.coords.altitudeAccuracy+'<br/>'+
        'Heading:           '+ position.coords.heading+'<br/>'+
        'Speed:             '+ position.coords.speed+'<br/>'+
        'Timestamp:         '+ position.timestamp+'<br/>';
    // var latitude = position.coords.latitude;
    // var longitude = position.coords.longitude;
    // $("#map").gmap3({
    //     map:{
    //         options:{
    //         center: [latitude, longitude],
    //         zoom: 12
    //         }
    //  }}); 
}
 
function onError() {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Position inconnue';
}



window.addEventListener('load', function () {
    new FastClick(document.body);
}, false);

$(window).on('hashchange', route);
 
function route() {
    var page, hash = window.location.hash;
    switch (hash) {
         case "#allqueues":
            $.get('js/templates.html', function(templates) {
                var template = $(templates).filter('#tpl-allqueues').html();
                $.getJSON(server+"queue_models.json", function(objets) {
                    page = Mustache.render(template, objets);
                    console.log(objets);
                    document.getElementById("container").innerHTML = page;
                });
            }, 'html');
            break; 
            
         case "#queues":
            $.get('js/templates.html', function(templates) {
                var template = $(templates).filter('#tpl-queues').html();
                $.getJSON(server+"queue_models.json", function(objets) {
                    page = Mustache.render(template, objets);
                    console.log(objets);
                    document.getElementById("container").innerHTML = page;
                });
            }, 'html');
            break;

        case "#aqueue":
            $.get('js/templates.html', function(templates) {
               var template = $(templates).filter('#tpl-aqueue').html();
                var param = sessionStorage['idQueue'];

                $.getJSON(server+"queue_models/"+param+".json", function(objets) {
                    page = Mustache.render(template, objets);
                    console.log(objets);
                    document.getElementById("container").innerHTML = page;
                });
            }, 'html');
            break;

        case "#book":
            $.get('js/templates.html', function(templates) {
               var template = $(templates).filter('#tpl-book').html();
                var param = sessionStorage['idQueue'];

                $.post(server+"queue_models/"+param+"/book.json", {}, function(objets) {
                });
                    document.getElementById("container").innerHTML = page;
            }, 'html');
            break;

        case "#login":
            if(sessionStorage["user_id"]==undefined){
                $.get('js/templates.html', function(templates) {
                    page = $(templates).filter('#tpl-login').html();
                    document.getElementById("container").innerHTML = page;
                    }, 'html');
            }
            else{
                $.get('js/templates.html', function(templates) {
                    page = $(templates).filter('#tpl-already-logged').html();
                    document.getElementById("container").innerHTML = page;
                    }, 'html');
            }
            break;

        case "#logged":
            $.get('js/templates.html', function(templates) {
                var object={"user":{"email":sessionStorage["email"],"password":sessionStorage["password"]}};
                page = $(templates).filter('#tpl-logged').html();
                $.post(server+"users/log.json", object, function(data){
                    sessionStorage["user_id"]=data.user_id;
                });
                document.getElementById("container").innerHTML = page;
            }, 'html');
            break;

         case "#profil":
            $.get('js/templates.html', function(templates) {
                page = $(templates).filter('#tpl-profil').html();
                document.getElementById("container").innerHTML = page;
            }, 'html');
            break;

        case "#subscribed":
            $.get('js/templates.html', function(templates) {
                var object={"username":sessionStorage["username"],"firstname":sessionStorage["firstname"],"lastname":sessionStorage["lastname"],"email":sessionStorage["email"],"password":sessionStorage["password"]};
                page = $(templates).filter('#tpl-subscribed').html();
                $.post(server+"users.json", object, function(data){
                });
                document.getElementById("container").innerHTML = page;
            }, 'html');
            break;

        case "#gps":
            $.get('js/templates.html', function(templates) {
                page = $(templates).filter('#tpl-gps').html();
                document.getElementById("container").innerHTML = page;
                navigator.geolocation.getCurrentPosition(onSuccess, onError);
            }, 'html');
            break;
 
        default:
            $.get("js/templates.html", function(templates) {
                page = $(templates).filter('#tpl-home').html();
                document.getElementById("container").innerHTML = page;
            }, 'html');
            break;
    }
}




route();



