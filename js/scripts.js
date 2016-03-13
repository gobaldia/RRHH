$(document).ready(inicio);

function inicio(){
	$("#divPrincipal").show();
	$("#divPostulantes").hide();
	$("#divEmpresaCliente").hide();
	$("#divVacante").hide();
	$("#divExito").hide();
	$("#divConsultaPostulantes").hide();
	$("#idTrTiposProgramasInfo").hide();
	
	$("#idBtnRegistrarPostulante").click(registrarPostulante);
	$("#divMenu ul li a").click(cambiarForm);
	$("#idRbtSi").click(programasInformaticos);
	$("#idRbtNo").click(programasInformaticos);
	$("#btnConsultarPosiblesPostulantes").click(consultarVacantePostulante);
	
	cargarArrayEdades();
	cargarArrayRangoEdades();
}



/*---------------DATOS DE PRUEBA--------------*/

var listaVacantes = [];

	var unaEmpresa = {
	razonSocial: 1234,
	direccion: "DirecionABCCD",
	telefono: 98765432
}

var unaVacante1 = {
	empresa: unaEmpresa,
	rangoEdad: "18-35",
	sexo: "I",
	exp: "I",
	conocimientosInformaticos: [true, false, true, false, false, true]
}
var unaVacante2 = {
	empresa: unaEmpresa,
	rangoEdad: "30-40",
	sexo: "M",
	exp: "I",
	conocimientosInformaticos: [false, false, false, false, false, false]
}
var unaVacante3 = {
	empresa: unaEmpresa,
	rangoEdad: "50-70",
	sexo: "I",
	exp: "O",
	conocimientosInformaticos: []
}
listaVacantes.push(unaVacante1);
listaVacantes.push(unaVacante2);
listaVacantes.push(unaVacante3);

/*------------------------------------*/



/*============ NAVEGACION =================*/
function cambiarForm(){
	var vista = $(this).attr('id');
	$("#divExito").hide();
	$("#idTrTiposProgramasInfo").hide();
	$("#slctVacantes").empty();
	$("#slctPostulantes").empty();
	
	$("#divPrincipal").hide();
	$("#divPostulantes").hide();
	$("#divEmpresaCliente").hide();
	$("#divVacante").hide();
	$("#divConsultaPostulantes").hide();
	
	switch(vista){
		case "vista_1":
			$("#divPrincipal").show();			
			break;
		case "vista_2":
			$("#divPostulantes").show();
			break;
		case "vista_3":
			$("#divEmpresaCliente").show();
			break;
		case "vista_4":
			$("#divVacante").show();
			break;
		case "vista_5":
			ingresarVista5();			
			break;
		case "vista_6":			
			break;
		default:
			break;
	}
}

function ingresarVista5() {
	if(listaVacantes.length > 0 && arrayPostulantes.length > 0){//Si no existen vacantes no lo dejo entrar a la funcionalidad.
		$("#divPrincipal").hide();
		$("#divPostulantes").hide();
		$("#divEmpresaCliente").hide();
		$("#divVacante").hide();
		$("#divConsultaPostulantes").show();
		cargarVacantes();
	} else {
		if(arrayPostulantes.length == 0 && listaVacantes.length == 0){
			alert("* No existen vacantes ni postulantes para poder utilizar esta funcionalidad.")
			$("#divPrincipal").show();
			$("#divPostulantes").hide();
			$("#divEmpresaCliente").hide();
			$("#divVacante").hide();					
		} else if(arrayPostulantes.length == 0) {
			alert("* No existen postulantes para poder utilizar esta funcionalidad.")
			$("#divPrincipal").show();
			$("#divPostulantes").hide();
			$("#divEmpresaCliente").hide();
			$("#divVacante").hide();	
		} else {
			alert("* No existen vacantes para poder utilizar esta funcionalidad.")
			$("#divPrincipal").show();
			$("#divPostulantes").hide();
			$("#divEmpresaCliente").hide();
			$("#divVacante").hide();
		}
	}
}
/*==============================================*/



