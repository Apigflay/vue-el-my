<template>
    <div>
        <h2>{{msg}}</h2>
        <hr/>
        <h3>{{$store.state.count}}--{{count}}</h3>
        <div>
            <button @click="add(10)">+</button>
            <button @click="reduce()">-</button>
        </div>
    </div>
</template>
<script>
    import store from '@/vuex/store';
    import {mapState} from 'vuex';
    import { mapMutations } from 'vuex';
    import { mapGetters  } from 'vuex';
    export default{
        data(){
            return{
                msg:'Hello Vuex'

 
            }
        },
        store,
        methods:mapMutations([
                'add',
                'reduce'
        ]),
        // computed:{
        //     count(){
        //         return this.$store.state.count;
        //     }
        // },
        // computed:mapState({
        //     count:state=>state.count
        // })
        computed:{
            ...mapGetters(["count"]),
            ...mapState(["count"]),
            // count(){
            //     return this.$store.getters.count;
            // }
        }
    }
</script>