//BASE DE DATOS DE PRODUCTOS
const productos = [{
        id: 1,
        marca: 'HP',
        modelo: 'Envy',
        precio: 550000,
        stock: 2,
        desc: [{
            procesador: 'Core I5',
            ram: '4',
            HDD: '500 GB'
        }]
    },
    {
        id: 2,
        marca: 'ASUS',
        modelo: 'Vivo',
        precio: 1550000,
        stock: 1,
        desc: [{
            procesador: 'Core I7',
            ram: '16',
            HDD: '1 TB'
        }]

    },
    {
        id: 3,
        marca: 'DELL',
        modelo: 'Inspiron',
        precio: 700000,
        stock: 6,
        desc: [{
            procesador: 'Core I5',
            ram: '8',
            HDD: '1 TB'
        }]
    },
    {
        id: 4,
        marca: 'LENOVO',
        modelo: 'Yoga',
        precio: 300000,
        stock: 2,
        desc: [{
            procesador: 'Core I3',
            ram: '4',
            HDD: '500 GB'
        }]
    },
    {
        id: 5,
        marca: 'APPLE',
        modelo: 'MAC PRO',
        precio: 2700000,
        stock: 0,
        desc: [{
            procesador: 'Core I7',
            ram: '16',
            HDD: '500 GB'
        }]
    },
    {
        id: 6,
        marca: 'ACER',
        modelo: 'Aspire 5',
        precio: 555000,
        stock: 3,
        desc: [{
            procesador: 'Ryzen 5',
            ram: '8',
            HDD: '1 TB'
        }]
    },
    {
        id: 7,
        marca: 'HUAWEI',
        modelo: 'D5',
        precio: 560000,
        stock: 2,
        desc: [{
            procesador: 'CORE I5',
            ram: '8',
            HDD: '500 GB'
        }]
    },
    {
        id: 8,
        marca: 'HP',
        modelo: '15 UF15´´',
        precio: 360000,
        stock: 0,
        desc: [{
            procesador: 'DUAL CORE',
            ram: '4',
            HDD: '350 GB'
        }]
    }
];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let selectProducto = [],
    carroCompra = [],
    totales = [],
    subTotal,
    cantProductos,
    total;

//HTML
const _TIENDA = document.querySelector('.vitrinaProductos');
const _TABLAHTMLCOMPRA = document.querySelector('.tablaCarroCompra tbody');
const TABLATOTALES = document.querySelector('.tablaTotales tbody');
const BTNVACIAR = document.querySelector('.vaciar');
const _BTNPAY = document.querySelector('.btnPagar');

//HTML USUARIO

const _INPUTUSER = document.querySelector('#input__user');
const _INPUTPASS = document.querySelector('#input__pass');
const _BTNINICIARSS = document.querySelector('.ctaValidar');
const _SPANUSUARIO = document.querySelector('#span__user');
const _BTNCERRARSS = document.querySelector('.btnCerrar');

//TOTALES
const COSTOSUBTOTAL = document.querySelector('.subtotal');
const COSTODESPACHO = document.querySelector('.despacho');
const COSTOIMPUESTO = document.querySelector('.impuesto');
const COSTOIVA = document.querySelector('.iva');
const COSTOTOTAL = document.querySelector('.total');

document.addEventListener('DOMContentLoaded', () => {
    LISTARPRODUCTOS();
    MOSTRARCARRO();
    if (sessionStorage.getItem('usuario')) {
        HTMLUSUARIO();
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Para comprar debe iniciar sesión',
            showConfirmButton: false,
            timer: 1500
        })
    }
});

_BTNCERRARSS.addEventListener('click', () => {
    sessionStorage.removeItem('usuario');
    location.reload();
})

_BTNINICIARSS.addEventListener('click', () => {
    VALIDARUSUARIO(_INPUTUSER.value, _INPUTPASS.value);
})

_BTNPAY.addEventListener('click', () => {
    console.log(carroCompra);
    if (carroCompra.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Carro Vacio',
            text: 'Debe agregar productos al carro para poder pagar.'
        });
    } else {
        Swal.fire({
            title: 'Confirmación de compra?',
            text: "Está seguro que desea efectuar esta compra!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar compra'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Ok!',
                    'Compra efectuada con exito.',
                    'success'
                )
                VACIARCARRO();
            }
        })
    }

})

