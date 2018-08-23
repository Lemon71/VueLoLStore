<template>
    <div class="hero">
        <img :src="hero.imgUrl" alt="" class="hero-img">
        <div class="hero-detail">
            <h1 class="hero-name">{{hero.name}}</h1>
            <div class="hero-price">¥{{hero.price}}</div>
            <div class="hero-sales">已售{{hero.sales}}件</div>
            <div class="hero-addCart" @click="handleAddToCart">加入购物车</div>
        </div>

    </div>
</template>

<script>
    import heros_data from '../heros.js'
    export default {
        name: "hero",
        data(){
            return {
                // 根据路由地址传过来的参数id，在router.js和链接地址还有这里对应
                id:parseInt(this.$route.params.id),
                hero:null
            }
        },
        methods:{
            getHero(){
                // 真实环境通过 ajax 获取，这里用异步模拟
                setTimeout(() => {
                    // 根据id从数据里找出是哪个英雄
                    this.hero=heros_data.find(item => item.id === this.id);
                }, 500);
            },
            handleAddToCart () {
                this.$store.commit('addCart', this.id);
            }
        },
        mounted(){//差点漏了这个，不然不会执行这个method啊
            this.getHero();
        }
    }
</script>

<style lang="less" scoped>
.hero{
    width: 90%;
    margin: auto;
    position: relative;
    .hero-img{
        margin-top: 50px;
        width: 600px;
        height: 500px;
        float: left;
    }
    .hero-detail{
        width: 500px;
        margin-top: 50px;
        height: 500px;
        position: absolute;
        right: 0;
        .hero-name{
            width: 100%;
            text-align: center;
            position: absolute;
            top: 10px;
        }
        .hero-price{
            width: 100%;
            text-align: center;
            position: absolute;
            top: 150px;
            color: red;
            font-size: 30px;

        }
        .hero-sales{
            position: absolute;
            top: 180px;
            right: 140px;
            font-size: 10px;

        }
        .hero-addCart{
            width: 300px;
            height: 30px;
            line-height: 30px;
            font-size: 20px;
            text-align: center;
            position: absolute;
            top: 300px;
            right: 50%;
            margin-right: -150px;
            background-color: dodgerblue;
            border-radius:10px;
            cursor: pointer;

        }
    }

}
</style>