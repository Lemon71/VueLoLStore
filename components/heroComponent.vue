<template>
    <div class="list-oneHero">
        <!--使用的时候一定要传一个info对象进去，不然什么都不显示-->
        <router-link :to="'/hero/' + info.id" class="">
            <img :src="info.imgUrl" alt="">
            <!--prevent防止冒泡-->
            <div class="list-oneHero-addCart" @click.prevent="handleCart">加入购物车</div>
            <div class="list-oneHero-detail">
                <div class="list-oneHero-name">{{ info.name }}</div>
                <div class="list-oneHero-price">¥{{ info.price }}</div>
                <div class="list-oneHero-sales">已售：{{info.sales}}件</div>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "heroComponent",
        props: {
            info: Object
        },
        methods: {
            handleCart () {
                this.$store.commit('addCart', this.info.id);
            }
        },

    }
</script>

<style lang="less" scoped>
.list-oneHero{
    width: 23%;
    float: left;
    overflow: hidden;
    margin-left: 10px;
    margin-right: 10px;
    height: 300px;
    border: 1px solid #000;
    margin-top: 30px;
    position: relative;
    img{
        width: 100%;
        height: 230px;
    }
    .list-oneHero-addCart{
        display: none;
        position: absolute;
        top: 0px;
        right: 0px;
        background-color: deepskyblue;
        color:#fff;
        width: 90px;
        height: 20px;
        text-align: center;
        cursor: pointer;
    }
    .list-oneHero-detail{
        position: relative;
        width: 100%;
        height: 70px;
        color: #000;
        .list-oneHero-name{
            position: absolute;
            top: 0;
            left: 0;
        }
        .list-oneHero-price{
            position: absolute;
            bottom: 5px;
            left: 0;
        }
        .list-oneHero-sales{
            position: absolute;
            right: 0;
            bottom: 5px;
        }
    }
}

.list-oneHero:hover .list-oneHero-addCart{
    display: block;
}
</style>