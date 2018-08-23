<template>
    <div class="app">
        <div class="app-nav">
            <router-link to="/list" class="app-nav-list">商城首页</router-link>
            <router-link to="/cart" class="app-nav-cart">
                <span v-if="cartList.length">{{ cartList.length }}</span>
                购物车
            </router-link>
        </div>

        <router-view></router-view>
    </div>

</template>

<script>
    export default {
        name: "app",
        computed: {
            cartList () {
                return this.$store.state.cartList;
            }
        }
    }
</script>

<style lang="less" scoped>
    .app{
        width: 100%;
        .app-nav{
            width: 100%;
            height: 48px;
            line-height: 48px;
            background: rgba(0,0,0,.8);
            color: #fff;
            .app-nav-list{
                padding: 0 32px;
                float: left;
                color: #fff;
                text-decoration: none;
            }
            .app-nav-cart{
                float: right;
                margin-right: 32px;
                color: #fff;
                text-decoration: none;
                span{
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    border-radius: 50%;
                    background: #ff5500;
                    color: #fff;
                    font-size: 12px;
                }
            }
        }
    }

</style>