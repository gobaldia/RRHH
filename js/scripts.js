$(document).ready(inicio);

function inicio(){
	$("#divPrincipal").show();
	$("#divPostulantes").hide();
	$("#divEmpresaCliente").hide();
	$("#divVacante").hide();
	$("#divExito").hide();
	$("#divConsultaPostulantes").hide();
	$("#idTrTiposProgramasInfo").hide();
	$("#trConocimientosInformaticos").hide();
	$("#divRequerimientosMasPedidos").hide();
	$("#divPostulantesNoCumplenRequisitos").hide();
	
	$("#idBtnRegistrarPostulante").click(registrarPostulante);
	$("#divMenu ul li a").click(cambiarForm);
	$("#idRbtSi").click(programasInformaticos);
	$("#idRbtNo").click(programasInformaticos);
	$("#btnConsultarPosiblesPostulantes").click(consultarVacantePostulante);
	$("#btnRegistrarVacante").click(registrarVacante);
	$("#idBtnRegistrarEmpresa").click(registrarEmpresa);
	
	$("#rbtSi").click(vacanteMostrarProgramasInformaticos);
	$("#rbtNo").click(vacanteMostrarProgramasInformaticos);
	
	cargarArrayEdades();
	cargarArrayRangoEdades();
}

/*==== PROPIEDADES ARRAYS ====*/
var arrayPostulantes = []; 
var listaEmpresas = [];
var listaVacantes = [];
/*============================*/



/*============ NAVEGACION =================*/
function cambiarForm(){
	var vista = $(this).attr('id');
	$("#divExito").hide();
	$("#idTrTiposProgramasInfo").hide();
	$("#trConocimientosInformaticos").hide();
	$("#slctVacantes").empty();
	$("#slctPostulantes").empty();
	$("#slctEmpresaCliente").empty();
	$("#divRequerimientosMasPedidos blockquote").empty();
	
	$("#divPrincipal").hide();
	$("#divPostulantes").hide();
	$("#divEmpresaCliente").hide();
	$("#divVacante").hide();
	$("#divConsultaPostulantes").hide();
	$("#divRequerimientosMasPedidos").hide();
	$("#divPostulantesNoCumplenRequisitos").hide();
	
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
			ingresarRegistroVacante();
			break;
		case "vista_5":
			ingresarConsultaPosiblesPostulantes();			
			break;
		case "vista_6":	
			calcularRequerimientosMasPedidos();
			$("#divRequerimientosMasPedidos").show();
			break;
		case "vista_7":
			postulantesNoCalifican();
//			cargarPostulantesNoCalifican();
			$("#divPostulantesNoCumplenRequisitos").show();	
			break;
		default:
			break;
	}
}

function ingresarRegistroVacante() {	
	if(listaEmpresas.length > 0){
		$("#divVacante").show();
		cargarSelectEmpreas();
	} else {
		alert("* No existen empresas registradas para utilizar esta funcionalidad.");
		$("#divPrincipal").show();
	}	
}

function ingresarConsultaPosiblesPostulantes() {
	if(listaVacantes.length > 0 && arrayPostulantes.length > 0){//Si no existen vacantes no lo dejo entrar a la funcionalidad.
		$("#divConsultaPostulantes").show();
		cargarVacantes();
	} else {
		if(arrayPostulantes.length == 0 && listaVacantes.length == 0){
			alert("* No existen vacantes ni postulantes para poder utilizar esta funcionalidad.")
			$("#divPrincipal").show();					
		} else if(arrayPostulantes.length == 0) {
			alert("* No existen postulantes para poder utilizar esta funcionalidad.")
			$("#divPrincipal").show();	
		} else {
			alert("* No existen vacantes para poder utilizar esta funcionalidad.")
			$("#divPrincipal").show();
		}
	}
}
/*==============================================*/





/*===================== REGISTRO EMPRESA =========================*/
function validarDatosEmpresa () {
	
	var retorno = true;
	var vacio = "";

	var razonSocial = $('#idRazonSocialEmpresaCliente').val();
	var direccion = $('#idDireccionEmpresaCliente').val();

	if (razonSocial == null || direccion == null) {
		retorno = false;
		alert("Debe completar todos los campos.")
	}

	return retorno;	
}

