export const VentaData = [
    {
        id: '123',
        fecha: '27/09/2022',
        cliente: {
            id: '111111',
            nombre: 'María José Fernandez Jaimes'
        },
        valor: 55000,
        confirmado: true,
        detalle: [
            {
                nombre:'Naruto',
                precio: 55000,
                cantidad: 1
            }
        ]
    },
    {
        id: '234',
        fecha: '28/09/2022',
        cliente: {
            id: '22222',
            nombre: 'José María Riaño Cacua'
        },
        valor: 176000,
        confirmado: false,
        detalle: [
            {
                nombre: 'Kakashi Hatake pequeño - naruto',
                precio: 18000,
                cantidad: 1
            },
            {
                nombre: 'Monckey D Luffy One piece',
                precio: 79000,
                cantidad: 2
            }
        ]
    },
    {
        id: '543',
        fecha: '29/09/2022',
        cliente: {
            id: '1231',
            nombre: 'Dennis Camargo Duarte'
        },
        valor: 420000,
        confirmado: true,
        detalle: [
            {
                nombre: 'Tanjiro Kamado capa voladora - Demon Slayer',
                precio: 55000,
                cantidad: 1
            },
            {
                nombre: 'Kyojuro rengoku - Demon Slayer',
                precio: 49000,
                cantidad: 2
            },
            {
                nombre: 'Shenlong 14 cm esferas - Dragon Ball',
                precio: 89000,
                cantidad: 3
            }
        ]
    }
];