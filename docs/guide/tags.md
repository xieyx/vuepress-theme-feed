---
tags:
  - foo
  - bar
---

# Tags

## Theme Config
Specify `themeConfig.tags` as dir name

## Folder Structure
If `themeConfig.tags` is `tags`, build the folder structure
```
docs
├── tags
│   └── README.md
└── zh
    └── tags
        └── README.md
```

<!-- more -->

specify `feed: true` in `README.md`
```yml
---
feed: true
---
```

## Page Config
To use it, specify `tags` in your page. Then it well rendered after the content section.
```yml
---
tags:
  - foo
  - bar
---
```