function yaExisteEmpresa () {
	var retorno = false;

	if(listaEmpresas.length > 0){
		for (var i = 0; i < listaEmpresas.length; i++) {
			var empresa = listaEmpresas[i];
			if (empresa["razonSocial"] == $('#idRazonSocialEmpresaCliente').val()) {
				retorno = true;
				alert("La empresa ya se encuentra registrada.")
			}
		}
	}
	
	return retorno;
}
function registrarEmpresa() {
	var miRazonSocial = $('#idRazonSocialEmpresaCliente').val();
	var miDireccion = $('#idDireccionEmpresaCliente').val();
	var miTelefono = $('#idTelefonoEmpresaCliente').val();

	if (!yaExisteEmpresa() && validarDatosEmpresa() && validarTelefonoEmpresa()) {
		var empresa = {razonSocial: miRazonSocial, direccion: miDireccion, telefono: miTelefono};

		listaEmpresas.push(empresa);
		
		$("#divEmpresaCliente").hide();
		$("#divExito").show();
		$("#divExito h1").text("Registro de empresa realizado correctamente. Gracias!");
		clearFormEmpresa();
	}
}

function clearFormEmpresa() {
	$("#idRazonSocialEmpresaCliente").val("");
	$("#idDireccionEmpresaCliente").val("");
	$("#idTelefonoEmpresaCliente").val("");
}

/*==============================================*/





