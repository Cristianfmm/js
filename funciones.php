<?php 
$link = conectar_db("corpsanisidrio");
mysql_query("SET NAMES 'utf8'");
//header('Content-Type: text/html; charset=UTF-8');
date_default_timezone_set('America/Bogota'); 
$Submit=$_POST['Submit'];
$submit=$_POST['submit'];
$id=$_SESSION['id'];
$perfil=$_SESSION['perfil'];
$cp=$_SESSION['cp'];
$link = conectar_db("corpsanisidrio");
$id=$_SESSION['id']; 
$perfil=$_SESSION['perfil'];
$cp=$_SESSION['cp'];
$settingDB = "mysql:host=localhost;dbname=";
$userDB = 'cvuser_root';
$passDB = '4nG!oCa4';
function connectPdo($db){
  $db = "cvuser_".$db;
  try {
    $dbh = new PDO('mysql:host=localhost;dbname='.$db, 'cvuser_root', '4nG!oCa4');
    $dbh->exec("set names utf8");
    return $dbh;
  } catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
  }
}
function conectar_db($db)
{ 
 $db = "cvuser_".$db;
 if (!($conexion=mysql_connect("localhost","cvuser_root","4nG!oCa4"))) 
 { 
  echo "Error conectando!!! <br>a la base de datos."; 
  exit(); 
} 
if (!mysql_select_db($db,$conexion)) 
{ 
  echo "Error seleccionando la base de datos " . $db . ""; 
  exit(); 
} 
return $conexion; 
} 
function Conectarse() 
{ 
  if (!($link=mysql_connect("localhost","cvuser_root","4nG!oCa4"))) 
  { 
    //echo "Error conectando!!! <br>a la base de datos."; 
    exit(); 
  } 
  if (!mysql_select_db("cvuser_comunidadvirtual",$link)) 
  { 
    //echo "Error seleccionando la base de datos."; 
    exit(); 
  } 
  return $link; 
}

  function query_tematicas($connect){
  /*
  function to get all subjects 
  params:
  $connect: link to connect with database
  return:
  query result.
*/
  $sql_query = "SELECT A.asignatura AS ASIGNATURA,
  AP.periodo AS PERIODO,
  G.descripcion AS DESCRIPCION,
  AP.tematicas AS TEMATICAS, 
  AP.estrategias AS ESTRATEGIAS
  FROM analisis_periodo AS AP
  JOIN asignaturas AS A ON AP.id_asignatura = A.id_asignatura
  JOIN grados AS G ON AP.grado = G.id_grado
  ORDER BY AP.periodo ASC";
  return mysql_query($sql_query,$connect);
}
function array_hrs_prg($resultados){
  /*
  function to organized hrs_prg_vs_dct query results
  params:
  $results: query results
  return:
  object
  */
  $horas_programadas = array();
  while ($result_hrs_prg=mysql_fetch_array($resultados)):
    $id_gra=$result_hrs_prg['ID_GRA'];
    $id_asi=$result_hrs_prg['ID_ASI'];
    $id_raz=$result_hrs_prg['ID_RAZ'];
    $des_raz=$result_hrs_prg['DES_RAZ'];
    $horas_programadas[$id_gra][ID]= $result_hrs_prg['ID_GRA'];//id del grado
    $horas_programadas[$id_gra][DESCRIPCION]= $result_hrs_prg['DES_GRA'];//nombre del grado
    $horas_programadas[$id_gra][ASIGNATURA][$id_asi][ID]=$result_hrs_prg['ID_ASI'];//id de la asignatura
    $horas_programadas[$id_gra][ASIGNATURA][$id_asi][DESCRIPCION]=$result_hrs_prg['DES_ASI'];//nombre de la asigantura
    $horas_programadas[$id_gra][ASIGNATURA][$id_asi][RAZON][$id_raz][ID]= $result_hrs_prg['ID_RAZ'];//id de la razon
    $horas_programadas[$id_gra][ASIGNATURA][$id_asi][RAZON][$id_raz][DESCRIPCION]= $result_hrs_prg['DES_RAZ'];//descripcion razon
    $horas_programadas[$id_gra][ASIGNATURA][$id_asi][RAZON][$id_raz][OTRO]= $result_hrs_prg['OTRO'];
    $horas_programadas[$id_gra][ASIGNATURA][$id_asi][RAZON][$id_raz][CANT_HRS]= $result_hrs_prg['CANT_HRS'];//cantidad de horas por razon
  endwhile;
  return $horas_programadas;
}
function suck($my){
  $deck = mysql_fetch_assoc($my);
  return $deck;
}
function db_selector($db){
  if($db == date("Y") || is_null($db)){
    $db2="comunidadvirtual";
  }
  else{
    $db2="bckupcomunidadvirtual".$db;
  }
  return $db2;
}
function headers_excel($nombre){
  header("Content-Type:application/vnd.ms-excel;");
  header("Content-type:application/x-msexcel;");
  header("Content-Disposition:attachment; filename=".$nombre.".xls"); 
  header("Expires: 0");
  header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
  header("Cache-Control: private",false);
}
function encuesta() 
{ 
 if (!($link=mysql_connect("localhost","cvuser_root","4nG!oCa4"))) 
 { 
      //echo "Error conectando!!! <br>a la base de datos."; 
  exit(); 
} 
if (!mysql_select_db("cvuser_encuestas",$link)) 
{ 
      //echo "Error seleccionando la base de datos."; 
  exit();  
}else{
  echo "No me pude conectar correctamente a la base de datos de encuestas";
}
return $link; 
}  
function notas() 
{ 
 if (!($link2=mysql_connect("localhost","cvuser_root","4nG!oCa4"))) 
 { 
      //echo "Error conectando!!! <br>a la base de datos."; 
  exit(); 
} 
if (!mysql_select_db("notas",$link2)) 
{ 
      //echo "Error seleccionando la base de datos."; 
  exit(); 
} 
return $link2; 
} 
function NombreIdGrago ($x)
{
 $grado = "";
 switch ($x) {
  case 4:
  $grado = "PRIMERO";
  break;
  case 5:
  $grado = "SEGUNDO";
  break;
  case 6:
  $grado = "TERCERO";
  break;
  case 7:
  $grado = "CUARTO";
  break;
  case 8:
  $grado = "QUINTO";
  break;
  case 9:
  $grado = "SEXTO";
  break;
  case 10:
  $grado = "SÉPTIMO";
  break;
  case 11:
  $grado = "OCTAVO";
  break;
  case 12:
  $grado = "NOVENO";
  break;
  case 13:
  $grado = "DÉCIMO";
  break;
  case 14:
  $grado = "UNDÉCIMO";
  break;
  case 1:
  $grado = "PREJARDÍN";
  break;                                                                                            
  case 2:
  $grado = "JARDÍN";
  break;
  case 3:
  $grado = "TRANSICIÓN";
  break; 
  default:
  $grado = $x;
  break;
}
return $grado;
}
function cursoEstudiante($x){
  $return = "";
  return $return;
}
function NombreGrago ($x)
{
 $grado = "";
 switch ($x) {
  case 1:
  $grado = "PRIMERO";
  break;
  case 2:
  $grado = "SEGUNDO";
  break;
  case 3:
  $grado = "TERCERO";
  break;
  case 4:
  $grado = "CUARTO";
  break;
  case 5:
  $grado = "QUINTO";
  break;
  case 6:
  $grado = "SEXTO";
  break;
  case 7:
  $grado = "SÉPTIMO";
  break;
  case 8:
  $grado = "OCTAVO";
  break;
  case 9:
  $grado = "NOVENO";
  break;
  case 10:
  $grado = "DÉCIMO";
  break;
  case 11:
  $grado = "UNDÉCIMO";
  break;
  case "pj":
  $grado = "PREJARDÍN";
  break;                                                                                            
  case "ja":
  $grado = "JARDÍN";
  break;
  case "tr":
  $grado = "TRANSICIÓN";
  break; 
  default:
  $grado = $x;
  break;
}
return $grado;
}
function NombreGragoPorId ($x)
{
 $grado = "";
 switch ($x) {
  case 4:
  $grado = "PRIMERO";
  break;
  case 5:
  $grado = "SEGUNDO";
  break;
  case 6:
  $grado = "TERCERO";
  break;
  case 7:
  $grado = "CUARTO";
  break;
  case 8:
  $grado = "QUINTO";
  break;
  case 9:
  $grado = "SEXTO";
  break;
  case 10:
  $grado = "SÉPTIMO";
  break;
  case 11:
  $grado = "OCTAVO";
  break;
  case 12:
  $grado = "NOVENO";
  break;
  case 13:
  $grado = "DÉCIMO";
  break;
  case 14:
  $grado = "UNDÉCIMO";
  break;
  case 1:
  $grado = "PREJARDÍN";
  break;                                                                                            
  case 2:
  $grado = "JARDÍN";
  break;
  case 3:
  $grado = "TRANSICIÓN";
  break; 
  default:
  $grado = $x;
  break;
}
return $grado;
}
////////////////////////////////////////
# esta funcion necesita el curso (numero) y devuelve la letra del mismo.
function letraCurso ($x)
{
 switch ($x) {
  case 1:
  $l = "A";
  break;
  case 2:
  $l = "B";
  break;   
  case 3:
  $l = "C";
  break;
  case 4:
  $l = "D";
  break;
  case 5:
  $l = "E";
  break;
  case 6:
  $l = "F";
  break;
  case 7:
  $l = "G";
  break;
  case 8:
  $l = "H";
  break;
  case 9:
  $l = "I";
  break;
  case 10:
  $l = "J";
  break;
  case 11:
  $l = "K";
  break;
  case 12:
  $l = "L";
  break;
  case 13:
  $l = "M";
  break;
  case 14:
  $l = "N";
  break;
  case 15:
  $l = "Ñ";
  break;
  case 16:
  $l = "O";
  break;                                    
  default:
  $l = $x;
  break;
}
return $l;
}
////////////////////////////////////////////////////
# Esta funcion necesita el grado el base de batos a conectarse 
# de momento siempre se conecta a "comunidadesvirual"
function CantidadCursos ($x, $link) 
{
# Obtengo los cursos por medio de la carga academica de esta depende la cantidad 
# de cursos consultados.
  $SQLCursos = "SELECT  `curso` 
  FROM  `cargas` 
  WHERE  `grado` =  '$x'
  GROUP BY  `curso` ";
  $QueryCursos = mysql_query($SQLCursos, $link);
# esta la cantidad de cursos que hay en el grado.
  return mysql_num_rows($QueryCursos);
}
////////////////////////////////////////////////////
# Esta funcion necesita el grado el base de batos a conectarse 
# de momento siempre se conecta a "comunidadesvirual"
function CargaGrados ($x, $link) 
{
# Obtengo la carga de acuerdo al grado elegido por el usuario
  $SQLCarga = "SELECT  `id_asignatura` ,  `asignatura` 
  FROM  `asignaturas` 
  WHERE  `id_asignatura` 
  IN (
  SELECT  `asignatura` 
  FROM  `cargas` 
  WHERE  `grado` =  '$x'
  GROUP BY  `asignatura`
)";
$QueryCarga = mysql_query($SQLCarga, $link);
$carga = array();
while($result = mysql_fetch_array($QueryCarga)){
  $carga[$result['id_asignatura']] = $result['asignatura'];
} 
# esta la cantidad de cursos que hay en el grado.
return  $carga;
}
function CargaGradoDocente($profesor, $link){
  # Obtengo la carga de grados segun el profesor que se resiva.
  $SQL = "SELECT G.id_grado AS ID, 
  G.descripcion AS DESCRIPCION,
  G.abreviatura AS ABREVIATURA
  FROM `asignaturas` AS A
  INNER JOIN `grados` AS G ON A.id_grado = G.id_grado
  WHERE A.id_asignatura IN (SELECT `id_asignatura`
  FROM `cargas`
  WHERE `id_profesor` = '$profesor')
  GROUP BY G.id_grado ";
  $query = mysql_query($SQL, $link);
  # Recorro los datos obtenidos y lleno un array para entregar
  $i = 0;
  $grados = array();
  while ($result = mysql_fetch_array($query)){
    $grados[$i][ID]          = $result['ID'];
    $grados[$i][DESCRIPCION] = $result['DESCRIPCION'];
    $grados[$i][ABREVIATURA] = $result['ABREVIATURA']; 
    $i++;
  }
  return $grados;
}
function CargaCursoPorGradoDocente($profesor, $grado, $link){
  # Obtengo la carga de grados segun el profesor que se resiva.
  $SQL = "SELECT C.curso AS ID, CU.descripcion AS DESCRIPCION
  FROM `asignaturas` AS A
  INNER JOIN `cargas` AS C ON A.id_asignatura = C.id_asignatura
  INNER JOIN `cursos` AS CU ON C.curso = CU.id
  WHERE A.id_grado = '$grado'
  AND C.id_profesor = '$profesor'
  GROUP BY C.curso
  ORDER BY C.curso ";
  $query = mysql_query($SQL, $link);
  # Recorro los datos obtenidos y lleno un array para entregar
  $i = 0;
  $cursos = array();
  while ($result = mysql_fetch_array($query)){
    $cursos[$i][ID]          = $result['ID'];
    $cursos[$i][DESCRIPCION] = $result['DESCRIPCION'];
    $i++;
  }
  return $cursos;
}
////////////////////////////////////////////////////
# Esta funcion necesita el grado, el id del jefe y la base de batos a conectarse 
# de momento siempre se conecta a "comunidadesvirual"
function CargaJefeGrados ($x, $jefe, $link) 
{
# Obtengo la carga de acuerdo al grado y el jefe que consulta
  $SQLCarga = "SELECT C.asignatura ID, A.asignatura ASIGNATURA
  FROM  `cargas` C
  INNER JOIN  `datos_profesor` P ON P.id_profesor = C.id_profesor
  INNER JOIN  `asignaturas` A ON A.id_asignatura = C.asignatura
  WHERE C.grado = '$x'
  AND (P.id_jefe = '$jefe' OR P.id_jefe2_parce = '$jefe' OR P.id_jefe3_parce = '$jefe')
  GROUP BY C.asignatura";
  $QueryCarga = mysql_query($SQLCarga, $link);
  $carga = array();
  while($result = mysql_fetch_array($QueryCarga)){
    $carga[$result['ID']] = $result['ASIGNATURA'];
  } 
# este es el resultado de las asignaturas que tiene como carga el jefe en el grado.
  return  $carga;
}
////////////////////////////////////////////////////
# Esta funcion necesita el id del jefe y la base de batos a conectarse 
# de momento siempre se conecta a "comunidadesvirual"
function CargaJefeAsignaturas ( $jefe, $link) 
{
# Obtengo la carga de acuerdo al grado y el jefe que consulta
  $SQLCarga = "SELECT C.asignatura ID, A.asignatura ASIGNATURA
  FROM  `cargas` C
  INNER JOIN  `datos_profesor` P ON P.id_profesor = C.id_profesor
  INNER JOIN  `asignaturas` A ON A.id_asignatura = C.asignatura
  WHERE A.estado = '1'
  AND (P.id_jefe = '$jefe' OR P.id_jefe2_parce = '$jefe' OR P.id_jefe3_parce = '$jefe')
  GROUP BY C.asignatura";
  $QueryCarga = mysql_query($SQLCarga, $link);
  $carga = array();
  while($result = mysql_fetch_array($QueryCarga)){
    $carga[$result['ID']] = $result['ASIGNATURA'];
  } 
# este es el resultado de las asignaturas que tiene como carga el jefe en el grado.
  return  $carga;
}
////////////////////////////////////////////////////
# Esta funcion necesita el id del jefe y la base de batos a conectarse 
# de momento siempre se conecta a "comunidadesvirual"
function CargaJefeAsignaturasRevisado ( $jefe, $bimestre, $tipo, $link) 
{
# Obtengo la carga de acuerdo al grado y el jefe que consulta
# - Si es un jefe quito todas las asiganturas de etica y busco por 
# - Si es sicologa busca 
  $SQLCarga = "SELECT 
  C.asignatura ID, 
  A.asignatura ASIGNATURA 
  FROM 
  `cargas` C 
  INNER JOIN `datos_profesor` P ON P.id_profesor = C.id_profesor 
  INNER JOIN `asignaturas` A ON A.id_asignatura = C.asignatura 
  INNER JOIN `datos_profesor` J ON J.id_profesor = '$jefe' 
  WHERE 
  A.estado = '1' 
  AND (
  (
  (J.tipo_prof = '1' OR J.tipo_prof = '6') 
  AND (P.id_jefe = '$jefe' OR P.id_jefe2_parce = '$jefe' OR P.id_jefe3_parce = '$jefe')
  AND C.asignatura <> '51'
  ) 
  OR (
  J.tipo_prof = '4' 
  AND (P.id_psico_revisa = '$jefe' OR P.id_jefe3_parce = '$jefe')
  AND C.asignatura = '51'
  )
  ) 
  GROUP BY 
  C.asignatura";
  $QueryCarga = mysql_query($SQLCarga, $link);
  $carga = array();
  $i = 0;
  while($result = mysql_fetch_array($QueryCarga)){
    $carga[$i]["id"] = $result['ID'];
    $carga[$i]["nombre"] = $result['ASIGNATURA'];
    $grados = gradosAsiganturaRevision($jefe, $result['ID'], $bimestre, 'false', $tipo, $link);
    $carga[$i]["clase"] = is_null($grados[0])? "completo" : "";
    $i++;                     
  } 
# este es el resultado de las asignaturas que tiene como carga el jefe en el grado.
  return  $carga;
}
//////////////////////////////////////////////////
# Esta funcion permite saber los grados a los que se les dicta la asignatura
# esta informacion depende del jefe.
function cargaGradosAsignaturaJefe( $jefe, $asignatura, $link){
   # Obtengo la carga de acuerdo al asignatura y el jefe que consulta
 $SQLCarga = "SELECT 
 C.grado GRADO 
 FROM 
 `cargas` C 
 INNER JOIN `datos_profesor` P ON P.id_profesor = C.id_profesor 
 INNER JOIN `asignaturas` A ON A.id_asignatura = C.asignatura 
 WHERE 
 A.id_asignatura = '$asignatura'
 AND (P.id_jefe = '$jefe' OR P.id_jefe2_parce = '$jefe' OR P.id_jefe3_parce = '$jefe')
 GROUP BY 
 C.grado
 ORDER BY CAST(C.grado AS UNSIGNED)
 ";
 $QueryCarga = mysql_query($SQLCarga, $link);
 $carga = array();
 while($result = mysql_fetch_array($QueryCarga)){
   $carga[] = $result['GRADO'];
 } 
   # este es el resultado de las asignaturas que tiene como carga el jefe en el grado.
 return  $SQLCarga;
}
/*CONSULTA LA INFORMACION COMPLETA DE UN DOCENTE
  PARAMS: 
      $id = id del docente a consultar
  RETURN: 
      información del docente.
*/
      function consultaProfesor($id){
        $query = "select * from datos_profesor where id_profesor = $id";
        $profesor = mysql_query($query);
        return mysql_fetch_assoc($profesor);
      }
