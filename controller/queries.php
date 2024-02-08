<?php 

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

    function make_login_corp($base,$user,$pass){
		try {
			global $db;
			$link = conectar_db($base);
	        $result =array();
	        //$id = $_SESSION["id"];
	        $user = base64_decode($user);
	        $pass = base64_decode($pass);
			
	        $userSession = new UserSession();
	        if (isset($_SESSION["id"])) {
	        	print_r("Entro Sesion Activa");
	        	$id_user = $userSession->getCurrentUser();
	        	$id_profile = $userSession->getCurrentProfile();
				$id_type = $userSession->getCurrentTypeSession();
	        	$result["data"] = $id_user;
	        	$result["perfil"] = $id_profile;
				$result["session"] = $id_type;

	        }else if($user != "false" && $pass != "false"){
				$pass_encrypt = md5($pass);
	        	
			        $query_ = "SELECT * FROM `login` WHERE `usuario`  = '$user' AND estado <> 'R'
					AND contraseña IN ('$pass','$pass_encrypt') ";


					$query = mysql_query($query_,$link);
					if (mysql_num_rows($query) > 0) {
						$data = mysql_fetch_assoc($query);
						$userSession->setCurrentUser($data["usuario"],$data["perfil"],3);
						$result["id"] = $data["usuario"];
						$result["perfil"] = $data["perfil"];
						  $result["data"] = true; 
					}
					else {
						$result["data"] = false;
					}
	        	
			}
			else {
	        	$result["data"] = false;
	        }
	        //print_r($result);
	        mysql_close($link);
	        return response($result);
	        //return true;
			
	       
        }
        catch (Exception $e) {
			$error = $e->getMessage();
			return array('code'=>500,'response'=>$error);
        }
    } 

	function get_Uinfo($base){
		try {
			$link = conectar_db($base);
	        $result =array();
	        $userSession = new UserSession();
	        $id = $userSession->getCurrentUser();
	        $query_ = "SELECT * FROM usuarios where id='$id'";
	        $query = mysql_query($query_,$link);
			if (mysql_num_rows($query) > 0) {
				$data = mysql_fetch_assoc($query);

				array_push($result,array("ID"=>$data['id'],"NOMBRE"=>$data['nombre'],"APELLIDOS"=>$data['apellidos'],"ID_TU"=>$data['id']));
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

	function get_module_Main_princip($base){
		try {
			$link = conectar_db($base);
	        $result =array();
	        $userSession = new UserSession();
	        $id = $userSession->getCurrentUser();

				$query_ = "SELECT   MP.consec AS id, MP.descripcion as description, MP.path as path_, MP.image as photo  from licence as L 
					LEFT JOIN modulos AS M ON M.consec = L.consec
					LEFT JOIN modulos_main AS MP ON MP.consec = M.id_module_main
					WHERE L.id_user = $id AND L.status=1
					GROUP BY MP.consec ORDER BY MP.consec ASC";
	        
	        // print_r($query_);
	       		 $query = mysql_query($query_,$link);
	        // if (isset($id) && isset($type_session)) {
		        if (mysql_num_rows($query) > 0) {
			        while ($data = mysql_fetch_assoc($query)){
			        	array_push($result,array("id"=>$data['id'],"module"=>$data['description'],"path"=>$data['path_'],"photo"=>base64_encode($data['photo'])));
			        }
		        }
		        else {
		        	array_push($result, false);
		        }
	        // }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}	
	}


	function getAccess($base){
		try {
			global $modules;
	        $link = conectar_db($base);
	        $result =array();
	        $userSession = new UserSession();
	        $id = $userSession->getCurrentUser();
    		$type_session = $userSession->getCurrentTypeSession();
	        $procedure = "SELECT id_modulo as module from  licence 
						where id_user =  $id and status = 1";	
	        $query = mysql_query($procedure,$link);
	        // if (isset($id) && isset($type_session)) {
		        if(mysql_num_rows($query)>0){
		            while($data = mysql_fetch_assoc($query)){
		             	if(isset($modules[$data['module']])){
		             		array_push($result,$data['module']);
		             	}
		            }
		        }
	        // }
	        mysql_close($link);
	        return response($result);
     	}
     	catch (Exception $e) {
        	$error = $e->getMessage();
         	return array('code'=>500,'response'=>$error);
     	}
	}

