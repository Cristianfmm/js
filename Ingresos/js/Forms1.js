function valitStudent (id,infoUser,formulario,formulario2) {
  refresh ();
  limparcampos();
  $("#titleModalLarge").html('<center><b>CORPORACIÓN SAN ISIDRO PROGRAMA SOCIAL SOGAMOSO - FORMULARIO PARA SOLICITUD DE VIVIENDA</b></center>');
  $("#bodyTagLarge").load("views/adminView/Formulario1.html", function() {
    $("#id_code").html('<b>CÓDIGO:</b> '+id+'<br><b>NOMBRE: </b>'+infoUser["apellidos"]+' '+infoUser["nombre"]);
    var estadoCivil = SelecEstCivil();
    var ProgramSeleccionado = SelecPrograma();
    $.when(estadoCivil).done(function(estado_civil){
      CreateSelectA(estado_civil["response"],'tipoAtencion')
      $("#tipoAtencion").val(infoUser["est_civil"]);
    })
    $.when(ProgramSeleccionado).done(function(Program_Seleccionado){
      CreateSelectA(Program_Seleccionado["response"],'medio')
      $("#medio").val(infoUser["programa"]);
    })
    cargarchecks(formulario["pr_a"],'#PreguntaASi','#PreguntaANo');
    cargarchecks(formulario["pr_b"],'#PreguntaBSi','#PreguntaB');
    cargarchecks(formulario["pr_c"],'#PreguntaCSi','#PreguntaCNo');
    cargarchecks(formulario["pr_d"],'#PreguntaDSi','#PreguntaD');
    cargarchecks(formulario["pr_e"],'#PreguntaESi','#PreguntaENo');
    cargarchecks(formulario["pr_f"],'#PreguntaFSi','#PreguntaFNo');
    cargarchecks(formulario["pr_g"],'#PreguntaGSi','#PreguntaGNo');
    cargarchecks(formulario["pr_h"],'#PreguntaHSi','#PreguntaHNo');
    cargarchecks(formulario["pr_i"],'#PreguntaISi','#PreguntaINo');
    cargarchecks(formulario["pr_j"],'#PreguntaJSi','#PreguntaJNo');
    cargarchecks(formulario["pr_k"],'#PreguntaKSi','#PreguntaKNo');
    cargarchecks(formulario["pr_l"],'#PreguntaLSi','#PreguntaLNo');
    $("#btnModalLarge").text('Siguiente');
    $("#btnModalLarge").removeAttr('disabled');
		$('#ModalLargeObs').modal({backdrop: 'static', keyboard: false});
    $("#ModalLargeObs").modal("show");
    refresh ();
    $("#PreguntaISi").click(function(e){
      $("#sisben_select").empty();
      $("#clasi_sisben").removeClass('d-none');
     
      var selecSisben = SelecSisben();
      $.when(selecSisben).done(function(selec_sisben){
        CreateSelectA(selec_sisben["response"],'sisben_select');
      });
    });

    $("#PreguntaLSi").click(function(e){
      /* $("#sisben_select").empty(); */
      $("#select_containerTwo").removeClass('d-none');
    });

    $("#PreguntaLNo").click(function(e){
      /* $("#sisben_select").empty(); */
      $("#select_containerTwo").addClass('d-none');
    });

    $("#PreguntaINo").click(function(e){
      $("#clasi_sisben").addClass('d-none');
    });
    viewValueinfo(id,infoUser)
    var button ='<div id="div_cargaDoc" class="row"><div class="col-xl-12"><div class="updload-file border" id="update_doc"><div class="form-group d-flex">';
    button+= '<input type="file" class="form-control form-control-file" id="doc_requisito" name="doc_requisito">';
    button+= '<br><button class="btn btn-subir-archivo" type="button" id="btn_docrequisito" onclick="subir_archivo('+id+',1)" style="background-color:#303689; color: white;" >Cargar</button></div></div>';
    button+= '<div class="wrapper_doc" style="display: none;"><div class="progress progress_wrapper">';
    button+= '<div class="progress-bar progress-bar_stripped bg-info progress-bar-animated progress_bar_doc" id="progress" role="progressbar" style="width: 0%;">0%</div></div></div>';
    button+= '<div><div class="updload-file border" id="updload-file_doc"><div class="form-group my-1 m-1"><div class="wrapper_files_get_documento" id="div_file_doc"></div></div></div></div></div>';

    var buttonTwo ='<div id="div_cargaPropiedad" class="row"><div class="col-xl-12"><div class="updload-file border" id="update_propiedad"><div class="form-group d-flex">';
    buttonTwo+= '<input type="file" class="form-control form-control-file" id="doc_propiedad" name="doc_propiedad">';
    buttonTwo+= '<br><button class="btn btn-subir-archivo" type="button" id="btnPropiedadRequisito" onclick="subir_archivo('+id+',2)" style="background-color:#303689; color: white;" >Cargar</button></div></div>';
    buttonTwo+= '<div class="wrapper_propiedad" style="display: none;"><div class="progress progress_wrapper">';
    buttonTwo+= '<div class="progress-bar progress-bar_stripped bg-info progress-bar-animated progress_bar_propiedad" id="progressTwo" role="progressbar" style="width: 0%;">0%</div></div></div>';
    buttonTwo+= '<div><div class="updload-file border" id="updload-cargaPropiedad"><div class="form-group my-1 m-1"><div class="wrapper_files_get_propiedad" id="div_file_doc"></div></div></div></div></div>';
    
    viewFormatoB(id);

    viewDocumentacion(id,formulario2);
    $('#select_container').append(button);
    if(infoUser["archivo"] != "" && infoUser["archivo"] != null && infoUser["archivo"] != undefined){
      var link_rut= infoUser["archivo"].replace(/\/home\/cvuser\/public_html/gm,"");

      $("#select_container").empty();
      $("#select_container").addClass("card-body d-flex justify-content-between align-items-cente");
      $("#select_container").append('<div class ="d-flex bd-highlight" id="divdoc'+id+'"> <label for="file" class="d-block">Ver o Eliminar Archivo</label> <i class="fas fa-eye"><a  type="button" type="button" class=" flex-grow-1 bd-highlight  btn-light btn-sm " " target="_blank"  href="'+link_rut+'" >'+infoUser["apellidos"]+'</a></i><a type="button" class="bd-highlight btn-danger btn-sm" id="btn_elim_doc" onclick="btn_elim('+id+')">Eliminar</a></div>')
    }else{
      $("#select_container").empty();
      $('#select_container').append(button);
      $("#select_container").addClass("card-body d-flex justify-content-between align-items-cente");
    } 
    
      $('#select_containerTwo').append(buttonTwo);
      if(infoUser["archivo_prop"] != "" && infoUser["archivo_prop"] != null && infoUser["archivo_prop"] != undefined){
        var link_rut= infoUser["archivo"].replace(/\/home\/cvuser\/public_html/gm,"");
  
        $("#select_containerTwo").empty();
        $("#select_containerTwo").addClass("card-body d-flex justify-content-between align-items-cente");
        $("#select_containerTwo").append('<div class ="d-flex bd-highlight" id="divPropiedad'+id+'"> <label for="file" class="d-block">Ver o Eliminar Archivo</label> <i class="fas fa-eye"><a  type="button" type="button" class=" flex-grow-1 bd-highlight  btn-light btn-sm " " target="_blank"  href="'+link_rut+'" >'+infoUser["apellidos"]+'</a></i><a type="button" class="bd-highlight btn-danger btn-sm" id="btn_elim_Propiedad" onclick="btn_elim_prop('+id+')">Eliminar</a></div>')
        if($('input[name=PreguntaL]:checked').val() == undefined || $('input[name=PreguntaL]:checked').val() == 'NO'){
          $("#select_containerTwo").addClass('d-none');
        }
      }else{
        $("#select_containerTwo").empty();
        $('#select_containerTwo').append(button);
        $("#select_containerTwo").addClass("card-body d-flex justify-content-between align-items-cente");
        if($('input[name=PreguntaL]:checked').val() == undefined || $('input[name=PreguntaL]:checked').val() == 'NO'){
          $("#select_containerTwo").addClass('d-none');
        }
      } 
    var estadoActual = 1;


    $("#btnModalLarge").click(function(event) {
        if (estadoActual === 1) {
            // Acciones para el estado 1
            $("#FormularioA").addClass('d-none');
            $("#FormularioB").removeClass('d-none');
            $("#FormularioC").addClass('d-none');
            $("#linkA").removeClass('active link-primary');
            $("#linkB").addClass('active link-primary');
            $("#linkC").removeClass('active link-primary');
            estadoActual = 2;
        } else if (estadoActual === 2) {
            $("#FormularioA").addClass('d-none');
            $("#FormularioB").addClass('d-none');
            $("#FormularioC").removeClass('d-none');
            $("#linkA").removeClass('active link-primary');
            $("#linkB").removeClass('active link-primary');
            $("#linkC").addClass('active link-primary');
            $("#btnModalLarge").text('Guardar');
            $("#btnModalLarge").click(function(event){
              guardarFormulario(id);
              event.preventDefault
            })
            estadoActual = 3;
        } else if (estadoActual === 3) {

        }
    });
    
    
  })
}

