var nombreApp ="";

var matriz1 = new Array();
var textoContenido = "";

// CORRESPONDEN A LAS 3 FILAS EN EL DOCUMENTO HTML   <P>
var f1,f2,f3;

//cantidad de aciertos por el usuario
var contadorAciertosUsuario = 0;
var contadorAciertosAleatorios = 0;

//cantidad de minas que pone la funcion aleatoria en la matriz 3x3
var contadorMinas = 0;

var texto;

//variable que indica si se ha hecho click sobre el enlace <GENERAR MATRIZ>
var indicaGeneracionMatriz = false;

// matriz vacia con sus elementos estaticos predefinidos
var matriz2 = [["0","0","0"],
			   ["0","0","0"],
			   ["0","0","0"]];

var matrizIncognita = [["?","?","?"],
			           ["?","?","?"],
			           ["?","?","?"]];

			   

//-----------------------------------------------------------------------------
function funcionVoidMain(args){
	//alert('JUEGO - CAMPO :: MINADO');

	BoxItemMenuReiniciar.disabled = true;
}
//_----------------------------------------------------------------------------





function generarMatriz(){

		f1 = document.getElementById('fila1');
		f2 = document.getElementById('fila2');
		f3 = document.getElementById('fila3');


	    setTimeout(function(){

	  		generarMatriz3x3();
	  		//alert('termino el timmer');

	    },1000);
 
	    
		
}

function generarMatriz3x3(){

	var numeroTest;


	var fila1 = '';
	var fila2 = '';
	var fila3 = '';

	//matriz1 = new Array("1,1,1", "1,1,1","1,1,1");

	for (i=0; i< 3; i++){
		for(j=0; j<3; j++){
			numeroTest  = retornaNumeroAleatorio(0,1);
			matriz2[i][j] = parseInt(numeroTest);

			//se cuenta la cantidad de minas generadas dinamicamente
			if (numeroTest == 1){
				contadorMinas++;
			}else{
				contadorAciertosAleatorios++;
			}
			
			numeroTest = 0;

			if (i == 0){
				fila1 = fila1 + '          ' + matriz2[i][j];
				
				if (j == 2){
					fila1 = fila1 + '\n';
				}
			} else if(i == 1){

				fila2 = fila2 + '          ' + matriz2[i][j];
				if (j == 2){
					fila1 = fila1 + '\n';
				}				
			} else if (i == 2){
 
				fila3 = fila3 + '          ' + matriz2[i][j];
				if (j == 2){
					fila1 = fila1 + '\n';
				}
			}
		}
	}

	//CAMBIANDO EL ESTADO DE LA VARIABLE INDICANDO QUE SE HAN ASIGNADO MINAS A LA MATRIZ DE MANERA ALEATORIA
	indicaGeneracionMatriz = true;
	alert('Matriz generada exitosamente, OJO! se colocaron: ' + contadorMinas + ' minas en total,  cantidad campos neutrales: ' + contadorAciertosAleatorios);	
	mostrarMatrizGeneradaContenidoPagePpal(fila1, fila2, fila3);
	//imprimirMatriz3x3(matriz2);

		 setTimeout(function(){

	  		mostrarMatrizEnIncognitas(0,0,0,0);
	  		//alert('termino el timmer');

	    },3000);
    

}

function mostrarMatrizGeneradaContenidoPagePpal(fila1, fila2, fila3){
 	//imprime la matriz en la seccion contenido

 	var xx = fila1 + '\n' + fila2 + '\n' + fila3;
 
 	f1.textContent = fila1;
 	f2.textContent = fila2;
 	f3.textContent = fila3;
}


