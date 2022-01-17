// Ruta de los ficheros con el modelo de AI
const URL = "./model/";

let model, reader; // Variables globales para almacenar el modelo de predicción y el buffer de lectura de imágenes

init(); // Inicialización del modelo


// La función init inicia el modelo de teachablemachine al cargar la página, e inicializa el buffer de lectura de
// ficheros asignándole un callback para realizar la clasificación de la imagen con el modelo
async function init(){
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // Carga el modelo de AI y los metadados asociados
    model = await tmImage.load(modelURL, metadataURL); //El objeto tmImage ya se integra automáticamente al importar las dependencias de tm

    //Integración de oyente para lectura de imágenes seleccionadas
    reader = new FileReader();
    reader.onload = function (e){
        //Inyección de la imagen seleccionada en el DOM
        document.getElementById("image").src=e.target.result;

        // Envío de la imagen al modelo predictivo, con un retraso de 1 segundo 
        // para que le dé tiempo a la imagen a mostrarse en el elemento img
        setTimeout(function(){
            predict(document.getElementById("image"));
        },1000);
    }

}

// Carga el modelo y le envía la imagen seleccionada
async function checkPicture() {
    
    showLoadEffect();            

    //Lectura de la imagen seleccionada por el usuario
    reader.readAsDataURL(document.getElementById("file-picker").files[0]);
}

// Predicción de la imagen suministrada
async function predict(image) {
    // Llamada a la función de predicción
    const prediction = await model.predict(image);
    
    let resultContainer = document.getElementById("result");

    // Obtención de la probabilidad de que la imagen sea un melanoma (la clase "Melanoma" está en el índice 0)
    let probability=prediction[0].probability*100;
    probability=probability.toFixed(0);

    if(probability>=75){
        resultContainer.innerHTML = "<i class='bi bi-exclamation-circle-fill fs-1 text-danger'></i><br />";
        resultContainer.innerHTML += "El análisis realizado muestra una ";
        resultContainer.innerHTML += "<strong class='text-danger'>probabilidad del "+probability+"% de que la imagen se corresponda con un melanoma</strong>. ";
        resultContainer.innerHTML += "Se recomienda acudir a su médico.";
    }
    else if(probability>=40){
        resultContainer.innerHTML = "<i class='bi bi-x-circle-fill fs-1 text-danger'></i><br />";
        resultContainer.innerHTML += "<strong class='text-danger'>El análisis realizado no es concluyente</strong>.<br />";
        resultContainer.innerHTML += "<br />Se recomienda repetir la prueba con una imagen más nítida o utilizando otra fuente de luz.";
    }
    else{
        resultContainer.innerHTML = "<i class='bi bi-emoji-smile-fill fs-1 text-success'></i><br />";
        resultContainer.innerHTML += "El análisis de la imagen <strong class='text-success'>no detecta riesgo de melanoma.</strong>";
    }

    resultContainer.innerHTML += "<br /><br /><strong>ATENCIÓN: esta herramienta no sustituye a un diagnóstico profesional.</strong><br />";
    console.log("DEBUG - Probabilidad de melanoma: "+probability+"%");

    hideLoadEffect();
}

// Muestra el efecto de carga ocultando/mostrando los elementos correspondientes
function showLoadEffect(){
    document.getElementById("warning").style.display = "none";
    document.getElementById("result").style.display = "none";
    
    document.getElementById("image-container").style.display = "block";
    document.getElementById("loading").style.display = "block";
}

// Oculta el efecto de carga ocultando/mostrando los elementos correspondientes
function hideLoadEffect(){
    
    document.getElementById("result").style.display = "block";
    
    document.getElementById("loading").style.display = "none";

    document.getElementById("file-picker").value = "";
}