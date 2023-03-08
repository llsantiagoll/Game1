const seleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")
const seleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")
const sectionMensajes = document.getElementById("resultado")
const ataqueDelJugador = document.getElementById("ataque-del-jugador")
const ataqueDelEnemigo = document.getElementById("ataque-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorAtaques = document.getElementById("contenedor-ataques")
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")
const FIRE = "FUEGO"
const WATER = "AGUA"
const EARTH = "TIERRA"
const STONE = "PIEDRA"
const GHOST = "FANTASMA"
const anchoMaximoDelMapa = 1000

var pokemones = []
var ataqueJugador = []
var ataqueEnemigo = []
var botones = []
var victoriasJugador = 0
var victoriasEnemigo = 0
var vidasJugador = 3
var vidasEnemigo = 3
var lienzo = mapa.getContext("2d")
var mapaBackground = new Image()
mapaBackground.src = "./Img/mokemap.png"
var opcionDePokemones
var mascotaJugador
var ataquesPokemon
var ataquesPokemonEnemigo
var inputCharmander
var inputBulbasaur
var inputSquirtle
var botonFuego
var botonAgua
var botonTierra
var indexAtaqueJugador
var indexAtaqueEnemigo
var intervalo
var mascotaJugadorObjeto
var alturaQueBusco
var anchoDelMapa = window.innerWidth - 20


alturaQueBusco = anchoDelMapa * 500 / 800

if(anchoDelMapa > anchoMaximoDelMapa)
{
    anchoDelMapa = anchoMaximoDelMapa - 2               
}

mapa.height = alturaQueBusco
mapa.width = anchoDelMapa

//planos para crear objetos
class Pokemon
    {
        constructor(nombre, ruta, vida, fotoMapa) //especificaciones
            {
                this.nombre = nombre //especificaciones
                this.ruta = ruta     //especificaciones
                this.vida = vida     //especificaciones
                this.ataques = []    //especificaciones
                this.ancho = 30
                this.alto = 30
                this.x = aleatorio(0, mapa.width - this.ancho)
                this.y = aleatorio(0, mapa.height - this.alto)
                this.mapaFoto = new Image()
                this.mapaFoto.src = fotoMapa
                this.velocidadX = 0
                this.velocidadY = 0
            }
        pintarPokemon()
            {
                lienzo.drawImage(
                    this.mapaFoto, 
                    this.x, 
                    this.y, 
                    this.alto, 
                    this.ancho)
            }
    }
//objetos creados
var Charmander = new Pokemon("Charmander", "./Img/charmander.png", 5, "./Img/charmanderemoji.png")
var Bulbasaur = new Pokemon("Bulbasaur", "./Img/bulbasaur.png", 5, "./Img/bulbasauremoji.png")
var Squirtle = new Pokemon("Squirtle", "./Img/squirtle.png", 5, "./Img/squirtleemoji.png")
var CharmanderEnemigo = new Pokemon("Charmander", "./Img/charmander.png", 5, "./Img/charmanderemoji.png")
var BulbasaurEnemigo = new Pokemon("Bulbasaur", "./Img/bulbasaur.png", 5, "./Img/bulbasauremoji.png")
var SquirtleEnemigo = new Pokemon("Squirtle", "./Img/squirtle.png", 5, "./Img/squirtleemoji.png")

Charmander.ataques.push //creando y inyectando los ataques
    (
        { nombre:"🔥", id:"boton-fuego" },
        { nombre:"👻", id:"boton-fantasma" },
        { nombre:"🥌", id:"boton-piedra" },
        { nombre:"💧", id:"boton-agua" },
        { nombre:"🌱", id:"boton-tierra" },
    )

CharmanderEnemigo.ataques.push //creando y inyectando los ataques
    (
        { nombre:"🔥", id:"boton-fuego" },
        { nombre:"👻", id:"boton-fantasma" },
        { nombre:"🥌", id:"boton-piedra" },
        { nombre:"💧", id:"boton-agua" },
        { nombre:"🌱", id:"boton-tierra" },
    )
Bulbasaur.ataques.push //creando y inyectando los ataques
    (
        { nombre:"🌱", id:"boton-tierra" },
        { nombre:"🥌", id:"boton-piedra" },
        { nombre:"👻", id:"boton-fantasma" },
        { nombre:"🔥", id:"boton-fuego" },
        { nombre:"💧", id:"boton-agua" },
    ) 
BulbasaurEnemigo.ataques.push //creando y inyectando los ataques
    (
        { nombre:"🌱", id:"boton-tierra" },
        { nombre:"🥌", id:"boton-piedra" },
        { nombre:"👻", id:"boton-fantasma" },
        { nombre:"🔥", id:"boton-fuego" },
        { nombre:"💧", id:"boton-agua" },
    )    
Squirtle.ataques.push //creando y inyectando los ataques
    (
        { nombre:"💧", id:"boton-agua" },
        { nombre:"🔥", id:"boton-fuego" },
        { nombre:"👻", id:"boton-fantasma" },
        { nombre:"🌱", id:"boton-tierra" },
        { nombre:"🥌", id:"boton-piedra" },
    )
SquirtleEnemigo.ataques.push //creando y inyectando los ataques
    (
        { nombre:"💧", id:"boton-agua" },
        { nombre:"🔥", id:"boton-fuego" },
        { nombre:"👻", id:"boton-fantasma" },
        { nombre:"🌱", id:"boton-tierra" },
        { nombre:"🥌", id:"boton-piedra" },
    )
pokemones.push(Charmander, Bulbasaur, Squirtle) //creando contenedor de todos los pokemones

function iniciarJuego()
    {
        seleccionarAtaque.style.display = "none"
        sectionVerMapa.style.display = "none"


        pokemones.forEach((pokemon) =>
            {
                opcionDePokemones = //pasar de html a javascript las tarjetas
                `
                    <input type="radio" name="mascota" id=${pokemon.nombre} />
                    <label class="tarjeta-charmander" for=${pokemon.nombre}>
                    <p>${pokemon.nombre}</p>
                    <img src=${pokemon.ruta} alt=${pokemon.nombre} />
                    </label>
                `
                contenedorTarjetas.innerHTML += opcionDePokemones
                inputCharmander = document.getElementById("Charmander")
                inputBulbasaur = document.getElementById("Bulbasaur")
                inputSquirtle = document.getElementById("Squirtle")
            })
            botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
            botonReiniciar.addEventListener("click", reiniciarJuego)
    }
function seleccionarMascotaJugador()
    {
        
        sectionVerMapa.style.display = "none"
        
        if(inputCharmander.checked)
            {
                spanMascotaJugador.innerHTML = inputCharmander.id //creando fuente de la verdad
                mascotaJugador = inputCharmander.id
            }
        else if(inputBulbasaur.checked)
            {
                spanMascotaJugador.innerHTML = inputBulbasaur.id //creando fuente de la verdad
                mascotaJugador = inputBulbasaur.id
            }
        else if(inputSquirtle.checked)
            {
                spanMascotaJugador.innerHTML = inputSquirtle.id //creando fuente de la verdad
                mascotaJugador = inputSquirtle.id
            }
        else
            {
                alert("Selecciona una mascota")
                return
            }
        seleccionarMascota.style.display = "none"
        sectionVerMapa.style.display = "flex"
        extraerAtaques(mascotaJugador)
        iniciarMapa()
   }
function extraerAtaques(mascotaJugador)
    {
        let ataques
        for(let i = 0 ;i < pokemones.length; i++){
        if(mascotaJugador === pokemones[i].nombre){
            ataques = pokemones[i].ataques
        }}
        mostrarAtaques(ataques)
    }
function mostrarAtaques(ataques)
    {
        ataques.forEach((ataque) =>
            {
                ataquesPokemon = `<button id=${ataque.id} class="boton-fire BAtaque">${ataque.nombre}</button>`
                contenedorAtaques.innerHTML += ataquesPokemon
            })
        botonAgua = document.getElementById("boton-agua")
        botonTierra = document.getElementById("boton-tierra")
        botonFuego = document.getElementById("boton-fuego")
        botones = document.querySelectorAll('.BAtaque')
    }
function secuenciaAtaque()
    {
        botones.forEach((boton) => 
        {
            boton.addEventListener('click', (e) => 
                {
                    if(e.target.textContent === "🔥")
                        {
                            ataqueJugador.push(FIRE)
                            console.log(ataqueJugador)
                            boton.style.background = '#112f58'
                            boton.disabled = true
                        }
                    else if(e.target.textContent === "💧")
                        {
                            ataqueJugador.push(WATER)
                            console.log(ataqueJugador)
                            boton.style.background = '#112f58'
                            boton.disabled = true
                        }
                    else if(e.target.textContent === "🌱")
                        {
                            ataqueJugador.push(EARTH)
                            console.log(ataqueJugador)
                            boton.style.background = '#112f58'
                            boton.disabled = true
                        }
                    else if(e.target.textContent === "🥌")
                        {
                            ataqueJugador.push(STONE)
                            console.log(ataqueJugador)
                            boton.style.background = '#112f58'
                            boton.disabled = true
                        }
                    else 
                        {
                            ataqueJugador.push(GHOST)
                            console.log(ataqueJugador)
                            boton.style.background = '#112f58'
                            boton.disabled = true
                        }
                        ataqueAleatorioEnemigo()    
                })
        })
    }
function seleccionarMascotaEnemigo(enemigo)
    {
        spanMascotaEnemigo.innerHTML = enemigo.nombre
        ataquesPokemonEnemigo = enemigo.ataques

        secuenciaAtaque()
    }
function ataqueAleatorioEnemigo()
    {
        let ataqueAleatorio = aleatorio(0, ataquesPokemonEnemigo.length -1)

        if(ataqueAleatorio == 0)
            {
                ataqueEnemigo.push(FIRE)
            }
        else if(ataqueAleatorio == 1)
            {
                ataqueEnemigo.push(WATER)
            }
        else if (ataqueAleatorio == 2)
            {
                ataqueEnemigo.push(EARTH)
            }
        else if (ataqueAleatorio == 3)
            {
                ataqueEnemigo.push(STONE)
            }
        else 
            {
                ataqueEnemigo.push(GHOST)
            }
        console.log(ataqueEnemigo)
        iniciarPelea()
    }
function iniciarPelea()
    {
        if (ataqueJugador.length === 5) {
            combate()
        }
    }
function indexAmbosOponentes(jugador, enemigo)
    {
        indexAtaqueJugador = ataqueJugador[jugador]
        indexAtaqueEnemigo = ataqueEnemigo[enemigo]
    }
function combate()
    {
        for (let index = 0; index < ataqueJugador.length; index++) 
        {  if(ataqueJugador[index] === ataqueEnemigo[index]){
                indexAmbosOponentes(index, index)
                crearMensaje("EMPATE")
            }
            else if(ataqueJugador[index] === FIRE && ataqueEnemigo[index] === EARTH)
            {
                indexAmbosOponentes(index, index)
                crearMensaje("GANASTE")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            }
            else if(ataqueJugador[index] === FIRE && ataqueEnemigo[index] === STONE)
            {
                indexAmbosOponentes(index, index)
                crearMensaje("GANASTE")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            }
            else if(ataqueJugador[index] === WATER && ataqueEnemigo[index] === FIRE)
            {
                indexAmbosOponentes(index, index)
                crearMensaje("GANASTE")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            }
            else if(ataqueJugador[index] === WATER && ataqueEnemigo[index] === GHOST)
            {
                indexAmbosOponentes(index, index)
                crearMensaje("GANASTE")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            }
            else if(ataqueJugador[index] === EARTH && ataqueEnemigo[index] === GHOST)
            {
                indexAmbosOponentes(index, index)
                crearMensaje("GANASTE")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            }
            else if(ataqueJugador[index] === GHOST && ataqueEnemigo[index] === STONE)
            {
                indexAmbosOponentes(index, index)
                crearMensaje("GANASTE")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            }
            else if(ataqueJugador[index] === STONE && ataqueEnemigo[index] === WATER)
            {
                indexAmbosOponentes(index, index)
                crearMensaje("GANASTE")
                victoriasJugador++
                spanVidasJugador.innerHTML = victoriasJugador
            }
            else 
            {
                indexAmbosOponentes(index, index)
                crearMensaje("PERDISTE")
                victoriasEnemigo++
                spanVidasEnemigo.innerHTML = victoriasEnemigo
            }
        }
            revisarVidas()
    }
function revisarVidas()
    {
        if(victoriasJugador === victoriasEnemigo)
        {
            crearMensajeFinal("EMPATE")
        }
        else if(victoriasJugador > victoriasEnemigo)
        {
            crearMensajeFinal("GANASTE")
        }
        else
        {
            crearMensajeFinal("PERDISTE")
        }
    }
function crearMensaje(resultado)
    {
        let nuevoAtaqueJugador = document.createElement("p")
        let nuevoAtaqueEnemigo = document.createElement("p")

        sectionMensajes.innerHTML = resultado
        nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
        nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo
        
        ataqueDelJugador.appendChild(nuevoAtaqueJugador)
        ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo)
    }