function ActiveMenu (Type) {
  if(Type == 'A'){
    $("#FormularioA").removeClass('d-none')
    $("#FormularioB").addClass('d-none')
    $("#FormularioC").addClass('d-none')
    $("#FormularioD").addClass('d-none')
    $("#linkA").addClass('active link-primary')
    $("#linkB").removeClass('active link-primary')
    $("#linkC").removeClass('active link-primary')

  }else if (Type == 'B'){
    $("#FormularioB").removeClass('d-none')
    $("#FormularioA").addClass('d-none')
    $("#FormularioC").addClass('d-none')
    $("#FormularioD").addClass('d-none')
    $("#linkA").removeClass('active link-primary')
    $("#linkB").addClass('active link-primary')
    $("#linkC").removeClass('active link-primary')

  } else if(Type == 'C'){
    $("#FormularioC").removeClass('d-none')
    $("#FormularioA").addClass('d-none')
    $("#FormularioB").addClass('d-none')
    $("#FormularioD").addClass('d-none')
    $("#linkA").removeClass('active link-primary')
    $("#linkB").removeClass('active link-primary')
    $("#linkC").addClass('active link-primary')
    $("#btnModalLarge").text('Guardar');
  
  }
}

function guardarFormulario(id) {
  //Creación de variables para el documento 1
  var pregA = ($('input[name=PreguntaA]:checked').val() == undefined)?"":$('input[name=PreguntaA]:checked').val();
  var pregB = ($('input[name=PreguntaB]:checked').val() == undefined)?"":$('input[name=PreguntaB]:checked').val();
  var pregC = ($('input[name=PreguntaC]:checked').val() == undefined)?"":$('input[name=PreguntaC]:checked').val();
  var pregD = ($('input[name=PreguntaD]:checked').val() == undefined)?"":$('input[name=PreguntaD]:checked').val();
  var pregE = ($('input[name=PreguntaE]:checked').val() == undefined)?"":$('input[name=PreguntaE]:checked').val();
  var pregF = ($('input[name=PreguntaF]:checked').val() == undefined)?"":$('input[name=PreguntaF]:checked').val();
  var pregG = ($('input[name=PreguntaG]:checked').val() == undefined)?"":$('input[name=PreguntaG]:checked').val();
  var pregH = ($('input[name=PreguntaH]:checked').val() == undefined)?"":$('input[name=PreguntaH]:checked').val();
  var pregI = ($('input[name=PreguntaI]:checked').val() == undefined)?"":$('input[name=PreguntaI]:checked').val();
  var pregJ = ($('input[name=PreguntaJ]:checked').val() == undefined)?"":$('input[name=PreguntaJ]:checked').val();
  var pregK = ($('input[name=PreguntaK]:checked').val() == undefined)?"":$('input[name=PreguntaK]:checked').val();
  var pregL = ($('input[name=PreguntaL]:checked').val() == undefined)?"":$('input[name=PreguntaL]:checked').val();
  var typeSelec = (pregI == "SI")?true:false;
  var selectSisben = $("#sisben_select").val();
  //Creación de variables para el documento 3
  var estadoCivil = $("#tipoAtencion").val();
  var tiempoconvi = $("#tiempo_convi").val();
  var dir_vivienda = $("#dir_vivienda").val();
  var sector = $("#sector").val();
  var barrio = $("#barrio").val();
  var tel1 = $("#telefono_1").val(); 
  var tel2 = $("#telefono_2").val();
  var programa = $("#medio").val();
  var direccion = $("#direccion").val();

  var form2_name = $("#form2_name").val();
  var form2_identidad = $("#form2_identidad").val();
  var form2_edad = $("#form2_edad").val();
  var form2_parent = $("#form2_parent").val();
  var form2_estudio = $("#form2_estudio").val();
  var form2_fecha = $("#form2_fecha").val();
  var form2_lugarNac = $("#form2_lugarNac").val();

  // validateParents ();
  var toastMessage_ = {"service":"Notifición","200":"documento guardado", "400":"Por favor digite todos los campos","500":"Error al guardar"};
  
  //Creación de variable para validación de información
  var valid = validFormDocument([{'data':pregA,'item':'PreguntaA','type':'radio', 'type_document':'1',  'obligatory':true},
                {'data':pregB,'item':'PreguntaB','type':'radio', 'type_document':'1', 'obligatory':true},
                {'data':pregC,'item':'PreguntaC','type':'radio', 'type_document':'1', 'obligatory':true},
                {'data':pregD,'item':'PreguntaD','type':'radio', 'type_document':'1', 'obligatory':true},
                {'data':pregE,'item':'PreguntaE','type':'radio', 'type_document':'1', 'obligatory':true},
                {'data':pregF,'item':'PreguntaF','type':'radio', 'type_document':'1', 'obligatory':true},
                {'data':pregG,'item':'PreguntaG','type':'radio', 'type_document':'1', 'obligatory':true},
                {'data':pregH,'item':'PreguntaH','type':'radio', 'type_document':'1', 'obligatory':true},
                {'data':pregI,'item':'PreguntaI','type':'radio', 'type_document':'1', 'obligatory':true},
                {'data':pregJ,'item':'PreguntaJ','type':'radio', 'type_document':'1', 'obligatory':true},
                {'data':pregK,'item':'PreguntaJ','type':'radio', 'type_document':'1', 'obligatory':true},
                {'data':pregL,'item':'PreguntaL','type':'radio', 'type_document':'1', 'obligatory':true},
                {'data':selectSisben,'item':'selectSisben','type':'radio', 'type_document':'1', 'obligatory':typeSelec},
                {'data':estadoCivil,'item':'estadoCivil','type':'text', 'type_document':'3',  'obligatory':true},
                {'data':tiempoconvi,'item':'tiempo_convi','type':'text',  'type_document':'3','obligatory':true},
                {'data':dir_vivienda,'item':'dir_vivienda','type':'text',  'type_document':'3','obligatory':true},
                {'data':sector,'item':'sector','type':'text', 'type_document':'3', 'obligatory':true},
                {'data':barrio,'item':'barrio','type':'text', 'type_document':'3', 'obligatory':true},
                {'data':tel1,'item':'telefono_1','type':'text', 'type_document':'3', 'obligatory':true},
                {'data':tel2,'item':'telefono_2','type':'text', 'type_document':'3', 'obligatory':true},
                {'data':programa,'item':'medio','type':'text', 'type_document':'3', 'obligatory':true},
                {'data':direccion,'item':'direccion','type':'text', 'type_document':'3', 'obligatory':true},

                {'data':form2_name,'item':'form2_name','type':'text', 'type_document':'2', 'obligatory':true},
                {'data':form2_identidad,'item':'form2_identidad','type':'text', 'type_document':'2', 'obligatory':true},
                {'data':form2_edad,'item':'form2_edad','type':'text', 'type_document':'2', 'obligatory':true},
                {'data':form2_parent,'item':'form2_parent','type':'text', 'type_document':'2', 'obligatory':true},
                {'data':form2_estudio,'item':'form2_estudio','type':'text', 'type_document':'2', 'obligatory':true},
                {'data':form2_fecha,'item':'form2_fecha','type':'date', 'type_document':'2', 'obligatory':true},
                {'data':form2_lugarNac,'item':'form2_lugarNac','type':'text', 'type_document':'2', 'obligatory':true}
              ])
  console.log(valid["validate"]); 
  
  //Ingresa si la información es correcta
  if(valid["validate"]){
    
    $(".labelInvalid").each(function() {
		  $(this).removeClass('labelInvalid');
      $(this).removeClass('animated infinite pulse');
		});

    $("#btnModalLarge").html("Guardandos   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
    $("#btnModalLarge").removeAttr('disabled');
    var inser_ForA = "" , update_Form1A = "", update_Sisben = "";
    inser_ForA = InsertForm1A(id,pregA,pregB,pregC,pregD,pregE,pregF,pregG,pregH,pregI,pregJ,pregK,pregL);
    update_Form1A = updateForm1A(id,estadoCivil,tiempoconvi,dir_vivienda,sector,barrio,tel1,tel2,programa,direccion);
    insert_Form1B = InsertForm1B(id,form2_name,form2_identidad,form2_edad,form2_parent,form2_estudio,form2_lugarNac,form2_fecha);
    if(typeSelec == true){
      var sisben = parseInt(selectSisben)
      update_Sisben = updateSisben(id,sisben);
    }
    $.when(inser_ForA,update_Form1A,update_Sisben).done(function(Insert_Forrmato1A,Update_Form,Update_Sis){
      console.log(Update_Sis);
      toastr_message(200,toastMessage_);
    $("#btnModalLarge").html('Guardado !');
    }).fail(function(Update_Sis){
      console.log(Update_Sis);
      toastr_message(500,toastMessage_);
      $("#btnModalLarge").html('Siguiente');
		  $("#btnModalLarge").removeAttr('disabled');
    });
  //Ingresa si falta por digitar información
  }else{
    toastr_message(400,toastMessage_);
    $(".labelInvalid").each(function() {
		  $(this).removeClass('labelInvalid');
      $(this).removeClass('animated infinite pulse');
      $(this).children("span:first").remove();
      $(this).removeClass('is-invalid');
		});
    $.each(valid["type_document"], function(key, label) {
      var label2 ="";
      label2 = valid["items"][key];
      if(label == "1"){
        $("#FormularioA").removeClass('d-none')
        $("#FormularioB").addClass('d-none')
        $("#FormularioC").addClass('d-none')
        $("#FormularioD").addClass('d-none')
        $(".label_"+label2).addClass('labelInvalid');
        $(".label_"+label2).addClass("animated infinite pulse");
        $(".label_"+label2).focus();
      } else{
        $("#FormularioC").removeClass('d-none')
        $("#FormularioA").addClass('d-none')
        $("#FormularioB").addClass('d-none')
        $("#FormularioD").addClass('d-none')
        $(".label_"+label2).addClass('labelInvalid');
        $(".label_"+label2).addClass("animated infinite pulse");
        $(".label_"+label2).focus();
        $("#"+label2).addClass('labelInvalid');
        $("#"+label2).addClass("is-invalid");
        $("#"+label2).focus();
        
      }
    });
  }
}

function subir_archivo (user,tipo_user){
  if(tipo_user == 1){
    $("#btn_docrequisito").html("Guardando <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
    var archivo = document.getElementById("doc_requisito");
    var file = archivo.files;
    var fileDoc = archivo.files[0];
	  var wrapper =  $(".wrapper_doc")
    var wrapper_f =  $(".wrapper_files_get_documento")
    var progress_bar =  $(".progress_bar_doc")
  } else {
    $("#btnPropiedadRequisito").html("Guardando <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
    var archivo = document.getElementById("doc_propiedad");
    var file = archivo.files;
    var fileDoc = archivo.files[0];
	  var wrapper =  $(".wrapper_propiedad")
    var wrapper_f =  $(".wrapper_files_get_propiedad")
    var progress_bar =  $(".progress_bar_propiedad")
  }
	
	
	
	var toastMessage_ = {"service":"Notifición","200":"documento guardado", "400":"Por favor seleccione el archivo","500":"Archivo ya cargado"};
	if(file.length <1){
        toastr_message(400,toastMessage_);
        return
    }
	var info = new FormData();
  if(tipo_user == 1){
    info.append('base','corpsanisidrio');
    info.append('param','updatefiles');
    info.append('user',user); 
    info.append('tipo_user',tipo_user); 
    info.append('file',fileDoc);
  }else{
    info.append('base','corpsanisidrio');
    info.append('param','updatepropiedad');
    info.append('user',user); 
    info.append('tipo_user',tipo_user); 
    info.append('file',fileDoc);
  }


	progress_bar.removeClass('bg-success bg-danger').addClass('bg-info');
    progress_bar.css('width','0%');
    progress_bar.html('Preparando..');
    wrapper.fadeIn();

	let ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress",function(e){
        let percentComplete = Math.floor((e.loaded/e.total)*100);
     
        progress_bar.css('width', percentComplete-1+'%');
        progress_bar.html(percentComplete-1+'% ');

    });

	ajax.responseType = 'json';
    ajax.addEventListener("load",function(e){
      console.log("Respuesta del servidor:", e);
        let responseObj = ajax.response;
        if(responseObj.code==200){
            progress_bar.removeClass('bg-info').addClass('bg-success');
            progress_bar.html('!Cargado');
            var link_rut =responseObj.response[0].archivo.replace(/\/home\/cvuser\/public_html/gm,"");
            var name =  responseObj.response[0].nombre_archivo;
            var codi =  responseObj.response[0].id;
            if(tipo_user == 1){
              wrapper_f.append('<div class ="d-flex bd-highlight" id="divdoc'+codi+'"> <label for="file" class="d-block">Ver o Eliminar Archivo</label> <a class=" flex-grow-1 bd-highlight  btn-light btn-sm "  " target="_blank"  href="'+link_rut+'" >'+name+'</a> <a type="button" class="bd-highlight btn-danger btn-sm" id="btn_elim_doc" onclick="btn_elim('+codi+')">Eliminar</a></div>');
            }else{
              wrapper_f.append('<div class ="d-flex bd-highlight" id="divdoc'+codi+'"> <label for="file" class="d-block">Ver o Eliminar Archivo</label> <a class=" flex-grow-1 bd-highlight  btn-light btn-sm "  " target="_blank"  href="'+link_rut+'" >'+name+'</a> <a type="button" class="bd-highlight btn-danger btn-sm" id="btn_elim_Propiedad" onclick="btn_elim('+codi+')">Eliminar</a></div>');
            }
             
             setTimeout(()=>{
                 wrapper.fadeOut();
                 progress_bar.removeClass('bg-success bg-danger').addClass('bg-info');
                 progress_bar.css('width','0%');
                 if(tipo_user == 1){
                  if(responseObj.response.length !=0){
                    $("#btn_docrequisito").html('Guardado');
                    $("#btn_docrequisito").addClass('outline');
                    $("#btn_docrequisito").prop('disabled', true);
					          toastr_message(200,toastMessage_);
                 }else{
					          $("#btn_docrequisito").prop('disabled', true);
                 }
                 }else{
                  if(responseObj.response.length !=0){
                    $("#btnPropiedadRequisito").html('Guardado');
                    $("#btnPropiedadRequisito").addClass('outline');
                    $("#btnPropiedadRequisito").prop('disabled', true);
					          toastr_message(200,toastMessage_);
                  }else{
                      $("#btnPropiedadRequisito").prop('disabled', true);
                  }
                 }
                 
             }, 500);
        }
        console.log( responseObj.code)
       
    })
 
    ajax.open("POST","controller/cont.php")
    ajax.send(info)
    console.log([...info.entries()]);
}

function viewFormatoB(id){
  var i = 0
  var col ="<td><input type='text' id='form2_name' name='usuario' placeholder='Nombre y Apellidos' class='form-control' value='' ></td>";
  col += "<td><input type='text' id='form2_identidad' name='usuario' placeholder='Identidad' class='form-control'></td>";
  col += "<td><input type='text' id='form2_edad' name='usuario' placeholder='Edad' class='form-control'></td>";
  col += "<td><input type='text' id='form2_parent' name='usuario' placeholder='Parentesco' class='form-control'></td>";
  col += "<td><input type='text' id='form2_estudio' name='usuario' placeholder='Estudios' class='form-control'></td>";
  col += "<td><input type='text' id='form2_lugarNac' name='usuario' placeholder='Lugar de Nacimiento' class='form-control'></td>";
  col += "<td><input type='date' id='form2_fecha' name='usuario' placeholder='fecha' class='form-control'></td>";
  col += "<td><button type='button' id='crearfila' class='btn btn-link revisionregis' onclick='btnCrearFila()'><i class='fa-solid fa-circle-plus  fa-2x' ></i></button></td>";
  col += "<td><button style='color: rgb(235 50 50);' type='button'  id='eliminarfila' class='btn btn-link revisionregis' onclick='btnEliminarFila()'><i class='fa-solid fa-circle-minus  fa-2x' ></i></button></td>";
  $("#create_rowParent").append(col)
}

function viewDocumentacion(id, formulario2) {
  var col = "";
 for (var i = 0 ; i < formulario2.length; i++){
  console.log(formulario2[i]["nombres"]);
    col += "<tr style='vertical-align: middle;' id='row_"+i+"'>";
    col += "<td><input type='text' id='form2_name_"+i+"' name='usuario' placeholder='Nombre y Apellidos' class='form-control' value='" + formulario2[i]["nombres"] + "' ></td>";
    col += "<td><input type='text' id='form2_identidad_"+i+"' name='usuario' placeholder='Identidad' class='form-control'  value='" + formulario2[i]["n_document"] + "' ></td>";
    col += "<td><input type='text' id='form2_edad_"+i+"' name='usuario' placeholder='Edad' class='form-control' value='" + formulario2[i]["edad"] + "' ></td>";
    col += "<td><input type='text' id='form2_parent_"+i+"' name='usuario' placeholder='Parentesco' class='form-control' value='" + formulario2[i]["parentesco"] + "' ></td>";
    col += "<td><input type='text' id='form2_estudio_"+i+"' name='usuario' placeholder='Estudios' class='form-control' value='" + formulario2[i]["estudios"] + "' ></td>";
    col += "<td><input type='text' id='form2_lugarNac_"+i+"' name='usuario' placeholder='Lugar de Nacimiento' class='form-control' value='" + formulario2[i]["lugar_nacimiento"] + "' ></td>";
    col += "<td><input type='text' id='form2_fechaNac_"+i+"' name='usuario' placeholder='Fecha de Nacimiento' class='form-control' value='" + formulario2[i]["fecha_naci"] + "' ></td>";
    col += "<td><button type='button' id='crearfila_"+i+"' class='btn btn-link disabled ' onclick='btnCrearFila()'><i class='fa-solid fa-circle-plus  fa-2x disabled'  ></i></button></td>";
    col += "<td><button style='color: rgb(235 50 50);' type='button'  id='eliminarfila_"+i+"' class='btn btn-link revisionregis' onclick='btnEliminarFila(" + id + ")'><i class='fa-solid fa-circle-minus  fa-2x' ></i></button></td>";
    col += "</tr>";
    
 };
 $("#create_rowParent").append(col);
  console.log(formulario2);
}



function btnCrearFila(){
  var numTr = $('#FormularioB tr').length + 1;
  var col ="<tr style='vertical-align: middle;' id='row_"+numTr+"' ><td><input type='text' id='form2_name"+numTr+"' name='usuario' placeholder='Nombre y Apellidos' class='form-control'></td>";
  col += "<td><input type='text' id='form2_identidad"+numTr+"' name='usuario' placeholder='Identidad' class='form-control'></td>";
  col += "<td><input type='text' id='form2_edad"+numTr+"' name='usuario' placeholder='Edad' class='form-control'></td>";
  col += "<td><input type='text' id='form2_parent"+numTr+"' name='usuario' placeholder='Parentesco' class='form-control'></td>";
  col += "<td><input type='text' id='form2_estudio"+numTr+"' name='usuario' placeholder='Estudios' class='form-control'></td>";
  col += "<td><input type='text' id='form2_lugarNac"+numTr+"' name='usuario' placeholder='Lugar de Nacimiento' class='form-control'></td>";
  col += "<td><input type='date' id='form2_fecha"+numTr+"' name='usuario' class='form-control'></td>";
  col += "<td><button type='button' id='crearfila"+numTr+"' class='btn btn-link revisionregis' onclick='btnCrearFila()'><i class='fa-solid fa-circle-plus  fa-2x' ></i></button></td>";
  col += "<td><button style='color: rgb(235 50 50);' type='button'  id='eliminarfila' class='btn btn-link revisionregis' onclick='btnEliminarFila(row_"+numTr+")'><i class='fa-solid fa-circle-minus  fa-2x' ></i></button></td></tr>";
  $("#table_createParent").append(col)
}

function btnEliminarFila(row){
  $(row).remove();
}

// function btnEliminarFilaData(row){
//   $(row).remove();
// }


function btn_elim (id){
  $("#btn_elim_doc").html("Eliminando<i class='fa fa-spinner fa-spin fa-2x'></i>");
  $("#btn_elim_doc").prop('disabled', true)
  delete_docu(id).done(function(response){
    console.log(response);
    $("#doc_requisito").prop('disabled', false);
  }).fail(function(response){
          console.log(response);
    $("#doc_requisito").prop('disabled', false);
    $("#divdoc"+id).children().remove();
    $("#btn_docrequisito").html('Cargar');
    $("#btn_docrequisito").prop('disabled', false);

    var button ='<div id="div_cargaDoc" class="row"><div class="col-xl-12"><div class="updload-file border" id="update_doc"><div class="form-group d-flex">';
    button+= '<input type="file" class="form-control form-control-file" id="doc_requisito" name="doc_requisito">';
    button+= '<button class="btn btn-subir-archivo" type="button" id="btn_docrequisito" onclick="subir_archivo('+id+',1)" style="background-color:#303689; color: white;" >Cargar</button></div></div>';
    button+= '<div class="wrapper_doc" style="display: none;"><div class="progress progress_wrapper">';
    button+= '<div class="progress-bar progress-bar_stripped bg-info progress-bar-animated progress_bar_doc" id="progress" role="progressbar" style="width: 0%;">0%</div></div></div>';
    button+= '<div><div class="updload-file border" id="updload-file_doc"><div class="form-group my-1 m-1"><div class="wrapper_files_get_documento" id="div_file_doc"></div></div></div></div></div>';
    $("#select_container").empty();
    $('#select_container').append(button);
    $("#select_container").addClass("card-body d-flex justify-content-between align-items-cente");
  });
  document.getElementById("doc_requisito").value=''  
}

function btn_elim_prop (id){
  $("#btn_elim_Propiedad").html("Eliminando<i class='fa fa-spinner fa-spin fa-2x'></i>");
  $("#btn_elim_Propiedad").prop('disabled', true)
  delete_prop(id).done(function(response){
    console.log(response);
    $("#doc_propiedad").prop('disabled', false);
  }).fail(function(response){
          console.log(response);
    $("#doc_propiedad").prop('disabled', false);
    $("#divPropiedad"+id).children().remove();
    $("#btnPropiedadRequisito").html('Cargar');
    $("#btnPropiedadRequisito").prop('disabled', false);

    var buttonTwo ='<div id="div_cargaPropiedad" class="row"><div class="col-xl-12"><div class="updload-file border" id="update_propiedad"><div class="form-group d-flex">';
    buttonTwo+= '<input type="file" class="form-control form-control-file" id="doc_propiedad" name="doc_propiedad">';
    buttonTwo+= '<br><button class="btn btn-subir-archivo" type="button" id="btnPropiedadRequisito" onclick="subir_archivo('+id+',2)" style="background-color:#303689; color: white;" >Cargar</button></div></div>';
    buttonTwo+= '<div class="wrapper_propiedad" style="display: none;"><div class="progress progress_wrapper">';
    buttonTwo+= '<div class="progress-bar progress-bar_stripped bg-info progress-bar-animated progress_bar_propiedad" id="progressTwo" role="progressbar" style="width: 0%;">0%</div></div></div>';
    buttonTwo+= '<div><div class="updload-file border" id="updload-cargaPropiedad"><div class="form-group my-1 m-1"><div class="wrapper_files_get_propiedad" id="div_file_doc"></div></div></div></div></div>';
    $("#select_containerTwo").empty();
    $('#select_containerTwo').append(buttonTwo);
    $("#select_containerTwo").addClass("card-body d-flex justify-content-between align-items-cente");
  });
  document.getElementById("doc_propiedad").value=''  
}



function SelecMedio(){
  console.log("Si entra a la funcion del boton")
  var option = $("#medio").val();
  if(option == 1){
    $("#tipoSelecMedio").html('Nombre del colegio: ')
    $("#direccion").prop("placeholder","Nombre del colegio");
    $("#informacionMedio").addClass('d-none');
    $("#Nombres_medio").addClass('d-none');
    $("#divC").addClass('d-none')
  }else if(option == 2){
    $("#tipoSelecMedio").html('Lugar en que lo recibió: ')
    $("#direccion").prop("placeholder","Lugar en que lo recibió");
    $("#informacionMedio").addClass('d-none');
    $("#Nombres_medio").addClass('d-none');
    $("#divC").addClass('d-none')
  }else if(option == 3){
    $("#tipoSelecMedio").html('Nombre:')
    $("#direccion").prop("placeholder","Nombre");
    $("#Nombres_medio").removeClass('d-none');
    $("#Nombres_medio").html('Dirección:');
    $("#informacionMedio").removeClass('d-none');
    $("#divC").addClass('d-none')
  }else if(option == 4){
    $("#tipoSelecMedio").html('Nombre:')
    $("#direccion").prop("placeholder","Nombre");
    $("#Nombres_medio").removeClass('d-none');
    $("#Nombres_medio").html('Párroco:')
    $("#divC").removeClass('d-none')  
    $("#informacionMedio").removeClass('d-none');
  }else if(option == 5){
    $("#tipoSelecMedio").html('Nombre:')
    $("#direccion").prop("placeholder","Nombre");
    $("#Nombres_medio").removeClass('d-none');
    $("#Nombres_medio").html('Parroco:')
    $("#informacionMedio").removeClass('d-none');
    $("#Nombres_medio").addClass('d-none');
    $("#informacionMedio").addClass('d-none');
    $("#divC").addClass('d-none')
  }else if(option == 6){
    $("#tipoSelecMedio").html('Cuál:')
    $("#direccion").prop("placeholder","Cuál?");
    $("#informacionMedio").addClass('d-none');
    $("#Nombres_medio").addClass('d-none');
    $("#divC").addClass('d-none')
  }
}


function viewValueinfo(id,infoUser){
  
  $("#tipoAtencion").val(infoUser["est_civil"]);
 
  $("#tiempo_convi").val(infoUser["tiempo_convivencia"])
  $("#dir_vivienda").val(infoUser["direccion"])
  $("#sector").val(infoUser["sector"])
  $("#barrio").val(infoUser["barrio"])
  $("#telefono_1").val(infoUser["tel1"])
  $("#telefono_2").val(infoUser["tel2"])
  $("#direccion").val(infoUser["programa_motivo"])

}


function limparcampos(){
  $('#PreguntaASi').prop('checked', false);
  $('#PreguntaBSi').prop('checked', false);
  $('#PreguntaCSi').prop('checked', false);
  $('#PreguntaDSi').prop('checked', false);
  $('#PreguntaESi').prop('checked', false);
  $('#PreguntaFSi').prop('checked', false);
  $('#PreguntaGSi').prop('checked', false);
  $('#PreguntaHSi').prop('checked', false);
  $('#PreguntaISi').prop('checked', false);
  $('#PreguntaJSi').prop('checked', false);
  $('#PreguntaKSi').prop('checked', false);
  $('#PreguntaLSi').prop('checked', false);

  $('#PreguntaANo').prop('checked', false);
  $('#PreguntaB').prop('checked', false);
  $('#PreguntaCNo').prop('checked', false);
  $('#PreguntaD').prop('checked', false);
  $('#PreguntaENo').prop('checked', false);
  $('#PreguntaFNo').prop('checked', false);
  $('#PreguntaGNo').prop('checked', false);
  $('#PreguntaHNo').prop('checked', false);
  $('#PreguntaINo').prop('checked', false);
  $('#PreguntaJNo').prop('checked', false);
  $('#PreguntaKNo').prop('checked', false);
  $('#PreguntaLNo').prop('checked', false);
}

