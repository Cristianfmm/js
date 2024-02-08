function view_form(){
    $("#content").load("views/SolicitudVivienda.html",function(){
      var regjistroTablas = getCrateUser();
      $.when(regjistroTablas).done(function(getregjistroTablas) {
       var registros= getregjistroTablas["response"]
       console.log(registros);
         var table = ""
         for(i=0 ; i<registros["length"];i++){
           table += "<tr>";
           table += "<td style='text-align: center; vertical-align: middle; height: 100px; width:20px' ><div class='circulo_morado'><b>"+registros[i]["id"]+"</b></div></div></td>";
           table += "<td  class='centrado'>"+registros[i]["nombre"]+"</td>"
           table += "<td  class='centrado'>"+registros[i]["apellidos"]+"</td>"
           table += "<td  class='centrado'>"+registros[i]["documento"]+"</td>"
          //  form #1
           table += "<td class='centrado' style='background-color: #a4bdfd;'><button type='button' class='btn btn-link btn-sm btn-rounded'  onclick=ValidFormu("+registros[i]["id"]+",'formulario_1') data-toggle='modal' data-target='#modalCreate_user'><div class='icon-container' style='position: relative; display: inline-block;'><i class='fa fa-house-user' style='font-size: 35px;' aria-hidden='true'></i><div class='pendiente'></div></div></button></td>"
          // form #2 
           table += "<td class='centrado' style='background-color: #a4bdfd;'><button type='button' class='btn btn-link btn-sm btn-rounded'  onclick=ValidFormu("+registros[i]["id"]+",'formulario_2') data-toggle='modal' data-target='#modalCreate_user'><div class='icon-container' style='position: relative; display: inline-block;'><i class='fa fa-briefcase' style='font-size: 35px;' aria-hidden='true'></i><div class='pendiente'></div></div></button></td>"
          // form #3 
           table += "<td class='centrado' style='background-color: #a4bdfd;'><button type='button' class='btn btn-link btn-sm btn-rounded'  onclick=ValidFormu("+registros[i]["id"]+",'formulario_3') data-toggle='modal' data-target='#modalCreate_user'><div class='icon-container' style='position: relative; display: inline-block;'><i class='fa fa-people-roof' style='font-size: 35px;' aria-hidden='true'></i><div class='aprobado'></div></div></button></td>"
          // Resumen 
          table += "<td class='centrado' style='background-color: #ffffff;><button type='button' class='btn  btn-sm btn-rounded'  onclick=ValidFormu("+registros[i]["id"]+",'resumen') data-toggle='modal' data-target='#modalCreate_user'><div class='icon-container' style='position: relative; display: inline-block;'><i class='fa fa-folder-open' style='color: #efc714;font-size: 35px;' aria-hidden='true'></i></div></button></td>"
          // form #4  
           table += "<td class='centrado' style='background-color:#dcd4ff;'><button type='button' class='btn btn-link btn-sm btn-rounded'  onclick=ValidFormu("+registros[i]["id"]+",'formulario_4') data-toggle='modal' data-target='#modalCreate_user'><div class='icon-container' style='position: relative; display: inline-block;'><i class='fa fa-house-circle-exclamation' style='font-size: 35px;' aria-hidden='true'></i><div class='pendiente'></div></div></button></td>"
          // form #5  
           table += "<td class='centrado' style='background-color:#dcd4ff;'><button type='button' class='btn btn-link btn-sm btn-rounded'  onclick=ValidFormu("+registros[i]["id"]+",'formulario_5') data-toggle='modal' data-target='#modalCreate_user'><div class='icon-container' style='position: relative; display: inline-block;'><i class='fa fa-people-group' style='font-size: 35px;' aria-hidden='true'></i><div class='pendiente'></div></div></button></td>"
          // form #6  
           table += "<td class='centrado' style='background-color:#dcd4ff;'><button type='button' class='btn btn-link btn-sm btn-rounded'  onclick=ValidFormu("+registros[i]["id"]+",'formulario_6') data-toggle='modal' data-target='#modalCreate_user'><div class='icon-container' style='position: relative; display: inline-block;'><i class='fa fa-user-lock' style='font-size: 35px;' aria-hidden='true'></i><div class='pendiente'></div></div></button></td>"
          // form #7 
          table += "<td class='centrado' style='background-color:#dcd4ff;'><button type='button' class='btn btn-link btn-sm btn-rounded'  onclick=ValidFormu("+registros[i]["id"]+",'formulario_7') data-toggle='modal' data-target='#modalCreate_user'><div class='icon-container' style='position: relative; display: inline-block;'><i class='fa fa-building' style='font-size: 35px;' aria-hidden='true'></i><div class='pendiente'></div></div></button></td>"
          // Resumen 2 
          table += "<td class='centrado' style='background-color: #ffffff;><button type='button' class='btn  btn-sm btn-rounded'  onclick=ValidFormu("+registros[i]["id"]+",'resumen2') data-toggle='modal' data-target='#modalCreate_user'><div class='icon-container' style='position: relative; display: inline-block;'><i class='fa fa-folder-open' style='color: #efc714;font-size: 35px;' aria-hidden='true'></i></div></button></td>"
           
           table += "</tr>";
         }
         $('#tablaStudent').append(table)
       }
     ).fail(function (response) {
       console.log(response);
     })
  })
}


