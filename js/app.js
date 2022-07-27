// Lo que es constante es el tipo de dato arreglo, 
// pero en su interior los valores si pueden cambiar
const ingresos = [
    new Ingreso('Salario',2100.00),
    new Ingreso('Venta',100.00),
];

const egresos = [
    new Egreso('Renta departamento',900.00),
    new Egreso('Ropa',400.00)
];

let totalIngresos = () => {
    let totalIngreso = 0;

    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }

    return totalIngreso;
}

let totalEgresos = () => {
    let totalEgreso = 0;

    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }

    return totalEgreso;
}

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgresos = totalEgresos() / totalIngresos();

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgresos);
    document.getElementById('ingresos').innerHTML =formatoMoneda( totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) => {
    // en-US  es-MX
    return valor.toLocaleString('en-US',{
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })
}

const formatoPorcentaje = valor => {
    return valor.toLocaleString('en-US',{
        style: 'percent',
        minimumFractionDigits:2
    })
}

// Generar de manera dinamica componentes de ingresos

const cargarIngresos = () => {
    let ingresosHTML = '';

    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }

    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (elm) => {

    let componenteHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${elm.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(elm.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick='eliminarIngreso(${elm.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;

    return componenteHTML;
}

const cargarEgresos = () => {
    let egresosHTML = '';

    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }

    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (elm) => {
    let componenteHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${elm.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(elm.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(elm.valor/totalEgresos())}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick='eliminarEgreso(${elm.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;

    return componenteHTML;
}

const eliminarIngreso = (id) => {
    const elmIndex = ingresos.findIndex((ingreso)=> ingreso.id === id);
    // Cuantos elementos se eliminaran a partir del indice.
    ingresos.splice(elmIndex,1);

    cargarCabecero();
    cargarIngresos();
}

const eliminarEgreso = (id) => {
    const elmIndex = ingresos.findIndex((egreso)=> egreso.id === id);
    // Cuantos elementos se eliminaran a partir del indice.
    egresos.splice(elmIndex,1);

    cargarCabecero();
    cargarEgresos();
}

const agregarDato = () => {
    let formulario = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];

    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            // Number(valor.value)   =  +valor.value
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}