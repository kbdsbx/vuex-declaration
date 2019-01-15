import Vue from 'vue'

const VuexDeclaration = {
    install () {
        Vue.mixin( {
            created() {
                if (this.$store) {
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

                    if (this.$options.state instanceof Array) {
                        for (let state of this.$options.state) {
                            selfStates[state] = {
                                module: 'base',
                            }
                        }
                    } else {
                        selfStates = this.$options.state;
                    }

                    if ( ! selfStates ) {
                        return;
                    }

                    for (let stateName in selfStates) {
                        let moduleName = selfStates[stateName].module || 'base';
                        modules[moduleName] = modules[moduleName] || {};
                        mutations[moduleName] = mutations[moduleName] || {};

                        if (modules[moduleName]) {
                            // 将已经存在的状态赋值过来
                            modules[moduleName][stateName] = (this.$store.state[moduleName] || {})[stateName];
                            mutations[moduleName][stateName] = (s, p) => {
                                s[stateName] = p;
                            }
                        }
                    }

                    for (let moduleName in modules) {
                        this.$store.registerModule(moduleName, {
                            state: modules[moduleName],
                            mutations: mutations[moduleName],
                        }, { preserveState: false } )
                    }
                }
            }
        } );
    }
}

export default VuexDeclaration;
