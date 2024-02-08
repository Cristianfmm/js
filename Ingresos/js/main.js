function refresh (){
    let refresh = document.getElementById('btnrefresh');
    refresh.addEventListener('click', _ => {location.reload()})
    let refresh_1 = document.getElementById('btnrefresh_1');
    refresh_1.addEventListener('click', _ => {location.reload()})
}
function moduleViews(){
	console.log("a")
	return $.ajax({
		url: '../controller/cont.php',
		type: 'POST',
		dataType: 'json',
		data: {base:"corp",param:"getModMain"}
	});
}

function get_permission(host){
    return $.ajax({
        url:'../controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {param: 'permission', base:'corp'},
    })
}

function createUser(name,lastname,type_identification,identification,celphone){
    console.log(name);
    return $.ajax({
        url:'controller/cont.php',
        type: 'POST',
        dataType: 'json',
        data: {param: 'createUser', base:'corpsanisidrio',name,lastname,type_identification,identification,celphone},
    })
}

function SelectTipDocument(){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'SelectTipDocumentos', base:'corpsanisidrio'},
    })
}

function SelecEstCivil(){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'SelecEstCivil', base:'corpsanisidrio'},
    })
}

function SelecPrograma(){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'SelecPrograma', base:'corpsanisidrio'},
    })
}

function SelecSisben(){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'SelecSisben', base:'corpsanisidrio'},
    })
}

function SelecConcepto(){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'SelecConcepto', base:'corpsanisidrio'},
    })
}

function SelecGrupo(){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'SelecGrupo', base:'corpsanisidrio'},
    })
}

function SelecTipoPared(){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'SelecTipoPared', base:'corpsanisidrio'},
    })
}

function SelecTipoPiso(){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'SelecTipoPiso', base:'corpsanisidrio'},
    })
}

function SelecTipoVivienda(){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'SelecTipoVivienda', base:'corpsanisidrio'},
    })
}

function getCrateUser(){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'getCrateUser', base:'corpsanisidrio'},
    })
}

function InsertForm1A(id,pregA,pregB,pregC,pregD,pregE,pregF,pregG,pregH,pregI,pregJ,pregK,pregL){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'InsertForm1A', base:'corpsanisidrio',id,pregA,pregB,pregC,pregD,pregE,pregF,pregG,pregH,pregI,pregJ,pregK,pregL},
    }).done(function(response) {
        console.log("Respuesta del servidor:", response);
        // Puedes realizar más acciones con la respuesta aquí si es necesario
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error en la solicitud:", textStatus, errorThrown);
    });
}

function InsertForm2A(id,direccion_tra,barrio_tra,actividad_tra,ingreso_tra,date_tra,horario_tra,jefe_tra,jefe_numero_trabajo,sisben,categoria_sis,anterior_dire,anterior_barrio_,anterior_actividad_,anterior_salario_,anterior_date_,anterior_horario_,anterior_jefe_,anterior_jefe_telefono_){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'InsertForm2A', base:'corpsanisidrio',id,direccion_tra,barrio_tra,actividad_tra,ingreso_tra,date_tra,horario_tra,jefe_tra,jefe_numero_trabajo,sisben,categoria_sis,anterior_dire,anterior_barrio_,anterior_actividad_,anterior_salario_,anterior_date_,anterior_horario_,anterior_jefe_,anterior_jefe_telefono_},
    })
}

function insertFormB2(id,nombre_cony,cedula_cony,telefono_cony,tipoUsuario_cony,empresa_cony,direccion_cony,barrio_cony,actividad_cony,mensual_cony,date_cony,horario_cony,jefe_cony,jefe_num_cony,cargo_cony,tipo_trabajo){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'insertFormB2', base:'corpsanisidrio',id,nombre_cony,cedula_cony,telefono_cony,tipoUsuario_cony,empresa_cony,direccion_cony,barrio_cony,actividad_cony,mensual_cony,date_cony,horario_cony,jefe_cony,jefe_num_cony,cargo_cony,tipo_trabajo},
    })
}

function delete_docu(consec){
    return $.ajax({
        type:'POST',
        url:"controller/cont.php",
        dataType: 'json',
        data:{param:"delete_documento",base:"corpsanisidrio",consec}
    });   
}

function delete_prop(consec){
    return $.ajax({
        type:'POST',
        url:"controller/cont.php",
        dataType: 'json',
        data:{param:"delete_prop",base:"corpsanisidrio",consec}
    });   
}

