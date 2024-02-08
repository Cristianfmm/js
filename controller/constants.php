<?php
	$db_caa = 'caa'.date("Y");
	$db = array('caa'=>$db_caa, 'comunidad'=>'comunidadvirtual', 'r' =>'roles', 'encuestas' =>'encuestas', 'evaluations' =>'evaluations', 'curriculum' =>'curriculum','corp' =>'corpsanisidrio');
	function getAllModules(){
		global $db;
		$link = conectar_db($db["r"]);
		$query_modules = "SELECT id, module_name FROM module";
		$exec_query = mysql_query($query_modules,$link);
		$array_module = array();
		while ($result = (mysql_fetch_assoc($exec_query))) {
			$array_module[$result["id"]] = $result["module_name"];
		}
		mysql_close();
		return $array_module;
	}
	$modules = getAllModules();
?>