// Esta funcion permite saber los grados en que se dicta la asignatura que y dependiendo
// de la eleccion se haya calificado o no para esto dependemos de los perfiles para saber
// quien debe o debio calificar el documento (jefes, coordinadoras, rectoria).
      function gradosAsiganturaRevision($jefe, $asignatura, $bimestre, $revision, $tipo, $link){
   # esta sera la varible que controle el filtro de revision
       $sqlRevision = "";
       if ($revision == "false") {
        switch ($tipo) {
        # 1: jefe, 4: socilogia, 22: terapeuta 
          case 1: 
          case 4: 
          $sqlRevision = "AND GRADO NOT IN (
          SELECT 
          `grado` 
          FROM 
          `analisis_periodo` 
          WHERE 
          `id_asignatura` = '$asignatura' 
          AND `periodo` = '$bimestre' 
          AND `f_coo` <> ''
        ) ";
          break;
          case 22:
          $sqlRevision = "AND GRADO NOT IN (
          SELECT 
          `grado` 
          FROM 
          `analisis_periodo` 
          WHERE 
          `id_asignatura` = '$asignatura' 
          AND `periodo` = '$bimestre' 
          AND `f_jefe` <> ''
        ) ";
        break;
        case 5:
        $sqlRevision = "AND GRADO NOT IN (
        SELECT 
        `grado` 
        FROM 
        `analisis_periodo` 
        WHERE 
        `id_asignatura` = '$asignatura' 
        AND `periodo` = '$bimestre' 
        AND `f_rec` <> ''
      ) ";
      break; 
      case 6:
      $sqlRevision = "AND GRADO NOT IN (
      SELECT 
      `grado` 
      FROM 
      `analisis_periodo` 
      WHERE 
      `id_asignatura` = '$asignatura' 
      AND `periodo` = '$bimestre' 
      AND `f_coo` <> ''
    ) ";
    break;   
    default:
    $sqlRevision = "";
    break;
  }
}
   # Obtengo la carga de acuerdo al asignatura y el jefe que consulta
