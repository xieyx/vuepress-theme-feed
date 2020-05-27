# Getting Started

## Install

```bash
yarn add vuepress-theme-feed -D
# OR npm install vuepress-theme-feed -D
```

<!-- more -->

## Usage

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
To use it, specify `feed: true` in your `README.md`
```yml
---
feed: true
---
```

Excerpt, add `<!-- more -->` in you page
```md
<!-- more -->
```
