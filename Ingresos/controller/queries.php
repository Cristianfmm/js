<?php
	/**
	 * Created by PhpStorm.
	 * User:Cristian Martinez
	 * Date: 28/06/2023
	 * Time: 08:00 AM
	 *
	 * this module has all function to get OP actions
	 */

	header('Content-Type: text/html; charset=UTF-8');
	$root = realpath($_SERVER["DOCUMENT_ROOT"]);


	function response($result){
	    /**
	     * this function return an array with status code and response of action
	     *
	     * params:
	     * $result: array returned by database actions
	     * $client: object that contain all information of request response
	     */
	    if (!isset($result)){
	    	return array('code'=>500, 'response' => "error request");
	    } else if (empty(array_values($result))) {
	    	return array('code'=>400, 'response' => "response empty");
	    } else {
	    	return array('code'=>200,'response' => $result);
	    }
	}

	function cmp($a, $b){
		if(isset($a["NOMBRE"]) && isset($b["NOMBRE"])){
			return strcmp($a["NOMBRE"], $b["NOMBRE"]);
		}
	}

	
	function createUser ($base,$name,$lastname,$type_identification,$identification,$celphone) {
		try{
	        global $db;
	        $result = array();
	        $id = $_SESSION["id"];
	         $id_new = getNewId($base);
			/* $id_new = 111111; */
	        $result["id_new"] = $id_new;
			$names = strtoupper(trim($name));
	        $last_name = strtoupper(trim($lastname));
	        $link = conectar_db($base);
	        mysql_set_charset('utf8',$link);
			$sqlUser = "INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `id_tipo_doc`, `n_doc`, `celular`,`id_tipo_usuario`, `id_estado`) VALUES ('$id_new', '$names', '$last_name', '$type_identification', '$identification', '$celphone', '1', '1')";
			$queryUser = mysql_query($sqlUser, $link);	
			if(mysql_affected_rows() > 0){
				$result["created"] = true;
			}else{
				$result["created"] = false;
			}
			mysql_close($link);
			return response($result);

		}
		catch(Exception $e) {
			$error = $e->getMessage();
	        return array('error'=>'hubo un error en el servidor','descripcion'=>$error);
		}

	}



	function getNewId($base){
		try{
			global $db;
	        $result = array();
	        $id = $_SESSION["id"];
	        /* Año en que ingresaran los docentes, se cambiara a fin de año para las nuevas contrataciones */
	        $year_code = 10;
	        $created = false;
	        $link = conectar_db($base);
	        mysql_set_charset('utf8',$link);
	        $sql_cv ="SELECT U.id as Id
						FROM usuarios as U
						WHERE U.id LIKE '$year_code%' AND U.id_tipo_usuario NOT IN (2,55)
						ORDER BY U.id DESC
						LIMIT 1";

	        $query_cv = mysql_query($sql_cv, $link);

	        /* Se consulta en la tabla de usuarios del Registro Académico y tabla usuario en la Comunidad para validad cual fue el último "Id" creado para el año indicado en la variable $year_code */
	        if (mysql_num_rows($query_cv) == 0 ) {
	        	/* Si no hay ningún Id creado se crea el primero y se asigna valor True a la variable created para que no realice el proceso de calculo que se encuentra posterior a este bloque de condiciones */
	        	$id_new = $year_code."001";
	        	$created = true;
	        }
	        else {
        		/* Se comparan ambos resultados con el fin de determinar cual es el Id mayor creado entre ambas Bases de datos de esta manera el Id mayor es el que será tomado como último */
	        	
	        	$data_cv = mysql_fetch_assoc($query_cv);
	        	$id_last_cv = $data_cv["Id"];
	        	$id_last = $id_last_cv;
	        }
	        /* Si la variable no ha sido creada ingresa a realizar el calculo del siguiente Id */
	        if ($created != true) {
	        	/* El Id para el personal de la institución iniciaran con el año en curso o año para el cual ingresaran seguido de un número consecutivo Impar para diferenciarse de los estudiantes los cuales serán Pares */
	        	$range = explode("$year_code", $id_last);
	        	$serie = $range[1];
	        	/* Si el residuo del numero de serie es Par, para la condición que el residuo sea 0 lo que indica que es Par, aumentara el número para que conserve la consecución de número Impar */

	        	
				/* El número de serie constara de 3 digitos, en el caso que este número llegue a su límite es decir al 999, éste pasara a ser de 4 digitos es decir 1001 con el fin de conservar la serie */
				if ($serie == 999) {
					$id_new = $year_code.($serie + 1);
				}
				else {
					/* Por lo general el id se le sumarán 2 para que siga la consecución de Impar a Impar */
					$id_new = $id_last + 1;
				} 
	        }
	        mysql_close($link);
	        return $id_new;
	    }
	    catch(Exception $e) {
	        $error = $e->getMessage();
	        return array('error'=>'hubo un error en el servidor','descripcion'=>$error);
	    }
	}
	



	function getCrateUser($base){
		try {
	        $link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
	        $procedure = "SELECT U.*, TD.description, TD.abreviatura 
							FROM usuarios AS U
							LEFT JOIN tipo_documento AS TD ON TD.id_tipo_document = U.id_tipo_doc ORDER BY `U`.`id`  DESC"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id" => $data["id"], "nombre" => $data["nombre"], "apellidos" => $data["apellidos"], "documento" => $data["abreviatura"], "n_doc" => $data["n_doc"], "celular" => $data["celular"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	
	function getUser($base,$id){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT U.*, S.clasificacion AS clas_sisben, EC.descripcion AS estado_civil, EC.id AS id_civil, PR.descripcion AS prosgrama, DOC.file AS archivo, DOC2.file AS archivo_prop 
			FROM usuarios AS U
			LEFT JOIN tipo_documento AS TI ON TI.id_tipo_document = U.id_tipo_doc
			LEFT JOIN chargue_document AS DOC ON DOC.id = U.id
			LEFT JOIN chargue_propiedad AS DOC2 ON DOC2.id = U.id
			LEFT JOIN estado_civil AS EC ON EC.id = U.est_civil
			LEFT JOIN programas AS PR ON PR.id = U.id_programa
			LEFT JOIN Tipo_Sisben AS S ON S.id = U.id_sisben
			WHERE U.id_tipo_usuario = 1 AND U.id_estado = 1 AND U.id = '$id'
			ORDER BY U.id DESC"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
					$codigo = $data["id"];
					$nombre = $data["nombre"];
					$apellidos = $data["apellidos"];
					$doc_desc = $data["description"];
					$doc_abrev = $data["abreviatura"];
					$n_doc = $data["n_doc"];
					$celular = $data["celular"];

					$est_civil = $data["est_civil"];
					$tiempo_convivencia = $data["tiempo_convivencia"];
					$direccion = $data["direccion"];
					$sector = $data["sector"];
					$barrio = $data["barrio"];
					$tel1 = $data["tel1"];
					$tel2 = $data["tel2"];

					$id_sisben = $data["id_sisben"];
					$clas_sisben = $data["clas_sisben"];
					$archivo = $data["archivo"];
					$archivo_prop = $data["archivo_prop"];
					$estado_civil = $data["estado_civil"];
					$programa = $data["id_programa"];
					$programa_motivo = $data["programa_motivo"];
					$id_civil = $data["id_civil"];
	             	array_push($result, array("id" => $codigo, "nombre" => $nombre,"apellidos" => $apellidos,"doc_desc" => $doc_desc,"doc_abrev" => $doc_abrev,"n_doc" => $n_doc,"celular" => $celular,"estaCivil" => $estado_civil,"id_civil" => $id_civil,"programa" => $programa,"programa_motivo" => $programa_motivo,"archivo" => $archivo,"id_sisben" => $id_sisben,"clas_sisben" => $clas_sisben
					,"est_civil" => $est_civil,"tiempo_convivencia" => $tiempo_convivencia,"direccion" => $direccion,"sector" => $sector,"barrio" => $barrio,"tel1" => $tel1,"tel2" => $tel2,"archivo_prop" => $archivo_prop));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	
	function InsertForm1A($base,$id,$pregA,$pregB,$pregC,$pregD,$pregE,$pregF,$pregG,$pregH,$pregI,$pregJ,$pregK,$pregL){
		try {
	        $link = conectar_db($base);
	        $result =array();
	        $user_ = $_SESSION["id"];
			$formated_DATETIME = date('Y-m-d H:i:s');
			$pregA = ($pregA == 'SI')?1:0;
			$pregB = ($pregB == 'SI')?1:0;
			$pregC = ($pregC == 'SI')?1:0;
			$pregD = ($pregD == 'SI')?1:0;
			$pregE = ($pregE == 'SI')?1:0;
			$pregF = ($pregF == 'SI')?1:0;
			$pregG = ($pregG == 'SI')?1:0;
			$pregH = ($pregH == 'SI')?1:0;
			$pregI = ($pregI == 'SI')?1:0;
			$pregJ = ($pregJ == 'SI')?1:0;
			$pregK = ($pregK == 'SI')?1:0;
			$pregL = ($pregL == 'SI')?1:0;
	        $procedure = "INSERT INTO `formulario1_A` (`id_user`, `pregunta_a`, `pregunta_b`, `pregunta_c`, `pregunta_d`, `pregunta_e`, `pregunta_f`, `pregunta_g`, `pregunta_h`, `pregunta_i`, `pregunta_j`, `pregunta_k`, `pregunta_l`, `datatime`) 
							VALUES ('$id', '$pregA', '$pregB', '$pregC', '$pregD', '$pregE', '$pregF', '$pregG', '$pregH', '$pregI', '$pregJ', '$pregK', '$pregL', '$formated_DATETIME')
							ON DUPLICATE KEY UPDATE  pregunta_a = '$pregA', pregunta_b='$pregB', pregunta_c='$pregC', pregunta_d='$pregD', pregunta_e='$pregE', pregunta_f='$pregF' , pregunta_g='$pregG' , pregunta_h='$pregH' ,pregunta_i='$pregI',pregunta_j='$pregJ',pregunta_k='$pregK',pregunta_l='$pregL', datatime='$formated_DATETIME'";

	        			//print_r($procedure);
	        $query = mysql_query($procedure,$link);
	        if(mysql_affected_rows()>0){
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}	


	function get_update_files($base,$fileDoc,$user){
		try {
			$link = conectar_db($base);
			$result =array();
			$id = $_SESSION["id"];
			
			/* $array = [1 => "FOTO",2 => "REGISTRO_CIVIL",3=> "BOLETIN_ACADEMICO",4=> "BOLETIN",5=> "CERTIFICADO_ACADEMICOS",6=> "CERTIFICADO_CONDUCTA",7=> "RECIBO"]; 
			$separador = " ";
			$estudiante = explode($separador, $student); */
			if ($fileDoc["cod_valid"]==200){
				$file= $fileDoc["url"];
				$archivo = 'Documento_'.$user;
				$sql= "INSERT INTO `chargue_document`( `id`, `file`, `name_file`, `data_registro`) 
				VALUES ($user,'$file','$archivo',CURDATE())
				ON DUPLICATE KEY UPDATE
			    file = '$file', name_file = '$archivo' ,data_registro = CURDATE()";
				$query = mysql_query($sql,$link);
				if(mysql_affected_rows()>0){
						
					$sql1= "select id,name_file as nombre_archivo,file as archivo from chargue_document where id=$user";
					$query1 = mysql_query($sql1,$link);
					if(mysql_num_rows($query1)>0){
						while($data = mysql_fetch_assoc($query1)){
							array_push($result,array("cod_valid"=>200,"id"=>$data['id'],"nombre_archivo"=>$data['nombre_archivo'],"archivo"=>$data['archivo']));
						}
					}
				}
				else {
					array_push($result,array("cod_valid"=>500,"mess"=>$fileDoc["Mensaje"]));
				}
			}else {
				array_push($result,array("cod_valid"=>$fileDoc["cod_valid"],"mess"=> $fileDoc["Mensaje"]));
			}	
			mysql_close($link);
			return response($result);
		}catch (Exception $e) {
			$error = $e->getMessage();
			return array('code'=>500,'response'=>$error);
		}
	}

	
	function get_update_Propiedad($base,$fileDoc,$user){
		try {
			$link = conectar_db($base);
			$result =array();
			$id = $_SESSION["id"];
			if ($fileDoc["cod_valid"]==200){
				$file= $fileDoc["url"];
				$archivo = 'Documento_'.$user;
				$sql= "INSERT INTO `chargue_propiedad`( `id`, `file`, `name_file`, `data_registro`) 
				VALUES ($user,'$file','$archivo',CURDATE())
				ON DUPLICATE KEY UPDATE
			    file = '$file', name_file = '$archivo' ,data_registro = CURDATE()";
				$query = mysql_query($sql,$link);
				if(mysql_affected_rows()>0){
						
					$sql1= "select id,name_file as nombre_archivo,file as archivo from chargue_propiedad where id=$user";
					$query1 = mysql_query($sql1,$link);
					if(mysql_num_rows($query1)>0){
						while($data = mysql_fetch_assoc($query1)){
							array_push($result,array("cod_valid"=>200,"id"=>$data['id'],"nombre_archivo"=>$data['nombre_archivo'],"archivo"=>$data['archivo']));
						}
					}
				}
				else {
					array_push($result,array("cod_valid"=>500,"mess"=>$fileDoc["Mensaje"]));
				}
			}else {
				array_push($result,array("cod_valid"=>$fileDoc["cod_valid"],"mess"=> $fileDoc["Mensaje"]));
			}	
			mysql_close($link);
			return response($result);
		}catch (Exception $e) {
			$error = $e->getMessage();
			return array('code'=>500,'response'=>$error);
		}
	}



/* 	function uploadDocuments($base,$fileAttached){

		try {

	        $link = conectar_db($base);

	        $root = realpath($_SERVER["DOCUMENT_ROOT"]);

	        $result =array();

	        $id = $_SESSION["id"];

			//print_r($fileAttached);

		    $file = $fileAttached['name'];

		    $file = str_replace(" ", "_", $file);

		    $dir_ = $root."/CorporacionSanIsidro/Ingresos/documentos/".$id."";

		    if(!is_dir($dir_)) 

		        mkdir($dir_, 0777, true);

		    $route_doc = $dir_."/".$file;

		    if ($file && move_uploaded_file($fileAttached['tmp_name'],$dir_."/".$id.".pdf")){

		       sleep(3);

		       //$link_attached = $route_doc;

		       //$link_attached = "/Evaluations/anexos/".$id_evaluation."/".$file;

				$link_attached = "documentos/".$id."/".$id.".pdf";

    			$sql = "INSERT INTO document_register (id_student, link, date_register) VALUES ($id, '$link_attached', NOW()) ON DUPLICATE KEY UPDATE link = '$link_attached', date_register = NOW()"; 

	        	$query = mysql_query($sql,$link);

		        //print_r($sql);

		        if(mysql_affected_rows()){

		        	array_push($result,200);

		        	$result["result"] = date("d-m-Y h:i a");

		        }

		        else {

        			array_push($result,300);

		        }

		    }

		    else{

		    	// print_r("no se cargo el archivo");

        		array_push($result,500);

		    }

	        mysql_close($link);

	        return response($result);

     	}

     	catch (Exception $e) {

        	$error = $e->getMessage();

         	return array('code'=>500,'response'=>$error);

     	}

	} */

	function SelectTipDocument($base){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT * FROM `tipo_documento` WHERE estado = 1"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id" => $data["id_tipo_document"], "description" => $data["description"], "abreviatura" => $data["abreviatura"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function SelecEstCivil($base){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT * FROM `estado_civil` WHERE estado = 1"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id" => $data["id"], "description" => $data["descripcion"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	
	function SelecPrograma($base){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT * FROM `programas` WHERE estado = 1"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id" => $data["id"], "description" => $data["descripcion"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function SelecSisben($base){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT * FROM `Tipo_Sisben` WHERE estado = 1"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id" => $data["id"], "description" => $data["clasificacion"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function SelecConcepto($base){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT * FROM `Tipo_conceptos` WHERE estado = 1"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id" => $data["id"], "description" => $data["clasificacion"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function SelecGrupo($base){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT * FROM `Tipo_grupo` WHERE estado = 1"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id" => $data["id"], "description" => $data["clasificacion"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}
	
	function SelecTipoPared($base){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT * FROM `tipo_paredes` WHERE estado = 1"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id" => $data["id"], "description" => $data["clasificacion"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function SelecTipoPiso($base){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT * FROM `tipo_pisos` WHERE estado = 1"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id" => $data["id"], "description" => $data["clasificacion"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function SelecTipoVivienda($base){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT * FROM `tipo_vivienda` WHERE estado = 1"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id" => $data["id"], "description" => $data["descripcion"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

		
	function delete_Documento($base,$consec,$requisito){
		try{
			$link = conectar_db($base);
			$result = array();
			$proced_indicators = "DELETE FROM `chargue_document` WHERE `id`= '$consec'";
			$query_indicators = mysql_query($proced_indicators, $link);
			if(mysql_affected_rows()>0){
				array_push($result,array("cod_valid"=>true));
			}
			else{
				array_push($result, array("cod_valid"=>false));	
			}
			mysql_close($link);
			return response($result);
		}catch(Exception $e) {
			$error = $e->getMessage();
			return array('error'=>'hubo un error en el servidor','descripcion'=>$error);
		}	
	}

	function delete_Propiedad($base,$consec,$requisito){
		try{
			$link = conectar_db($base);
			$result = array();
			$proced_indicators = "DELETE FROM `chargue_propiedad` WHERE `id`= '$consec'";
			$query_indicators = mysql_query($proced_indicators, $link);
			if(mysql_affected_rows()>0){
				array_push($result,array("cod_valid"=>true));
			}
			else{
				array_push($result, array("cod_valid"=>false));	
			}
			mysql_close($link);
			return response($result);
		}catch(Exception $e) {
			$error = $e->getMessage();
			return array('error'=>'hubo un error en el servidor','descripcion'=>$error);
		}	
	}


	function InsertForm2A($base,$id_usua,$direccion_tra,$barrio_tra,$actividad_tra,$ingreso_tra,$date_tra,$horario_tra,$jefe_tra,$jefe_numero_trabajo,$sisben,$categoria_sis,$anterior_dire,$anterior_barrio_,$anterior_actividad_,$anterior_salario_,$anterior_date_,$anterior_horario_,$anterior_jefe_,$anterior_jefe_telefono_){
		try {
	        $link = conectar_db($base);
	        $result =array();
			$resultDelate = array();
	        $id = $_SESSION["id"];
			$formated_DATETIME = date('Y-m-d H:i:s');
			$delate_table = "DELETE FROM `formulario2_contrato` WHERE `formulario2_contrato`.`id_usuario` = $id_usua";
	        $procedure = "INSERT INTO `formulario2_independiente` (`id_usuario`, `id_ingreso`, `direccion_trabajo`, `barrio_trabajo`, `actividad_trabajo`, `ingreso_trabajo`, `date_trabajo`, `horario_trabajo`, `jefe_trabajo`, `jefe_numero_trabajo`, `sisben`, `categoria_sisben`, `anterior_direccion`, `anterior_barrio`, `anterior_actividad`, `anterior_salario`, `anterior_date`, `anterior_horario`, `anterior_jefe`, `anterior_jefe_telefono`, `fecha_ingreso`) 
			VALUES ('$id_usua', '$id', '$direccion_tra', '$barrio_tra', '$actividad_tra', '$ingreso_tra', '$date_tra', '$horario_tra', '$jefe_tra','$jefe_numero_trabajo', '$sisben', '$categoria_sis', '$anterior_dire', '$anterior_barrio_', '$anterior_actividad_', '$anterior_salario_', '$anterior_date_', '$anterior_horario_', '$anterior_jefe_', '$anterior_jefe_telefono_',NOW())
			ON DUPLICATE KEY UPDATE id_ingreso='$id', direccion_trabajo='$direccion_tra', barrio_trabajo='$barrio_tra', actividad_trabajo='$actividad_tra', ingreso_trabajo='$ingreso_tra', date_trabajo='$date_tra', horario_trabajo='$horario_tra', jefe_trabajo='$jefe_tra', jefe_numero_trabajo='$jefe_numero_trabajo', sisben='$sisben', categoria_sisben='$categoria_sis', anterior_direccion='$anterior_dire', anterior_barrio='$anterior_barrio_', anterior_actividad='$anterior_actividad_', anterior_salario='$anterior_salario_', anterior_date='$anterior_date_', anterior_horario='$anterior_horario_', anterior_jefe='$anterior_jefe_', anterior_jefe_telefono='$anterior_jefe_telefono_', fecha_ingreso = NOW()";
            //print_r($procedure);
	        $query = mysql_query($procedure,$link);
			$queryDelate = mysql_query($delate_table,$link);
			
	        if(mysql_affected_rows()>0){
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function selectFormulario2Independiente($base,$id){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT * FROM `formulario2_independiente` WHERE `id_usuario` = $id"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id" => $data["id_usuario"], "direccion" => $data["direccion_trabajo"], "barrio" => $data["barrio_trabajo"], "actividad" => $data["actividad_trabajo"], "ingreso" => $data["ingreso_trabajo"], 
					 "date_trabajo" => $data["date_trabajo"], "horario" => $data["horario_trabajo"], "jefe" => $data["jefe_trabajo"], "jefe_numero" => $data["jefe_numero_trabajo"], "sisben" => $data["sisben"], "categoria_sisben" => $data["categoria_sisben"]
					 , "anterior_direccion" => $data["anterior_direccion"], "anterior_barrio" => $data["anterior_barrio"], "anterior_actividad" => $data["anterior_actividad"], "anterior_salario" => $data["anterior_salario"], "anterior_date" => $data["anterior_date"]
					 , "anterior_horario" => $data["anterior_horario"], "anterior_jefe" => $data["anterior_jefe"], "anterior_jefe_telefono" => $data["anterior_jefe_telefono"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}


	function insertFormB2($base,$id_usua,$nombre_cony,$cedula_cony,$telefono_cony,$tipoUsuario_cony,$empresa_cony,$direccion_cony,$barrio_cony,$actividad_cony,$mensual_cony,$date_cony,$horario_cony,$jefe_cony,$jefe_num_cony,$cargo_cony,$tipo_trabajo){
		try {
	        $link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
			$formated_DATETIME = date('Y-m-d H:i:s');
	        $procedure = "INSERT INTO `formulario2_Conyuge` (`id_usuario`, `id_ingreso`, `nombre`, `cedula`, `telefono`, `estado`, `nombre_empresa`, `direccion_trabajo`, `barrio_trabajo`, `actividad_trabajo`, `cargo`, `salario_trabajo`, `date_trabajo`, `horario_trabajo`, `jefe_trabajo`, `jefe_numero_trabajo`, `tipo_trabajo`) 
							VALUES ('$id_usua','$id','$nombre_cony','$cedula_cony','$telefono_cony','$tipoUsuario_cony','$empresa_cony','$direccion_cony','$barrio_cony','$actividad_cony','$cargo_cony','$mensual_cony','$date_cony','$horario_cony','$jefe_cony','$jefe_num_cony','$tipo_trabajo')
							ON DUPLICATE KEY UPDATE id_usuario='$id_usua', id_ingreso = '$id', nombre='$nombre_cony', cedula='$cedula_cony',telefono='$telefono_cony',estado= '$tipoUsuario_cony',nombre_empresa='$empresa_cony',direccion_trabajo='$direccion_cony',barrio_trabajo='$barrio_cony',actividad_trabajo='$actividad_cony', cargo='$cargo_cony', salario_trabajo='$mensual_cony',date_trabajo='$date_cony',horario_trabajo='$horario_cony',jefe_trabajo='$jefe_cony',jefe_numero_trabajo='$jefe_num_cony',tipo_trabajo='$tipo_trabajo'";
            //print_r($procedure);
	        $query = mysql_query($procedure,$link);
	        if(mysql_affected_rows()>0){
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function selectFormuB2($base,$id){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT * FROM formulario2_Conyuge WHERE id_usuario = $id"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id" => $data["id_usuario"], "nombre" => $data["nombre"], "cedula" => $data["cedula"], "telefono" => $data["telefono"], "estado" => $data["estado"],
					"nombre_empresa" => $data["nombre_empresa"], "direccion" => $data["direccion_trabajo"], "barrio" => $data["barrio_trabajo"], "actividad" => $data["actividad_trabajo"], "cargo" => $data["cargo"], "salario" => $data["salario_trabajo"],
					 "date" => $data["date_trabajo"],"horario" => $data["horario_trabajo"],"jefe" => $data["jefe_trabajo"],"jefe_numero" => $data["jefe_numero_trabajo"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function InsertForm2Contrato($base,$id_usua,$nombre_empresa,$cargo,$salario,$fecha_inicio,$caja_compensacion){
		try {
	        $link = conectar_db($base);
	        $result =array();
	        $id = $_SESSION["id"];
			$formated_DATETIME = date('Y-m-d H:i:s');
			$delate_table = "DELETE FROM `formulario2_independiente` WHERE `formulario2_independiente`.`id_usuario` = $id_usua";
	        $procedure = "INSERT INTO `formulario2_contrato` (`id_usuario`, `id_ingreso`, `nombre_empresa`, `cargo`, `salario`, `fecha_inicio`, `caja_compensacion`, `fecha_ingreso`) 
			VALUES ('$id_usua', '$id', '$nombre_empresa', '$cargo', '$salario', '$fecha_inicio', '$caja_compensacion', NOW())
			ON DUPLICATE KEY UPDATE id_ingreso='$id', nombre_empresa='$nombre_empresa', cargo='$cargo', salario='$salario', fecha_inicio='$fecha_inicio', caja_compensacion='$caja_compensacion', fecha_ingreso = NOW()";
            //print_r($procedure);
	        $query = mysql_query($procedure,$link);
			$queryDelate = mysql_query($delate_table,$link);
	        if(mysql_affected_rows()>0){
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function selectForm2Contrato($base,$id){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT * FROM formulario2_contrato WHERE id_usuario = $id"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id" => $data["id_usuario"], "nombre_empresa" => $data["nombre_empresa"], "cargo" => $data["cargo"], "salario" => $data["salario"], "fecha_inicio" => $data["fecha_inicio"],"caja_compensacion" => $data["caja_compensacion"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function updateForm1A($base,$id,$estado_civil,$tiempo_convi,$dir_vivienda,$sector,$barrio,$telefono_1,$telefono_2,$medio,$direccion){
		try {
	        $link = conectar_db($base);
	        $result =array();
			$formated_DATETIME = date('Y-m-d H:i:s');
	        $procedure = "UPDATE `usuarios` SET est_civil = '$estado_civil', tiempo_convivencia = '$tiempo_convi', direccion = '$dir_vivienda', sector='$sector', barrio = '$barrio', tel1 = '$telefono_1', tel2 = '$telefono_2', id_programa = '$medio', programa_motivo = '$direccion' WHERE `usuarios`.`id` = $id";
            //print_r($procedure);
	        $query = mysql_query($procedure,$link);
	        if(mysql_affected_rows()>0){
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function updateSisben($base,$id,$selectSisben){
		try {
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "UPDATE `usuarios` SET `id_sisben` = '$selectSisben' WHERE `usuarios`.`id` = $id";
            //print_r($procedure);
	        $query = mysql_query($procedure,$link);
	        if(mysql_affected_rows()>0){
	        	array_push($result,true);
	        }
	        else {
	        	array_push($result,false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function selectFormulario1A($base,$id){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT * FROM formulario1_A WHERE id_user = $id"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id" => $data["id_user"], "pr_a" => $data["pregunta_a"], "pr_b" => $data["pregunta_b"], "pr_c" => $data["pregunta_c"], "pr_d" => $data["pregunta_d"],
					"pr_e" => $data["pregunta_e"], "pr_f" => $data["pregunta_f"], "pr_g" => $data["pregunta_g"], "pr_h" => $data["pregunta_h"], "pr_i" => $data["pregunta_i"], "pr_j" => $data["pregunta_j"], "pr_k" => $data["pregunta_k"], "pr_l" => $data["pregunta_l"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function selectFormulario1B($base,$id){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT * FROM `formulario1_B` WHERE `id_user` = $id"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id" => $data["id"], "nombres" => $data["nombres"], "n_document" => $data["n_document"], "edad" => $data["edad"], "parentesco" => $data["parentesco"], 
					 "estudios" => $data["estudios"], "lugar_nacimiento" => $data["lugar_nacimiento"], "fecha_naci" => $data["fecha_naci"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function InsertForm1B ($base,$id,$name,$identidad,$edad,$parent,$estudio,$lugarNac,$fecha) {
		try{
	        global $db;
	        $result = array();
	        $user = $_SESSION["id"];
	         $id_new = getNewId($base);
			/* $id_new = 111111; */
	        $result["id_new"] = $id_new;
			$names = strtoupper(trim($name));
	        $last_name = strtoupper(trim($lastname));
	        $link = conectar_db($base);
	        mysql_set_charset('utf8',$link);
			$sqlUser = "INSERT INTO `formulario1_B` (`id`, `nombres`, `n_document`, `edad`, `parentesco`, `estudios`, `lugar_nacimiento`, `fecha_naci`, `id_user`, `date_time`) 
			VALUES (NULL, '$name', '$identidad', '$edad', '$parent', '$estudio', '$lugarNac', '$fecha', '$id', NOW())";
			$queryUser = mysql_query($sqlUser, $link);	
			if(mysql_affected_rows() > 0){
				$result["created"] = true;
			}else{
				$result["created"] = false;
			}
			mysql_close($link);
			return response($result);

		}
		catch(Exception $e) {
			$error = $e->getMessage();
	        return array('error'=>'hubo un error en el servidor','descripcion'=>$error);
		}

	}

	function InsertForm3Vivienda ($base,$id,$direccion,$tel,$perte_familia,$parentesco,$n_habitantes,$arrendador,$tel_arrendador,$valor,$tiempo_permanencia,$tipo_perman,$estrato,$id_tipoVivienda,$n_piezas,$baño_compartido,$cocina_compartida,$patio_compartido) {
		try{
	        global $db;
	        $result = array();
	        $user = $_SESSION["id"];
			
	        /* $last_name = strtoupper(trim($lastname)); */
	        $link = conectar_db($base);
	        mysql_set_charset('utf8',$link);
			$sqlUser = "INSERT INTO `formulario3_viviendaActual` (`id`, `direccion`, `tel`, `pertenece_familia`, `parentesco`, `n_habitantes`, `arrendador`, `tel_arrendador`, `valor`, `tiempo_permanencia`, `tipo_permanencia`, `estrato`, `id_tipoVivienda`, `n_piezas`, `baño_compartido`, `cocina_compartida`, `patio_compartido`, `id_registro`, `fecha_registro`) 
						VALUES ('$id', '$direccion', '$tel', '$perte_familia', '$parentesco', '$n_habitantes', '$arrendador', '$tel_arrendador', '$valor', '$tiempo_permanencia', '$tipo_perman', '$estrato', '$id_tipoVivienda', '$n_piezas', '$baño_compartido', '$cocina_compartida', '$patio_compartido', '$user', NOW())
						ON DUPLICATE KEY UPDATE direccion = '$direccion' , tel = '$tel' , pertenece_familia = '$perte_familia' , parentesco = '$parentesco' , n_habitantes = '$n_habitantes' , arrendador = '$arrendador' , tel_arrendador = '$tel_arrendador' , valor = '$valor' , tiempo_permanencia = '$tiempo_permanencia' , tipo_permanencia ='$tipo_perman', estrato = '$estrato' , id_tipoVivienda = '$id_tipoVivienda' , n_piezas = '$n_piezas' , baño_compartido = '$baño_compartido' , cocina_compartida = '$cocina_compartida' , patio_compartido = '$patio_compartido' , id_registro = '$user' , fecha_registro = NOW() ";
			$queryUser = mysql_query($sqlUser, $link);	
			if(mysql_affected_rows() > 0){
				$result["created"] = true;
			}else{
				$result["created"] = false;
			}
			mysql_close($link);
			return response($result);

		}
		catch(Exception $e) {
			$error = $e->getMessage();
	        return array('error'=>'hubo un error en el servidor','descripcion'=>$error);
		}

	}

	function selectform3Vivienda($base,$id){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT * FROM `formulario3_viviendaActual` WHERE `id` = $id"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id" => $data["id"], "direccion" => $data["direccion"], "tel" => $data["tel"], "pertenece_familia" => $data["pertenece_familia"], "parentesco" => $data["parentesco"],
					"n_habitantes" => $data["n_habitantes"], "arrendador" => $data["arrendador"], "tel_arrendador" => $data["tel_arrendador"], "valor" => $data["valor"], "tiempo_permanencia" => $data["tiempo_permanencia"], "tipo_permanencia" => $data["tipo_permanencia"],
					"estrato" => $data["estrato"], "id_tipoVivienda" => $data["id_tipoVivienda"], "n_piezas" => $data["n_piezas"], "baño_compartido" => $data["baño_compartido"], "cocina_compartida" => $data["cocina_compartida"], "patio_compartido" => $data["patio_compartido"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function InsertForm3Servicios ($base,$id,$agua,$valor_agua,$luz,$valor_luz,$gasNatural,$valor_gasNatura,$telefono,$valor_telefono,$admin,$valor_admin) {
		try{
	        global $db;
	        $result = array();
	        $user = $_SESSION["id"];
			
	        /* $last_name = strtoupper(trim($lastname)); */
	        $link = conectar_db($base);
	        mysql_set_charset('utf8',$link);
			$sqlUser = "INSERT INTO `formulario3_servicios` (`id`, `agua`, `valor_agua`, `luz`, `valor_luz`, `gasNatural`, `valor_gasNatura`, `telefono`, `valor_telefono`, `admin_`, `valor_admin`, `id_registro`, `fecha_registro`)
						VALUES ('$id', '$agua', '$valor_agua', '$luz', '$valor_luz', '$gasNatural', '$valor_gasNatura', '$telefono', '$valor_telefono', '$admin', '$valor_admin', '$id_registro', NOW() )
						ON DUPLICATE KEY UPDATE  agua= '$agua' , valor_agua = '$valor_agua' , luz = '$luz' , valor_luz = '$valor_luz' , gasNatural = '$gasNatural' , valor_gasNatura = '$valor_gasNatura' , telefono = '$telefono' , valor_telefono = '$valor_telefono' , admin_ = '$admin' , valor_admin = '$valor_admin' , id_registro = '$user' , fecha_registro = NOW() ";
			$queryUser = mysql_query($sqlUser, $link);	
			if(mysql_affected_rows() > 0){
				$result["created"] = true;
			}else{
				$result["created"] = false;
			}
			mysql_close($link);
			return response($result);

		}
		catch(Exception $e) {
			$error = $e->getMessage();
	        return array('error'=>'hubo un error en el servidor','descripcion'=>$error);
		}

	}

	function selectform3Servicios($base,$id){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT  * FROM formulario3_servicios WHERE id = $id"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){ 
	             	array_push($result, array("id" => $data["id"], "Agua" => $data["agua"], "costoAgua" => $data["valor_agua"], "Luz" => $data["luz"], "costoLuz" => $data["valor_luz"], 
					 "Gas" => $data["gasNatural"], "costoGas" => $data["valor_gasNatura"], "Telefono" => $data["telefono"], "costoTelefono" => $data["valor_telefono"], "Admini" => $data["admin_"], "costoAdminis" => $data["valor_admin"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}



	function InsertForm3Equipos ($base,$id,$tv,$equi_sonido,$grabadora,$computador,$lavadora,$nevera,$otros,$muebles_sala,$muebles_comedor,$muebles_alcobas,$otros_lugares,$situacion_especial) {
		try{
	        global $db;
	        $result = array();
	        $user = $_SESSION["id"];
			
	        /* $last_name = strtoupper(trim($lastname)); */
	        $link = conectar_db($base);
	        mysql_set_charset('utf8',$link);
			$sqlUser = "INSERT INTO `formulario3_equipos` (`id`, `tv`, `equi_sonido`, `grabadora`, `computador`, `lavadora`, `nevera`, `otros`, `muebles_sala`, `muebles_comedor`, `muebles_alcobas`, `otros_lugares`, `situacion_especial`, `id_ingreso`, `fecha_ingreso`)
						VALUES ('$id', '$tv', '$equi_sonido', '$grabadora', '$computador', '$lavadora', '$nevera', '$otros', '$muebles_sala', '$muebles_comedor', '$muebles_alcobas', '$otros_lugares', '$situacion_especial', '$user', NOW())
						ON DUPLICATE KEY UPDATE tv = '$tv' , equi_sonido = '$equi_sonido' , grabadora = '$grabadora' , computador = '$computador' , lavadora = '$lavadora' , nevera = '$nevera' , otros = '$otros' , muebles_sala = '$muebles_sala' , muebles_comedor = '$muebles_comedor' , muebles_alcobas = '$muebles_alcobas' , otros_lugares = '$otros_lugares' , situacion_especial = '$situacion_especial', id_ingreso = '$user' , fecha_ingreso = NOW() ";
			$queryUser = mysql_query($sqlUser, $link);	
			if(mysql_affected_rows() > 0){
				$result["created"] = true;
			}else{
				$result["created"] = false;
			}
			mysql_close($link);
			return response($result);

		}
		catch(Exception $e) {
			$error = $e->getMessage();
	        return array('error'=>'hubo un error en el servidor','descripcion'=>$error);
		}

	}

	function selectform3Equipos($base,$id){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT  * FROM formulario3_equipos WHERE id = $id"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){ 
	             	array_push($result, array("id" => $data["id"], "tv" => $data["tv"], "equi_sonido" => $data["equi_sonido"], "grabadora" => $data["grabadora"], "computador" => $data["computador"], 
					 "lavadora" => $data["lavadora"], "nevera" => $data["nevera"], "otros" => $data["otros"], "muebles_sala" => $data["muebles_sala"], "muebles_comedor" => $data["muebles_comedor"],
					  "muebles_alcobas" => $data["muebles_alcobas"],"otros_lugares" => $data["otros_lugares"],"situacion_especial" => $data["situacion_especial"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}


	function InsertForm3ViviendaAnterior ($base,$id,$direccion,$tel_1,$arrendador,$tel_2,$valor_arriendo,$n_habitantes,$tiempo_permanencia,$estrato,$id_tipo_vivienda,$n_piezas,$baño_compartido,$cocina_compartida,$patio_compartido) {
		try{
	        global $db;
	        $result = array();
	        $user = $_SESSION["id"];
	        $link = conectar_db($base);
	        mysql_set_charset('utf8',$link);
			$sqlUser = "INSERT INTO `formulario3_ViviendaAnterior` (`id`, `direccion`, `tel_1`, `arrendador`, `tel_2`,`valor_arriendo`, `n_habitantes`, `tiempo_permanencia`, `estrato`, `id_tipo_vivienda`, `n_piezas`, `baño_compartido`, `cocina_compartida`, `patio_compartido`, `id_registro`, `fecha_registro`)
						VALUES ('$id', '$direccion', '$tel_1', '$arrendador', '$tel_2', '$valor_arriendo', '$n_habitantes', '$tiempo_permanencia', '$estrato', '$id_tipo_vivienda', '$n_piezas', '$baño_compartido', '$cocina_compartida', '$patio_compartido', '$user', NOW())
						ON DUPLICATE KEY UPDATE direccion = '$direccion' , tel_1 = '$tel_1' , arrendador = '$arrendador' , tel_2 = '$tel_2' , valor_arriendo = '$valor_arriendo' , n_habitantes = '$n_habitantes' , tiempo_permanencia = '$tiempo_permanencia' , estrato = '$estrato' , id_tipo_vivienda = '$id_tipo_vivienda' , n_piezas = '$n_piezas' , baño_compartido = '$baño_compartido' , 	cocina_compartida = '$cocina_compartida' , patio_compartido = '$patio_compartido', 	id_registro = '$user' , fecha_registro = NOW() ";
			$queryUser = mysql_query($sqlUser, $link);	
			if(mysql_affected_rows() > 0){
				$result["created"] = true;
			}else{
				$result["created"] = false;
			}
			mysql_close($link);
			return response($result);

		}
		catch(Exception $e) {
			$error = $e->getMessage();
	        return array('error'=>'hubo un error en el servidor','descripcion'=>$error);
		}
	}

	function selectform3ViviendaAnterior($base,$id){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT  * FROM formulario3_ViviendaAnterior WHERE id = $id"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){ 
	             	array_push($result, array("id" => $data["id"], "dire_anterior" => $data["direccion"], "tele_anterior" => $data["tel_1"], "nombre_arrend" => $data["arrendador"], "telefono_arrend" => $data["tel_2"], 
					 "costo_arrendo" => $data["valor_arriendo"],"cuantas_arrendo" => $data["n_habitantes"], "cuanto_vivieron" => $data["tiempo_permanencia"], "cuanto_estrato" => $data["estrato"], "tipo_vivienda" => $data["id_tipo_vivienda"], 
					 "div_casaInput" => $data["n_piezas"],"baño_compartido" => $data["baño_compartido"],"cocina_compartida" => $data["cocina_compartida"],"patio_compartido" => $data["patio_compartido"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function InsertForm3ServiciosAnterior ($base,$id,$Agua,$motivoAgua,$Luz,$motivoLuz,$GasN,$motivoGasN,$Tel,$motivoTel,$Administra,$motivoAdministra) {
		try{
	        global $db;
	        $result = array();
	        $user = $_SESSION["id"];
	        $link = conectar_db($base);
	        mysql_set_charset('utf8',$link);
			$sqlUser = "INSERT INTO `formulario3_serviciosAnterior` (`id`, `Agua`, `motivoAgua`, `Luz`, `motivoLuz`, `GasN`, `motivoGasN`, `Tel`, `motivoTel`, `Administra`, `motivoAdministra`, `id_registro`, `fecha_registro`)
						VALUES ('$id', '$Agua', '$motivoAgua', '$Luz', '$motivoLuz', '$GasN', '$motivoGasN', '$Tel', '$motivoTel', '$Administra', '$motivoAdministra', '$user', NOW())
						ON DUPLICATE KEY UPDATE Agua = '$Agua' , motivoAgua = '$motivoAgua', Luz = '$Luz', motivoLuz = '$motivoLuz', GasN = '$GasN', motivoGasN = '$motivoGasN', Tel = '$Tel', motivoTel = '$motivoTel', Administra = '$Administra', motivoAdministra = '$motivoAdministra', id_registro = '$user' , fecha_registro = NOW() ";
			$queryUser = mysql_query($sqlUser, $link);	
			if(mysql_affected_rows() > 0){
				$result["created"] = true;
			}else{
				$result["created"] = false;
			}
			mysql_close($link);
			return response($result);

		}
		catch(Exception $e) {
			$error = $e->getMessage();
	        return array('error'=>'hubo un error en el servidor','descripcion'=>$error);
		}
	}
	
	function selectform3ServiciosAnterior($base,$id){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT  * FROM formulario3_serviciosAnterior WHERE id = $id"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){ 
	             	array_push($result, array("id" => $data["id"], "Agua" => $data["Agua"], "motivoAgua" => $data["motivoAgua"], "Luz" => $data["Luz"],"motivoLuz" => $data["motivoLuz"], "GasN" => $data["GasN"],
					 "motivoGasN" => $data["motivoGasN"],"Tel" => $data["Tel"],"motivoTel" => $data["motivoTel"],"Administra" => $data["Administra"], "motivoAdministra" => $data["motivoAdministra"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	function InsertForm4Visita ($base,$id,$dateVisita,$horaIn,$horaFin,$tipo_grupo) {
		try{
	        global $db;
	        $result = array();
	        $user = $_SESSION["id"];
	        $link = conectar_db($base);
	        mysql_set_charset('utf8',$link);
			$sqlUser = "INSERT INTO `formulario4_visita` (`id_user`, `fechaVisita`, `horaInicio`, `horaFin`, `id_grupo`, `id_ingreso`, `dateIngreso`) 
						VALUES ($id, '$dateVisita', '$horaIn', '$horaFin', '$tipo_grupo', '$user', NOW())
						ON DUPLICATE KEY UPDATE fechaVisita = '$dateVisita', horaInicio ='$horaIn', horaFin = '$horaFin', id_grupo = '$tipo_grupo',  id_ingreso = '$user', dateIngreso = NOW()";
			$queryUser = mysql_query($sqlUser, $link);	
			if(mysql_affected_rows() > 0){
				$result["created"] = true;
			}else{
				$result["created"] = false;
			}
			mysql_close($link);
			return response($result);

		}
		catch(Exception $e) {
			$error = $e->getMessage();
	        return array('error'=>'hubo un error en el servidor','descripcion'=>$error);
		}

	}

	
	function selectform4Visita($base,$id){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT * FROM `formulario4_visita` WHERE `id_user` = $id"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id" => $data["id"], "fechaVisita" => $data["fechaVisita"], "horaInicio" => $data["horaInicio"], "horaFin" => $data["horaFin"], "id_grupo" => $data["id_grupo"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}


	function InsertForm4Persona ($base,$id,$name,$identidad,$edad,$tipo_persona) {
		try{
	        global $db;
	        $result = array();
	        $user = $_SESSION["id"];
			/* $names = strtoupper(trim($name)); */
	        $link = conectar_db($base);
	        mysql_set_charset('utf8',$link);
			$sqlUser = "INSERT INTO `formulario4_persona` (`id_user`, `nombres`, `cedula`, `edad`, `id_tipo_usuario`, `id_ingreso`, `fecha_ingreso`) 
						VALUES ('$id', '$name', '$identidad', '$edad', '$tipo_persona', '$user',NOW())
						ON DUPLICATE KEY UPDATE nombres = '$name', cedula = '$identidad',  edad = '$edad', id_ingreso= '$user', fecha_ingreso = NOW()";

			$queryUser = mysql_query($sqlUser, $link);	
			if(mysql_affected_rows() > 0){
				$result["created"] = true;
			}else{
				$result["created"] = false;
			}
			mysql_close($link);
			return response($result);

		}
		catch(Exception $e) {
			$error = $e->getMessage();
	        return array('error'=>'hubo un error en el servidor','descripcion'=>$error);
		}

	}

	function selectform4Persona($base,$id){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT  U.id, FH.nombres AS nombres_hogar, FH.cedula AS cedula_hogar, FH.edad AS edad_hogar,FC.nombres AS nombres_conyu, FC.cedula AS cedula_conyu, FC.edad AS edad_conyu
							FROM usuarios AS U
							LEFT JOIN formulario4_persona AS FH ON FH.id_user = U.id AND FH.id_tipo_usuario = 2
							LEFT JOIN formulario4_persona AS FC ON FC.id_user = U.id AND FC.id_tipo_usuario = 3
							WHERE U.id = $id"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){
	             	array_push($result, array("id" => $data["id"], "nombres_hogar" => $data["nombres_hogar"], "cedula_hogar" => $data["cedula_hogar"], "edad_hogar" => $data["edad_hogar"], "nombres_conyu" => $data["nombres_conyu"]
					 , "cedula_conyu" => $data["cedula_conyu"], "edad_conyu" => $data["edad_conyu"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}


	function updateForm4Vivienda ($base,$id,$arrendatario,$cel,$direccion,$sector,$barrio,$estrato,$valor,$instrucciones,$cantidad,$tiempoPerma) {
		try{
	        global $db;
	        $result = array();
	        $user = $_SESSION["id"];
			/* $names = strtoupper(trim($name)); */
	        $link = conectar_db($base);
	        mysql_set_charset('utf8',$link);
			$sqlUser = "INSERT INTO `formulario4_vivienda` (`id`, `nombre_arrendatario`, `cel_arrendatario`, `dir_arrendatario`, `sector`, `barrio`, `estrato`, `valor_arriendo`, `instrucciones_llegada`, `personas_habitan`, `tiempo_permanencia`, `id_ingreso`, `fecha_ingreso`) 
						
						VALUES ('$id', '$arrendatario', '$cel', '$direccion', '$sector', '$barrio', '$estrato', '$valor', '$instrucciones', '$cantidad', '$tiempoPerma', '$user', NOW())
					
						ON DUPLICATE KEY UPDATE nombre_arrendatario = '$arrendatario', cel_arrendatario = '$cel', dir_arrendatario = '$direccion', sector = '$sector', barrio = '$barrio', estrato = '$estrato', valor_arriendo = '$valor', instrucciones_llegada = '$instrucciones', personas_habitan = '$cantidad', tiempo_permanencia = '$tiempoPerma', id_ingreso = '$user', fecha_ingreso = NOW()";

			$queryUser = mysql_query($sqlUser, $link);	
			if(mysql_affected_rows() > 0){
				$result["created"] = true;
			}else{
				$result["created"] = false;
			}
			mysql_close($link);
			return response($result);

		}
		catch(Exception $e) {
			$error = $e->getMessage();
	        return array('error'=>'hubo un error en el servidor','descripcion'=>$error);
		}

	}

	function selectform4Vivienda($base,$id){
		try {
			global $db;
	        $link = conectar_db($base);
	        $result =array();
	        $procedure = "SELECT  * FROM formulario4_vivienda WHERE id = $id"; 
	        $query = mysql_query($procedure,$link);
	        if(mysql_num_rows($query)>0){
	            while($data = mysql_fetch_assoc($query)){ 
	             	array_push($result, array("id" => $data["id"], "arrendatario" => $data["nombre_arrendatario"], "cel" => $data["cel_arrendatario"], "direccion" => $data["dir_arrendatario"], "sector" => $data["sector"], 
					 "barrio" => $data["barrio"], "estrato" => $data["estrato"], "valor_arriendo" => $data["valor_arriendo"], "instrucciones_llegada" => $data["instrucciones_llegada"], "personas_habitan" => $data["personas_habitan"], "tiempo_permanencia" => $data["tiempo_permanencia"]));
	            }
	        }
	        else {
	        	array_push($result, false);
	        }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

	
	function updateForm4BVivienda ($base,$id,$tip_vivienda,$n_pieza,$n_habitante,$baño,$cocina,$patio,$id_pared,$id_piso,$aseoPared,$aseoPiso,$aseoGeneral) {
		try{
	        global $db;
	        $result = array();
	        $user = $_SESSION["id"];
			/* $names = strtoupper(trim($name)); */
	        $link = conectar_db($base);
	        mysql_set_charset('utf8',$link);
			$sqlUser = "INSERT INTO `formulario4_vivienda` (`id`, `id_tipo_vivienda`,`n_piezas`, `n_habitantes`, `baño_compartido`, `cocina_compartida`, `patio_compartido`, `id_paredes`, `id_piso`, `id_concepto_aseoPared`, `id_concepto_aseoPiso`,`id_concepto_aseoGeneral` , `id_registro`, `fecha_registro`) 			
						VALUES ('$id','$tip_vivienda','$n_pieza','$n_habitante','$baño','$cocina','$patio','$id_pared','$id_piso','$aseoPared','$aseoPiso','$aseoGeneral' , '$user', NOW())
						ON DUPLICATE KEY UPDATE id_tipo_vivienda = '$tip_vivienda', n_piezas = '$n_pieza', n_habitantes = '$n_habitante', baño_compartido = '$baño', cocina_compartida = '$cocina', patio_compartido = '$patio', id_paredes = '$id_pared', id_piso = '$id_piso', id_concepto_aseoPared = '$aseoPared', id_concepto_aseoPiso = '$aseoPiso', id_concepto_aseoGeneral = '$aseoGeneral', id_registro = '$user', fecha_registro = NOW()";
			$queryUser = mysql_query($sqlUser, $link);	
			if(mysql_affected_rows() > 0){
				$result["created"] = true;
			}else{
				$result["created"] = false;
			}
			mysql_close($link);
			return response($result);

		}
		catch(Exception $e) {
			$error = $e->getMessage();
	        return array('error'=>'hubo un error en el servidor','descripcion'=>$error);
		}

	}

	function updateForm4BServicios ($base,$id,$agua,$valor_agua,$gasNatural,$valor_gasNatural,$telefono,$valor_telefono) {
		try{
	        global $db;
	        $result = array();
	        $user = $_SESSION["id"];
			/* $names = strtoupper(trim($name)); */
	        $link = conectar_db($base);
	        mysql_set_charset('utf8',$link);
			$sqlUser = "INSERT INTO `formulario4_tipo_vivienda` (`id`, `agua`, `valor_agua`, `gasNatural`, `valor_gasNatural`, `telefono`, `valor_telefono`, `id_registro`, `fecha_registro`) 			
						VALUES ('$id','$agua','$valor_agua','$gasNatural','$valor_gasNatural','$telefono','$valor_telefono', '$user', NOW())
						ON DUPLICATE KEY UPDATE agua = '$agua', valor_agua = '$valor_agua', gasNatural = '$gasNatural', valor_gasNatural = '$valor_gasNatural', telefono = '$telefono', valor_telefono = '$valor_telefono', id_registro = '$user', fecha_registro = NOW()";
			$queryUser = mysql_query($sqlUser, $link);	
			if(mysql_affected_rows() > 0){
				$result["created"] = true;
			}else{
				$result["created"] = false;
			}
			mysql_close($link);
			return response($result);

		}
		catch(Exception $e) {
			$error = $e->getMessage();
	        return array('error'=>'hubo un error en el servidor','descripcion'=>$error);
		}

	}


	function updateForm4BEquipos ($base,$id,$tv,$equi_sonido,$grabadora,$computador,$lavadora,$nevera,$secadora,$dvd,$vhs,$otro) {
		try{
	        global $db;
	        $result = array();
	        $user = $_SESSION["id"];
			/* $names = strtoupper(trim($name)); */
	        $link = conectar_db($base);
	        mysql_set_charset('utf8',$link);
			$sqlUser = "INSERT INTO `formulario4_equipos` (`id`, `tv`,`equi_sonido`, `grabadora`, `computador`, `lavadora`, `nevera`, `secadora`, `dvd`, `vhs`, `otro`, `id_ingreso`, `fecha_ingreso`) 			
						VALUES ('$id','$tv','$equi_sonido','$grabadora','$computador','$lavadora','$nevera','$secadora','$dvd','$vhs','$otro', '$user', NOW())
						ON DUPLICATE KEY UPDATE tv = '$tv', equi_sonido = '$equi_sonido', grabadora = '$grabadora', computador = '$computador', lavadora = '$lavadora', nevera = '$nevera', secadora = '$secadora', dvd = '$dvd', vhs = '$vhs', otro = '$otro', id_ingreso = '$user', fecha_ingreso = NOW()";
			$queryUser = mysql_query($sqlUser, $link);	
			if(mysql_affected_rows() > 0){
				$result["created"] = true;
			}else{
				$result["created"] = false;
			}
			mysql_close($link);
			return response($result);

		}
		catch(Exception $e) {
			$error = $e->getMessage();
	        return array('error'=>'hubo un error en el servidor','descripcion'=>$error);
		}

	}

?>