
const texta = document.getElementById("areaJSON");
texta.addEventListener("keydown", (e) => e.preventDefault());

texta.addEventListener("paste", transformarJSON);

const btnLimpiar = document.querySelector(".btnLimpiar")
btnLimpiar.addEventListener("click", limpiarArea)

const contenedor = document.querySelector(".contenedor")

const btnPDF = document.querySelector(".btnPDF");
btnPDF.addEventListener("click", exportarPDF);


function limpiarArea() {
    document.getElementById("areaJSON").value = "";
    contenedor.innerHTML = "";
    btnPDF.disabled = true;
}

function transformarJSON() {

    setTimeout(() => {

        let data;
        let area = texta.value

        try {
            data = JSON.parse(area)
            btnPDF.disabled = false;

        } catch {
            console.log("El texto no es un JSON")
        }

        let pedido = data.name;
        let items = [];

        for (let item in data.checklists[0].checkItems) {
            items.push(data.checklists[0].checkItems[item].name);
        }
        re(items, pedido);

    }), 0;

}




function re(it, Npedido) {

    const fragmento = document.createDocumentFragment();


    for (let item of it) {
        const rotulos = document.createElement("DIV");
        rotulos.classList.add("mostrarJS");
        const divPedido = document.createElement("DIV");
        divPedido.classList.add("divPedido");
        const pedido = document.createElement("P");
        pedido.classList.add("pedido");
        pedido.innerHTML = Npedido;
        const divDetalle = document.createElement("DIV");
        divDetalle.classList.add("divDetalle");
        const detalle = document.createElement("P");
        detalle.classList.add("item");
        detalle.innerHTML = item;

        divPedido.appendChild(pedido)
        divDetalle.appendChild(detalle)
        rotulos.appendChild(divPedido);
        rotulos.appendChild(divDetalle);
        fragmento.appendChild(rotulos);
    }
    contenedor.appendChild(fragmento)

}

function exportarPDF() {
    window.scrollTo(0, 0)

    const paginas = document.querySelector(".contenedor")

    const opciones = {
        filename: "pruebaPDF.pdf",
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
            unit: 'cm',
            format: [9, 8],
            orientation: 'landscape'
        }
    };

    html2pdf().from(paginas).set(opciones).save();


}
