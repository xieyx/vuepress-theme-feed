---
tags:
  - foo
  - bar
---

# 标签

## 模板设置
`themeConfig.tags` 指定目录名

## 目录结构
若 `themeConfig.tags` 为 `tags`, 建立如下目录结构
```
docs
├── tags
│   └── README.md
└── zh
    └── tags
        └── README.md
```

<!-- more -->

`README.md` 中内容指定为
```yml
---
feed: true
---
```

## 页面设置
在页面中指明 `tags`, 将展示在页面内容后
```yml
---
tags:
  - foo
  - bar
---
```
