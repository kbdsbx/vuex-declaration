import Vue from 'vue'

const VuexDeclaration = {
    moduleList : [],
    clearModule ( $store ) {
        // 重置module会注销所有已经注册的module
        for ( let moduleName of VuexDeclaration.moduleList ) {
            if ( $store.state[moduleName] ) {
                $store.unregisterModule( moduleName );
            }
        }

        VuexDeclaration.moduleList = [];
    },
    setModule ( $store, states ) {
        /**
         * {
         *   reset : true
         * }
         */
        // const options = Object.assign( {}, option );
        /**
         * {
         *   moduleName : {
         *     state1,
         *     state2,
         *     ...
         *   }
         * }
         */
        const modules = {};
        /**
         * {
         *   moduleName : {
         *     state1 : () => {},
         *     state2 : () => {},
         *   }
         * }
         */
        const mutations = {};
        var selfStates = {};

        if (states instanceof Array) {
            for (let state of states) {
                selfStates[state] = {
                    module: 'base',
                }
            }
        } else {
            selfStates = states;
        }

        if ( ! selfStates ) {
            return;
        }


        for (let stateName in selfStates ) {
            let moduleName = selfStates[stateName].module || 'base';
            modules[moduleName] = modules[moduleName] || {};
            mutations[moduleName] = mutations[moduleName] || {};
            
            // 将已经注册的状态复写
            if ( $store.state[moduleName] ) {
                for ( let sName in $store.state[moduleName] ) {
                    modules[moduleName][sName] = $store.state[moduleName][sName]
                    mutations[moduleName][sName] = (s, p) => {
                        s[sName] = p;
                    }
                } 
            }

            if (modules[moduleName]) {
                // 将已经存在的状态赋值过来
                modules[moduleName][stateName] = ($store.state[moduleName] || {})[stateName];
                mutations[moduleName][stateName] = (s, p) => {
                    s[stateName] = p;
                }
            }
        }

        for (let moduleName in modules) {
            if ( VuexDeclaration.moduleList.indexOf( moduleName ) === -1 ) {
                VuexDeclaration.moduleList.push( moduleName );
            }
            $store.registerModule(moduleName, {
                namespaced : true,
                state: modules[moduleName],
                mutations: mutations[moduleName],
            }, { preserveState: false } )
        }
    },
    install () {
        Vue.mixin( {
            created() {
                if (this.$store) {
                    VuexDeclaration.setModule( this.$store, this.$options.state );
                }
            }
        } );
    }
}

export default VuexDeclaration;