$SQLCarga = "SELECT 
C.grado GRADO 
FROM 
`cargas` C 
INNER JOIN `datos_profesor` P ON P.id_profesor = C.id_profesor 
INNER JOIN `asignaturas` A ON A.id_asignatura = C.asignatura 
INNER JOIN `datos_profesor` J ON J.id_profesor = '$jefe' 
WHERE 
A.id_asignatura = '$asignatura'
AND (
(
  (J.tipo_prof = '1' OR J.tipo_prof = '6') 
  AND (P.id_jefe = '$jefe' OR P.id_jefe2_parce = '$jefe' OR P.id_jefe2_parce = '$jefe') 
  ) 
  OR (
  J.tipo_prof = '4' 
  AND P.id_psico_revisa = '$jefe' 
  )
  )  
  $sqlRevision
  GROUP BY 
  C.grado 
  ORDER BY 
  CAST(C.grado AS UNSIGNED)
  ";
  $QueryCarga = mysql_query($SQLCarga, $link);
  $carga = array();
  while($result = mysql_fetch_array($QueryCarga)){
   $carga[] = $result['GRADO'];
 } 
   # este es el resultado de las asignaturas que tiene como carga el jefe en el grado.
 return  $carga;
}
function conCero($x)
{
 if($x < 10)
 {
  $x = "0".$x;
}
return $x;
}
function bd_SAP(){
 return "0010000105";
}
# esta funcion nos retorna el nombre del dia de la semana si le ingresamos 
# una fecha determindad en el formato de fecha "YYYY-MM-DD" 
function nombreDia($x){
 $dias = array('Domingo', 'Lunes','Martes','Miercoles','Jueves','Viernes','Sabado');
 return $dias[date("w",  strtotime($x))];
}
# esta funcion nos retorna el nombre del mes si le enviamos el numero del mismo.
function nombreMes($x){
 $meses = array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
 return $meses[$x-1];
}
function nombreMes2($x){
 $meses = array('Ene','Feb','Mar','Abr','May','Jun','Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic');
 return $meses[$x-1];
}
function punteroCero($query, $x){
 if($QueryCursos != NULL && mysql_num_rows($QueryCursos) != 0){
  mysql_data_seek($query, $x);
  return TRUE;
}else{
  return FALSE;
}
}
function reemplazaCadena($texto){
  $entrada = ["Á","É","Í","Ó","Ú","Ñ", "ñ"];
  $salida = ["A","E","I","O","U","N", "n"];
  return str_replace($entrada, $salida, strtoupper($texto));
}
?>