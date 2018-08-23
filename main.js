import Vue from 'vue';//差点忘了，不然甚至不能创建vue实例
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './app.vue';
import Routers from './routers'
import hero_data from './heros'
//补充，在main的store里操作数据
Vue.use(VueRouter);
Vue.use(Vuex);
const routerConfig ={
    mode:'history',
    routes:Routers //参数的key是routes，记错了显示不出来
};
const router =new VueRouter(routerConfig);

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});


// 数组排掉重复的部分
function getFilterArray (array) {
    const res = [];
    const json = {};
    for (let i = 0; i < array.length; i++){
        const _self = array[i];
        if(!json[_self]){
            res.push(_self);
            json[_self] = 1;
        }
    }
    return res;
}

const store =new Vuex.Store({
    state:{
        //储存的两个重要数据，一个是全部数据，一个是购物车数据
        heroList:[],
        cartList:[]
    },
    mutations:{
        //跳转到list就会触发，用于把数据放进heroList
        setHeroList (state,data){
            state.heroList=data;
        },
        addCart (state, id) {
            // 先判断购物车是否已有，如果有，数量+1
            //购物车的本质就是一个个对象，但是只有id和数量两个key
            // 两个界面添加购物车是同样的调用这里的方法
            const isAdded = state.cartList.find(item => item.id === id);
            if (isAdded) {
                isAdded.count ++;
            } else {
                state.cartList.push({
                    id: id,
                    count: 1
                })
            }
        },
        // 界面会发送对象id和要加减的数量过来，修改购物车里面英雄的数量
        editCartCount (state, payload) {
            const hero = state.cartList.find(item => item.id === payload.id);
            hero.count += payload.count;
        },
        // 界面会发送对象id过来，删除商品
        deleteCart (state, id) {
            const index = state.cartList.findIndex(item => item.id === id);
            state.cartList.splice(index, 1);
        },
        // 清空购物车
        emptyCart (state) {
            state.cartList = [];
        }
    },
    getters:{
        //用于在菜单生成"可筛选的项目"
        position: state => {
            const position = state.heroList.map(item => item.position);
            return getFilterArray(position);
        },
        //用于在菜单生成"可筛选的项目"
        heros: state => {
            const heros = state.heroList.map(item => item.hero);
            return getFilterArray(heros);
        },
        sex: state => {
            const sex = state.heroList.map(item => item.sex);
            return getFilterArray(sex);
        }
    },
    actions:{
        //调用mutations
        getHeroList (context) {
            // 用定时器模拟ajax请求
            setTimeout(() => {
                context.commit('setHeroList', hero_data);
            }, 500);
        },
        // 购买
        buy (context) {
            // 真实环境应通过 ajax 提交购买请求后再清空购物列表
            return new Promise(resolve=> {
                setTimeout(() => {
                    context.commit('emptyCart');
                    resolve();
                }, 500)
            });
        }
    }
});
new Vue({
    el:'#app',
    router:router,
    store:store,
    render:h => {
        return h(App)
    }
});