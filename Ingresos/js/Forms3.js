function valitStudent3 (id,infoUser,infoVivienda,infoServ,ifoEquipo,infoViviendaAnt,infoServisAnt) {
  refresh ();
  limparcampos()
  var tipoVivienda = SelecTipoVivienda();
  console.log(infoUser);
  console.log(infoVivienda);
  $("#select_container").empty();
  $("#titleModalLarge").empty();
  $("#titleModalLarge").html('<center><b>CORPORACIÓN SAN ISIDRO PROGRAMA SOCIAL SOGAMOSO - VIVIENDA QUE OCUPA ACTUALMENTE</b></center>');
  $("#bodyTagLarge").load("views/adminView/Formulario3.html", function() {
  $("#nombre_3").html('<b>CÓDIGO:</b> '+id+'&nbsp;&nbsp;<b>NOMBRE: </b>'+infoUser["apellidos"]+' '+infoUser["nombre"]);
  $("#btnModalLarge").removeAttr('disabled');
  $("#btnModalLarge").text('Siguiente');
  $('#ModalLargeObs').modal({backdrop: 'static', keyboard: false});
  $("#ModalLargeObs").modal("show");
  vistaForm(infoVivienda)
  vistaForm(infoServ);
  vistaForm(infoViviendaAnt);
  cargarchecks(infoVivienda["pertenece_familia"],'#PreguntaASi','#PreguntaANo');
  cargarchecks(infoVivienda["baño_compartido"],'#PreguntaBSi','#PreguntaBNo');
  cargarchecks(infoVivienda["cocina_compartida"],'#PreguntaCSi','#PreguntaCNo');
  cargarchecks(infoVivienda["patio_compartido"],'#PreguntaDSi','#PreguntaDNo');
  cargarchecks(infoServ["Agua"],'#AguaSi','#AguaNo');
  cargarchecks(infoServ["Luz"],'#LuzSi','#LuzNo');
  cargarchecks(infoServ["Gas"],'#GasSi','#GasNo');
  cargarchecks(infoServ["Telefono"],'#TelefonoSi','#TelefonoNo');
  cargarchecks(infoServ["Admini"],'#AdminiSi','#AdminiNo');
  cargarchecks(infoViviendaAnt["baño_compartido"],'#bañoSi','#bañoNo');
  cargarchecks(infoViviendaAnt["cocina_compartida"],'#cocinaSi','#cocinaNo');
  cargarchecks(infoViviendaAnt["patio_compartido"],'#patioSi','#patioNo');
  viewBloq(infoServisAnt);
  viewBloq(infoServ);
  viewAction(infoServ,infoServisAnt)
  cargarchecks(infoServisAnt["Agua"],'#aguaSi','#aguaNo');
  cargarchecks(infoServisAnt["Luz"],'#luzSi','#luzNo');
  cargarchecks(infoServisAnt["GasN"],'#gasSi','#gasNo');
  cargarchecks(infoServisAnt["Tel"],'#telSi','#telNo');
  cargarchecks(infoServisAnt["Administra"],'#administraSi','#administraNo');
  if( infoVivienda["tiempo_permanencia"] > 9 && (infoVivienda["tipo_permanencia"] == "MES")){

  }
  (ifoEquipo["tv"] == "1")?($("#Television_si").prop('checked',true)):$("#Television_si").prop('checked',false);
  (ifoEquipo["equi_sonido"] == "1")?($("#sonido_si").prop('checked',true)):$("#sonido_si").prop('checked',false);
  (ifoEquipo["grabadora"] == "1")?($("#Grabadora_si").prop('checked',true)):$("#Grabadora_si").prop('checked',false);
  (ifoEquipo["computador"] == "1")?($("#Computador_si").prop('checked',true)):$("#Computador_si").prop('checked',false);
  (ifoEquipo["lavadora"] == "1")?($("#Lavadora_si").prop('checked',true)):$("#Lavadora_si").prop('checked',false);
  (ifoEquipo["nevera"] == "1")?($("#Nevera_si").prop('checked',true)):$("#Nevera_si").prop('checked',false);
  $("#otros_campo").val(ifoEquipo["otros"]);
  $("#muebles_sal").val(ifoEquipo["muebles_sala"]);
  $("#muebles_com").val(ifoEquipo["muebles_comedor"]);
  $("#muebles_alco").val(ifoEquipo["muebles_alcobas"]);
  $("#otros_lugares").val(ifoEquipo["otros_lugares"]);
  $("#situacion_especial").val(ifoEquipo["situacion_especial"]);
  $("#tipo_permanencia").val(infoVivienda["tipo_permanencia"]);
  $.when(tipoVivienda).done(function(tipoVivienda){

    CreateSelectA(tipoVivienda["response"],'medio');
    $("#medio").val(infoVivienda["id_tipoVivienda"]);
    CreateSelectA(tipoVivienda["response"],'tipo_vivienda');
    $("#tipo_vivienda").val(infoViviendaAnt["tipo_vivienda"]);
  })

  $(".btnSelector3").change(function() {
    var option = $(this).find(':selected').data('val');

    if (option == "Casa") {
    $("#div_casa").removeClass('d-none');
    $("#div_apartamento").addClass('d-none');
    $("#div_inquilinato").addClass('d-none');
    $("#div_lote").addClass('d-none');
    $("#div_Otro").addClass('d-none');
    } else if (option == "Apartamento") {
    $("#div_casa").addClass('d-none');
    $("#div_apartamento").removeClass('d-none');
    $("#div_inquilinato").addClass('d-none');
    $("#div_lote").addClass('d-none');
    $("#div_Otro").addClass('d-none');
    }else if (option == "Inquilinato") {
    $("#div_casa").addClass('d-none');
    $("#div_apartamento").addClass('d-none');
    $("#div_inquilinato").removeClass('d-none');
    $("#div_lote").addClass('d-none');
    $("#div_Otro").addClass('d-none');
    }else if (option == "lote") {
    $("#div_casa").addClass('d-none');
    $("#div_apartamento").addClass('d-none');
    $("#div_inquilinato").addClass('d-none');
    $("#div_lote").removeClass('d-none');
    $("#div_Otro").addClass('d-none');
    }else if (option == "Otro") {
    $("#div_casa").addClass('d-none');
    $("#div_apartamento").addClass('d-none');
    $("#div_inquilinato").addClass('d-none');
    $("#div_lote").addClass('d-none');
    $("#div_Otro").removeClass('d-none');
    }
  });
  $(".btnSelector31").change(function() {
    var option = $(this).find(':selected').data('val');

    if (option == "Casa") {
    $("#div_casa1").removeClass('d-none');
    $("#div_apartamento1").addClass('d-none');
    $("#div_inquilinato1").addClass('d-none');
    $("#div_lote1").addClass('d-none');
    $("#div_Otro1").addClass('d-none');
    } else if (option == "Apartamento") {
    $("#div_casa1").addClass('d-none');
    $("#div_apartamento1").removeClass('d-none');
    $("#div_inquilinato1").addClass('d-none');
    $("#div_lote1").addClass('d-none');
    $("#div_Otro1").addClass('d-none');
    }else if (option == "Inquilinato") {
    $("#div_casa1").addClass('d-none');
    $("#div_apartamento1").addClass('d-none');
    $("#div_inquilinato1").removeClass('d-none');
    $("#div_lote1").addClass('d-none');
    $("#div_Otro1").addClass('d-none');
    }else if (option == "lote") {
    $("#div_casa1").addClass('d-none');
    $("#div_apartamento1").addClass('d-none');
    $("#div_inquilinato1").addClass('d-none');
    $("#div_lote1").removeClass('d-none');
    $("#div_Otro1").addClass('d-none');
    }else if (option == "Otro") {
    $("#div_casa1").addClass('d-none');
    $("#div_apartamento1").addClass('d-none');
    $("#div_inquilinato1").addClass('d-none');
    $("#div_lote1").addClass('d-none');
    $("#div_Otro1").removeClass('d-none');
    }
  });
  })
  var estadoActual = 1;
  /* $("#btnModalLarge").click(function(event) {
      if (estadoActual === 1) {
          // Acciones para el estado 1
          $("#tableA3").addClass('d-none');
          $("#tableB3").removeClass('d-none');
          $("#tableC3").addClass('d-none');
          $("#linkA").removeClass('active link-primary');
          $("#linkB").addClass('active link-primary');
          $("#linkC").removeClass('active link-primary');
          estadoActual = 2;
      } else if (estadoActual === 2) {
          $("#tableA3").addClass('d-none');
          $("#tableB3").removeClass('d-none');
          $("#tableC3").addClass('d-none');
          $("#linkA").removeClass('active link-primary');
          $("#linkB").removeClass('active link-primary');
          $("#linkC").addClass('active link-primary');
          $("#btnModalLarge").text('Guardar');
          $("#btnModalLarge").click(function(event){
            Funcion 
            // guardarFormulario(id);
            // event.preventDefault
          })
          estadoActual = 3;
      } else if (estadoActual === 3) {

      }
  }); */
  $("#btnModalLarge").click(function(event){
    guardarFormu3(id,infoVivienda);
    event.preventDefault
  })
  
  
}


