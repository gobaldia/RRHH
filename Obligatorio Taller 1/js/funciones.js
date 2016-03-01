window.onload = function() {	
	
	document.getElementById("idErrorAñosExp").onblur = validarAñosExp();
	cargarArrayEdades();
	
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