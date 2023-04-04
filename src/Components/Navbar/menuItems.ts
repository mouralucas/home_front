export const menuItems = [
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