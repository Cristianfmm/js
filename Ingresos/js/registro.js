function view_regconsec(){
    $("#content").load("views/registro_consec.html",function(){
        var name = $("#name").val()
		var TipDocument = SelectTipDocument();
		$.when(TipDocument).done(function(event){
			console.log(event)
			CreateSelectA(event["response"],'SelecDocument')
		}).fail(function(event){
			console.log(event)
		});
        console.log(name)
        $("#btnSave").click(function(event){
            var name = $("#name").val();
            var lastname = $("#lastname").val();
            var type_identification = $("#SelecDocument").val();
            var identification = $("#identification").val();
            var celphone = $("#celphone").val();
            var valid = validFormDocument([
                {'data':name,'item':'name','type':'text', 'obligatory':true},
                {'data':lastname,'item':'lastname','type':'text', 'obligatory':true},
                {'data':type_identification,'item':'type_identification','type':'text', 'obligatory':true},
                {'data':identification,'item':'identification','type':'text', 'obligatory':true},
                {'data':celphone,'item':'celphone','type':'text', 'obligatory':true}]);
            if(valid["validate"]) {

                console.log(name);
                var create_User = "";
                
                $("#btnSave").html("Guardando <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
                
                create_User = createUser(name,lastname,type_identification,identification,celphone);
				var get_CrateUser = getCrateUser() 
				$.when(get_CrateUser).done(function(response){
					refresh ();
					console.log(response)
					refresh ();
					var codigo = response["response"][0]['id'];
					var usuario = response["response"][0]['apellidos']+" "+response["response"][0]['nombre'];
					var documento = response["response"][0]['n_doc'];
					Swal.fire({
						title: 'GENERADO!',
						text: 'CÓDIGO: '+codigo+' NOMBRES:'+usuario+' DOCUMENTO: '+documento,
						icon: 'success',
						confirmButtonText: 'OK',
						confirmButtonColor: '#3085d6',
						didClose: () => {
						  console.log('User clicked OK button.');
						   window.location.reload(true);
						   event.preventDefault();
						}
					  }).fail(function(response) {
					  console.log(response);
					});
					event.preventDefault();
				})
                console.log(create_User);
                event.preventDefault();
            } else {
                console.log(name);
                $(".labelInvalid").each(function() {
					$(this).removeClass('labelInvalid');
                    $(this).children("span:first").remove();
				});
				$.each(valid["items"], function(key, label) {
					$("#label_"+label).addClass('labelInvalid');
                    $("#label_"+label).append('<span class="labelCheck"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
                    $("#"+label).find('label').addClass("animated infinite pulse");
                    $("#"+label).focus();
                    $("."+label).focus();
				});
				//console.log("Datos Invalidos");
            }
            event.preventDefault();
        })
    })
}


/* $(".table-danger").each(function() {
    $(this).removeClass('table-danger col-xl-12');
    $(this).removeClass('animated infinite pulse col-xl-12');
    $(this).removeClass()
});//fin else		
$.each(info["items"], function(key, label) {
$("#div_"+label).addClass('table-danger col-xl-12');
$("#div_"+label).addClass('animated infinite pulse col-xl-12');
$("#"+label).focus();
$("."+label).focus();
console.log(info);
 */

/* function newTeacher(type_users,id_boss) {
	$("#titleModalLarge").text('Crear Docente');
	$("#bodyTagLarge").load("views/adminView/createTeacher.html", function() {
		$("#selectTypeUser").append(createSelect(type_users,"selectTypeUser",6,false));
		$("#btnModalLarge").html('Crear <i class="fa fa-plus-circle" aria-hidden="true"></i>');
		$("#btnModalLarge").attr("disabled", false);
		$("#btnModalLarge").off("click");
		$("#btnModalLarge").click(function (e) {
			var last_name = $("#last_name").val();
			var names = $("#names").val();
			var num_document = $("#document").val();
			var type_user = $(".selectTypeUser").val();
			var valid = validFormActData([
				{'data':last_name,'item':'last_name','type':'text', 'obligatory':true},
				{'data':names,'item':'names','type':'text', 'obligatory':true},
				{'data':num_document,'item':'document','type':'text', 'obligatory':true},
				{'data':type_user,'item':'selectTypeUser','type':'select', 'obligatory':true}]);
			if (valid["validate"]) {
				$("#btnModalLarge").html("Enviando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
				$("#btnModalLarge").attr('disabled', true);
				createTeacher(last_name,names,num_document,type_user,id_boss).done(function (respSave) {
					var code_status = (respSave["response"]["created"] == true)?200:300;
					var toastMessage_ = {"service":"Notifición","200":"Docente Creado.","300":"Por favor revise la información ingresada."};
					$("#btnModalLarge").html('Crear <i class="fa fa-plus-circle" aria-hidden="true"></i>');
					toastr_message(code_status,toastMessage_);
					// $("#btnModalLarge").attr("disabled", false);
					if (code_status == 200) {
						// $("#ModalLargeObs").modal('hide');
						var num_register = ($("#table_teachers tbody tr").length)+1;
						var desc_type_user = $(".selectTypeUser option[value='"+type_user+"']").text();
						$("#div_form").addClass('d-none');
						$("#div_credentials").removeClass('d-none');
						$("#user").text(respSave["response"]["user"]);
						$("#password").text(respSave["response"]["password"]);
						$("#table_teachers").append("<tr><td class='celValue text-center' width='1px'>"+num_register+"</td><td class='celValue' width='100px'>"+(last_name.toUpperCase())+" "+(names.toUpperCase())+"</td><td class='celValue text-center' width='30px'>"+desc_type_user+"</td></tr>")
					}
					console.log(respSave);
				}).fail(function (respFail) {
					console.log(respFail);
				});
			}
			else {
				$(".labelInvalid").each(function() {
					$(this).removeClass('labelInvalid');
				});
				$.each(valid["items"], function(key, label) {
					$("#label_"+label).addClass('labelInvalid');
				});
				//console.log("Datos Invalidos");
			}
			e.preventDefault();
		});
	});
	$('#ModalLargeObs').modal({backdrop: 'static', keyboard: false});
	$("#ModalLargeObs").modal('show');
} */