const LISTARPRODUCTOS = () => {
    productos.forEach((producto) => {
        //CARD PRODUCTO
        const _COL = document.createElement('div');
        _COL.classList.add('col');

        const _CARD = document.createElement('div');
        _CARD.classList.add('card');

        //IMG
        const _IMAGEN = document.createElement('img');
        _IMAGEN.classList.add('card-img-top');
        _IMAGEN.setAttribute('src', '../img/note.jpg');

        // CARDBODY
        const _CARDBODY = document.createElement('div');
        _CARDBODY.classList.add('card-body');

        //PRECIO
        const _PRECIO = document.createElement('h5');
        _PRECIO.classList.add('card-title', 'precio');
        _PRECIO.textContent = `$ ${producto.precio}`;

        //TEXTO CON MARCA MODELO Y CARACTERISTICAS
        const _DESC = document.createElement('p');
        _DESC.classList.add('card-text', 'marca');
        _DESC.textContent = `Notebook ${producto.marca} ${producto.modelo} con Procesador ${producto.desc[0].procesador}, ${producto.desc[0].ram} GB Ram y ${producto.desc[0].HDD}`;

        const _CARDFOOTER = document.createElement('div');
        _CARDFOOTER.classList.add('card-footer');
        const _TEXTSTOCK = document.createElement('small');
        _TEXTSTOCK.classList.add('text-muted');

        const _BTNAGG = document.createElement('button');
        _BTNAGG.classList.add('btn', 'btn-primary', 'btnAgregar');
        _BTNAGG.setAttribute('id', producto.id);
        _BTNAGG.setAttribute('stock', producto.stock);
        _BTNAGG.setAttribute('marca', producto.marca);
        _BTNAGG.setAttribute('modelo', producto.modelo);
        _BTNAGG.setAttribute('precio', producto.precio);
        _BTNAGG.textContent = "Agregar";

        if (producto.stock === 0) {
            _TEXTSTOCK.textContent = `Sin Stock`;
        } else {
            _TEXTSTOCK.textContent = `${producto.stock} Unidades`;
        }

        _BTNAGG.addEventListener('click', ANADIRPRODUCTO);


        _CARDBODY.appendChild(_PRECIO);
        _CARDBODY.appendChild(_DESC);
        _CARDBODY.appendChild(_BTNAGG);
        _CARDFOOTER.appendChild(_TEXTSTOCK);

        _CARD.appendChild(_IMAGEN);
        _CARD.appendChild(_CARDBODY);
        _CARD.appendChild(_CARDFOOTER);

        _COL.appendChild(_CARD);

        _TIENDA.appendChild(_COL);
    })
};

const ANADIRPRODUCTO = (e) => {
    let stockProducto = e.target.getAttribute('stock');
    if (stockProducto == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Sin Stock',
            text: 'Lamentablemente no contamos con este producto.'
        });
    } else {
        CREARCARRITO(e.target.parentElement);
    }
}

const CREARCARRITO = (e) => {
    selectProducto = {
        id: e.querySelector('.btnAgregar').getAttribute('id'),
        nombre: `Notebook ${e.querySelector('.btnAgregar').getAttribute('marca')} ${e.querySelector('.btnAgregar').getAttribute('modelo')}`,
        cantidad: 1,
        precio: Number(e.querySelector('.btnAgregar').getAttribute('precio'))
    }
    const VERIFICACION = carroCompra.some(carro => carro.id === selectProducto.id);
    if (VERIFICACION) {
        const PRODUCT = carroCompra.map(prod => {
            if (prod.id === selectProducto.id) {
                prod.cantidad++;
                prod.precio = Number(selectProducto.precio) + Number(prod.precio);
                return prod;
            } else {
                return prod;
            }
        })
        selectProducto = [...PRODUCT];
        CARROLOCALESTORAGE();
    } else {
        carroCompra = [...carroCompra, selectProducto];
        CARROLOCALESTORAGE();
    }
    MOSTRARCARRO();
}

const MOSTRARCARRO = () => {
    carroCompra = JSON.parse(localStorage.getItem('carro')) || [];
    _TABLAHTMLCOMPRA.innerHTML = '';
    carroCompra.forEach(carro => {
        const fila = document.createElement('tr');
        fila.innerHTML = `<th>${carro.nombre}</th>
        <td>$ ${carro.precio}</td>
        <td>${carro.cantidad}</td>
                        <td><button class="btn btn-danger" id=${carro.id}>X</button></td>`;
        _TABLAHTMLCOMPRA.appendChild(fila);
    });
    VALORES();
}

const VALORES = () => {
    TABLATOTALES.innerHTML = '';
    subTotal = 0;
    cantProductos = 0;
    carroCompra.forEach(carro => {
        cantProductos += carro.cantidad;
        subTotal += carro.precio;
    })
    const DELIVERY = 1500;
    let impuestoDespacho = cantProductos * 350;
    let iva = Math.round(subTotal * 0.19);
    let total = Number(subTotal) + Number(DELIVERY) + Number(impuestoDespacho) + Number(iva);

    totales = {
        subtotal: subTotal,
        desp: DELIVERY,
        impDesp: impuestoDespacho,
        iva: iva,
        totalCompra: total
    }

    MOSTRARTABLATOTALES();
}

const MOSTRARTABLATOTALES = () => {
    const TDVAL = document.createElement('tr');
    TDVAL.innerHTML = ` <th>$ ${totales.subtotal}</th>
                        <td>$ ${totales.desp}</td>
                        <td>$ ${totales.impDesp}</td>
                        <td>$ ${totales.iva}</td>
                        <td>$ ${totales.totalCompra}</td>`;
    TABLATOTALES.appendChild(TDVAL);
}

const CARROLOCALESTORAGE = () => {
    localStorage.setItem('carro', JSON.stringify(carroCompra))
}

const VACIARCARRO = () => {
    localStorage.removeItem('carro');
    carroCompra = [];
    TABLATOTALES.innerHTML = '';
    _TABLAHTMLCOMPRA.innerHTML = '';
}

const VALIDARUSUARIO = (usuario, password) => {
    if (usuario == "" && password == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error al ingresar',
            text: 'Debe ingresar correctamente usuario y contraseña.'
        });
        return;
    } else if (usuario == 'cliente' && password == '123') {
        GUARDARSESSION(user = usuario);
        Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: `Hola ${usuario}, bienvenido a la Tiendita de Escalab`
        });
        HTMLUSUARIO();
        location.reload();
    }

}

const HTMLUSUARIO = () => {
    _SPANUSUARIO.textContent = sessionStorage.getItem('usuario');
    _BTNPAY.disabled = false;
}

const GUARDARSESSION = (user) => {
    sessionStorage.setItem('usuario', user);
}

BTNVACIAR.addEventListener('click', VACIARCARRO);