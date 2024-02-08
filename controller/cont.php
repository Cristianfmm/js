<?php 
//hola pipee
	$root = realpath($_SERVER["DOCUMENT_ROOT"]);
	include("$root/funciones.php");
	//include("$root/includes/sesion2.inc");
	include("$root/includes/user_session.php");
	include("$root/controller/constants.php");
	include("queries.php");

		


	
	function get_access($base_){
		try{
			global $db;
			if(isset($base_)){
				$base = $db[$base_];			
				$access = getAccess($base);
			    return json_encode($access);
			}
			else{
				return json_encode(array("code"=>400,"error"=>"Todos los datos son requeridos..."));
			}
		}
		catch(Exception $e){
			return json_encode(array("code"=>500,"error"=>$e));
		}
	}

		function post_log_corp($base_,$user,$pass){
			try
			{
				global $db;
				if(isset($base_) && isset($user) && isset($pass)){
					$base = $db[$base_];
					$logged = make_login_corp($base,$user,$pass);
					return json_encode($logged);
					print_r($base,$user,$pass);
				}
				else{
					return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
				}
			}
			catch(Exception $e){
				return array("code"=>500,"error"=>$e, "is_logged"=>false);
			}
		}

		function post_modules_main($base_){
			try
			{
				global $db;
				if(isset($base_)){
					$base = $db[$base_];
					$modules = get_module_Main_princip($base);
					return json_encode($modules);
				}
				else{
					return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
				}
			}
			catch(Exception $e){
				return array("code"=>500,"error"=>$e, "is_logged"=>false);
			}
		}
		function get_UserInfo($base_){
			try
			{
				global $db;
				if(isset($base_)){
					$base = $db[$base_];
					$modules = get_Uinfo($base);
					return json_encode($modules);
				}
				else{
					return array("code"=>400,"error"=>"Todos los datos son requeridos...", "is_logged"=>false);
				}
			}
			catch(Exception $e){
				return array("code"=>500,"error"=>$e, "is_logged"=>false);
			}
		}



	switch ($_POST['param']) {
		case 'login_corp':
			echo post_log_corp($_POST['base'],$_POST['user'],$_POST['pass']);
			break;
		case 'getInfo':
			echo get_UserInfo($_POST['base']);	
			break;
		case 'getModMain':
			echo post_modules_main($_POST['base']);
			break;
		case 'permission':
			echo get_access($_POST['base']);
			break;
		default:
			echo "<h1 class='animated bounce'>not param given..</h1>";
			break;
	}