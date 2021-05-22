# input
Enter characters via mouse or keyboard.

```vue
<zc-input placeholder="Search" v-model="value"></zc-input>
...
<script>
  export default {
    data() {
      return {
        // We can still bind data two-way through 'v-model'
        value: ''
      }
    }
  }
</script>
```

> We can still bind data two-way through `v-model`

## Dropdown Attributes
| Attribute | Description | Type | Accepted Values | Default |
|---|---|---|---|---|
|type|type|String|text / textarea|text|
|theme|`input` subject|String|classic / transparent|classic|
|placeholder|`input` placeholder|String| - | - |
|disabled|Whether `input` is forbidden to input state|Boolean| true / false | false |
|bold|Whether the `input` text is bold|Boolean| true / false | false |
|noFilling|If you use it, the padding given by `zc-input` by default will be cancelled|Boolean| true / false | false |
