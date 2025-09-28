const body = document.querySelector('body')
body.style.fontFamily ="DM Sans"

const galeria = document.getElementById('galeria')
const btnTodo = document.getElementById('btnTodo')
const btnDisponible =document.getElementById('btnDisponible')

let allProducts = [] // ---------------arreglo para guardar los cafes

function actualizarProductos (productos){
    galeria.innerHTML = ""

    const fragment = document.createDocumentFragment()
    //-----------------recorrer el arreglo donde estám guardados los datos de los cafes
    productos.forEach(prod =>{ 

        const card = document.createElement('article')
        card.className = 'card' // nombre de clase en Css
        
        const contenerdor = document.createElement('div') // contenedor para imagen e insignia
        contenerdor.className = 'contenedor'

            if(prod.popular){ //---------- true--------------
                const insignia = document.createElement('span')
                insignia.className = 'insignia'   
                insignia.textContent = 'Popular'
                
                contenerdor.appendChild(insignia)
            }

            const img = document.createElement('img')
            img.src = prod.image
            img.alt = prod.name

            contenerdor.appendChild(img)

        card.appendChild(contenerdor)

        const nombrePrecio = document.createElement('div') // div contenedor
        nombrePrecio.className = 'nombrePrecio' // nombre de clase en Css

            const tituloCard = document.createElement('h3')
            tituloCard.textContent = prod.name
            nombrePrecio.appendChild(tituloCard)
            
            const precio = document.createElement('p')
            precio.textContent = `${prod.price}`
            
            nombrePrecio.appendChild(precio)

        card.appendChild(nombrePrecio)

        const resenia = document.createElement('div')
        resenia.className = 'resenia'
        
            const contDerecha = document.createElement('div')

                const rating = document.createElement('span')
                rating.className = 'rating'
                
                const votos = document.createElement('span')
                votos.className = 'votos'
            
            if(prod.rating === null || prod.votes ===0){   // condicional
                contDerecha.textContent = '☆ No ratings'
            }else{
                rating.textContent = `⭐ ${prod.rating}`
                votos.textContent = ` (${prod.votes} votes)`
            }

            const agotado = document.createElement('span')
            agotado.className ='agotado'
                if(prod.available !== true){
                    agotado.textContent = `Sold out`
                }
        contDerecha.appendChild(rating)
        contDerecha.appendChild(votos)
        
        resenia.appendChild(contDerecha)
        resenia.appendChild(agotado)

        card.appendChild(resenia)

        fragment.appendChild(card)
    })
    galeria.appendChild(fragment)
}
// --------------- función para obtener los dotos -------------------
const obtenerDatos = async()=>{
    try{
        const response = await fetch('https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/simple-coffee-listing-data.json')
        if(!response.ok) throw new Error ('Error en fetch')
            //---------------------- erorr intencional ------------------------------------
//throw new Error('Error, no estamos atendiendo')
        allProducts = await response.json() 
        actualizarProductos(allProducts)    

    } catch(err){
        galeria.innerHTML = `<p> Error al cargar los productos </P>`
        console.error(err)
    }
    
}
btnTodo.addEventListener('click', ()=> {
    actualizarProductos(allProducts)
    btnTodo.style.backgroundColor ='#6F757C'
    btnDisponible.style.backgroundColor = '#1B1D1F'
})

btnDisponible.addEventListener('click', ()=> {
    const disponibles = allProducts.filter(p=> p.available)
    actualizarProductos(disponibles)
    btnDisponible.style.backgroundColor ='#6F757C'
    btnTodo.style.backgroundColor = '#1B1D1F'
})

obtenerDatos()