<template>
    <div class="">
        left : {{left}}px<br>
        top : {{top}}px<br>

        <button @click="window_open = ! window_open">切换窗口组件</button>
        <br>
        <button @click="setTopLeft">修改全局状态</button>
        <br>
        <button @click="resetTopLeft">覆盖全局状态</button>

        <window v-if="window_open"></window>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { setStoreModule, resetStoreModule } from './index.js'
import window from './components/window.vue'
export default {
    state : [ 'left', 'top' ],
    components : {
        window,
    },
    data () {
        return {
            window_open : false,
        }
    },

    computed : {
        ...mapState( {
            top : s => s.base.top,
            left : s => s.base.left,
        } )
    },

    mounted () {
        this.$store.commit( 'top', 50 );
        this.$store.commit( 'left', 50 );
    },

    methods : {
        setTopLeft() {
            var statusMeta = {
                right : {
                    module : "base",
                },
                bottom : {
                    module : "base",
                }
            }

            setStoreModule( this.$store, statusMeta )

            // 调用设置状态后原状态依然存在
            this.$store.commit( 'left', 10 );
            this.$store.commit( 'top', 10 );
        },
        resetTopLeft () {
            var statusMeta = {
                right : {
                    module : "base",
                },
                bottom : {
                    module : "base",
                }
            }

            resetStoreModule( this.$store, statusMeta )

            // 调用覆盖状态后left与top被清除
            try {
                this.$store.commit( 'left', 10 );
                this.$store.commit( 'top', 10 );
            } catch ( e ) {
            }
        }
    }
}
</script>

<style>

</style>