function guardarFormu3(id,infoVivienda) {
  
  
  //INDEPENDIENTE
  var direccion_depen = $("#direccion").val();
  var telefono_depen = $("#tel").val();
  var parentesco_depen = $("#parentesco").val();
  var habitan_depen = $("#n_habitantes").val();
  var arrendo_depen = $("#arrendador").val();
  var teledepen = $("#tel_arrendador").val();
  var valor_depen = $("#valor").val();
  var tiempo_depen = $("#tiempo_permanencia").val();
  var tipo_perman = $("#tipo_permanencia").val();
  var estrato_depen = $("#estrato").val();
  var medio = $("#medio").val();
  var div_casaP = $("#n_piezas").val();
  var pregA = ($('input[name=PreguntaA]:checked').val() == undefined)?"":$('input[name=PreguntaA]:checked').val();
  var pregB = ($('input[name=PreguntaB]:checked').val() == undefined)?"":$('input[name=PreguntaB]:checked').val();
  var pregC = ($('input[name=PreguntaC]:checked').val() == undefined)?"":$('input[name=PreguntaC]:checked').val();
  var pregD = ($('input[name=PreguntaD]:checked').val() == undefined)?"":$('input[name=PreguntaD]:checked').val();

  var pregAgua = ($('input[name=AguaA]:checked').val() == undefined)?"":$('input[name=AguaA]:checked').val();
  var pregLuz = ($('input[name=LuzA]:checked').val() == undefined)?"":$('input[name=LuzA]:checked').val();
  var pregGas = ($('input[name=GasA]:checked').val() == undefined)?"":$('input[name=GasA]:checked').val();
  var pregTel = ($('input[name=TelefonoA]:checked').val() == undefined)?"":$('input[name=TelefonoA]:checked').val();
  var pregAdmin = ($('input[name=AdminiA]:checked').val() == undefined)?"":$('input[name=AdminiA]:checked').val();
 
  var verifA = (pregAgua == '0')?false:true;
  var verifB = (pregLuz == '0')?false:true;
  var verifC = (pregGas == '0')?false:true;
  var verifD = (pregTel == '0')?false:true;
  var verifE = (pregAdmin == '0')?false:true;
  var costoAgua = $("#costoAgua").val();
  var costoLuz = $("#costoLuz").val();
  var costoGas = $("#costoGas").val();
  var costoTelefono = $("#costoTelefono").val();
  var costoAdminis = $("#costoAdmini").val();

  var tv =($("#Television_si").is(':checked'))?1:0;
  var equi_sonido =($("#sonido_si").is(':checked'))?1:0;
  var grabadora =($("#Grabadora_si").is(':checked'))?1:0;
  var computador =($("#Computador_si").is(':checked'))?1:0;
  var lavadora =($("#Lavadora_si").is(':checked'))?1:0;
  var nevera =($("#Nevera_si").is(':checked'))?1:0;
  var otros =$("#otros_campo").val();
  var muebles_sala =$("#muebles_sal").val()
  var muebles_comedor =$("#muebles_com").val()
  var muebles_alcobas =$("#muebles_alco").val()
  var otros_lugares =$("#otros_lugares").val()
  var situacion_especial =$("#situacion_especial").val()

  var dire_anterior =$("#dire_anterior").val()
  var tele_anterior=$("#tele_anterior").val()
  var nombre_arrend=$("#nombre_arrend").val()
  var telefono_arrend=$("#telefono_arrend").val()
  var valor_arriendo=$("#costo_arrendo").val()
  var cuantas_arrendo=$("#cuantas_arrendo").val()
  var cuanto_vivieron=$("#cuanto_vivieron").val()
  var cuanto_estrato=$("#cuanto_estrato").val()

  var tipo_vivienda=$("#tipo_vivienda").val()
  var div_casaInput=$("#div_casaInput").val()
  var baño_ant = ($('input[name=baño_ant]:checked').val() == undefined)?"":$('input[name=baño_ant]:checked').val();
  var cocina_ant = ($('input[name=cocina_ant]:checked').val() == undefined)?"":$('input[name=cocina_ant]:checked').val();
  var patio_ant = ($('input[name=patio_ant]:checked').val() == undefined)?"":$('input[name=patio_ant]:checked').val();
  
  var AguaAnt = ($('input[name=agua]:checked').val() == undefined)?"":$('input[name=agua]:checked').val();
  var LuzAnt = ($('input[name=luz]:checked').val() == undefined)?"":$('input[name=luz]:checked').val();
  var GasAnt = ($('input[name=gasN]:checked').val() == undefined)?"":$('input[name=gasN]:checked').val();
  var TelAnt = ($('input[name=tel]:checked').val() == undefined)?"":$('input[name=tel]:checked').val();
  var AdminAnt = ($('input[name=administra]:checked').val() == undefined)?"":$('input[name=administra]:checked').val();
  var verifAgu = (AguaAnt == '0')?false:true;
  var verifLuz = (LuzAnt == '0')?false:true;
  var verifGas = (GasAnt == '0')?false:true;
  var verifTel = (TelAnt == '0')?false:true;
  var verifAnt = (AdminAnt == '0')?false:true;
  var cosAguaAnt = $("#costoagua2").val();
  var cosLuzAnt = $("#costoluz2").val();
  var cosGasAnt = $("#costogasN2").val();
  var cosTelefonoAnt = $("#costotel2").val();
  var cosAdminisAnt = $("#costoadministra2").val();

  var toastMessage_ = {"service":"Notifición","200":"documento guardado", "400":"Por favor digite todos los campos","500":"Error al guardar"};
   var valid = validFormDocument([
                                  {'data':direccion_depen,'item':'direccion','type':'text', 'type_document':'1', 'obligatory':true},
                                  {'data':telefono_depen,'item':'tel','type':'text', 'type_document':'1', 'obligatory':true},
                                  {'data':parentesco_depen,'item':'parentesco','type':'text', 'type_document':'1', 'obligatory':true},
                                  {'data':habitan_depen,'item':'n_habitantes','type':'text', 'type_document':'1', 'obligatory':true},
                                  {'data':arrendo_depen,'item':'arrendador','type':'text', 'type_document':'1', 'obligatory':true},
                                  {'data':teledepen,'item':'tel_arrendador','type':'text', 'type_document':'1', 'obligatory':true},
                                  {'data':valor_depen,'item':'valor','type':'text', 'type_document':'1', 'obligatory':true},
                                  {'data':tiempo_depen,'item':'tiempo_permanencia','type':'number', 'type_document':'1', 'obligatory':true},
                                  {'data':tipo_perman,'item':'tipo_permanencia','type':'text', 'type_document':'1', 'obligatory':true},
                                  {'data':estrato_depen,'item':'estrato','type':'text', 'type_document':'1', 'obligatory':true},
                                  {'data':medio,'item':'medio','type':'text', 'type_document':'1', 'obligatory':true},
                                  {'data':div_casaP,'item':'n_piezas','type':'text', 'type_document':'1', 'obligatory':true},
                                  {'data':pregA,'item':'PreguntaASi','type':'text', 'type_document':'1', 'obligatory':true},
                                  {'data':pregB,'item':'PreguntaBSi','type':'text', 'type_document':'1', 'obligatory':true},
                                  {'data':pregC,'item':'PreguntaCSi','type':'text', 'type_document':'1', 'obligatory':true},
                                  {'data':pregD,'item':'PreguntaDSi','type':'text', 'type_document':'1', 'obligatory':true},
                                  {'data':pregAgua,'item':'AguaSi','type':'text', 'type_document':'2', 'obligatory':true},
                                  {'data':pregLuz,'item':'LuzSi','type':'text', 'type_document':'2', 'obligatory':true},
                                  {'data':pregGas,'item':'GasSi','type':'text', 'type_document':'2', 'obligatory':true},
                                  {'data':pregTel,'item':'TelefonoSi','type':'text', 'type_document':'2', 'obligatory':true},
                                  {'data':pregAdmin,'item':'AdminiSi','type':'text', 'type_document':'2', 'obligatory':true},
                                  {'data':costoAgua,'item':'costoAgua','type':'text', 'type_document':'2', 'obligatory':verifA},
                                  {'data':costoLuz,'item':'costoLuz','type':'text', 'type_document':'2', 'obligatory':verifB},
                                  {'data':costoGas,'item':'costoGas','type':'text', 'type_document':'2', 'obligatory':verifC},
                                  {'data':costoTelefono,'item':'costoTelefono','type':'text', 'type_document':'2', 'obligatory':verifD},
                                  {'data':costoAdminis,'item':'costoAdmini','type':'text', 'type_document':'2', 'obligatory':verifE},
                                  {'data':otros,'item':'otros_campo','type':'text', 'type_document':'2', 'obligatory':true},
                                  {'data':muebles_sala,'item':'muebles_sal','type':'text', 'type_document':'2', 'obligatory':true},
                                  {'data':muebles_comedor,'item':'muebles_com','type':'text', 'type_document':'2', 'obligatory':true},
                                  {'data':muebles_alcobas,'item':'muebles_alco','type':'text', 'type_document':'2', 'obligatory':true},
                                  {'data':otros_lugares,'item':'otros_lugares','type':'text', 'type_document':'2', 'obligatory':true},
                                  {'data':situacion_especial,'item':'situacion_especial','type':'text', 'type_document':'2', 'obligatory':true},
                                  {'data':dire_anterior,'item':'dire_anterior','type':'text', 'type_document':'3', 'obligatory':true},
                                  {'data':tele_anterior,'item':'tele_anterior','type':'text', 'type_document':'3', 'obligatory':true},
                                  {'data':nombre_arrend,'item':'nombre_arrend','type':'text', 'type_document':'3', 'obligatory':true},
                                  {'data':telefono_arrend,'item':'telefono_arrend','type':'text', 'type_document':'3', 'obligatory':true},
                                  {'data':cuantas_arrendo,'item':'cuantas_arrendo','type':'text', 'type_document':'3', 'obligatory':true},
                                  {'data':valor_arriendo,'item':'costo_arrendo','type':'text', 'type_document':'3', 'obligatory':true},
                                  {'data':cuanto_vivieron,'item':'cuanto_vivieron','type':'text', 'type_document':'3', 'obligatory':true},
                                  {'data':cuanto_estrato,'item':'cuanto_estrato','type':'text', 'type_document':'3', 'obligatory':true},
                                  {'data':tipo_vivienda,'item':'tipo_vivienda','type':'text', 'type_document':'3', 'obligatory':true},
                                  {'data':div_casaInput,'item':'div_casaInput','type':'text', 'type_document':'3', 'obligatory':true},
                                  {'data':baño_ant,'item':'baño_ant','type':'text', 'type_document':'3', 'obligatory':true},
                                  {'data':cocina_ant,'item':'cocina_ant','type':'text', 'type_document':'3', 'obligatory':true},
                                  {'data':patio_ant,'item':'patio_ant','type':'text', 'type_document':'3', 'obligatory':true},
                                  {'data':verifAgu,'item':'aguaSi','type':'text', 'type_document':'3', 'obligatory':true},
                                  {'data':verifLuz,'item':'luzSi','type':'text', 'type_document':'3', 'obligatory':true},
                                  {'data':verifGas,'item':'gasSi','type':'text', 'type_document':'3', 'obligatory':true},
                                  {'data':verifTel,'item':'telSi','type':'text', 'type_document':'3', 'obligatory':true},
                                  {'data':verifAnt,'item':'administraSi','type':'text', 'type_document':'3', 'obligatory':true},
                                  {'data':cosAguaAnt,'item':'costoagua2','type':'text', 'type_document':'3', 'obligatory':verifAgu},
                                  {'data':cosLuzAnt,'item':'costoluz2','type':'text', 'type_document':'3', 'obligatory':verifLuz},
                                  {'data':cosGasAnt,'item':'costogasN2','type':'text', 'type_document':'3', 'obligatory':verifGas},
                                  {'data':cosTelefonoAnt,'item':'costotel2','type':'text', 'type_document':'3', 'obligatory':verifTel},
                                  {'data':cosAdminisAnt,'item':'costoadministra2','type':'text', 'type_document':'3', 'obligatory':verifAnt},
                                ])  
   console.log(valid["validate"]);

   if(valid["validate"]){
    
    $(".labelInvalid").each(function() {
		  $(this).removeClass('labelInvalid');
      $(this).removeClass('is-invalid')
		});
    $("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
    $("#btnModalLarge").removeAttr('disabled');
    var inser_ForA3 = "", inser_formA3 = "", inser_formB3 = "", inser_formC1 = "", inser_forC2 = "";; 
    inser_ForA3 = InsertForm3Vivienda(id,direccion_depen,telefono_depen,pregA,parentesco_depen,habitan_depen,arrendo_depen,teledepen,valor_depen,tiempo_depen,tipo_perman,estrato_depen,medio,div_casaP,pregB,pregC,pregD)  
    inser_formA3 = InsertForm3Servicios(id,pregAgua,costoAgua,pregLuz,costoLuz,pregGas,costoGas,pregTel,costoTelefono,pregAdmin,costoAdminis);
    inser_formB3 = InsertForm3Equipos(id,tv,equi_sonido,grabadora,computador,lavadora,nevera,otros,muebles_sala,muebles_comedor,muebles_alcobas,otros_lugares,situacion_especial)
    inser_formC1 = InsertForm3ViviendaAnterior(id,dire_anterior,tele_anterior,nombre_arrend,telefono_arrend,valor_arriendo,cuantas_arrendo,cuanto_vivieron,cuanto_estrato,tipo_vivienda,div_casaInput,baño_ant,cocina_ant,patio_ant)
    inser_forC2 = InsertForm3ServiciosAnterior(id,verifAgu,cosAguaAnt,verifLuz,cosLuzAnt,verifGas,cosGasAnt,verifTel,cosTelefonoAnt,verifAnt,cosAdminisAnt);                                           
    
    $.when(inser_ForA3,inser_formA3,inser_formB3,inser_formC1,inser_forC2).done(function(inser_ForA3,inser_formA3,inser_formB3,inser_formC1,inser_forC2){
      console.log(inser_forC2);
      toastr_message(200,toastMessage_);
    $("#btnModalLarge").html('Guardado');
    }).fail(function(inser_forC2){
      console.log(inser_forC2);
      toastr_message(500,toastMessage_);
      $("#btnModalLarge").html('Guardar');
		  $("#btnModalLarge").removeAttr('disabled');
    });
   }else{
    console.log("No entra")
    toastr_message(400,toastMessage_);
    $(".labelInvalid").each(function() {
		  $(this).removeClass('labelInvalid');
      $(this).children("span:first").remove();
      $(this).removeClass('is-invalid');
		});
    
    $.each(valid["type_document"], function(key, label) {
      var label2 ="";
      label2 = valid["items"][key];
      if(label == "1"){
        $("#tableA3").removeClass('d-none')
        $("#tableB3").addClass('d-none')
        $("#tableC3").addClass('d-none')
        $("#"+label2).addClass("labelInvalid");
        $("#"+label2).addClass("is-invalid");
        $("#"+label2).focus();
      } else if(label == "2"){
        $("#tableB3").removeClass('d-none')
        $("#tableA3").addClass('d-none')
        $("#tableC3").addClass('d-none')
        $("#"+label2).addClass('labelInvalid');
        $("#"+label2).addClass("is-invalid");
        $("#"+label2).focus();
      } else{
        $("#tableB3").addClass('d-none')
        $("#tableA3").addClass('d-none')
        $("#tableC3").removeClass('d-none')
        $("#"+label2).addClass('labelInvalid');
        $("#"+label2).addClass("is-invalid");
        $("#"+label2).focus();
      }
    });
  }
}

function ActiveMenu3 (Type) {
  if(Type == 'A'){
    $("#tableA3").removeClass('d-none')
    $("#tableB3").addClass('d-none')
    $("#tableC3").addClass('d-none')
    $("#tableD3").addClass('d-none')
    $("#linkA").addClass('active link-primary')
    $("#linkB").removeClass('active link-primary')
    $("#linkC").removeClass('active link-primary')
  }else if (Type == 'B'){
    $("#tableB3").removeClass('d-none')
    $("#tableA3").addClass('d-none')
    $("#tableC3").addClass('d-none')
    $("#tableD3").addClass('d-none')
    $("#linkA").removeClass('active link-primary')
    $("#linkB").addClass('active link-primary')
    $("#linkC").removeClass('active link-primary')
  }else if (Type == 'C'){
    $("#tableB3").addClass('d-none')
    $("#tableA3").addClass('d-none')
    $("#tableC3").removeClass('d-none')
    $("#tableD3").addClass('d-none')
    $("#linkA").removeClass('active link-primary')
    $("#linkB").removeClass('active link-primary')
    $("#linkC").addClass('active link-primary')
  }else if (Type == 'D'){
    $("#tableB3").addClass('d-none')
    $("#tableA3").addClass('d-none')
    $("#tableC3").addClass('d-none')
    $("#tableD3").removeClass('d-none')
    $("#linkA").removeClass('active link-primary')
    $("#linkB").removeClass('active link-primary')
    $("#linkC").removeClass('active link-primary')
  }
}


function limparcampos(){
  $('#PreguntaASi').prop('checked', false);
  $('#PreguntaBSi').prop('checked', false);
  $('#PreguntaCSi').prop('checked', false);
  $('#PreguntaDSi').prop('checked', false);
  

  $('#AguaSi').prop('checked', false);
  $('#LuzSi').prop('checked', false);
  $('#GasSi').prop('checked', false);
  $('#TelefonoSi').prop('checked', false);
  $('#AdminiSi').prop('checked', false);

  $('#aguaSi').prop('checked', false);
  $('#luzSi').prop('checked', false);
  $('#gasSi').prop('checked', false);
  $('#telSi').prop('checked', false);
  $('#administraSi').prop('checked', false);

  $('#bañoSi').prop('checked', false);
  $('#cocinaSi').prop('checked', false);
  $('#patioSi').prop('checked', false);

  $('#PreguntaANo').prop('checked', false);
  $('#PreguntaBNo').prop('checked', false);
  $('#PreguntaCNo').prop('checked', false);
  $('#PreguntaDNo').prop('checked', false);

  $('#AguaNo').prop('checked', false);
  $('#LuzNo').prop('checked', false);
  $('#GasNo').prop('checked', false);
  $('#TelefonoNo').prop('checked', false);
  $('#AdminiNo').prop('checked', false);

  $('#aguaSi').prop('checked', false);
  $('#luzNo').prop('checked', false);
  $('#gasNo').prop('checked', false);
  $('#telNo').prop('checked', false);
  $('#administraNo').prop('checked', false);

  $('#bañoNo').prop('checked', false);
  $('#cocinaNo').prop('checked', false);
  $('#patioNo').prop('checked', false);
}
