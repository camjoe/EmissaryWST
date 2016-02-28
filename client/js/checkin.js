$(document).ready(function(){

    var io = io();
    var VALIDATE_COMPANY_ID = "validate_company_id";
    var VISITOR_LIST_UPDATE = "visitor_list_update";
    var DISCONNECT = "disconnect";
    var REMOVE_VISITOR = "remove_visitor";
    var ADD_VISITOR = "add_visitor";

    $('#tap-to-check').on('click',function(){
        //console.log("click");
        $('.check-in').addClass('show');
        $('.check-in').animate({
            top:'25%',
            opacity: '1'
        }, 700);
        $(this).addClass('hide');
    });

    $('.check-in').on('submit', function() {

        console.log("data submitted");
        var data = grabFormElements();
        console.log(data);
        io.on(VALIDATE_COMPANY_ID,function(socket) {
            socket.emit('VISITOR_LIST_UPDATE', data);
        });

        $(this).animate({
            top:'35%',
            opacity:'0'
        },0);

    });

    document.ontouchmove = function(e) {
        e.preventDefault();
    };


    //Grabs elements from the check in and puts it into an object
    function grabFormElements(){
        var newVisitor = {};
        newVisitor.firstName= $('#visitor-first').val();
        newVisitor.lastName = $('#visitor-last').val();
        newVisitor.appointment = $('#visitor-appointment').val();
        newVisitor.checkin = getCurrentTime();
        return newVisitor;
    }

    //Function to get Current Time of Check in
    function getCurrentTime(){
        var currentTime;
        var today = new Date();
        var currentHour = today.getHours();
        var currentMinute = today.getMinutes();

        if(currentMinute < 10){
            currentMinute = '0' + currentMinute;
        }

        if(currentHour >= 13){
            currentHour = currentHour - 12;
            currentTime = currentHour + ':' + currentMinute + 'PM';
        }
        else if(currentHour === 12){
            currentTime = currentHour + ':' + currentMinute + 'PM';
        }
        else if (currentHour === 0)
            currentTime = 1 + ':' + currentMinute + 'AM';
        else
            currentTime = currentHour + ':' + currentMinute + 'AM';

        return currentTime;

    }


});