function crearMensajeFinal(resultadoFinal)
    {   
        sectionMensajes.innerHTML = resultadoFinal
        botonFuego.disabled = true
        botonAgua.disabled = true
        botonTierra.disabled = true
        sectionReiniciar.style.display = "block"
    }
function reiniciarJuego()
    {
        location.reload()
    }
function aleatorio(min, max) 
    {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
function pintarPersonaje()
    {
        mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
        mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
        lienzo.clearRect(0, 0, mapa.width, mapa.height)
        lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)
        mascotaJugadorObjeto.pintarPokemon()
        CharmanderEnemigo.pintarPokemon()
        BulbasaurEnemigo.pintarPokemon()
        SquirtleEnemigo.pintarPokemon()
        if(mascotaJugadorObjeto.velocidadx !== 0 || mascotaJugadorObjeto.velocidadY !== 0)
            {revisarColicion(CharmanderEnemigo)
            revisarColicion(BulbasaurEnemigo)
            revisarColicion(SquirtleEnemigo)}
    }
function moverIzquierda()
    {
        mascotaJugadorObjeto.velocidadX = -5
    }
function moverArriba()
    {
        mascotaJugadorObjeto.velocidadY = -5
    }
function moverDerecha()
    {
        mascotaJugadorObjeto.velocidadX = 5
    }