function getUser(id){
    return $.ajax({
        type:'POST',
        url:"controller/cont.php",
        dataType: 'json',
        data:{param:"getUser",base:"corpsanisidrio",id}
    });   
}

function updateSisben(id,selectSisben){
    return $.ajax({
        type:'POST',
        url:"controller/cont.php",
        dataType: 'json',
        data:{param:"updateSisben",base:"corpsanisidrio",id,selectSisben}
    });   
}

function updateForm1A(id,estado_civil,tiempo_convi,dir_vivienda,sector,barrio,telefono_1,telefono_2,medio,direccion){
    return $.ajax({
        type:'POST',
        url:"controller/cont.php",
        dataType: 'json',
        data:{param:"updateForm1A",base:"corpsanisidrio",id,estado_civil,tiempo_convi,dir_vivienda,sector,barrio,telefono_1,telefono_2,medio,direccion}
    });   
}

function InsertForm4Visita(id,dateVisita,horaIn,horaFin,tipo_grupo){
    return $.ajax({
        type:'POST',
        url:"controller/cont.php",
        dataType: 'json',
        data:{param:"InsertForm4Visita",base:"corpsanisidrio",id,dateVisita,horaIn,horaFin,tipo_grupo}
    });   
}

function selectform4Visita(id){
    return $.ajax({
        type:'POST',
        url:"controller/cont.php",
        dataType: 'json',
        data:{param:"selectform4Visita",base:"corpsanisidrio",id}
    });   
}

function InsertForm4Persona(id,name,identidad,edad,tipo_persona){
    return $.ajax({
        type:'POST',
        url:"controller/cont.php",
        dataType: 'json',
        data:{param:"InsertForm4Persona",base:"corpsanisidrio",id,name,identidad,edad,tipo_persona}
    });   
}


function updatefilesxxx(info){
    console.log(info)
    return $.ajax({
        type:'POST',
        url:"controller/cont.php",
        dataType: 'json',
        data:info,
        contentType:false,
        processData:false,
        cache:false
    });
}


function uploadDocuments(info) {
    console.log(info)
    return $.ajax({
        type:'POST',
        url:"controller/cont.php",
        dataType: 'json',
        data:info,
        contentType:false,
        processData:false,
        cache:false
    });
}

function selectFormulario1A(id){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'selectFormulario1A', base:'corpsanisidrio',id},
    })
}

function selectFormulario1B(id){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'selectFormulario1B', base:'corpsanisidrio',id},
    })
}

function selectFormulario2Independiente(id){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'selectFormulario2Independiente', base:'corpsanisidrio',id},
    })
}

function selectFormuB2(id){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'selectFormuB2', base:'corpsanisidrio',id},
    })
}


function InsertForm1B(id,name,identidad,edad,parent,estudio,lugarNac,fecha){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'InsertForm1B', base:'corpsanisidrio',id,name,identidad,edad,parent,estudio,lugarNac,fecha},
    })
}

function InsertForm2Contrato(id,nombre_empresa,cargo,salario,fecha_inicio,caja_compensacion){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'InsertForm2Contrato', base:'corpsanisidrio',id,nombre_empresa,cargo,salario,fecha_inicio,caja_compensacion},
    })
}

function selectForm2Contrato(id){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'selectForm2Contrato', base:'corpsanisidrio',id},
    })
}

function InsertForm3Vivienda(id,direccion,tel,perte_familia,parentesco,n_habitantes,arrendador,tel_arrendador,valor,tiempo_permanencia,tipo_perman,estrato,id_tipoVivienda,n_piezas,baño_compartido,cocina_compartida,patio_compartido){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'InsertForm3Vivienda', base:'corpsanisidrio',id,direccion,tel,perte_familia,parentesco,n_habitantes,arrendador,tel_arrendador,valor,tiempo_permanencia,tipo_perman,estrato,id_tipoVivienda,n_piezas,baño_compartido,cocina_compartida,patio_compartido},
    })
}

function InsertForm3Servicios(id,agua,valor_agua,luz,valor_luz,gasNatural,valor_gasNatura,telefono,valor_telefono,admin,valor_admin){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'InsertForm3Servicios', base:'corpsanisidrio',id,agua,valor_agua,luz,valor_luz,gasNatural,valor_gasNatura,telefono,valor_telefono,admin,valor_admin},
    })
}