/*==== PROPIEDADES ARRAYS ====*/
var arrayPostulantes = []; 


/*============================*/



/*=================== REGISTRO POSTULANTE ===================*/
function registrarPostulante(){	

	//Valido que el usuario allá completado nombre, apellido, teléfono, edad y añosExp correctos, sino no lo dejo seguir.
	if(validarNombreyApellido() && validarTelefono() && validarComboEdad() && validarAñosExp()){
		
		//Si tiene conocimientos informáticos, voy a desplegar los tipos de programas y validar que seleccione al menos 1.
		if($("#idRbtSi").is(":checked")){
			var hasChecked = false;
			
			//Recorro los inputs de tipo checkbox que están dentro del divPostulante para validar que al menos 1 este chequeado.
			$( "#divPostulantes input[type='checkbox']" ).each(function() {
			     if(!hasChecked){
					hasChecked = $(this).is(":checked");
				 }
			});
			
			if(hasChecked){//Si tiene chequeados, genero el array de conocimientos y creo un nuevo postulante para luego agregarlo a la lista de postulantes.
				var conocimientosInformaticos = [$("#idChkWord").is(":checked"), 
											 $("#idChkExcel").is(":checked"),
											 $("#idChPowerPoint").is(":checked"),
											 $("#idChkAccess").is(":checked"),
											 $("#idChkEmail").is(":checked"),
											 $("#idChkBrowsers").is(":checked")];
											 
				var postulante = { 
					nombre: $("#idNombrePostulante").val(),
					apellido : $("#idApellidoPostulante").val(),
					tel: $("#idTelefonoPostulante").val(),
					edad: $("#idEdadesPostulantes").val(),
					sexo: "",
					exp: parseInt($("#idAñosExp").val()),
					conocimientos: conocimientosInformaticos
				};
				
				if($("#rbtM").is(":checked")){
					postulante.sexo = "M";
				} else {
					postulante.sexo = "F";
				}
				
				arrayPostulantes.push(postulante);
				$("#divPostulantes").hide();
				$("#divExito").show();
				$("#divExito h1").text("Registro de postulante realizado correctamente. Gracias!");
				clearFormPostulante();
			} else {
				alert("* Seleccione los programas informáticos que conoce.");
			}
		} else {
			var postulante = { 
					nombre: $("#idNombrePostulante").val(),
					apellido : $("#idApellidoPostulante").val(),
					tel: $("#idTelefonoPostulante").val(),
					edad: $("#idEdadesPostulantes").val(),
					sexo: "",
					exp: parseInt($("#idAñosExp").val()),
					conocimientos: []
				};
				
			if($("#rbtM").is(":checked")){
				postulante.sexo = "M";
			} else {
				postulante.sexo = "F";
			}
			
			arrayPostulantes.push(postulante);
			$("#divPostulantes").hide();
			$("#divExito").show();
			$("#divExito h1").text("Registro de postulante realizado correctamente. Gracias!");
			clearFormPostulante();
		}
	} 
}

function validarComboEdad(){
	var retorno = true;
	if($("#idEdadesPostulantes").val() == 0){
		retorno = false;
		alert("* Debe seleccionar edad.");
	}	
	return retorno;
}

function validarTelefono(){
	var telefonoIngresado = $("#idTelefonoPostulante");
	
	var retorno = true;
	
	if (!telefonoIngresado.val()){
		retorno = false;
		alert("* Debe ingresar un teléfono. ");	
	} else if(isNaN(telefonoIngresado.val())){
		retorno = false;
		alert("* Teléfono inválidos. ");
	} else if((telefonoIngresado.val()).toString().length < 4 || (telefonoIngresado.val()).toString().length > 9){
		retorno = false;
		alert("* Teléfono inválidos. Largo entre 4 y 9 caracteres.");
	} else if(arrayPostulantes.length > 0) {
		
		for(var i = 0; i < arrayPostulantes.length; i++){
			if(arrayPostulantes[i].tel == $(telefonoIngresado).val()){
				alert("* Ya existe postulante con el mismo número de teléfono. ");
				return false;
			}
		}
	} 
	
	return retorno;
}

