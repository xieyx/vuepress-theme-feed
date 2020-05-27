# 快速上手

## 安装

```bash
yarn add vuepress-theme-feed -D
# 或 npm install vuepress-theme-feed -D
```

<!-- more -->

## 使用

```js
// .vuepress/config.js
module.exports = {
  theme: 'feed',
  themeConfig: {
    // Please head documentation to see the available options.
  }
}
```

## Feedpage
在`README.md`中指明`feed: true`即可
```yml
---
feed: true
---
```

摘录, 在页面中添加`<!-- more -->`
```md
<!-- more -->
```
