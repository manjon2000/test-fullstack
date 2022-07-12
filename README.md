# Test Full Stack <> Fantasticfy
Prueba técnica para el puesto de Full stack JR

## Requisitos
Para realizar dicha prueba podréis utilizar JS, Node.js o React. Otros lenguajes no serán aceptados.

Tenéis plena libertad para implementar la lógica.

## Pasos a seguir

* Realizar una llamada a la siguiente API: "https://dog.ceo/api/breeds/list/all" para obtener todas las razas de perros (Las key del objeto son las razas de perro. EJ: {australian: []})
* Guardar el nombre de la raza de perro en un título "h3"
* Realizar una llamada a la siguiente API: "https://dog.ceo/api/breed/${key}/images" para obtener todas las imágenes de cada raza (El parámetro ${key} es el nombre de la raza).
* Mostrar solo 3 imágenes de cada perro
* Guardar las 3 imágenes dentro de un div 
* Guardar tanto el elemento "h3" como el div con las imágenes, en un div con una clase que contenga el nombre de la raza

Estructura:
```
<div class="cockapoo">
  <h3>cockapoo</h3>
  <div>
    <img src="https://images.dog.ceo/breeds/cockapoo/Scout.jpg" width="100" height="100" class="img-click">
    <img src="https://images.dog.ceo/breeds/cockapoo/big-eye-ginger.JPG" width="100" height="100" class="img-click">
    <img src="https://images.dog.ceo/breeds/cockapoo/bubbles1.jpg" width="100" height="100" class="img-click">
  </div>
</div>
```
* Guardar todos los div de razas en un div general
* Crear un evento para que al clicar sobre una imagen, esta se muestre en una segunda columna del HTML.

## Estructura final
```
<div class="General">
  Divs con todas las razas
</div>
<div class="segunda_columna">
  Imagen dinámica
</div>
```
## Opcional (Se valorarán)
* Realizar un buscador para mostrar solo la raza buscada y esconder las demás.
* Codificar un botón para reordenar alfabéticamente las razas de perro.
* Se valorará el ejecutar pruebas unitarias.

Una vez finalizado, puedes enviar la url de tu repositorio a: victor@fantasticfy.com. 

¡Mucha suerte!
