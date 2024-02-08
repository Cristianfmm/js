//var host = "http://192.168.1.10:8000/"; 
var host ="http://localhost:8000/";

function sleep(milliseconds) {
  console.log("sleeping");
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function toastr_message(code,messages){
    //console.log(code);
    switch(code) {
        case 200:
            response = toastr.success(messages["200"],messages["service"]);
            break;
        case 400:
            response = toastr.success(messages["400"],messages["service"]);
            break;
        case 500:
            response = toastr.error(messages["500"],messages["service"]);
            break;
        default:
            response = false
            break;
    }
    //console.log(response);
    return response;
}
function cleanView(){
    $("#titleModal").text("");
    $("#bodyTag").children().remove();
    $("#ModalObs").off('hidden.bs.modal');
    $("#titleModalLarge").text("");
    $("#bodyTagLarge").children().remove();
    $("#ModalLargeObs").off('hidden.bs.modal');
    $("#form2").off('submit');
    $("#buttons_action").children().not(":first").remove();
    $("#modalCreate").removeClass('modal-lg');
    $("#navbarResponsive").removeClass('show');
}



function hide_modules(array){
    $.each(modules_index,function(key, value) {
        get_permission(value).done(function(response){
            console.log(response);
            if(array.indexOf(value) == -1 || response['response']['actions'].indexOf(actions_sections['Read']) == -1){
                $("#"+key).parent().remove();
            }
        })
        .fail(function(response) {
            console.log(response);
        });
    });
}



function denyRead(){
    $("#content").load("views/error.html",function(){
        $("#content_error").addClass('text-danger');
        $("#content_error").text("UPS!!! no tienes permisos para ver esta sección. No seas curioso...");
    });
}

function logged_area(){

    // ultimo cambio body 13/04/2020 13:28 
    $(".body_").load("views/body.html",function(){
        get_permission(host).done(function(response){
            if(response['response'].length > 0){
                $.each(response['response'],function(key,value) {
                    $("#li-"+value).removeClass('d-none');
                    $("#li-"+value).addClass('animated flipInX');
                });
            }
            else {
                location.href = "../index.html";
            }
        }).fail(function(response){
            console.log(response);
        });
        modulesMain(); 
        $("#modalView").load("views/modalObs.html");
        $("#modalLargeView").load("views/modalLarge.html");
        $('.btn-expand-collapse').click(function(e) {
            $('.navbar-primary').toggleClass('collapsed');
    });
        
    $(".item").click(function(){
        $(".nav-item").removeClass("active animated flip");
        $(this).parent().addClass("active animated flip");    
        $("#content").addClass("bg-default");
        cleanView();
        switch ($(this).attr("id")){             
            case 'regconsec':
                view_regconsec();
                break;
            case 'reg_form':
                view_form();
                break;
            case 'toma_foto':
                view_foto();
                break;

            default:
                alert($(this).attr('id'));
                break;
        }    
    });
    $("#reg_form").click();
    });
}


document.oncontextmenu = function(){return false;}

$(document).ready(function(){
    console.log("a")
   

    logged_area();    

});




function modulesMain(){
    moduleViews().done(function(response){
        var modAct = $(".body_").attr('id');
        console.log(modAct);
        $.each(response["response"], function(index, value) {
            var active = (value["id"] == modAct)?"active":"";
            var link = (value["id"] == modAct)?"#":"../"+value["path"];
            var numModule = '<ul class="navbar-nav ml-auto"><li class="'+active+'" id="m'+value["id"]+'"><a class="nav-link" href="'+link+'">'+value["module"]+'</a></li></ul>';
            $("#navbarResponsive").append(numModule);
        });
        var modBack = '<ul class="navbar-nav ml-auto"><li class="nav-item"><a class="nav-link" href="../index.html"><i class="fa fa-fw fa-home"></i>Volver</a></li></ul>';
        $("#navbarResponsive").append(modBack);
    }).fail(function(response){
        console.log(response);
    });
}


