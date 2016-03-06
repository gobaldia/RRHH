$(document).ready(inicio);

function inicio(){
	$("#divPrincipal").show();
	$("#divpostulantes").hide();
	$("#divEmpresaCliente").hide();
	$("#divVacante").hide();
	$("#trErrorAñosExp").hide();
	
	$("#idErrorAñosExp").blur(validarAñosExp);
	
	$("#divMenu ul li a").click(cambiarForm);
	
	cargarArrayEdades();
	cargarArrayRangoEdades();
}

function cambiarForm(){
	var vista = $(this).attr('id');
	
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


function validarAñosExp(){
	var añosIngresados = $("#idErrorAñosExp");
	if(isNaN(añosIngresados.val())){
		$("#trErrorAñosExp").show();
	} else if(parseInt(añosIngresados.val()) < 0 || parseInt(añosIngresados.val()) > 70){		
		$("#trErrorAñosExp").show();		
	} else {
		$("#trErrorAñosExp").hide();
	}
}

function cargarArrayEdades(){
	var comboEdades = $("#idEdadesPostulantes");
	
	for(var i=17; i<100; i++){
		var options = document.createElement("option");
		
		if(i == 17){
			options.value = "";
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