function ValidFormu(id, type_form){
  var user_general = getUser(id);
  var selectFormulario = selectFormulario1A(id);
  var selectFormulario2 = selectFormulario1B(id);
  var selectF2Independ = selectFormulario2Independiente(id);
  var selectFormuB2Conyu = selectFormuB2(id);
  var selectF2Contrato = selectForm2Contrato(id);
  var selectform3Viv = selectform3Vivienda(id);
  var selectform3Servis = selectform3Servicios(id);
  var selectform3Equ = selectform3Equipos(id);
  var selectf3ViviendaAnt = selectform3ViviendaAnterior(id);
  var selectForm3ServAnt = selectform3ServiciosAnterior(id);
  var selectform4V = selectform4Visita(id);
  var selectForm4P = selectform4Persona(id);
  var selectForm4Viv = selectform4Vivienda(id);

  switch (type_form) {
    case "formulario_1":
      $.when(user_general,selectFormulario,selectFormulario2).done(function(respUser,formulario,formulario2){
        valitStudent(id,respUser[0]["response"][0],formulario[0]["response"][0],formulario2[0]["response"]);
      }).fail(function(respUser){
					console.log("fail Student:"+ respUser);
			});
    break;
    case "formulario_2":
      $.when(user_general,selectF2Independ,selectFormuB2Conyu,selectF2Contrato).done(function(respUser,respselectIndepend,respFormuB2Conyu,respF2Contrato){
        valitStudent2(id,respUser[0]["response"][0],respselectIndepend[0]["response"][0],respFormuB2Conyu[0]["response"][0],respF2Contrato[0]["response"][0]);
      }).fail(function(respUser){
					console.log("fail Student:"+ respUser);
			});
    break;
    case "formulario_3":
      $.when(user_general,selectform3Viv,selectform3Servis,selectform3Equ,selectf3ViviendaAnt,selectForm3ServAnt).done(function(respUser,respform3Viv,respform3Servi,resptform3Equ,resp3ViviendaAnt,respForm3ServAnt){
        valitStudent3(id,respUser[0]["response"][0],respform3Viv[0]["response"][0],respform3Servi[0]["response"][0],resptform3Equ[0]["response"][0],resp3ViviendaAnt[0]["response"][0],respForm3ServAnt[0]["response"][0]);
      }).fail(function(respUser){
					console.log("fail Student:"+ respUser);
			});
    break;
    case "formulario_4":
      $.when(user_general,selectform4V,selectForm4P,selectForm4Viv).done(function(respUser,respForm4Visita,respForm4P,respForm4Viv){
        valitStudent4(id,respUser[0]["response"][0],respForm4Visita[0]["response"][0],respForm4P[0]["response"][0],respForm4Viv[0]["response"][0]);
      }).fail(function(respForm4Viv){
					console.log("fail Student:"+ respForm4Viv);
			});
    break;
    case "formulario_5":
      $.when(user_general).done(function(respUser){
        valitStudent5(id,respUser["response"][0]);
      }).fail(function(respUser){
					console.log("fail Student:"+ respUser);
			});
    break;
    case "formulario_6":
      $.when(user_general).done(function(respUser){
        valitStudent6(id,respUser["response"][0]);
      }).fail(function(respUser){
					console.log("fail Student:"+ respUser);
			});
    break;
    case "formulario_7":
      $.when(user_general).done(function(respUser){
        valitStudent7(id,respUser["response"][0]);
      }).fail(function(respUser){
					console.log("fail Student:"+ respUser);
			});
    break;
    case "formulario_8":
      valitStudent8(id);
    break;
    case "formulario_9":
      valitStudent9(id);
    break;
    case "resumen":
      $.when(user_general,selectFormulario,selectFormulario2,selectF2Independ,selectFormuB2Conyu,selectF2Contrato,selectform3Viv,selectform3Servis,selectform3Equ).done(function(respUser,formulario,formulario2,respselectIndepend,respFormuB2Conyu,respF2Contrato,respform3Viv,respform3Servi,resptform3Equ){
        Resumen1(id,respUser[0]["response"][0],formulario[0]["response"][0],formulario2[0]["response"],respselectIndepend[0]["response"],respFormuB2Conyu[0]["response"],respF2Contrato[0]["response"],respform3Viv[0]["response"][0],respform3Servi[0]["response"][0],resptform3Equ[0]["response"][0]);
      }).fail(function(respUser){
					console.log("fail Student:"+ respUser);
			});
    break;
    default:
      console.log(type_form);
    break;
  }

}
  