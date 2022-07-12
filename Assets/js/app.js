
document.addEventListener('DOMContentLoaded', function() {

    // Declaracion de varuables
    let items, keyDog, dogRaza, imgDog, imgCondicion,
    containerGeneral, containerImgDinamica, itemImg, buscador,itemOrdenados,itemNoOrdenado;
    keyDog = [];
    imgDog = [];
    containerGeneral = document.querySelector('.general');
    containerImgDinamica = document.querySelector('.segunda_columna');
    buscador = document.getElementById('buscador');
    itemOrdenados = document.querySelector('.ordenado');
    itemNoOrdenado = document.querySelector('.no-ordenado');
    document.cookie = 'ordenada=true';
     
    
    // Valor de la busqueda
    buscador.addEventListener('keyup', function(e) {
        const valorBuscador = e.target.value.toLowerCase();
        buscar(valorBuscador);
     });

    
   

    // Variable Url api
    const urlApi = 'https://dog.ceo/api/breeds/list/all';
    
    // Conectarse a la api
    const connectApi =  async (url) => {

        // Conexion a la api
        const response = await fetch(url);
        const data = await response.json();

        // Guardar la key en un array
        for (const key in data.message) {
            keyDog.push(key);
        }
        
        // Guardar las razas en localSotrage
        localStorage.setItem('data', JSON.stringify([keyDog]));
    }
    // Logica general
    const sinombre = () =>  {
        // Obtener las razas del localStorage
        dogRaza = JSON.parse(localStorage.getItem('data'));
        // Convertirlo en string y separarlo por comas
        let separar = dogRaza.toString().split(',');
        // console.log(separar.length)
        for (let index = 0; index < separar.length; index++) {
            const imagenes = obtenerImagenes('https://dog.ceo/api/breed/', separar[index]).then(
                val => {
                    if(val.length === separar.length ) {
                        // Guardar la informacion en localStorage
                        let datos = JSON.stringify(val);
                        localStorage.setItem('results', datos);
                        // Imprimir el template

                        if(document.cookie.match('ordenada=false')){
                            getTemplate(val.reverse((a,b) => a.name - b.name));
                        }else
                         {
                            getTemplate(val);
                         }
                        
                         itemImg = document.querySelectorAll('.img-click');
                        // Evento click a imagenes
                        itemImg.forEach(item => {
                            item.addEventListener('click', function() {
                                // Insertar la imagen dinamica al contenerdor
                                containerImgDinamica.innerHTML = 
                                `<img src="${this.src}" style="transition: ease-in-out 1s !important;">`;
                                // Efecto scroll hacia la imagen dinamica
                                    window.scroll({
                                        top: 789*30,
                                        behavior: 'smooth'
                                    });
                            })
                        })
                    }
                });                
        }
    }
    // Obtener todas las imagenes que correspondan con la raza
    const obtenerImagenes =  async (url, raza) => {

        imgCondicion = [];

        const urlImg = `${url}${raza}/images`;
        const response = await fetch(urlImg);
        const data = await response.json();

        if(data.status === 'success') {
            imgDog.push({name:raza , imagenes: data.message});
        }
        return imgDog;
    }
    // Generar el template
    const getTemplate = (items) => {
        items.map(item => {
            containerGeneral.innerHTML += `

               <div class="${item.name}">
                    <h3>${item.name}</h3>
                        <div>
                            ${item.imagenes.map((img, indice) => {
                                if(indice <= 2){ 
                                    return `<img src="${img}"  width="100" height="100" class="img-click">`} 
                                }).join('')}
                        </div>
                 </div>`;
        });
    };
    const mensajeError = (error,item) => {
        console.log(`${error} ${item}`);
    }
    const buscar = (elemento) => {
        
        if(elemento != '' && elemento.length >= 1){
            containerGeneral.innerHTML = '';
            let resultados = JSON.parse(localStorage.getItem('results')).filter(item => {
                return item.name.includes(elemento);
            });
                if(resultados.length === 0){
                    console.log(`No hay resultados con ese nombre: ${elemento}`);
                    mensajeError('No hay resultados con ese nombre', elemento);
                    if(document.cookie.match('ordenada=false')){
                        let resultadosGuardados = JSON.parse(localStorage.getItem('results'))
                        .reverse((a,b) => a.name - b.name);
                    }else
                     {
                        resultadosGuardados = JSON.parse(localStorage.getItem('results'))
                     }
                    

                    console.log(resultadosGuardados);
                    getTemplate(resultadosGuardados);
                    
                    
                }else
                {
                    getTemplate(resultados);
                }
                itemImg = document.querySelectorAll('.img-click');
                itemImg.forEach(item => {
                    item.addEventListener('click', function() {
                        // Insertar la imagen dinamica al contenerdor
                        containerImgDinamica.innerHTML = 
                        `<img src="${this.src}" style="transition: ease-in-out 1s !important;">`;
                        // Efecto scroll hacia la imagen dinamica
                            window.scroll({
                                top: 789*30,
                                behavior: 'smooth'
                            });
                    })
                })
                    
        }
    }

    itemOrdenados.addEventListener('click', function(e){
        containerGeneral.innerHTML = '';
        let resultados = JSON.parse(localStorage.getItem('results'));
        getTemplate(resultados); 
        itemImg = document.querySelectorAll('.img-click');
        itemImg.forEach(item => {
            item.addEventListener('click', function() {
                // Insertar la imagen dinamica al contenerdor
                containerImgDinamica.innerHTML = 
                `<img src="${this.src}" style="transition: ease-in-out 1s !important;">`;
                // Efecto scroll hacia la imagen dinamica
                    window.scroll({
                        top: 789*30,
                        behavior: 'smooth'
                    });
            })
        })
    });
    itemNoOrdenado.addEventListener('click', function(e){
        containerGeneral.innerHTML = '';
        let resultados = JSON.parse(localStorage.getItem('results'))
        .reverse((a,b) => a.name - b.name)
        getTemplate(resultados); 
        itemImg = document.querySelectorAll('.img-click');
        itemImg.forEach(item => {
            item.addEventListener('click', function() {
                // Insertar la imagen dinamica al contenerdor
                containerImgDinamica.innerHTML = 
                `<img src="${this.src}" style="transition: ease-in-out 1s !important;">`;
                // Efecto scroll hacia la imagen dinamica
                    window.scroll({
                        top: 789*30,
                        behavior: 'smooth'
                    });
            })
        })
    });

    // Comprobar si existe el localStorage
    if(localStorage.getItem('data') === null || localStorage.getItem('data') === undefined)
    {
      connectApi(urlApi);
       setTimeout( () => {
            sinombre()
       },3000)
    }else{
        sinombre()
    }   
});
