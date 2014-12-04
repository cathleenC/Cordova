var allqueues = {
    "lesqueues": [
        {
            "nom": "Magasin",
            "url": "#magasin"
        },
        {  
            "nom": "Administration",
            "url": "#administration"
        },
        {
            "nom": "Loisir",
            "url": "#loisir"
        }
    ]
}

var queues = {
    "lesqueues": [
        {
            "nom": "Magasin",
            "url": "#magasin"
        },
        {  
            "nom": "Administration",
            "url": "#administration"
        },
        {
            "nom": "Loisir",
            "url": "#loisir"
        }
    ]
}

//photo
$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    //for testing in Chrome browser uncomment
    //onDeviceReady();
});
 
var pictureSource;
var destinationType;
 
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {maximumAge: 10000, timeout: 300000, enableHighAccuracy: true});
}
 
function capturePhoto() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: 50});
}
 
function onPhotoDataSuccess(imageData) {
    var smallImage = document.getElementById('image');
    smallImage.style.display = 'block';
    smallImage.src = imageData;
}
 
function onFail(message) {
    alert('Failed to load picture because: ' + message);
}

//GPS
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
        case "#profil":
            $.get('js/templates.html', function(templates) {
                var page = $(templates).filter('#tpl-profil').html();
                $('#container').html(page); // with jQuery
            }, 'html');
            break;

         case "#allqueues":
            $.get('js/templates.html', function(templates) {
                var template = $(templates).filter('#tpl-allqueues').html();
                $.getJSON("http://api-ticketeo.herokuapp.com/queue_models.json", function(objets) {
                    page = Mustache.render(template, objets[0]);
                    console.log(objets[0]);
                    document.getElementById("container").innerHTML = page;
                });
            }, 'html');
            break; 
            
         case "#queues":
            $.get('js/templates.html', function(templates) {
                var template = $(templates).filter('#tpl-allqueues').html();
                $.getJSON("http://api-ticketeo.herokuapp.com/queue_models.json", function(objets) {
                    page = Mustache.render(template, objets[0]);
                    console.log(objets[0]);
                    document.getElementById("container").innerHTML = page;
                });
            }, 'html');
            break;

        case "#aqueue":
            $.get('js/templates.html', function(templates) {
               var template = $(templates).filter('#tpl-queues').html();
                var param=sessionStorage['id'];

                $.getJSON("http://api-ticketeo.herokuapp.com/queue_models/"+param+".json", function(objets) {
                    page = Mustache.render(template, objets[0]);
                    console.log(objets[0]);
                    document.getElementById("container").innerHTML = page;
                });
                document.getElementById("container").innerHTML = page;
            }, 'html');
            break;

        case "#gps":
            $.get('js/templates.html', function(templates) {
                page = $(templates).filter('#tpl-gps').html();
                document.getElementById("container").innerHTML = page;
                //slider.slidePage($(page));
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