function moverAbajo()
    {
        mascotaJugadorObjeto.velocidadY = 5
    }
function detenerMovimiento()
    {
        mascotaJugadorObjeto.velocidadX = 0
        mascotaJugadorObjeto.velocidadY = 0
    }
function sePresionoUnaTecla(event)
    {
        switch (event.key) 
            {
                case "ArrowLeft":
                    moverIzquierda()
                    break
                case "ArrowUp":
                    moverArriba()
                    break
                case "ArrowRight":
                    moverDerecha()
                    break
                case "ArrowDown":
                    moverAbajo()
                    break
                default:
                    break
            }
    }
function iniciarMapa() 
    {
        mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
        intervalo = setInterval(pintarPersonaje, 50)
        window.addEventListener("keydown", sePresionoUnaTecla)
        window.addEventListener("keyup", detenerMovimiento)
    }
function obtenerObjetoMascota()
    {
        for(let i = 0 ;i < pokemones.length; i++){
            if(mascotaJugador === pokemones[i].nombre){
                return pokemones[i]
            }}  
    }

function revisarColicion(enemigo)
    {
        const arribaEnemigo = enemigo.y
        const abajoEnemigo = enemigo.y + enemigo.alto
        const derechaEnemigo = enemigo.x + enemigo.ancho
        const izquierdaEnemigo = enemigo.x
        const arribaMascota = mascotaJugadorObjeto.y
        const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
        const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
        const izquierdaMascota = mascotaJugadorObjeto.x
        if(
            abajoMascota < arribaEnemigo ||
            arribaMascota > abajoEnemigo ||
            derechaMascota < izquierdaEnemigo ||
            izquierdaMascota > derechaEnemigo
        ){return}
        
        seleccionarMascotaEnemigo(enemigo)
        detenerMovimiento()
        clearInterval(intervalo)
        seleccionarAtaque.style.display = "flex"
        sectionVerMapa.style.display = "none"
    }
window.addEventListener("load", iniciarJuego)  