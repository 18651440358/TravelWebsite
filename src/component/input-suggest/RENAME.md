# Suggest
Get suggestions that can be used for filling while typing.

```vue

<zc-input-suggest :suggestions="suggestions"
                  v-model="testValue"
                  theme="transparent"
                  noFilling
                  bold>
<!-- We can customize the suggestion template -->
  <template slot-scope="{item}">
<!--  Use slot-scope to traverse the alias of each item -->
    <span>{{ item.value }}</span>
    <span>{{ item.key }}</span>
  </template>
</zc-input-suggest>

<script>
import ZcInputSuggest from "./input-suggest";
export default {
  components: {ZcInputSuggest},
  data() {
    return {
      testValue: '',
      suggestions: [
        {
          key: '...',
          value: '...'
        },
        ...
      ]
    }
  }
}
</script>
```
> We can still bind data two-way through `v-model`

## Dropdown Attributes

> We can still use all Attributes of `zc-input`

| Attribute | Description | Type | Accepted Values | Default |
|---|---|---|---|---|
|loading|Is it loading|Boolean|true / false|false|
|valueKey|The parameters returned to `v-model` after selecting suggest must be in the `suggestions` object ...|String|-|value|
|suggestions|The array used to prompt for input, each object must have a key that is the same as `valueKey`, and the default value of `valueKey` is value|Array|---|---|