function validarNombreyApellido(){	
	var nombreIngresado = $("#idNombrePostulante");
	var retorno = true;
	
	if (!nombreIngresado.val()){
		retorno = false;
		alert("* Debe ingresar un nombre. ");	
	} else if(!isNaN(nombreIngresado.val())){
		retorno = false;
		alert("* Nombre inválido. ");
	} else {
		var apellidoIngresado = $("#idApellidoPostulante");
		
		if (!apellidoIngresado.val()){
			retorno = false;
			alert("* Debe ingresar un apellido. ");
		} else if(!isNaN(apellidoIngresado.val())){
			retorno = false;
			alert("* Apellido inválido. ");
		}
	}
	
	return retorno;
}

function validarAñosExp(){
	var añosIngresados = $("#idAñosExp");
	var retorno = true;
	
	if (!añosIngresados.val()){
		retorno = false;
		alert("* Debe ingresar años de experiencia. ");	
	} else if(isNaN(añosIngresados.val())){
		retorno = false;
		alert("* Años de experiencia inválidos. ");
	} else if(parseInt(añosIngresados.val()) < 0 || parseInt(añosIngresados.val()) > 70){
		retorno = false;		
		alert("* Años de experiencia inválidos. ");	
	} 
	
	return retorno;
}

function cargarArrayEdades(){
	var comboEdades = $("#idEdadesPostulantes");
	
	for(var i=17; i<100; i++){
		var options = document.createElement("option");
		
		if(i == 17){
			options.value = 0;
			options.text = "Seleccione una edad...";	
			comboEdades.append(options);
		} else {
			options.value = i;			
			options.text = i;	
			comboEdades.append(options);			
		}
	}
}

function cargarArrayRangoEdades() {
	var comboRangoEdades = $("#idRangoEdad");

	for (var i = 15; i < 100; i+=5) {
		var options = document.createElement("option");

		if (i == 15) {
			options.value = "";
			options.text = "Seleccione un rango de edad...";
			comboRangoEdades.append(options);
		} else if (i == 20) {
			options.value = "Menor a 20";
			options.text = "Menor a 20";
			comboRangoEdades.append(options);
		} else {
			options.value = i-5 + " a " + i;
			options.text = i-5 + " a " + i;
			comboRangoEdades.append(options);
		}
	}
}

function programasInformaticos() {
	var rbt = $(this).attr('id');
	
	if(rbt == "idRbtSi"){
		$("#idTrTiposProgramasInfo").show();
	} else {
		$("#idChkWord").prop("checked", false);
		$("#idChkExcel").prop("checked", false);
		$("#idChPowerPoint").prop("checked", false);
		$("#idChkAccess").prop("checked", false);
		$("#idChkEmail").prop("checked", false);
		$("#idChkBrowsers").prop("checked", false);
		$("#idTrTiposProgramasInfo").hide();
	}	
}

function clearFormPostulante() {
	$("input[type=text]").each(function() {
        $(this).val("");
    });
	$("#idEdadesPostulantes").val("0");
	$("#rbtM").click();
	$("#idRbtNo").click();
}
/*====================================================================*/


