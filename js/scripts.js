$(document).ready(inicio);

function inicio(){
	$("#divPrincipal").show();
	$("#divpostulantes").hide();
	$("#divEmpresaCliente").hide();
	$("#divVacante").hide();
	$("#divExito").hide();
	$("#idTrTiposProgramasInfo").hide();
	
	$("#idBtnRegistrarPostulante").click(registrarPostulante);
	$("#divMenu ul li a").click(cambiarForm);
	$("#idRbtSi").click(programasInformaticos);
	$("#idRbtNo").click(programasInformaticos);
	
	cargarArrayEdades();
	cargarArrayRangoEdades();
}

/*============ NAVEGACION =================*/
function cambiarForm(){
	var vista = $(this).attr('id');
	$("#divExito").hide();
	
	switch(vista){
		case "vista_1":
			$("#divPrincipal").show();
			$("#divpostulantes").hide();
			$("#divEmpresaCliente").hide();
			$("#divVacante").hide();
			break;
		case "vista_2":
			$("#divPrincipal").hide();
			$("#divpostulantes").show();
			$("#divEmpresaCliente").hide();
			$("#divVacante").hide();
			$("#idTrTiposProgramasInfo").hide();
			break;
		case "vista_3":
			$("#divPrincipal").hide();
			$("#divpostulantes").hide();
			$("#divEmpresaCliente").show();
			$("#divVacante").hide();
			break;
		case "vista_4":
			$("#divPrincipal").hide();
			$("#divpostulantes").hide();
			$("#divEmpresaCliente").hide();
			$("#divVacante").show();
			break;
		case "vista_5":			
			break;
		case "vista_6":			
			break;
		default:
			break;
	}
}
/*==============================================*/



/*==== PROPIEDADES ARRAYS ====*/
var arrayPostulantes = []; 


/*============================*/



/*==== REGISTRO POSTULANTE ====*/
function registrarPostulante(){	

	//Valido que el usuario allá completado nombre, apellido, teléfono, edad y añosExp correctos, sino no lo dejo seguir.
	if(validarNombreyApellido() && validarTelefono() && validarComboEdad() && validarAñosExp()){
		
		//Si tiene conocimientos informáticos, voy a desplegar los tipos de programas y validar que seleccione al menos 1.
		if($("#idRbtSi").is(":checked")){
			var hasChecked = false;
			
			//Recorro los inputs de tipo checkbox que están dentro del divPostulante para validar que al menos 1 este chequeado.
			$( "#divpostulantes input[type='checkbox']" ).each(function() {
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
				$("#divpostulantes").hide();
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
			$("#divpostulantes").hide();
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
/*=======================================================================*/






