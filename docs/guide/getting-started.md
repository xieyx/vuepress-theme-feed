---
tags:
  - foo
  - bar
---

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

## Feed page
To use it, specify `feed: true` in your `README.md`
```yml
---
feed: true
---
```

## Set tag
To use it, specify `tags` in your page. Then it well rendered after the content section.
```yml
---
tags:
  - foo
  - bar
---
```
