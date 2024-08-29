const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productos = [
    {
        id:"budin-limón",
        titulo: "Budin de limón",
        precio: 6000,
        img: "./assets/budinlimon.jpg",
    },
    {
        id:"budin-marmolado",
        titulo: "Budin marmolado",
        precio: 6000,
        img: "./assets/budinmarmolado.jpg",
    },
    {
        id:"carrotcake",
        titulo: "Carrotcake",
        precio: 30000,
        img: "./assets/carrotcake.jpg",
    },
    {
        id:"selvanegra",
        titulo: "Selva negra",
        precio: 30000,
        img: "./assets/selvanegra.jpg",
    },
    {
        id:"crumble",
        titulo: "Crumble de manzanas",
        precio: 20000,
        img: "./assets/crumble.jpg",
    },
    {
        id:"lemonPie",
        titulo: "Lemon pie",
        precio: 20000,
        img: "./assets/lemonpie.jpg",
    },{
        id:"lunettes",
        titulo: "Galletas lunettes",
        precio: 8000,
        img: "./assets/lunettes.jpg",
    },
    {
        id:"cookies",
        titulo: "Galletas con chips",
        precio: 8000,
        img: "./assets/galletachips.jpg",
    },
];

const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");
const vaciarCarrito = document.querySelector("#vaciar-carrito");

productos.forEach ((producto) => {
    let div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img class="producto-img" src="${producto.img}" alt="">
        <h3>${producto.titulo}</h3>
        <p>$${producto.precio}</p>
    `;

    let button = document.createElement("button");
    button.classList.add("producto-btn");
    button.innerText = "Agregar al carrito";
    button.addEventListener("click", () => {
        agregarAlCarrito(producto);
    })

    div.append(button);
    contenedorProductos.append(div);
});

const agregarAlCarrito = (producto) => {
    let productoEnCarrito = carrito.find((item) => item.id === producto.id);
    
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push ({...producto, cantidad: 1});
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
        vaciarCarrito.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");
        vaciarCarrito.classList.remove("d-none");

        carritoProductos.innerHTML = "";
        carrito.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <h3>${producto.titulo}</h3>
                <p>$${producto.precio}</p>
                <select class="form-select" aria-label="Default select example">
                </select>
                <p class="total">$${producto.cantidad * producto.precio}</p>
            `;

            let select = div.querySelector("select");
            let totalP = div.querySelector(".total");

            for (let i=1; i<=10; i++) {
                let option = document.createElement("option");
                option.value = i;
                option.textContent = i;
                select.appendChild(option);
            }

            select.value = producto.cantidad;

            select.addEventListener("change", () => {
                const cantidad = parseInt(select.value, 10);
                producto.cantidad = cantidad;
                totalP.innerText = cantidad * producto.precio;
                actualizarTotalCarrito();
                localStorage.setItem("carrito", JSON.stringify(carrito));
            });

            let button = document.createElement("button");
            button.classList.add("carrito-producto-btn");
            button.innerText = "❌";
            button.addEventListener("click", () => {
                borrarDelCarrito(producto);
            });

            div.append(button);
            carritoProductos.append(div);
        });
    }
    actualizarTotalCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function borrarDelCarrito(producto) {
    const indice = carrito.findIndex((item) => item.id === producto.id);
    carrito.splice(indice, 1);
    actualizarCarrito();
}

function actualizarTotalCarrito() {
    const totalGeneral = carrito.reduce((total, producto) => {
        return total + (producto.cantidad * producto.precio);
    }, 0);

    carritoTotal.innerText = "$" + totalGeneral;
}

vaciarCarrito.addEventListener("click", () => {
    carrito.length = 0;
    actualizarCarrito();
});