function InsertForm3Equipos(id,tv,equi_sonido,grabadora,computador,lavadora,nevera,otros,muebles_sala,muebles_comedor,muebles_alcobas,otros_lugares,situacion_especial){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'InsertForm3Equipos', base:'corpsanisidrio',id,tv,equi_sonido,grabadora,computador,lavadora,nevera,otros,muebles_sala,muebles_comedor,muebles_alcobas,otros_lugares,situacion_especial},
    })
}

function selectform3Vivienda(id){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'selectform3Vivienda', base:'corpsanisidrio',id},
    })
}

function selectform3Servicios(id){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'selectform3Servicios', base:'corpsanisidrio',id},
    })
}

function selectform3Equipos(id){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'selectform3Equipos', base:'corpsanisidrio',id},
    })
}

function InsertForm3ViviendaAnterior(id,direccion,tel_1,arrendador,tel_2,valor_arriendo,n_habitantes,tiempo_permanencia,estrato,id_tipo_vivienda,n_piezas,baño_compartido,cocina_compartida,patio_compartido){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'InsertForm3ViviendaAnterior', base:'corpsanisidrio',id,direccion,tel_1,arrendador,tel_2,valor_arriendo,n_habitantes,tiempo_permanencia,estrato,id_tipo_vivienda,n_piezas,baño_compartido,cocina_compartida,patio_compartido},
    })
}

function selectform3ViviendaAnterior(id){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'selectform3ViviendaAnterior', base:'corpsanisidrio',id},
    })
}

function InsertForm3ServiciosAnterior(id,Agua,motivoAgua,Luz,motivoLuz,GasN,motivoGasN,Tel,motivoTel,Administra,motivoAdministra){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'InsertForm3ServiciosAnterior', base:'corpsanisidrio',id,Agua,motivoAgua,Luz,motivoLuz,GasN,motivoGasN,Tel,motivoTel,Administra,motivoAdministra},
    })
}

function selectform3ServiciosAnterior(id){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'selectform3ServiciosAnterior', base:'corpsanisidrio',id},
    })
}

function selectform4Persona(id){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'selectform4Persona', base:'corpsanisidrio',id},
    })
}


function updateForm4Vivienda(id,arrendatario,cel,direccion,sector,barrio,estrato,valor,instrucciones,cantidad,tiempoPerma){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'updateForm4Vivienda', base:'corpsanisidrio',id,arrendatario,cel,direccion,sector,barrio,estrato,valor,instrucciones,cantidad,tiempoPerma},
    })
}

function selectform4Vivienda(id){
    return $.ajax({
        url: 'controller/cont.php',
        type:'POST',
        dataType: 'json',
        data: {param: 'selectform4Vivienda', base:'corpsanisidrio',id},
    })
}

function updateForm4BVivienda(id,tip_vivienda,n_pieza,n_habitante,baño,cocina,patio,id_pared,id_piso,aseoPared,aseoPiso,aseoGeneral){
    return $.ajax({
        type:'POST',
        url:"controller/cont.php",
        dataType: 'json',
        data:{param:"updateForm4BVivienda",base:"corpsanisidrio",id,tip_vivienda,n_pieza,n_habitante,baño,cocina,patio,id_pared,id_piso,aseoPared,aseoPiso,aseoGeneral}
    });   
}

function updateForm4BServicios(id,agua,valor_agua,gasNatural,valor_gasNatural,telefono,valor_telefono){
    return $.ajax({
        type:'POST',
        url:"controller/cont.php",
        dataType: 'json',
        data:{param:"updateForm4BServicios",base:"corpsanisidrio",id,agua,valor_agua,gasNatural,valor_gasNatural,telefono,valor_telefono}
    });   
}

function updateForm4BEquipos(id,tv,equi_sonido,grabadora,computador,lavadora,nevera,secadora,dvd,vhs,otro){
    return $.ajax({
        type:'POST',
        url:"controller/cont.php",
        dataType: 'json',
        data:{param:"updateForm4BEquipos",base:"corpsanisidrio",id,tv,equi_sonido,grabadora,computador,lavadora,nevera,secadora,dvd,vhs,otro}
    });   
}


