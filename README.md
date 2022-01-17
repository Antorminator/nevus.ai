# nevus.ai
Este repositorio contiene una herramienta online que utiliza **Machine Learning** para recepcionar una fotografía de un lunar de la piel (cuyo término médico es *nevus*) y devolver la posibilidad de que se corresponda con un melanoma. Los melanomas, o tumores melánicos, es una variedad de cáncer de piel que debe tratarse en sus primeras etapas, motivo por el cual se ha desarrollado esta herramienta.


## Modelo de Machine Learning
Para la creación y entrenamiento del modelo de apendizaje automático se ha utilizado la plataforma de Google **Teachable Machine**
(http://teachablemachine.withgoogle.com), y está compuesto por 2 clases, *Lunar* y *Melanoma*, cada una de las cuales ha sido alimentada con más de 450 fotografías reales.

Los datos utilizados para el entrenamiento del modelo se han obtenido de un dataset de la plataforma Kaggle (http://kaggle.com). En concreto, los datos fueron publicados por el usuario Claudio Fanconi y pueden encontrarse en el siguiente enlace: https://www.kaggle.com/fanconic/skin-cancer-malignant-vs-benign


## Aplicación web
La página web que sirve de *frontend* al modelo es un desarrollo simple basado en el framework de diseño Bootstrap (https://getbootstrap.com). 

El modelo de inteligencia artificial se ejecuta en la página mediante la versión JavaScript de **TensorFlow**.


## Despliegue y ejecución
El contenido del repositorio debe clonarse o descargarse en un servidor web y acceder a la URL correspondiente con un navegador web. 

Todo el código del proyecto **se ejecuta en el lado del cliente**; sin embargo, por las restricciones de seguridad de los navegadores modernos, es conveniente abrirlo desde una URL web y **no acceder directamente abriendo el index.html**.


## Uso
Para hacer una comprobación, realice una fotografía de un lunar sospechoso **a una distancia de no más de 3 cm**, y suminístrela al sistema pulsando en el botón que aparece en la parte inferior. Si se realiza la fotografía con un dispositivo móvil actual, se recomienda la utilización de la lente macro de la cámara (si dispone de ella).

**Las imágenes cargadas no son almacenadas en ningún momento**; se procesan en el navegador del usuario sin ser enviadas a ningún servidor externo.
