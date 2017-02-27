// declaro constructores 
var tanque = function(capacidad, dimensiones, color, aguaMax){
  this.tipo= "tanque";
  this.capacidad = capacidad;
  this.dimensiones = dimensiones;
  this.color = color;
  this.aguaMax = aguaMax;
  
  this.aguaActual = 0;
  this.modificaAgua = modificaAgua;
};

var cama = function(capacidad, dimensiones, color, aguaMax, sustrato){
  this.tipo = "cama";
  this.capacidad = capacidad;
  this.dimensiones = dimensiones;
  this.color = color;
  this.aguaMax = aguaMax;
  this.sustrato = sustrato;
  
  this.aguaActual = 0;
  this.modificaAgua = modificaAgua;
  
  
};

/// creo el metodo para controlar los litros de agua
function modificaAgua(litros) {
    var _self = this;
    if ( _self.aguaActual >= 29 ) {
      console.warn("La cama esta lleno, no puedes meter más agua");
    } else {    
      this.aguaActual += litros;
      if (_self.aguaActual >= 29) {
         var aguaDesechar = this.aguaActual - 29;
         console.log("desechamos " + aguaDesechar + " litros paraque no se desborde");
         _self.aguaActual -= aguaDesechar;
        console.log("Nos quedamos con la cama llena con " + _self.aguaActual + " litros");
      } else {
        console.log("Has llenado la cama hasta los " + _self.aguaActual + " litros");
      }
    }
  }

var tanquePeces = new tanque(40, "51 cm x 25.5 de ancho x 30.5 de alto", "Gris Claro", 29);
var camaPlantas = new cama(10, "51 cm x 25.5 de ancho x 10 de alto", "rojo", 5, "Piedra volcánica");

tanquePeces.modificaAgua(50);
camaPlantas.modificaAgua(20);


// nuevo método para agregar peces que permita definir nombre y clase
tanque.prototype.peces = [];
tanque.prototype.nuevoPez = function(nombre, clase){
  this.nombre = nombre;
  this.clase = clase;
};

cama.prototype.plantas = [];
cama.prototype.nuevaPlanta = function(nombre, clase){
  this.nombre = nombre;
  this.clase = clase;
};


// nuevo método para borrar peces y colocarlos en otro array para no perderlos
tanque.prototype.pecesDesechados = [];
tanque.prototype.borraPez = function(pez) {
  var posicionPez = this.peces.indexOf(pez);
  
    if ( posicionPez === -1) {
      console.warn("El pez " + pez.nombre + " no existe");
      } else {
      
      // meto al pez en el array de peces desechados y le elimino de la pecera
      this.pecesDesechados.push(this.peces[posicionPez]);
      this.peces.splice(posicionPez, 1);
    }
};

// nuevo método para borrar plantas y colocarlos en otro array para no perderlas
cama.prototype.plantasDesechadas = [];
cama.prototype.borraPlanta = function(planta) {
  var posicionPlanta = this.plantas.indexOf(planta);
  
    if ( posicionPlanta === -1) {
      console.warn("La planta " + planta.nombre + " no existe");
      } else {
      
      // meto al pez en el array de peces desechados y le elimino de la pecera
      this.plantasDesechadas.push(this.plantas[posicionPlanta]);
      this.plantas.splice(posicionPlanta, 1);
    }
};




// constructor de peces y plantas
var nemo = new tanquePeces.nuevoPez("nemo", "Pez de colores");
var juancho = new tanquePeces.nuevoPez("Juancho", "Pez de colores");

var hoja = new camaPlantas.nuevaPlanta("hoja", "Hojas de colores");
var cactus = new camaPlantas.nuevaPlanta("cactus", "cactus con pinchos");

// meto a los peces en el array de la peceray a las plantas
tanquePeces.peces.push(nemo);
tanquePeces.peces.push(juancho);

camaPlantas.plantas.push(hoja);
camaPlantas.plantas.push(cactus);

// borro un pez y lo desecho
tanquePeces.borraPez(nemo);

// Cereo metodo para controlar el estado del agua

function estadoAgua (datosAgua){
  this.nitratos = datosAgua.nitratos;
  this.nitritos = datosAgua.nitritos;
  this.dureza = datosAgua.dureza;
  this.carbonatos = datosAgua.carbonatos;
  this.ph = datosAgua.ph;
  this.cloro = datosAgua.cloro;

}

tanque.prototype.estadoAgua = estadoAgua;
cama.prototype.estadoAgua = estadoAgua;

tanquePeces.estadoAgua({
  nitratos : "10mg/l", 
  nitritos : "0.5mg/l", 
  dureza : ">7ºd", 
  carbonatos : "6ºd", 
  ph : "7.2", 
  cloro : "0.2mg/l"
});

camaPlantas.estadoAgua({
  nitratos : "10mg/l", 
  nitritos : "0.5mg/l", 
  dureza : ">7ºd", 
  carbonatos : "6ºd", 
  ph : "7.2", 
  cloro : "0.2mg/l"
});

console.log(tanquePeces);
console.log(camaPlantas);

function muestraEstado(objeto){
  
  objeto.tipo === "tanque" ? 
    console.log("================================ \n Estado del tanque \n ================================"):      
    console.log("================================ \n Estado de la Cama \n ================================");

  console.log("Agua disponible: " + objeto.aguaActual + "/" + objeto.aguaMax);
  console.log("Nitratos(NO3): " + objeto.nitratos + "mg/l");
  console.log("Nitritos(NO2): " + objeto.nitritos + "mg/l");
  console.log("Dureza de sales(GH): " + objeto.dureza + "ºd");
  console.log("Carbonatos(KH): " + objeto.carbonatos + "ºd");
  console.log("Ph(PH): " + objeto.ph);
  console.log("Cloro(CL2): " + objeto.cloro + "mg/l");
  
  
  if ( objeto.tipo === "tanque") {
    console.log("================================ \n Estado de los peces \n ================================");
    for (var peces in objeto.peces){
      peces++;
    }
    console.info("Numero de peces = " + (peces + 1));
  } else if ( objeto.tipo === "cama" ) {
    console.log("================================ \n Estado de las plantas \n ================================");
     for (var plantas in objeto.plantas){
      plantas++;
    }
    console.info("Numero de plantas = " + (plantas + 1));
  } 
  
  
}

muestraEstado(tanquePeces);
muestraEstado(camaPlantas);