function validFormDocument(opts){
    console.log(opts)
    var valid = true;
    var items = Array();
    var type_document = Array();
    $.each(opts,function(index, el) {
        if(el['obligatory']){
            if(el['data'] !== null && el['data'] !== '' && typeof(el['data'])!== undefined){
                //console.log(el['item'] + " : " +el['data']);
                switch(el['type']){
                    case 'text':
                        if(el['data'] === null || el['data'].length === 0 || /^\s+$/.test(el['data'])){
                            valid=false;
                            items.push(el['item']);
                            //return false;
                        }
                        break;
                    case 'number':
                        if(isNaN(el['data'])){
                            valid=false;
                            items.push(el['item']);
                            //return false;
                        }
                        break;
                    case 'radio':
                        if(el['data'] === null || el['data'] == undefined || el['data'] === ''){
                            valid=false;
                            items.push(el['item']);
                            //return false;
                        }
                        break;
                    case 'select':
                        if(el['data'] === null || el['data'].length === 0 || el['data'] === '--'){
                            valid=false;
                            items.push(el['item']);
                            //return false;
                        }
                        break;
                    case 'date':
                        if(el['data'] == null || el['data'].length === 0 || el['data'] === ''){
                            valid=false;
                            items.push(el['item']);
                            //return false;
                        }
                        break;
                }    
            }
            else{
                if(el['type_document'] == undefined){
                    items.push(el['item']);
                    valid=false; 
                }else{
                    items.push(el['item']);
                    type_document.push(el['type_document']);
                    valid=false;
                }
                
                //return false;
            }            
        }
    });
    var response = {'validate':valid,'items':items ,'type_document':type_document }
    return response;
}



function CreateSelectA(array,type){
    var select = ""
    select += "<option value=''>--</option>"; 
    for (var i=0 ; i < array["length"];i++ ){
        select += "<option value='"+array[i]["id"]+"' class=option_"+array[i]["id"]+">"+array[i]["description"]+"</option>";
    }
    $("#"+type).append(select);
}
  


function CreateSelectEstado(array,type){
    var select = ""
    select += "<option value=''>N/A</option>"; 
    for (var i=0 ; i < array["length"];i++ ){
        select += "<option value='"+array[i]["id"]+"' class=option_"+array[i]["id"]+">"+array[i]["description"]+"</option>";
    }
    $("#"+type).append(select);
}
  

function vistaForm (formulario){
    var miArray = Object.keys(formulario).map(function(key) {
        return { id: key, valor: formulario[key] };
    });
    for (var i = 0 ; i < miArray.length; i++){
        $("#"+miArray[i]["id"]).val(miArray[i]["valor"])
    };
    console.log(miArray);
}

function cargarchecks(dato,checksi,checkno){
    if(dato!="" ){
        if(dato=="1"){
            $(checksi).prop('checked', true);
        }else if(dato=="0"){
            $(checkno).prop('checked', true);
        }
    }
}




function viewBloq (info){
    if(info == false){
        var miArray = 0; 
        var estado = 0;
    }else{
        var miArray = Object.keys(info).map(function(key) {
            return { id: key, valor: info[key] };
        });
        for (var i = 1 ; i < miArray.length; i++){ 
            var estado =$('input[name='+miArray[i]["id"]+'A]:checked').val()
            if(estado != '0'){
                $("#costo"+miArray[i]["id"]).prop('disabled',false);
            }else{
                $("#costo"+miArray[i]["id"]).prop('disabled',true);
            }
        };
    }
}

function viewAction (infoServ,infoServisAnt){
    $(".validation_info").click(function(a){
        var este_ele = $(this).attr('id')
        var str = $(this).attr('value')
        var action = $(this).attr('data-val');
        if(infoServ == false ){
            if(str == '1'){
                $("#costo"+action).prop('disabled',false)
            }else{
                $("#costo"+action).prop('disabled',true)
            }
        }else if(infoServisAnt == false){
            if(str == '1'){
                $("#costo"+action).prop('disabled',false)
            }else{
                $("#costo"+action).prop('disabled',true)
            }
        }else{
            if(infoServ.is(true)){
                var miArray = Object.keys(infoServ).map(function(key) {
                    return { id: key, valor: infoServ[key] };
                });
            }else{
                var miArray = Object.keys(infoServisAnt).map(function(key) {
                    return { id: key, valor: infoServisAnt[key] };
                });
            }
            $(miArray).each(function(key,val){
                var esSi = val["id"]+"Si"
                var esNo = val["id"]+"No"
                if(esSi == este_ele || esNo == este_ele ){
                    if(str == '1'){
                        $("#costo"+val["id"]).prop('disabled',false)
                    }else if( str == '0'){
                        $("#costo"+val["id"]).prop('disabled',true)
                        $("#costo"+val["id"]).val('');
                    }
                }
            });
        }
       
    });
}


/////////////////////////////////////////////////////////////////////////////////////
