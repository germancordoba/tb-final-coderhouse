let url_dolar = "https://dolarapi.com/v1/dolares/blue";
let dato_dolar = "";
fetch(url_dolar)
  .then((resp) => {
    console.log(resp);
    return resp.json();
  })
  .then((valor_dolar) => {
    console.log(valor_dolar);
    dato_dolar = valor_dolar.venta;
  });

class zapatillas {
  constructor(marca, modelo, precio, stock, url) {
    this.marca = marca;
    this.modelo = modelo;
    this.precio = precio;
    this.stock = stock;
    this.url = url;
  }
}

// Base de datos para ubicar en el localstorage y que aparezca en las cartas en el Dom
let zapatilla = [];

let section = document.querySelector("section");
let container = document.querySelector("#container");
let segundo_btn = section.querySelector(".segundo_btn");
let tercer_btn = section.querySelector(".tercer_btn");

// le hacemos click al segundo boton para acceder a la base de datos, al cual le hacemos un metodo para poder
//recorrerlo completo y hacer un clon de la etiqueta template para que aprezca en el dom
let template = document.querySelector("template");
let contenido = template.content;

segundo_btn.addEventListener("click", () => {
  clones();
});

let second_container = document.querySelector("#second_container");
let btn_datos = document.querySelector("#btn_datos");

// al btn_datos se le dice que este atento al click porque se van a guardar los elmentos nuevos en el localstorage
btn_datos.addEventListener("click", () => {
  let marca = document.querySelector("#marca").value;
  let modelo = document.querySelector("#modelo").value;
  let precio = document.querySelector("#precio").value;
  let stock = document.querySelector("#stock").value;
  let url = document.querySelector("#url").value;

  let zapatilla_2 = new zapatillas(marca, modelo, precio, stock, url);

  zapatilla.push(zapatilla_2);
  localStorage.setItem("zapatillas", JSON.stringify(zapatilla));
  borrar_cartas();
  clones();
});

tercer_btn.addEventListener("click", () => {
  localStorage.clear();
  borrar_cartas();
});

// Esta funcion se encarga de clonar las partes del html para cambiarles los datos
function clones() {
  JSON.parse(localStorage.getItem("zapatillas"))?.forEach((zapatilla) => {
    let clon = contenido.cloneNode(true);
    clon.querySelector("#img").src = `${zapatilla.url}`;
    clon.querySelector("h5").innerText = `${zapatilla.marca}`;
    clon.querySelector("#p_one").innerText = `${zapatilla.modelo}`;
    clon.querySelector("#stock").innerText = `${zapatilla.stock}`;
    clon.querySelector("#precio").innerText = `$${zapatilla.precio}`;
    clon.querySelector("#usd").innerText = ` USD$${(
      zapatilla.precio / dato_dolar
    ).toFixed(2)}`;
    container.appendChild(clon);
  });
}

// Esta funcion se encarga de borra las cartas cuando se borrar la base de datos
function borrar_cartas() {
  container.innerHTML = "";
  zapatilla = [];
}