/*===================== CONSULTA POSTULANTES ======================*/
function consultarVacantePostulante(){	
	var seleccion = document.getElementById("slctVacantes");
	
	//Valido que se seleccione una vacante.
	if(seleccion.selectedIndex > -1){
		var vacanteSeleccionada = listaVacantes[seleccion.selectedIndex];
		
		var postulantesVacante = [];		
		for(var i=0; i < arrayPostulantes.length; i++){			
			
			//Recorro los postulantes para encontrar aquellos que cumplan los requisitos de la vacante seleccionada.
			if(parseInt(arrayPostulantes[i]["edad"]) >= parseInt(vacanteSeleccionada["rangoEdad"].split("-")[0]) 
				&& parseInt(arrayPostulantes[i]["edad"]) <= parseInt(vacanteSeleccionada["rangoEdad"].split("-")[1])
				&& validarSexo(arrayPostulantes[i]["sexo"], vacanteSeleccionada["sexo"])
				&& validarConocimientosInformaticos(arrayPostulantes[i]["conocimientos"], vacanteSeleccionada["conocimientosInformaticos"])
				&& validarExpLaboral(arrayPostulantes[i]["exp"], vacanteSeleccionada["exp"])){
				
				//Agrego a la lista de postulantes que cumplen los requisitos de la vacante seleccionada.
				postulantesVacante.push(arrayPostulantes[i]);
			}
		}
		
		var comboPostulantes = $("#slctPostulantes");
		$(comboPostulantes).empty();
		
		if(postulantesVacante.length > 0){
			//Modifico la función de sort para que ordene por edad en orden descendente. (Por defecto ordena por strings)
			postulantesVacante.sort(function(a, b){
				return parseInt(b["edad"]) < parseInt(a["edad"])
			});
			
			for(var i = 0; i < postulantesVacante.length; i++){
				var options = document.createElement("option");
				options.value = postulantesVacante[i]; 
				options.text = "Postulante " + (i+1) + ". Nombre: " + postulantesVacante[i]["nombre"] + ", Apellido: " + postulantesVacante[i]["apellido"] + ", Edad: " + postulantesVacante[i]["edad"];
				$(options).css("fontSize", "15px");
				comboPostulantes.append(options);
			}
		} else {
			var options = document.createElement("option");
			options.value = "";
			options.text = "* No existen postulantes para esta vacante.";
			$(options).css("fontSize", "15px");
			comboPostulantes.append(options);
		}
	} else {
		alert("* Debe seleccionar una vacante.");
	}
}
function validarSexo(sexoPostulante, sexoVacante){
	var resultado = false;
	
	if(sexoVacante == "I"){
		resultado = true;
	} else if(sexoVacante == "M" && sexoPostulante == "M") {
		resultado = true;
	} else if(sexoVacante == "F" && sexoPostulante == "F"){
		resultado = true;		
	}
	
	return resultado;
}
function validarExpLaboral(expPostulante, expVacante){
	var resultado = false;
	
	if(expVacante == "O" && expPostulante > 0){
		resultado = true;
	} else if(expVacante == "I"){
		resultado = true;
	}
	
	return resultado;
}
function validarConocimientosInformaticos(postulanteConocimientosInformaticos, vacanteConocimientosInformaticos) {
	var resultado = false;
	if(postulanteConocimientosInformaticos.length > 0 && vacanteConocimientosInformaticos.length > 0){		
		if(postulanteConocimientosInformaticos[0] == vacanteConocimientosInformaticos[0]
			&& postulanteConocimientosInformaticos[1] == vacanteConocimientosInformaticos[1]
			&& postulanteConocimientosInformaticos[2] == vacanteConocimientosInformaticos[2]
			&& postulanteConocimientosInformaticos[3] == vacanteConocimientosInformaticos[3]
			&& postulanteConocimientosInformaticos[4] == vacanteConocimientosInformaticos[4]
			&& postulanteConocimientosInformaticos[5] == vacanteConocimientosInformaticos[5]){
				resultado = true;
			}
	} else if(!(vacanteConocimientosInformaticos.length > 0)){
		resultado = true;
	}
	
	return resultado;
}
function cargarVacantes() {
	var comboVacantes = $("#slctVacantes");
	
	for(var i=0; i < listaVacantes.length; i++){
		var options = document.createElement("option");
		
		options.value = listaVacantes[i]; 
		options.text = "Vacante " + (i+1) + ". Razón social: " + listaVacantes[i]["empresa"].razonSocial;
		$(options).css("fontSize", "15px");
		comboVacantes.append(options);
	}	
}
/*==========================================================*/



