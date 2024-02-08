function Resumen1 (id,infoUser,formulario,formulario2,respIndepe,conyuge,respContrato,infoVivienda,infoServ,ifoEquipo) {
    console.log(infoVivienda);
    
    $("#view-table").removeClass('d-none');
    $("#tabla_registro").addClass('d-none');
    $("#mi-table").load("views/adminView/Resumen1.html", function() {
      $("#nombre_").html('<b>CÓDIGO:</b> '+id+'&nbsp;&nbsp;<b>NOMBRE: </b>'+infoUser["apellidos"]+' '+infoUser["nombre"]);
      if (respContrato[0] === "false"){
        console.log("entra a false")
        $("#tipo_experiencia1").html();
      } else {
        console.log("no entra")
        $("#tipo_experiencia1").text('Empresa');
      };
      viewB(id,formulario2);
      validacion(formulario);
      var estadoCivil = SelecEstCivil();
      $.when(estadoCivil).done(function(estado_civil){
        CreateSelectA(estado_civil["response"],'estado_civil')
        $("#estado_civil").html(infoUser["estaCivil"] + 'Tiempo :' + infoUser["est_civil"]);
      })
      $("#direccion_actual").html(infoUser["direccion"]);
      $("#medio").val(infoUser["programa"]);
      $("#inf_sector").html(infoUser["sector"]);
      $("#inf_Barrio").html(infoUser["barrio"]);
      $("#inf_Tel").html(infoUser["tel1"]);
      $("#inf_Tel2").html(infoUser["tel2"]);
      let refresh = document.getElementById('btnrefresh');
      refresh.addEventListener('click', _ => {location.reload()});
      $("#direccion").val(respIndepe[0]["direccion"]);
      $("#barrio_tra").val(respIndepe[0]["barrio"]);
      $("#actividad_tra").val(respIndepe[0]["actividad"]);
      $("#ingreso_tra").val(respIndepe[0]["ingreso"]);
      $("#date_tra").val(respIndepe[0]["date_trabajo"]);
      $("#horario_tra").val(respIndepe[0]["horario"]);
      $("#jefe_tra").val(respIndepe[0]["jefe"]);
      $("#jefe_numero_trabajo").val(respIndepe[0]["jefe_numero"]);
      $("#categoria_sis").val(respIndepe[0]["categoria_sisben"]);
      $("#sisben").val(respIndepe[0]["sisben"]);
      $("#anterior_dire").val(respIndepe[0]["anterior_direccion"]);
      $("#anterior_barrio").val(respIndepe[0]["anterior_barrio"]);
      $("#anterior_actividad").val(respIndepe[0]["anterior_actividad"]);
      $("#anterior_salario_").val(respIndepe[0]["anterior_salario"]);
      $("#anterior_date_").val(respIndepe[0]["anterior_date"]);
      $("#anterior_horario_").val(respIndepe[0]["anterior_horario"]);
      $("#anterior_jefe_").val(respIndepe[0]["anterior_jefe"]);
      $("#anterior_jefe_telefono_").val(respIndepe[0]["anterior_jefe_telefono"]);
            
  })
};

function validacion(formulario) {
  var miArray = Object.keys(formulario).map(function (key) {
      return { id: key, valor: formulario[key] };
  });

  for (var i = 0; i < miArray.length; i++) {
      $("#" + miArray[i]["id"]).html(miArray[i]["valor"] == "1" ? "Si":"No");
  }
  console.log(miArray);
}


function viewB(id, formulario2) {
console.log(formulario2);
  var col = "";
 for (var i = 0 ; i < formulario2.length; i++){
  console.log(formulario2[i]["nombres"]);
    col += "<tr style='vertical-align: middle;' id='row_"+i+"'>";
    col += "<td style='width: 175px;'><input type='text' id='form2_name_"+i+"' name='usuario' placeholder='Nombre y Apellidos' class='form-control' value='" + formulario2[i]["nombres"] + "' ></td>";
    col += "<td><input type='text' id='form2_identidad_"+i+"' name='usuario' placeholder='Identidad' class='form-control'  value='" + formulario2[i]["n_document"] + "' ></td>";
    col += "<td><input type='text' id='form2_edad_"+i+"' name='usuario' placeholder='Edad' class='form-control' value='" + formulario2[i]["edad"] + "' ></td>";
    col += "<td><input type='text' id='form2_parent_"+i+"' name='usuario' placeholder='Parentesco' class='form-control' value='" + formulario2[i]["parentesco"] + "' ></td>";
    col += "<td><input type='text' id='form2_estudio_"+i+"' name='usuario' placeholder='Estudios' class='form-control' value='" + formulario2[i]["estudios"] + "' ></td>";
    col += "<td><input type='text' id='form2_lugarNac_"+i+"' name='usuario' placeholder='Lugar de Nacimiento' class='form-control' value='" + formulario2[i]["lugar_nacimiento"] + "' ></td>";
    col += "<td style='width: 129px;'><input type='text' id='form2_fechaNac_"+i+"' name='usuario' placeholder='Fecha de Nacimiento' class='form-control' value='" + formulario2[i]["fecha_naci"] + "' ></td>";
    col += "</tr>";
    
 };
 $("#create_rowParent").append(col);
}

function ActiveMenu6 (Type) {
  if(Type == 'A'){
    $("#doc1").removeClass('d-none')
    $("#doc2").addClass('d-none')
    $("#linkA").addClass('active link-primary');
    $("#linkB").removeClass('active link-primary');
  }else if (Type == 'B'){
    $("#doc1").addClass('d-none')
    $("#doc2").removeClass('d-none')
    $("#linkB").addClass('active link-primary');
    $("#linkA").removeClass('active link-primary');
    
  }
};