/*=================== REGISTRO POSTULANTE ===================*/
function registrarPostulante(){	

	//Valido que el usuario allá completado nombre, apellido, teléfono, edad y añosExp correctos, sino no lo dejo seguir.
	if(validarNombreyApellido() && validarTelefonoPostulante() && validarComboEdad() && validarAñosExp()){
		
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
					conocimientos: [false, false, false, false, false, false]
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

function validarTelefonoPostulante(){
	var telefonoIngresado = $("#idTelefonoPostulante");
	
	var retorno = true;
	
	if (!telefonoIngresado.val()){
		retorno = false;
		alert("* Debe ingresar un teléfono. ");	
	} else if(isNaN(telefonoIngresado.val())){
		retorno = false;
		alert("* Teléfono inválido. ");
	} else if((telefonoIngresado.val()).toString().length < 4 || (telefonoIngresado.val()).toString().length > 9){
		retorno = false;
		alert("* Teléfono inválidos. Largo entre 4 y 9 caracteres.");
	} else if(arrayPostulantes.length > 0) {
		
		for(var i = 0; i < arrayPostulantes.length; i++){
			if(arrayPostulantes[i].tel == $(telefonoIngresado).val()){
				alert("* Ya existe un postulante con el mismo número de teléfono. ");
				return false;
			}
		}
	} 
	
	return retorno;
}

function validarTelefonoEmpresa(){
	var telefonoIngresado = $("#idTelefonoEmpresaCliente");
	
	var retorno = true;
	
	if (!telefonoIngresado.val()){
		retorno = false;
		alert("* Debe ingresar un teléfono. ");	
	} else if(isNaN(telefonoIngresado.val())){
		retorno = false;
		alert("* Teléfono inválidos. ");
	} else if((telefonoIngresado.val()).toString().length < 4 || (telefonoIngresado.val()).toString().length > 9){
		retorno = false;
		alert("* Teléfono inválido. Largo entre 4 y 9 caracteres.");
	} else if(listaEmpresas.length > 0) {
		
		for(var i = 0; i < listaEmpresas.length; i++){
			if(listaEmpresas[i].telefono == $(telefonoIngresado).val()){
				alert("* Ya existe una empresa con el mismo número de teléfono. ");
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
/*==============================================================================*/



/*============================== REGISTRO VACANTE ==============================*/
function cargarArrayRangoEdades() {
	var comboRangoEdades = $("#idRangoEdad");

	for (var i = 15; i < 100; i+=5) {
		var options = document.createElement("option");

		if (i == 15) {
			options.value = "";
			options.text = "Seleccione un rango de edad...";
			comboRangoEdades.append(options);
		} else if (i == 20) {
			options.value = "18-20";
			options.text = "Menor a 20";
			comboRangoEdades.append(options);
		} else {
			options.value = i-5 + "-" + i;
			options.text = i-5 + " a " + i;
			comboRangoEdades.append(options);
		}
	}
}
function vacanteMostrarProgramasInformaticos(){
	var rbt = $(this).attr('id');
	
	if(rbt == "rbtSi"){
		$("#trConocimientosInformaticos").show();
	} else {
		$("#rbtWordNoExcluyente").click();
		$("#rbtExcelNoExcluyente").click();
		$("#rbtPowerPointNoExcluyente").click();
		$("#rbtAccessNoExcluyente").click();
		$("#rbtMailNoExcluyente").click();
		$("#rbtBrowsersNoExcluyente").click();
		$("#trConocimientosInformaticos").hide();
	}
}
function cargarSelectEmpreas() {	
	var empresasCliente = $("#slctEmpresaCliente");

	for (var i = -1; i < listaEmpresas.length; i++) {
		var options = document.createElement("option");

		if (i == -1) {
			options.value = "";
			options.text = "Seleccione una empresa...";
			empresasCliente.append(options);
		} else {
			options.value = i;
			options.text = "Razon social: " + listaEmpresas[i]["razonSocial"] + ", Direccion: " + listaEmpresas[i]["direccion"] + ", Telefono: " + listaEmpresas[i]["telefono"];
			empresasCliente.append(options);
		}
	}
}
function registrarVacante(){
	
	var empresaSeleccionada = document.getElementById("slctEmpresaCliente").selectedIndex;
	var rangoEdad = document.getElementById("idRangoEdad").selectedIndex;
		
	if(!(empresaSeleccionada > 0 && rangoEdad > 0)){		
		alert("* Debe seleccionar una empresa y un rango de edades.");
	} else if(empresaSeleccionada == 0) {		
		alert("* Debe seleccionar una empresa.");
	} else if(rangoEdad == 0){
		alert("* Debe seleccionar un rango de edades.");
	} else {
		var vacante = {
			empresa: listaEmpresas[empresaSeleccionada - 1],
			rangoEdad: $("#idRangoEdad").val(),
			sexo: "I",
			exp: "I",
			conocimientosInformaticos: [$("#rbtWordExcluyente").is(":checked"),
										   $("#rbtExcelExcluyente").is(":checked"),
										   $("#rbtPowerPointExcluyente").is(":checked"),
										   $("#rbtAccessExcluyente").is(":checked"),
										   $("#rbtMailExcluyente").is(":checked"),
										   $("#rbtBrowsersExcluyente").is(":checked")]
		}
		
		//Verifico que radiobutton de sexo selecciono.
		if($("#rbtVacanteF").is(":checked")){
			vacante.sexo = "F";
		} else if ($("#rbtVacanteM").is(":checked")){
			vacante.sexo = "M";
		} else {
			vacante.sexo = "I";
		}
		
		if($("#rbtExpIndistinta").is(":checked")){
			vacante.exp = "I";
		} else {
			vacante.exp = "O";
		}
		
		//Agrego la vacante a la lista de vacantes.
		listaVacantes.push(vacante);
		$("#divVacante").hide();
		$("#divExito").show();
		$("#divExito h1").text("Gracias por registrar una nueva vacante!");
		clearFormVacantes();
	}	
}
function clearFormVacantes() {
	$("#idRangoEdad").val("0");
	$("#rbtVacanteI").click();
	$("#rbtVacanteI").click();
	$("#rbtNo").click();
}
/*==============================================================================*/




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
				return parseInt(b["edad"]) > parseInt(a["edad"])
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
		
		//Obtengo los requisitos excluyentes pedidos por la vacante.
		var conocimientosExcluyentes = [];
		for(var i = 0; i < vacanteConocimientosInformaticos.length; i++){
			if(vacanteConocimientosInformaticos[i]){
				conocimientosExcluyentes.push(i);
			}
		}
		
		if(conocimientosExcluyentes.length == 0){
			resultado = true;
		} else {
			//Verifico que el postulante cumpla con los requisitos excluyentes.
			for(var i = 0; i < conocimientosExcluyentes.length; i++){
				if(postulanteConocimientosInformaticos[conocimientosExcluyentes[i]] != vacanteConocimientosInformaticos[conocimientosExcluyentes[i]]){
					resultado = false;
					break;
				} else {
					resultado = true;
				}
			}
		}
		
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



/*===================== REQUERIMIENTOS MAS PEDIDOS ==================*/
function calcularRequerimientosMasPedidos() {
	
	if(listaVacantes.length > 0){
		
		$("#divRequerimientosMasPedidos h3").text("Los requerimientos mas solicitados son los siguientes: ");
		var conocimientosMasSolicitados = [0, 0, 0, 0, 0, 0];
		for(var i = 0; i < listaVacantes.length; i++){
			for(var j = 0; j < listaVacantes[i]["conocimientosInformaticos"].length; j++){
				
				if(listaVacantes[i]["conocimientosInformaticos"][j]){
					conocimientosMasSolicitados[j] += 3;
				} else {
					conocimientosMasSolicitados[j] += 1;
				}
			}
		}
		
		for(var i = 0; i < conocimientosMasSolicitados.length; i++){
			var h2Element = document.createElement("h2");
			switch(i){
				case 0:
					h2Element.innerHTML = "Word - " + conocimientosMasSolicitados[i] + " puntos.";
					break;
				case 1:
					h2Element.innerHTML = "Excel - " + conocimientosMasSolicitados[i] + " puntos.";
					break;
				case 2:
					h2Element.innerHTML = "Power Point - " + conocimientosMasSolicitados[i] + " puntos.";
					break;
				case 3:
					h2Element.innerHTML = "Access - " + conocimientosMasSolicitados[i] + " puntos.";
					break;
				case 4:
					h2Element.innerHTML = "Correo electrónico - " + conocimientosMasSolicitados[i] + " puntos.";
					break;
				case 5:
					h2Element.innerHTML = "Navegadores de Internet - " + conocimientosMasSolicitados[i] + " puntos.";
					break;
			}

			$(h2Element).css("fontFamily", "Open Sans,Arial,sans-serif")
			$("#divRequerimientosMasPedidos blockquote").append(h2Element);
		}		
	} else {
		$("#divRequerimientosMasPedidos h3").text("No existen registros de vacantes para obtener estadísticas sobre los requerimientos mas pedidos.");
	}
}
/*=====================================================================*/




/*========================== POSTULANTES NO CALIFICAN ================================*/
function postulantesNoCalifican() {
	var listaPostulantesNoCalifican = [];
	var cumpleTodo = true;
	var comboPostulantesNoCalifican = $("#selectPostulantesNoCumplenRequisitos");
	var bandera = false;
	var banderaConocimiento = true;
	$(comboPostulantesNoCalifican).empty();	
	if (arrayPostulantes.length > 0 && listaVacantes.length > 0) {
		for (var i = 0; i < arrayPostulantes.length; i++) {
			var postulante = arrayPostulantes[i];
			var edadPostulante = postulante["edad"];
			var sexoPostulante = postulante["sexo"];
			var expPostulante = postulante["exp"];
			var conocimientosInformaticosPostulante = postulante["conocimientos"];

			for (var j = 0; j < listaVacantes.length; j++) {
				banderaConocimiento = true;
				var vacante = listaVacantes[j];
				var rangoEdadVacante = vacante["rangoEdad"];
				var sexoVacante = vacante["sexo"];
				var expVacante = vacante["exp"];
				var conocimientosInformaticosVacante = vacante["conocimientosInformaticos"];

				//Guardamos los valores true de los conocimientos de la vacante para luego verificar que el postulante cumpla los mismos.
				var conocimientosRequeridos = [];
				for(var k = 0; k < conocimientosInformaticosVacante.length; k++){
					if(conocimientosInformaticosVacante[k]){
						conocimientosRequeridos.push(k);
					}
				}
				for(var h = 0; h < conocimientosRequeridos.length; h++){
					if(!conocimientosInformaticosPostulante[conocimientosRequeridos[h]]){
						banderaConocimiento = false;
					}
				}
				//----------

				//Verifico que el postulante NO cumpla otra vacante previamente iterada, que cumpla los conocimientos informaticos y los demas atributos.
				if(!bandera && !banderaConocimiento || !(edadPostulante >= parseInt(rangoEdadVacante.split("-")[0]) && edadPostulante <= parseInt(rangoEdadVacante.split("-")[1]) && (sexoVacante == "I" || sexoPostulante == sexoVacante) && (expVacante == "I" || expPostulante > 0))){
					cumpleTodo = false;
				} else {			
					bandera = true;
					cumpleTodo = true;
				}
			}

			//Si no existe vacante para el postulante iterado, lo agrego a la lista.
			if (!cumpleTodo && !bandera) {
					listaPostulantesNoCalifican.push(postulante);
			}

			bandera = false;
		}
	}

	for(var i=0; i < listaPostulantesNoCalifican.length; i++){
		var options = document.createElement("option");
		
		options.value = listaPostulantesNoCalifican[i]; 
		options.text = (i+1) + ". " + listaPostulantesNoCalifican[i]["nombre"] + " " + listaPostulantesNoCalifican[i]["apellido"];
		$(options).css("fontSize", "15px");
		comboPostulantesNoCalifican.append(options);
	}	
}
/*=====================================================================*/
