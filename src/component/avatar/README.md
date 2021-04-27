# Avatar
Avatar is used to display the avatar and can handle the state when the image is damaged or the network is abnormal.

```vue

<zc-avatar
  :src="src"
  :size="40"
  shape="round">
</zc-avatar>
```

| Attribute | Description | Type | Accepted Values | Default |
|---|---|---|---|---|
| src | Path of the avatar image | String | - | - |
| size | The size of the avatar image | Number | The overall shape of the Avatar is square | 40 |
| shape | The shape of the picture avatar | String | round/circle/square | round |
