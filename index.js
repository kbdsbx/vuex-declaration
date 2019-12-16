import '@babel/polyfill'
import VuexDeclaration from './lib/vuex-declaration'

const resetStoreModule = ($store, state) => {
    VuexDeclaration.clearModule( $store );
    VuexDeclaration.setModule($store, state )
};
const setStoreModule = VuexDeclaration.setModule;

export default VuexDeclaration;

export { resetStoreModule, setStoreModule };
