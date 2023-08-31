// Estas informações estarão disponíveis via banco de dados
// Buscar os dados e salvar no localStorage e atualizar de tempo em tempo

export const items = [
    {
        title: 'Home',
        url: '/',
    },
    {
        title: 'Biblioteca',
        url: 'library/home',
        submenu: [
            {
                title: 'Home',
                url: 'library/home',
            },
            {
                title: 'Backlog',
                url: 'library/backlog',
            },
        ],
    },
    {
        title: 'Financeiro',
        // url: 'finance/home'
        submenu: [
            {
               title: 'Investimentos',
               submenu: [
                   {
                       title: 'Dashboard',
                       url: '/finance/investment'
                   }
               ]
            },
            {
                title: 'Dashboard',
                url: 'finance/dashboard'
            },
            {
                title: 'Registros',
                url: 'finance/records'
            }
        ]
    },
    {
        title: 'About',
        url: '/about',
    },

];