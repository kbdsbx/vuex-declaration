<template>
    <div>
        <div class="window"
         @mousedown="hold"
         @mousemove="move"
         @mouseup="out"
         :style="`width: 500px; height: 500px; background-color: #e4cccc; position: absolute; left : ${left}px; top : ${top}px`">
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    state : [ 'left', 'top' ],
    data () {
        return {
            window_state : false,
        }
    },
    
    computed : {
        ...mapState( {
            top : s => s.base.top,
            left : s => s.base.left,
        } )
    },

    created () {
        console.log( this.$store.state.base.left );
    },

    methods : {
        hold () {
            this.window_state = true;
        },
        out () {
            this.window_state = false;
        },
        move ( e ) {
            if ( this.window_state ) {
                this.$store.commit( 'left', this.left + e.movementX );
                this.$store.commit( 'top', this.top + e.movementY );
            }
        }
    }
}
</script>

<style>

</style>
