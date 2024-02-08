<?php 
	$root = realpath($_SERVER["DOCUMENT_ROOT"]);
	include("$root/CorporacionSanIsidro/funciones.php");
	include("$root/includes/sesion.inc");
	include("$root/controller/constants.php");
	//include("$root/controller/queries.php");
	include("queries.php");
	//require("Classes/PHPExcel.php");
	
	
	//solo para pruebas ambiente local
	/* $_SESSION['auth'] = 'yes';
	$_SESSION['id'] = 40058;
	$_SESSION['perfil'] = 53; */
	//$_SESSION['perfil'] = 53;
	
 	function isLoged($base_){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$return =array();
				if ($_SESSION['auth'] == "yes" || $_SESSION['id'] != NULL || $_SESSION['id'] != 0){
					$return['is_logged']=true;
					return $return; 
				}
				$return['is_logged']=false;
				return $return['is_logged'];
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	} 

	function uploadFile($file_,$user,$tipo_user){
		$root = str_replace("\\","/",realpath($_SERVER["DOCUMENT_ROOT"]));
	 	$file = eliminar_acentos($file_['file']['name']);
	    $file = str_replace(" ", "_", $file);
		$id = $_SESSION["id"];
		if($tipo_user == 1){
			$dir_ = $root."/CorporacionSanIsidro/Ingresos/documentos/".$user."";
		}else{
			$dir_ = $root."/CorporacionSanIsidro/Ingresos/propiedad/".$user."";
		}
		if (!file_exists($dir_)) {
			mkdir($dir_, 0777, true);
		}
		$route_doc = $dir_."/".$file;

		
		$subirdoc = move_uploaded_file(eliminar_acentos($file_['file']['tmp_name']), $route_doc);
		sleep(10);
		if ($subirdoc) {
			return array("cod_valid"=>200,'Mensaje'=>'Se subio el archivo','url'=>$route_doc);
		}else{
			return array("cod_valid"=>400,'Mensaje'=>'error no se puede cargar el archivo'.$file,'url'=>$route_doc);
		}   
	}

	function create_User($base_,$name,$lastname,$type_identification,$identification,$celphone){
		if(isset($base_) && isset($name) && isset($lastname) && isset($type_identification) && isset($identification) && isset($celphone)){
			$base = $db[$base_];
			$newUser = createUser($base_,$name,$lastname,$type_identification,$identification,$celphone);
		    return json_encode($newUser);
		}
		else{
			return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
		}		
	}

	function get_Crate_User($base_){
		if(isset($base_)){
			$base = $db[$base_];
			$dataUser = getCrateUser($base_);
		    return json_encode($dataUser);
		}
		else{
			return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
		}		
	}

	
	function Insert_Form1A($base_,$id,$pregA,$pregB,$pregC,$pregD,$pregE,$pregF,$pregG,$pregH,$pregI,$pregJ,$pregK,$pregL){
		try
		{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];
				$formulario1A = InsertForm1A($base_,$id,$pregA,$pregB,$pregC,$pregD,$pregE,$pregF,$pregG,$pregH,$pregI,$pregJ,$pregK,$pregL);
				return json_encode($formulario1A);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}

	function Insert_Form2A($base_,$id_usua,$direccion_tra,$barrio_tra,$actividad_tra,$ingreso_tra,$date_tra,$horario_tra,$jefe_tra,$jefe_numero_trabajo,$sisben,$categoria_sis,$anterior_dire,$anterior_barrio_,$anterior_actividad_,$anterior_salario_,$anterior_date_,$anterior_horario_,$anterior_jefe_,$anterior_jefe_telefono_){
		try
		{
			global $db;
			if(isset($base_)){
				$formulario2A = InsertForm2A($base_,$id_usua,$direccion_tra,$barrio_tra,$actividad_tra,$ingreso_tra,$date_tra,$horario_tra,$jefe_tra,$jefe_numero_trabajo,$sisben,$categoria_sis,$anterior_dire,$anterior_barrio_,$anterior_actividad_,$anterior_salario_,$anterior_date_,$anterior_horario_,$anterior_jefe_,$anterior_jefe_telefono_);
				return json_encode($formulario2A);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}

	function selectFormulario2_Independiente($base_,$id){
		try{
			if(isset($base_)){	
				$entryUser = selectFormulario2Independiente($base_,$id);
			    return json_encode($entryUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function insert_FormB2($base_,$id,$nombre_cony,$cedula_cony,$telefono_cony,$tipoUsuario_cony,$empresa_cony,$direccion_cony,$barrio_cony,$actividad_cony,$mensual_cony,$date_cony,$horario_cony,$jefe_cony,$jefe_num_cony,$cargo_cony,$tipo_trabajo){
		try
		{
			global $db;
			if(isset($base_)){
				$formulario2B = insertFormB2($base_,$id,$nombre_cony,$cedula_cony,$telefono_cony,$tipoUsuario_cony,$empresa_cony,$direccion_cony,$barrio_cony,$actividad_cony,$mensual_cony,$date_cony,$horario_cony,$jefe_cony,$jefe_num_cony,$cargo_cony,$tipo_trabajo);
				return json_encode($formulario2B);
			}
			else{
				return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
			}
		}
		catch(Exception $e){
			return array("code"=>500,"error"=>$e, "is_logged"=>false);
		}
	}

	function select_FormuB2($base_,$id){
		try{
			if(isset($base_)){	
				$entryUser = selectFormuB2($base_,$id);
			    return json_encode($entryUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}


	function get_updatefiles($base_,$fileDoc,$user,$tipo_user){
		try{
			if(isset($base_)){	
				$base = $db[$base_];
				if($tipo_user == 1){
					$entryWork = get_update_files($base_,$fileDoc,$user);
				}else{
					$entryWork = get_update_Propiedad($base_,$fileDoc,$user);
				}
				
			    return json_encode($entryWork);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}
 

	function upload_documents($base_,$fileAttached){
		try{
			if(isset($base_) && isset($fileAttached)){		
				$base = $db[$base_];		
				$chargeDocs = uploadDocuments($base,$fileAttached);
			    return json_encode($chargeDocs);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}


	function Select_Tip_Document($base_){
		try{
			if(isset($base_)){		
				$base = $db[$base_];		
				$selectDocument = SelectTipDocument($base_);
			    return json_encode($selectDocument);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function Selec_Est_Civil($base_){
		try{
			if(isset($base_)){		
				$selectCivil = SelecEstCivil($base_);
			    return json_encode($selectCivil);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function Selec_Programa($base_){
		try{
			if(isset($base_)){		
				$selectCivil = SelecPrograma($base_);
			    return json_encode($selectCivil);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function Selec_Sisben($base_){
		try{
			if(isset($base_)){		
				$selectSiben = SelecSisben($base_);
			    return json_encode($selectSiben);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function Selec_Concepto($base_){
		try{
			if(isset($base_)){		
				$selectCon = SelecConcepto($base_);
			    return json_encode($selectCon);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function Selec_Grupo($base_){
		try{
			if(isset($base_)){		
				$selectGrup = SelecGrupo($base_);
			    return json_encode($selectGrup);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function Selec_Tipo_Pared($base_){
		try{
			if(isset($base_)){		
				$selectGrup = SelecTipoPared($base_);
			    return json_encode($selectGrup);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function Selec_Tipo_Piso($base_){
		try{
			if(isset($base_)){		
				$selectGrup = SelecTipoPiso($base_);
			    return json_encode($selectGrup);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function Selec_Tipo_Vivienda($base_){
		try{
			if(isset($base_)){		
				$selectGrup = SelecTipoVivienda($base_);
			    return json_encode($selectGrup);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function deletedocumento($base_,$consec){
		try{
			if(isset($base_)){	
				$entryWork = delete_Documento($base_,$consec);
			    return json_encode($entryWork);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function deleteProp($base_,$consec){
		try{
			if(isset($base_)){	
				$entryWork = delete_Propiedad($base_,$consec);
			    return json_encode($entryWork);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function get_User($base_,$id){
		try{
			if(isset($base_)){	
				$entryUser = getUser($base_,$id);
			    return json_encode($entryUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function update_Form1A($base_,$id,$estado_civil,$tiempo_convi,$dir_vivienda,$sector,$barrio,$telefono_1,$telefono_2,$medio,$direccion){
		try {
			if(isset($base_)){
				$dataUser = updateForm1A($base_,$id,$estado_civil,$tiempo_convi,$dir_vivienda,$sector,$barrio,$telefono_1,$telefono_2,$medio,$direccion);
				return json_encode($dataUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		} catch (Exception $th) {
			return json_encode(array("code"=>500,"error"=>$th));
		}
	
	}

	function update_Sisben($base_,$id,$selectSisben){
		try{
			if(isset($base_)){	
				$entryUser = updateSisben($base_,$id,$selectSisben);
			    return json_encode($entryUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	
	function select_Formulario1B($base_,$id){
		try{
			if(isset($base_)){	
				$entryUser = selectFormulario1B($base_,$id);
			    return json_encode($entryUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function select_Formulario1A($base_,$id){
		try{
			if(isset($base_)){	
				$entryUser = selectFormulario1A($base_,$id);
			    return json_encode($entryUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function Insert_Form1B($base_,$id,$name,$identidad,$edad,$parent,$estudio,$lugarNac,$fecha){
		try{
			if(isset($base_)){		
				$InsertForm = InsertForm1B($base_,$id,$name,$identidad,$edad,$parent,$estudio,$lugarNac,$fecha);
			    return json_encode($InsertForm);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	
	function Insert_Form2_Contrato($base_,$id,$nombre_empresa,$cargo,$salario,$fecha_inicio,$caja_compensacion){
		try{
			if(isset($base_)){		
				$InsertForm = InsertForm2Contrato($base_,$id,$nombre_empresa,$cargo,$salario,$fecha_inicio,$caja_compensacion);
			    return json_encode($InsertForm);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function select_Form2_Contrato($base_,$id){
		try{
			if(isset($base_)){	
				$entryUser = selectForm2Contrato($base_,$id);
			    return json_encode($entryUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}


	function Insert_Form3_Vivienda($base_,$id,$direccion,$tel,$perte_familia,$parentesco,$n_habitantes,$arrendador,$tel_arrendador,$valor,$tiempo_permanencia,$tipo_perman,$estrato,$id_tipoVivienda,$n_piezas,$baño_compartido,$cocina_compartida,$patio_compartido){
		try{
			if(isset($base_)){		
				$InsertForm = InsertForm3Vivienda($base_,$id,$direccion,$tel,$perte_familia,$parentesco,$n_habitantes,$arrendador,$tel_arrendador,$valor,$tiempo_permanencia,$tipo_perman,$estrato,$id_tipoVivienda,$n_piezas,$baño_compartido,$cocina_compartida,$patio_compartido);
			    return json_encode($InsertForm);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function select_Form3_Vivienda($base_,$id){
		try{
			if(isset($base_)){	
				$entryUser = selectform3Vivienda($base_,$id);
			    return json_encode($entryUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function Insert_Form3_Servicios($base_,$id,$agua,$valor_agua,$luz,$valor_luz,$gasNatural,$valor_gasNatura,$telefono,$valor_telefono,$admin,$valor_admin){
		try{
			if(isset($base_)){		
				$InsertForm = InsertForm3Servicios($base_,$id,$agua,$valor_agua,$luz,$valor_luz,$gasNatural,$valor_gasNatura,$telefono,$valor_telefono,$admin,$valor_admin);
			    return json_encode($InsertForm);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}


	function Insert_Form3_Equipos($base_,$id,$tv,$equi_sonido,$grabadora,$computador,$lavadora,$nevera,$otros,$muebles_sala,$muebles_comedor,$muebles_alcobas,$otros_lugares,$situacion_especial){
		try{
			if(isset($base_)){		
				$InsertForm = InsertForm3Equipos($base_,$id,$tv,$equi_sonido,$grabadora,$computador,$lavadora,$nevera,$otros,$muebles_sala,$muebles_comedor,$muebles_alcobas,$otros_lugares,$situacion_especial);
			    return json_encode($InsertForm);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function select_form3_Servicios($base_,$id){
		try{
			if(isset($base_)){	
				$entryUser = selectform3Servicios($base_,$id);
			    return json_encode($entryUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function Insert_Form3_ViviendaAnterior ($base_,$id,$direccion,$tel_1,$arrendador,$tel_2,$valor_arriendo,$n_habitantes,$tiempo_permanencia,$estrato,$id_tipo_vivienda,$n_piezas,$baño_compartido,$cocina_compartida,$patio_compartido){
		try{
			if(isset($base_)){		
				$InsertForm = InsertForm3ViviendaAnterior ($base_,$id,$direccion,$tel_1,$arrendador,$tel_2,$valor_arriendo,$n_habitantes,$tiempo_permanencia,$estrato,$id_tipo_vivienda,$n_piezas,$baño_compartido,$cocina_compartida,$patio_compartido);
			    return json_encode($InsertForm);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function Insert_Form3_ServiciosAnterior ($base_,$id,$Agua,$motivoAgua,$Luz,$motivoLuz,$GasN,$motivoGasN,$Tel,$motivoTel,$Administra,$motivoAdministra){
		try{
			if(isset($base_)){		
				$InsertForm = InsertForm3ServiciosAnterior ($base_,$id,$Agua,$motivoAgua,$Luz,$motivoLuz,$GasN,$motivoGasN,$Tel,$motivoTel,$Administra,$motivoAdministra);
			    return json_encode($InsertForm);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}
	
	function select_form3_ViviendaAnterior($base_,$id){
		try{
			if(isset($base_)){	
				$entryUser = selectform3ViviendaAnterior($base_,$id);
			    return json_encode($entryUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function select_form3_Equipos($base_,$id){
		try{
			if(isset($base_)){	
				$entryUser = selectform3Equipos($base_,$id);
			    return json_encode($entryUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function select_form3_ServiciosAnterior($base_,$id){
		try{
			if(isset($base_)){	
				$entryUser = selectform3ServiciosAnterior($base_,$id);
			    return json_encode($entryUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function Insert_Form4Visita($base_,$id,$dateVisita,$horaIn,$horaFin,$tipo_grupo){
		try{
			if(isset($base_)){		
				$InsertForm = InsertForm4Visita($base_,$id,$dateVisita,$horaIn,$horaFin,$tipo_grupo);
			    return json_encode($InsertForm);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function select_form4_Visita($base_,$id){
		try{
			if(isset($base_)){	
				$entryUser = selectform4Visita($base_,$id);
			    return json_encode($entryUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function Insert_Form4Persona($base_,$id,$name,$identidad,$edad,$tipo_persona){
		try{
			if(isset($base_)){		
				$InsertForm = InsertForm4Persona($base_,$id,$name,$identidad,$edad,$tipo_persona);
			    return json_encode($InsertForm);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function select_form4_Persona($base_,$id){
		try{
			if(isset($base_)){	
				$entryUser = selectform4Persona($base_,$id);
			    return json_encode($entryUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function update_Form4_Vivienda($base_,$id,$arrendatario,$cel,$direccion,$sector,$barrio,$estrato,$valor,$instrucciones,$cantidad,$tiempoPerma){
		try{
			if(isset($base_)){	
				$entryUser = updateForm4Vivienda($base_,$id,$arrendatario,$cel,$direccion,$sector,$barrio,$estrato,$valor,$instrucciones,$cantidad,$tiempoPerma);
			    return json_encode($entryUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function select_form4_Vivienda($base_,$id){
		try{
			if(isset($base_)){	
				$entryUser = selectform4Vivienda($base_,$id);
			    return json_encode($entryUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function updateForm4B_tipo_Vivienda($base_,$id,$tip_vivienda,$n_pieza,$n_habitante,$baño,$cocina,$patio,$id_pared,$id_piso,$aseoPared,$aseoPiso,$aseoGeneral){
		try{
			if(isset($base_)){	
				$entryUser = updateForm4BVivienda($base_,$id,$tip_vivienda,$n_pieza,$n_habitante,$baño,$cocina,$patio,$id_pared,$id_piso,$aseoPared,$aseoPiso,$aseoGeneral);
			    return json_encode($entryUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}


	function updateForm4B_Servicios($base_,$id,$agua,$valor_agua,$gasNatural,$valor_gasNatural,$telefono,$valor_telefono){
		try{
			if(isset($base_)){	
				$entryUser = updateForm4BServicios($base_,$id,$agua,$valor_agua,$gasNatural,$valor_gasNatural,$telefono,$valor_telefono);
			    return json_encode($entryUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

	function updateForm4B_Equipos($base_,$id,$tv,$equi_sonido,$grabadora,$computador,$lavadora,$nevera,$secadora,$dvd,$vhs,$otro){
		try{
			if(isset($base_)){	
				$entryUser = updateForm4BEquipos($base_,$id,$tv,$equi_sonido,$grabadora,$computador,$lavadora,$nevera,$secadora,$dvd,$vhs,$otro);
			    return json_encode($entryUser);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"datos"));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}


	function eliminar_acentos($cadena){
		
		//Reemplazamos la A y a
		$cadena = str_replace(
		array('Á', 'À', 'Â', 'Ä', 'á', 'à', 'ä', 'â', 'ª'),
		array('A', 'A', 'A', 'A', 'a', 'a', 'a', 'a', 'a'),
		$cadena
		);
 
		//Reemplazamos la E y e
		$cadena = str_replace(
		array('É', 'È', 'Ê', 'Ë', 'é', 'è', 'ë', 'ê'),
		array('E', 'E', 'E', 'E', 'e', 'e', 'e', 'e'),
		$cadena );
 
		//Reemplazamos la I y i
		$cadena = str_replace(
		array('Í', 'Ì', 'Ï', 'Î', 'í', 'ì', 'ï', 'î'),
		array('I', 'I', 'I', 'I', 'i', 'i', 'i', 'i'),
		$cadena );
 
		//Reemplazamos la O y o
		$cadena = str_replace(
		array('Ó', 'Ò', 'Ö', 'Ô', 'ó', 'ò', 'ö', 'ô'),
		array('O', 'O', 'O', 'O', 'o', 'o', 'o', 'o'),
		$cadena );
 
		//Reemplazamos la U y u
		$cadena = str_replace(
		array('Ú', 'Ù', 'Û', 'Ü', 'ú', 'ù', 'ü', 'û'),
		array('U', 'U', 'U', 'U', 'u', 'u', 'u', 'u'),
		$cadena );
 
		//Reemplazamos la N, n, C y c
		$cadena = str_replace(
		array('Ñ', 'ñ', 'Ç', 'ç'),
		array('N', 'n', 'C', 'c'),
		$cadena
		);
		
		return $cadena;
	}

	/* $base = (!isset($_FILES['base']))?'corp':$_FILES['base'];
	$userLoged = isLoged($base); */

	 /* if($userLoged['is_logged']){ */
			
		/* $base=$db[$_POST['base']]; */
		switch ($_POST['param']) {
			case 'submit_nivel_satisfactorio':
				echo submit_nv_satisfactorio($_POST['base'],$_POST['codigo'],$_POST['nivel']);	
				break;
			case 'createUser':
				echo create_User($_POST['base'],$_POST['name'],$_POST['lastname'],$_POST['type_identification'],$_POST['identification'],$_POST['celphone']);
				break;
			case 'getCrateUser':
				echo get_Crate_User($_POST['base']);
				break;
			case 'InsertForm1A':
				echo Insert_Form1A($_POST['base'],$_POST['id'],$_POST['pregA'],$_POST['pregB'],$_POST['pregC'],$_POST['pregD'],$_POST['pregE'],$_POST['pregF'],$_POST['pregG'],$_POST['pregH'],$_POST['pregI'],$_POST['pregJ'],$_POST['pregK'],$_POST['pregL']);
				break;
			case 'InsertForm2A':
				echo Insert_Form2A($_POST['base'],$_POST['id'],$_POST['direccion_tra'],$_POST['barrio_tra'],$_POST['actividad_tra'],$_POST['ingreso_tra'],$_POST['date_tra'],$_POST['horario_tra'],$_POST['jefe_tra'],$_POST['jefe_numero_trabajo'],$_POST['sisben'],$_POST['categoria_sis'],$_POST['anterior_dire'],$_POST['anterior_barrio_'],$_POST['anterior_actividad_'],$_POST['anterior_salario_'],$_POST['anterior_date_'],$_POST['anterior_horario_'],$_POST['anterior_jefe_'],$_POST['anterior_jefe_telefono_']);
				break;
			case 'selectFormulario2Independiente':
				echo selectFormulario2_Independiente($_POST['base'],$_POST["id"]);
				break;
			case 'updatefiles':
				$fileDoc = uploadFile($_FILES,$_POST['user'],1);
				$user = ($_POST['user']);
				echo get_updatefiles($_POST['base'],$fileDoc,$user,1);
				break;
			case 'updatepropiedad':
				$fileDoc = uploadFile($_FILES,$_POST['user'],2);
				$user = ($_POST['user']);
				echo get_updatefiles($_POST['base'],$fileDoc,$user,2);
				break;	
			case 'uploadDocuments':
				$fileAttached = $_FILES["fileAttached"];
				echo upload_documents($_POST['base'],$fileAttached);
				break;
			case 'SelectTipDocumentos':
				echo Select_Tip_Document($_POST['base']);
				break;
			case 'SelecEstCivil':
				echo Selec_Est_Civil($_POST['base']);
				break;
			case 'SelecPrograma':
				echo Selec_Programa($_POST['base']);
				break;
			case 'SelecSisben':
				echo Selec_Sisben($_POST['base']);
				break;
			case 'SelecConcepto':
				echo Selec_Concepto($_POST['base']);
				break;
			case 'SelecGrupo':
				echo Selec_Grupo($_POST['base']);
				break;
			case 'SelecTipoPared':
				echo Selec_Tipo_Pared($_POST['base']);
				break;
			case 'SelecTipoPiso':
				echo Selec_Tipo_Piso($_POST['base']);
				break;
			case 'SelecTipoVivienda':
				echo Selec_Tipo_Vivienda($_POST['base']);
				break;
			case 'delete_documento':
				echo deletedocumento($_POST['base'],$_POST["consec"]);
				break;
			case 'delete_prop':
				echo deleteProp($_POST['base'],$_POST["consec"]);
				break;
			case 'getUser':
				echo get_User($_POST['base'],$_POST["id"]);
				break;
			case 'updateSisben':
				echo update_Sisben($_POST['base'],$_POST["id"],$_POST["selectSisben"]);
				break;
			case 'updateForm1A':
				echo update_Form1A($_POST['base'],$_POST["id"],$_POST["estado_civil"],$_POST["tiempo_convi"],$_POST["dir_vivienda"],$_POST["sector"],$_POST["barrio"],$_POST["telefono_1"],$_POST["telefono_2"],$_POST["medio"],$_POST["direccion"]);
				break;
			case 'insertFormB2':
				echo insert_FormB2($_POST['base'],$_POST["id"],$_POST["nombre_cony"],$_POST["cedula_cony"],$_POST["telefono_cony"],$_POST["tipoUsuario_cony"],$_POST["empresa_cony"],$_POST["direccion_cony"],$_POST["barrio_cony"],$_POST["actividad_cony"],$_POST["mensual_cony"],$_POST["date_cony"],$_POST["horario_cony"],$_POST["jefe_cony"],$_POST["jefe_num_cony"],$_POST["cargo_cony"],$_POST["tipo_trabajo"]);
				break;
			case 'selectFormuB2':
				echo select_FormuB2($_POST['base'],$_POST["id"]);
				break;
			case 'selectFormulario1A':
				echo select_Formulario1A($_POST['base'],$_POST["id"]);
				break;
			case 'selectFormulario1B':
				echo select_Formulario1B($_POST['base'],$_POST["id"]);
				break;
			case 'InsertForm1B':
				echo Insert_Form1B($_POST['base'],$_POST["id"],$_POST["name"],$_POST["identidad"],$_POST["edad"],$_POST["parent"],$_POST["estudio"],$_POST["lugarNac"],$_POST["fecha"]);
				break;
			case 'InsertForm2Contrato':
				echo Insert_Form2_Contrato($_POST['base'],$_POST["id"],$_POST["nombre_empresa"],$_POST["cargo"],$_POST["salario"],$_POST["fecha_inicio"],$_POST["caja_compensacion"]);
				break;
			case 'selectForm2Contrato':
				echo select_Form2_Contrato($_POST['base'],$_POST["id"]);
				break;
			case 'InsertForm3Vivienda':
				echo Insert_Form3_Vivienda($_POST['base'],$_POST["id"],$_POST["direccion"],$_POST["tel"],$_POST["perte_familia"],$_POST["parentesco"],$_POST["n_habitantes"],$_POST["arrendador"],$_POST["tel_arrendador"],$_POST["valor"],$_POST["tiempo_permanencia"],$_POST["tipo_perman"],$_POST["estrato"],$_POST["id_tipoVivienda"],$_POST["n_piezas"],$_POST["baño_compartido"],$_POST["cocina_compartida"],$_POST["patio_compartido"]);
				break;
			case 'selectform3Vivienda':
				echo select_Form3_Vivienda($_POST['base'],$_POST["id"]);
				break;
			case 'InsertForm3Servicios':
				echo Insert_Form3_Servicios($_POST['base'],$_POST["id"],$_POST["agua"],$_POST["valor_agua"],$_POST["luz"],$_POST["valor_luz"],$_POST["gasNatural"],$_POST["valor_gasNatura"],$_POST["telefono"],$_POST["valor_telefono"],$_POST["admin"],$_POST["valor_admin"]);
				break;
			case 'InsertForm3Equipos':
				echo Insert_Form3_Equipos($_POST['base'],$_POST["id"],$_POST["tv"],$_POST["equi_sonido"],$_POST["grabadora"],$_POST["computador"],$_POST["lavadora"],$_POST["nevera"],$_POST["otros"],$_POST["muebles_sala"],$_POST["muebles_comedor"],$_POST["muebles_alcobas"],$_POST["otros_lugares"],$_POST["situacion_especial"]);
				break;
			case 'selectform3Servicios':
				echo select_form3_Servicios($_POST['base'],$_POST["id"]);
				break;
			case 'selectform3Equipos':
				echo select_form3_Equipos($_POST['base'],$_POST["id"]);
				break;
			case 'InsertForm3ViviendaAnterior':
				echo Insert_Form3_ViviendaAnterior($_POST['base'],$_POST["id"],$_POST["direccion"],$_POST["tel_1"],$_POST["arrendador"],$_POST["tel_2"],$_POST["valor_arriendo"],$_POST["n_habitantes"],$_POST["tiempo_permanencia"],$_POST["estrato"],$_POST["id_tipo_vivienda"],$_POST["n_piezas"],$_POST["baño_compartido"],$_POST["cocina_compartida"],$_POST["patio_compartido"]);
				break;
			case 'InsertForm3ServiciosAnterior':
				echo Insert_Form3_ServiciosAnterior($_POST['base'],$_POST["id"],$_POST["Agua"],$_POST["motivoAgua"],$_POST["Luz"],$_POST["motivoLuz"],$_POST["GasN"],$_POST["motivoGasN"],$_POST["Tel"],$_POST["motivoTel"],$_POST["Administra"],$_POST["motivoAdministra"]);
				break;	
			case 'selectform3ViviendaAnterior':
				echo select_form3_ViviendaAnterior($_POST['base'],$_POST["id"]);
				break;
			case 'selectform3ServiciosAnterior':
				echo select_form3_ServiciosAnterior($_POST['base'],$_POST["id"]);
				break;
			case 'InsertForm4Visita':
				echo Insert_Form4Visita($_POST['base'],$_POST["id"],$_POST["dateVisita"],$_POST["horaIn"],$_POST["horaFin"],$_POST["tipo_grupo"]);
				break;	
			case 'selectform4Visita':
				echo select_form4_Visita($_POST['base'],$_POST["id"]);
				break;
			case 'InsertForm4Persona':
				echo Insert_Form4Persona($_POST['base'],$_POST["id"],$_POST["name"],$_POST["identidad"],$_POST["edad"],$_POST["tipo_persona"]);
				break;
			case 'selectform4Persona':
				echo select_form4_Persona($_POST['base'],$_POST["id"]);
				break;
			case 'updateForm4Vivienda':
				echo update_Form4_Vivienda($_POST['base'],$_POST["id"],$_POST["arrendatario"],$_POST["cel"],$_POST["direccion"],$_POST["sector"],$_POST["barrio"],$_POST["estrato"],$_POST["valor"],$_POST["instrucciones"],$_POST["cantidad"],$_POST["tiempoPerma"]);
				break;
			case 'selectform4Vivienda':
				echo select_form4_Vivienda($_POST['base'],$_POST["id"]);
				break;
			case 'updateForm4BVivienda':
				echo updateForm4B_tipo_Vivienda($_POST['base'],$_POST["id"],$_POST["tip_vivienda"],$_POST["n_pieza"],$_POST["n_habitante"],$_POST["baño"],$_POST["cocina"],$_POST["patio"],$_POST["id_pared"],$_POST["id_piso"],$_POST["aseoPared"],$_POST["aseoPiso"],$_POST["aseoGeneral"]);
				break;
			case 'updateForm4BServicios':
				echo updateForm4B_Servicios($_POST['base'],$_POST["id"],$_POST["agua"],$_POST["valor_agua"],$_POST["gasNatural"],$_POST["valor_gasNatural"],$_POST["telefono"],$_POST["valor_telefono"]);
				break;
			case 'updateForm4BEquipos':
				echo updateForm4B_Equipos($_POST['base'],$_POST["id"],$_POST["tv"],$_POST["equi_sonido"],$_POST["grabadora"],$_POST["computador"],$_POST["lavadora"],$_POST["nevera"],$_POST["secadora"],$_POST["dvd"],$_POST["vhs"],$_POST["otro"]);
				break;
							
			default:
				echo "<h1 class='animated bounce'>not param given...</h1>";
				break;
			
		}
			
/* 	}
	else{
		echo json_encode(array("response"=>array("code"=>400,"error"=>"no ha iniciado sesión o caduco","modules"=>array())));
	} */

?>