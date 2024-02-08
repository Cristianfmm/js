function logincorp(usuario=false,pass=falses){
	return $.ajax({
		url: 'controller/cont.php',
		type: 'POST',
		dataType: 'json',
		data: {base:"corp",param:"login_corp",user: btoa(usuario),pass:btoa(pass)}
	});
};

function userInfo(){
	return $.ajax({
		url: 'controller/cont.php',
		type: 'POST',
		dataType: 'json',
		data: {base:"corp",param:"getInfo"}
	});
}

function moduleViews(){
	console.log("a")
	return $.ajax({
		url: 'controller/cont.php',
		type: 'POST',
		dataType: 'json',
		data: {base:"corp",param:"getModMain"}
	});
}