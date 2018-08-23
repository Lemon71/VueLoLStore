<template>
    <div class="heroList">
        <div class="heroList-menu">
            <!--自动生成可筛选项-->
            <!--原本的按英雄名筛选，因为业务实际逻辑没意义，不用了-->
            <!--方法在下面没有注释-->
            <!--<div v-for="who in heros" @click="handleFilterHero(who)">{{who}}</div>-->
            <div class="heroList-select">
                <b>请选择英雄定位</b>
                <div :class="{active: where === filterPosition}" class="heroList-menu-selectPosition" v-for="where in position" @click="handleFilterPosition(where)">{{where}}</div>
            </div>

            <div class="heroList-select">
                <b >请选择英雄性别</b>
                <div :class="{active: which === filterSex}" class="heroList-menu-selectSex" v-for="which in sex" @click="handleFilterSex(which)">{{which}}</div>
            </div>

            <div class="heroList-select">
                <b>选择排序方式</b>
                <div :class="{active: order === ''}" class="heroList-menu-selectSex" @click="handleOrderDefault">默认</div>
                <div :class="{active: order === 'cost-asc'||order ==='cost-desc'}" class="heroList-menu-selectSex" @click="handleOrderCost">价格
                    <span v-if="order === 'cost-asc'">↑</span>
                    <span v-if="order === 'cost-desc'">↓</span>
                </div>
                <div :class="{active: order === 'sales'}" class="heroList-menu-selectSex" @click="handleOrderSales">销量</div>
            </div>

        </div>
        <div class="heroList-content">
            <hero  v-for="hero in filteredAndOrderedList" :info="hero" ></hero>
            <div class="hero-not-found" v-show="!filteredAndOrderedList.length">暂无相关商品</div>
        </div>
    </div>
</template>

<script>
    import hero from '../components/heroComponent.vue';
    export default {
        name: "list",
        components: {hero},//这个不写组件不能生效
        computed: {
            //原数据，这个数组是不动的，我们实时复制一份操作和显示那一份
            list () {
                return this.$store.state.heroList;
            },
            position () {
                return this.$store.getters.position;
            },
            heros () {
                return this.$store.getters.heros;
            },
            sex(){
                return this.$store.getters.sex;
            },

            //f筛选及o排序后，要打印的数据
            filteredAndOrderedList () {
                let list = [...this.list];
                // 按英雄筛选修改数组，这功能废置了
                if (this.filterHero !== '') {
                    //把数组中这个属性等于选中属性的选出来组新数组
                    list = list.filter(item => item.hero === this.filterHero);
                }
                // 按位置筛选修改数组
                if (this.filterPosition !== '') {
                    list = list.filter(item => item.position === this.filterPosition);
                }
                if (this.filterSex !== '') {
                    list = list.filter(item => item.sex === this.filterSex);
                }

                //不管筛不筛选，这里进入排序
                if (this.order !== '') {
                    if (this.order === 'sales') {
                        list = list.sort((a, b) => b.sales - a.sales);
                    } else if (this.order === 'cost-desc') {//从大到小
                        list = list.sort((a, b) => b.price - a.price);
                    } else if (this.order === 'cost-asc') {//从小到大
                        list = list.sort((a, b) => a.price - b.price);
                    }
                }

                return list;
            }
        },
        mounted () {
            this.$store.dispatch('getHeroList');
        },
        methods: {
            handleFilterHero (hero) {
                if (this.filterHero === hero) {
                    this.filterHero = '';
                } else {
                    this.filterHero = hero;
                }
            },
            handleFilterPosition (position) {
                if (this.filterPosition === position) {
                    this.filterPosition = '';
                } else {
                    this.filterPosition = position;
                }
            },
            handleFilterSex (sex) {
                if (this.filterSex === sex) {
                    this.filterSex = '';
                } else {
                    this.filterSex = sex;
                }
            },
            handleOrderDefault () {
                this.order = '';
            },
            handleOrderSales () {
                this.order = 'sales';
            },
            handleOrderCost () {
                if (this.order === 'cost-desc') {
                    this.order = 'cost-asc';
                } else {
                    this.order = 'cost-desc';
                }
            }
        },
        data () {
            return {
                filterPosition: '',
                filterHero: '',
                filterSex:'',
                order: ''
            }
        }
    }
</script>

<style lang="less" scoped>
    .heroList{
        .heroList-menu{
            width: 100%;
            margin-top: 40px;

            .heroList-select{
                b{
                    float: left;
                }
                height: 40px;
            }
            .heroList-menu-selectPosition.active{
                background-color: #000;
                color: #fff;
            }
            .heroList-menu-selectSex.active{
                background-color: #000;
                color: #fff;
            }
            .heroList-menu-selectPosition{
                float: left;
                margin-left: 15px;
                height: 20px;
                width: 60px;
                text-align: center;
                background-color: #bebebe;
                border-radius: 10px;
                cursor: pointer;
            }
            .heroList-menu-selectSex{
                float: left;
                margin-left: 15px;
                height: 20px;
                width: 60px;
                text-align: center;
                background-color: #bebebe;
                border-radius: 10px;
                cursor: pointer;
            }
        }
        .heroList-content{
            width: 90%;
            margin: auto;
            .hero-not-found{
                width: 100%;
                text-align: center;

            }
        }
    }

</style>