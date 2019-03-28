# Vuex Declaration

Declare state like props, make state inject to vuex dynamically when component created.

## Usage

```bash
npm i vuex-declaration
```

```js
import vuecDeclaration from 'vuex-declaration'
import Vue from 'vue'
Vue.use( vuexDeclaration );
```

```js
Vue.component( 'self-component', {
    data () { ... },
    props : [ ... ],
    created () { ... },

    // Declare states
    state : [ 'state-a', 'state-b' ],
} )
```

```js
export default {
    // Declare state with module.
    state : {
        'state-a' : {
            module : 'module-a',
        }
    }
}
```

## Apis

#### setStoreModule
Append states to existing modules.

```js
import { setStoreModule } from 'vuex-declaration'

setStoreModule( this.$store, [ 'state-a', 'state-b' ] )
```

#### resetStoreModule
Unreginster all modules from $store and then reset these.

```js
import { resetStoreModule } from 'vuex-declaration'

resetStoreModule( this.$store, [ 'state-a', 'state-b' ] )
```
