<template>
    <div class="">
        left : {{left}}px<br>
        top : {{top}}px<br>

        <button @click="window_open = ! window_open">切换窗口组件</button>

        <window v-if="window_open"></window>
    </div>
</template>

<script>
import { mapState } from 'vuex'
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
    }
}
</script>

<style>

</style>

