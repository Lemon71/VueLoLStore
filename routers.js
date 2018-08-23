const routers = [
    {
        path: '/list',
        meta: {
            title: '商品列表'
        },
        component: (resolve) => require(['./views/list.vue'], resolve)
    },
    {
        path: '/hero/:id',
        meta: {
            title: '商品详情'
        },
        component: (resolve) => require(['./views/hero.vue'], resolve)
    },
    {
        path: '/cart',
        meta: {
            title: '购物车'
        },
        component: (resolve) => require(['./views/cart.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/list'
    }
];
export default routers;