# Tampermonkey 脚本集

这个仓库包含了一系列 Tampermonkey 脚本，旨在提升您的浏览体验。

## 什么是 Tampermonkey？

Tampermonkey（中文名：篡改猴）是一个非常受欢迎的浏览器扩展，拥有超过1000万用户。它支持多种主流浏览器，包括 Chrome、Microsoft Edge、Firefox、Safari 和 Opera。Tampermonkey 允许用户自定义和增强网页功能，通过运行小型 JavaScript 程序（称为用户脚本）来实现 [^1]。

## 脚本列表

### 1. 分享到饭否

**描述**：快速将当前页面分享到饭否，并对标题进行自定义处理。

**功能**：
- 在页面右下角显示"分享到饭否"按钮。
- 点击按钮后，弹出窗口，添加评论（可选），点击"分享"按钮，即可分享消息。
- 对 cnBeta、知乎等网站的标题进行特殊处理。

[安装脚本](https://greasyfork.org/zh-CN/scripts/511322-%E5%88%86%E4%BA%AB%E5%88%B0%E9%A5%AD%E5%90%A6)

### 2. 分享到微博

**描述**：快速将当前页面分享到微博，并对标题进行自定义处理。

**功能**：
- 在页面右下角显示"分享到微博"按钮。
- 点击按钮后，弹出新标签页，添加评论（可选），点击"分享"按钮，即可分享消息。
- 对 cnBeta、知乎等网站的标题进行特殊处理。

[安装脚本](https://greasyfork.org/zh-CN/scripts/511328-%E5%88%86%E4%BA%AB%E5%88%B0%E5%BE%AE%E5%8D%9A)

### 3. Share to X

**描述**：快速将当前页面分享到 X，并对标题进行自定义处理。

**功能**：
- 在页面右下角显示"Share to X"按钮。
- 点击按钮后，弹出新标签页，添加评论（可选），点击"Post"按钮，即可分享消息。
- 对 cnBeta、知乎等网站的标题进行特殊处理。
- 自定义编码函数，按照 X 的编码方式直接处理 URL，减少服务器端的处理时间。

[安装脚本](https://greasyfork.org/zh-CN/scripts/511713-share-to-x)

### 4. 收起 Felo Search 侧边栏

**描述**：启动 Felo Search 后自动收起侧边栏。

**功能**：
- 启动 Felo Search 后自动收起（折叠、不展开）侧边栏。
- 自动点击收起（折叠、不展开）侧边栏的按钮。

[安装脚本](https://greasyfork.org/zh-CN/scripts/511325-%E6%94%B6%E8%B5%B7-felo-search-%E4%BE%A7%E8%BE%B9%E6%A0%8F)

## 如何使用这些脚本？

1. 首先，您需要在浏览器中安装 Tampermonkey 扩展。您可以从 [Tampermonkey 官网](https://www.tampermonkey.net/) 下载适合您浏览器的版本。
2. 安装完 Tampermonkey 后，点击上面列出的脚本的"安装脚本"链接。
3. Tampermonkey 会自动检测到脚本并提示您安装。点击"安装"即可。
4. 安装完成后，脚本会自动在相应的网页上运行。

## 许可证

本项目采用 GNU 通用公共许可证 v3.0 (GPL-3.0) 进行许可。

## 联系方式

王敬：wangjing@xynu.edu.cn

项目链接：[https://github.com/yuzhounh/tampermonkey-scripts](https://github.com/yuzhounh/tampermonkey-scripts)

[^1]: https://www.tampermonkey.net/index.php?locale=zh
