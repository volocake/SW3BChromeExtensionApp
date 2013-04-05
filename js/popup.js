/* Extension Calendario del Startup Weekend Tj 3 */

var semana=["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado" ];
/* Link Request para el calendario del Evento Oficial*/
var requestCalendarGoogle = "https://www.googleapis.com/calendar/v3/calendars/0538djil1mtduscku37mvu3nos%40group.calendar.google.com/events?key=AIzaSyCkV23-71YAErg4DAtfgZ5xEtvVe8ziffA&singleEvents=True&orderBy=startTime";


var hoy = new Date();


var llamarCalendario = function(){
	//Comparo si estamos en marzo[2](MES DE PRUEBA) o abril[3]
	if (hoy.getMonth() > 2 && hoy.getMonth() < 4){
		
		$.getJSON(requestCalendarGoogle, function(data) {
			$.each(data.items, function(key, value){
				var inicio = new Date(data.items[key].start.dateTime);
				var fin    = new Date(data.items[key].end.dateTime);
		
				verDia(inicio,fin,data.items[key]);
	       	 });
	    }).error(function() {
	            $('div#div_viernes, div#div_sabado, div#div_domingo').hide();
	            $('#cuerpo').append('<span class="error">Error al sincronizar el horario de actividades</span>')
	    }); 
	}
	//Si es en otro mes
	else{

		$.getJSON(requestCalendarGoogle, function(data) {
		
			$.each(data.items, function(key, value){

				var inicio = new Date(data.items[key].start.dateTime);
				var fin    = new Date(data.items[key].end.dateTime);
				
				switch(semana[inicio.getDay()]){
				case "Viernes": $("table#tabla_viernes tbody").append('<tr><td><span class="titulo">'+ data.items[key].summary +'</span><br/><span class="horario">'+ inicio.toLocaleTimeString()+'-'+fin.toLocaleTimeString()+'</span></td></tr>');
								break;
				case "Sabado":  $("table#tabla_sabado tbody").append('<tr><td><span class="titulo">'+ data.items[key].summary +'</span><br/><span class="horario">'+ inicio.toLocaleTimeString()+'-'+fin.toLocaleTimeString()+'</span></td></tr>');
								break;
				case "Domingo": $("table#tabla_domingo tbody").append('<tr><td><span class="titulo">'+ data.items[key].summary +'</span><br/><span class="horario">'+ inicio.toLocaleTimeString()+'-'+fin.toLocaleTimeString()+'</span></td></tr>');
								break;
				}
	       	 });
	    }).error(function() {
	            $('div#div_viernes, div#div_sabado, div#div_domingo').hide();
	            $('#cuerpo').append('<span class="error">Error al sincronizar el horario de actividades</span>')
	    }); 		
	}
	
	
}


var verDia = function(inicio, fin, evento){
	//si es l numero del día y si el evento esta entre las horas correspondientes
	if(hoy.getDate() == inicio.getDate() && fin.getTime() > hoy.getTime() && inicio.getTime() < hoy.getTime()){
		switch(semana[inicio.getDay()]){
				case "Viernes": $("table#tabla_viernes tbody").append('<tr><td class="transcurso_celda"><span class="titulo transcurso">'+ evento.summary +'</span><br/><span class="horario transcurso_horario">'+ inicio.toLocaleTimeString()+'-'+fin.toLocaleTimeString()+'</span></td></tr>');
								break;
				case "Sabado":  $("table#tabla_sabado tbody").append('<tr><td class="transcurso_celda"><span class="titulo transcurso">'+ evento.summary +'</span><br/><span class="horario transcurso_horario">'+ inicio.toLocaleTimeString()+'-'+fin.toLocaleTimeString()+'</span></td></tr>');
								break;
				case "Domingo": $("table#tabla_domingo tbody").append('<tr><td class="transcurso_celda"><span class="titulo transcurso">'+ evento.summary +'</span><br/><span class="horario transcurso_horario">'+ inicio.toLocaleTimeString()+'-'+fin.toLocaleTimeString()+'</span></td></tr>');
								break;
			}
	}
	//si es un día anterior o es el mismo día pero la hora ya pasó
	else if(inicio.getDate() < hoy.getDate() || hoy.getDate()==inicio.getDate() && fin.getTime() < hoy.getTime() ){
		switch(semana[inicio.getDay()]){
				case "Viernes": $("table#tabla_viernes tbody").append('<tr><td><span class="titulo tachado">'+ evento.summary +'</span><br/><span class="horario tachado">'+ inicio.toLocaleTimeString()+'-'+fin.toLocaleTimeString()+'</span></td></tr>');
								break;
				case "Sabado":  $("table#tabla_sabado tbody").append('<tr><td><span class="titulo tachado">'+ evento.summary +'</span><br/><span class="horario tachado">'+ inicio.toLocaleTimeString()+'-'+fin.toLocaleTimeString()+'</span></td></tr>');
								break;
				case "Domingo": $("table#tabla_domingo tbody").append('<tr><td><span class="titulo tachado">'+ evento.summary +'</span><br/><span class="horario tachado">'+ inicio.toLocaleTimeString()+'-'+fin.toLocaleTimeString()+'</span></td></tr>');
								break;
			}
	}
	//es el cualquier día del mes
	else{
		switch(semana[inicio.getDay()]){
				case "Viernes": $("table#tabla_viernes tbody").append('<tr><td><span class="titulo">'+ evento.summary +'</span><br/><span class="horario">'+ inicio.toLocaleTimeString()+'-'+fin.toLocaleTimeString()+'</span></td></tr>');
								break;
				case "Sabado":  $("table#tabla_sabado tbody").append('<tr><td><span class="titulo">'+ evento.summary +'</span><br/><span class="horario">'+ inicio.toLocaleTimeString()+'-'+fin.toLocaleTimeString()+'</span></td></tr>');
								break;
				case "Domingo": $("table#tabla_domingo tbody").append('<tr><td><span class="titulo">'+ evento.summary +'</span><br/><span class="horario">'+ inicio.toLocaleTimeString()+'-'+fin.toLocaleTimeString()+'</span></td></tr>');
								break;
			}
	}

}


$(document).ready(function() {
	llamarCalendario();
});