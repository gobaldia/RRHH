window.onload = function() {	
	document.getElementById("idErrorAñosExp").onblur = validarAñosExp();
	cargarArrayEdades();
	cargarArrayRangoEdades();
}


function validarAñosExp(){
	var añosIngresados = document.getElementById("trErrorAñosExp");
	if(!isNaN(añosIngresados.value)){
		trErrorAñosExp.visibility = true;		
	} else if(añosIngresados.value < 0 || añosIngresados.value > 70){		
		trErrorAñosExp.visibility = true;		
	} else {
		trErrorAñosExp.visibility = false;
	}
}

function cargarArrayEdades(){
	var comboEdades = document.getElementById("idEdadesPostulantes");
	
	for(var i=17; i<100; i++){
		var options = document.createElement("option");
		
		if(i == 17){
			options.value = "";
			options.text = "Seleccione una edad...";
			comboEdades.appendChild(options);
		} else {
			options.value = i;			
			options.text = i;	
			comboEdades.appendChild(options);			
		}
	}
}

function cargarArrayRangoEdades() {
	var comboRangoEdades = document.getElementById("idRangoEdad");

	for (var i = 15; i < 100; i+=5) {
		var options = document.createElement("option");

		if (i == 15) {
			options.value = "";
			options.text = "Seleccione un rango de edad...";
			comboRangoEdades.appendChild(options);
		} else if (i == 20) {
			options.value = "Menor a 20";
			options.text = "Menor a 20";
			comboRangoEdades.appendChild(options);
		} else {
			options.value = i-5 + " a " + i;
			options.text = i-5 + " a " + i;
			comboRangoEdades.appendChild(options);
		}
	}
}
