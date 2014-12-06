
$(document).ready(function() {
    $("#map").gmap3({
         map:{
         options:{
         center: [45, 0],
         zoom: 12
         }
         }});
}); 



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
         case "#allqueues":
            $.get('js/templates.html', function(templates) {
                var template = $(templates).filter('#tpl-allqueues').html();
                $.getJSON("http://api-ticketeo.herokuapp.com/queue_models.json", function(objets) {
                    page = Mustache.render(template, objets);
                    console.log(objets);
                    document.getElementById("container").innerHTML = page;
                });
            }, 'html');
            break; 
            
         case "#queues":
            $.get('js/templates.html', function(templates) {
                var template = $(templates).filter('#tpl-queues').html();
                $.getJSON("http://api-ticketeo.herokuapp.com/queue_models.json", function(objets) {
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

                $.getJSON("http://api-ticketeo.herokuapp.com/queue_models/"+param+".json", function(objets) {
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

                $.post("http://api-ticketeo.herokuapp.com/queue_models/"+param+"/book.json", {"booking": {"user_id": ""}}, function(objets) {
                    page = Mustache.render(template, objets);
                    console.log(objets);
                    document.getElementById("container").innerHTML = page;
                });
            }, 'html');
            break;

        case "#login":
            $.get('js/templates.html', function(templates) {
                var template = $(templates).filter('#tpl-login').html();

                $.post("http://api-ticketeo.herokuapp.com/.json", {"booking": {"user_id":"", "password":"" }}, function(objets) {
                    page = Mustache.render(template, objets);
                    console.log(objets);
                    document.getElementById("container").innerHTML = page;
                });
            }, 'html');
            break;

         case "#profil":
            $.get('js/templates.html', function(templates) {
                var template = $(templates).filter('#tpl-profil').html();

                $.post("http://api-ticketeo.herokuapp.com/users.json", {"user": {"username":"" ,"firstname":"" ,"lastname":"" ,"email":"", "password":""}}, function(objets) {
                    page = Mustache.render(template, objets);
                    console.log(objets);
                    document.getElementById("container").innerHTML = page;
                });
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