function mostrarMatrizEnIncognitas(primerVez, posY, posX, caracterImpreso){
	var pv = primerVez;
	var caracter = caracterImpreso;
	var fil1 = "", fil2 = "", fil3= "";

	if (pv == 1){
		matrizIncognita[posX][posY] = caracter;
	}


	for(i=0;  i<3;  i++){
		for(j=0;  j<3;  j++){
			//si es primer vez que se pintan las incognitas
				if (pv == 0){
					if (i == 0){
						  fil1 = fil1 + '          ' + matrizIncognita[i][j];				
				    } else if(i == 1){
						  fil2 = fil2 + '          ' + matrizIncognita[i][j];				
					} else if (i == 2){
					   	  fil3 = fil3 + '          ' + matrizIncognita[i][j];	
					}
				} else {
					//es necesario mostrar el elemento que selecciono el usuario

					

					if (i == 0){
						  fil1 = fil1 + '          ' + matrizIncognita[i][j];				
				    } else if(i == 1){
						  fil2 = fil2 + '          ' + matrizIncognita[i][j];				
					} else if (i == 2){
					   	  fil3 = fil3 + '          ' + matrizIncognita[i][j];	
					}

				}		
		}
	}

	f1.textContent = fil1;
 	f2.textContent = fil2;
 	f3.textContent = fil3;

 	//alert('FINAL DE LA MATRIZ INCOGNITA');
}

function pintarTodasLasMinas_JuegoPerdido(){

		var filaMinas1 = "";
		var filaMinas2 = "";
		var filaMinas3 = "";


		for (i=0; i< 3; i++){
			for(j=0; j<3; j++){


				if (matriz2[i][j] == 1){
					matriz2[i][j] = "X";
				}



				if (i == 0){
					filaMinas1 = filaMinas1 + '          ' + matriz2[i][j];									
				} else if(i == 1){
					filaMinas2 = filaMinas2 + '          ' + matriz2[i][j];					
				} else if (i == 2){	 
					filaMinas3 = filaMinas3 + '          ' + matriz2[i][j];				
				}

			}
		}


			f1.textContent = filaMinas1;
 	        f2.textContent = filaMinas2;
 	        f3.textContent = filaMinas3;

}

//----------------- FUNCION QUE CAPTURA UNA POSICION EN LA MATRIZ PARA SABER SI ES O NO MINADO EL CAMPO
function capturarOpcionUsuarioPorPosicionXY (){

	//validacion:
	if (indicaGeneracionMatriz == true){

			//captura y validacion del elemento Y de la matriz
			do{
				var posx = prompt('Ingrese la posicion Y [FILA] en la matriz:');
				if (posx < 0 || posx > 2){
					alert('debe ingresar valores validos en el rango: [0, 1 , 2] que forman parte del indice de la matriz');
				}

			}while(posx < 0 || posx > 2);


			//captura y validacion del elemento X de la matriz
			do{
				var posy = prompt('Ingrese la posicion X [COLUMNA] en la matriz:');
				if (posy < 0 || posy > 2){
					alert('debe ingresar valores validos en el rango: [0, 1 , 2] que forman parte del indice de la matriz');
				}
			}while(posy < 0 || posy > 2);
			

			if (matriz2[posx][posy] == 1){
				alert('CAMPO MINADO, USTED TIENE UNA MEMORIA DE:  POLLO!');

				//mostrarMatrizEnIncognitas(1,posy,posx,"X");
				pintarTodasLasMinas_JuegoPerdido();

			}else{
				contadorAciertosUsuario++;

				if (contadorAciertosUsuario == contadorAciertosAleatorios){
					alert('FELICITACIONES!  USTED TIENE EXCELENTE MEMORIA...');
				}

				alert('CAMPO SIN MINAS');
				mostrarMatrizEnIncognitas(1,posy,posx,"0");
			}

	}else {
		alert ('NO HA PRESIONADO CLICK SOBRE EL ENLACE ::  <GENERAR MATRIZ>');
	}
}

//----------------------------------------------------------------------------------------------------------------
//Genera un número aleatorio entre un rango de enteros
function retornaNumeroAleatorio(minimo, maximo)
{
	//variable que captura una referencia de un numero aleatorio en un rango definido
    var numero = Math.floor( Math.random() * (maximo - minimo + 1) + minimo );
    return numero;
}