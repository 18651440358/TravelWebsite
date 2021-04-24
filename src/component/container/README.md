# Container
Container is the basic building block of MetisUI, which allows the content of the page to be displayed in the center.

## How to use

```vue
<zc-container>
  Page content ...
</zc-container>
```

## Container size
| | Extra small | Small | Medium | Large | X Large | XX Large |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| | <576px | ≥576px | ≥768px | ≥992px | ≥1200px | ≥1400px |
| .container | 100% | 540px | 720px | 960px | 1140px | 1320px |

## Attributes
| Attribute | Description | Type | Accepted Values | Default |
|---|---|---|---|---|
| paved | Force the container to fill the screen width | Boolean | true/false | false |

## paved
Force the container to fill the screen width
> You can add the **"paved"** attribute to the label
```vue
<zc-container paved>
  Page content ...
</zc-container>
```
