# Vuex Declaration

Declare state like props, make state inject to vuex dynamically when component created.

## Usage

```bush
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

    state : [ 'state-a', 'state-b' ],
} )
```

```js
export default {
    state : {
        'state-a' : {
            module : 'module-a',
        }
    }
}
```
