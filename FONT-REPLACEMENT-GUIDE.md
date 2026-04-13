# Symphosizer 字体更换说明文档

## 当前使用的字体

本项目使用了三款 **ABC Symphony** 系列字体，由字体工作室 Dinamo 为旧金山交响乐团（San Francisco Symphony）品牌设计：

| 字体名称 | 文件名 | 格式 | 用途 | 是否为可变字体 |
|----------|--------|------|------|---------------|
| ABC Symphony Display | `ABCSymphonyDisplayVariable.ttf` | TrueType Variable | 主显示文字（大标题、动态排版） | **是** |
| ABC Symphony Headline | `ABCSymphonyHeadline-Regular.otf` | OpenType | 标题文字（如"SYMPHOSIZER"） | 否 |
| ABC Symphony Text | `ABCSymphonyText-Regular.otf` | OpenType | 正文、按钮、导航等UI文字 | 否 |

### 可变字体轴参数（ABC Symphony Display）

ABC Symphony Display 是一款可变字体（Variable Font），支持以下变化轴：

| 轴标签 | 名称 | 范围 | 说明 |
|--------|------|------|------|
| `hght` | Height | 约 -100 ~ +100 | 控制字形高度比例，核心动画参数 |
| `ital` | Italic | 0 ~ 约 40 | 控制倾斜程度 |
| `vrsb` | Reverse | 0 ~ 1 | 控制文字方向/翻转 |

这些轴参数在 JavaScript 中通过 `font-variation-settings` 实时控制，实现声音驱动的动态排版效果。

---

## 更换字体步骤

### 一、更换 Display 字体（主动态显示字体）

> **重要提示**：此字体**必须是可变字体（Variable Font）**，否则声音驱动的动态排版效果将无法工作。

#### 1. 准备新字体文件

将新的可变字体文件（`.ttf` 或 `.woff2`）放入 `fonts/` 目录。

#### 2. 修改 CSS 字体声明

编辑 `styles/style.css`，找到以下代码（约第 1-4 行）：

```css
@font-face {
  font-family: "ABC Symphony Display";
  src: url("../fonts/ABCSymphonyDisplayVariable.ttf");
}
```

替换为：

```css
@font-face {
  font-family: "ABC Symphony Display";
  src: url("../fonts/你的新字体文件名.ttf");
}
```

> 如果你同时更改了字体族名称（font-family），还需要修改以下位置：
>
> - `styles/style.css` 中的 `.container` 选择器：
>   ```css
>   font-family: "你的新字体族名", sans-serif;
>   ```
> - `styles/style.css` 中的 `.loading` 选择器：
>   ```css
>   font-family: "你的新字体族名", sans-serif;
>   ```

#### 3. 调整可变字体轴参数

新字体的可变轴标签和范围可能与原字体不同。你需要：

**a) 查看新字体支持的可变轴**

使用以下工具查看新字体的可变轴信息：
- [Wakamai Fondue](https://wakamaifondue.com/) - 在线字体检查工具
- [Font Gauntlet](https://fontgauntlet.com/) - 在线可变字体预览
- [FontTools](https://github.com/fonttools/fonttools) - 命令行工具：`fonttools varLib.instancer`

**b) 修改 CSS 中的 `font-variation-settings`**

全局搜索 `font-variation-settings`，在以下文件中修改：

- **`styles/style.css`** - 所有 `@keyframes` 动画和 `.container` 选择器中的值
- **`js/script.js`** - `draw()` 函数中动态设置的值（约第 160 行）

在 `js/script.js` 中，关键代码段为：

```javascript
splitChars[wornum].chars[i].style.fontVariationSettings =
  "'vrsb'" + isTop + ", 'hght'" + smoothH[i] + ", 'ital'" + smoothI + '';
```

将 `vrsb`、`hght`、`ital` 替换为你新字体对应的轴标签。例如，如果新字体使用 `wght`（粗细）和 `wdth`（宽度）：

```javascript
splitChars[wornum].chars[i].style.fontVariationSettings =
  "'wght'" + weightValue + ", 'wdth'" + widthValue + '';
```

**c) 修改 CSS 关键帧动画**

搜索 `styles/style.css` 中所有包含 `font-variation-settings` 的 `@keyframes`：

- `load-bounce-char` - 加载动画
- `bounce-char` - 声音弹跳动画
- `bounce-end` - 弹跳结束状态

将其中的轴标签和值范围调整为新字体支持的参数。

**d) 调整值映射范围**

在 `js/script.js` 的 `draw()` 函数中，以下变量控制字体变化的幅度：

```javascript
// smoothH[i] - 控制 hght 轴，范围约 -100 ~ +100
// smoothI - 控制 ital 轴，范围约 0 ~ 40
// isTop - 控制 vrsb 轴，值为 0 或 1
```

根据新字体的轴范围，调整 `map()` 函数中的映射范围。例如在 `draw()` 中：

```javascript
// 原始代码（约第 145 行）
smoothH[i] = lerp(smoothH[i], map(..., 0, 255, 0, 400) - 100 * ..., 0.3);
```

`400` 和 `-100` 这些值需要根据新字体轴的有效范围进行调整。

---

### 二、更换 Headline 字体（标题字体）

#### 1. 放入新字体文件

将新字体文件放入 `fonts/` 目录。

#### 2. 修改 CSS 字体声明

编辑 `styles/style.css`，找到：

```css
@font-face {
  font-family: "ABC Symphony Headline";
  src: url("../fonts/ABCSymphonyHeadline-Regular.otf");
}
```

替换为新字体文件路径。

#### 3. 如果更改了字体族名称

修改 `styles/style.css` 中的 `.title` 选择器：

```css
.title {
  font-family: "你的新字体族名", serif;
}
```

---

### 三、更换 Text 字体（正文/UI字体）

#### 1. 放入新字体文件

将新字体文件放入 `fonts/` 目录。

#### 2. 修改 CSS 字体声明

编辑 `styles/style.css`，找到：

```css
@font-face {
  font-family: "ABC Symphony Text";
  src: url("../fonts/ABCSymphonyText-Regular.otf");
}
```

替换为新字体文件路径。

#### 3. 如果更改了字体族名称

需要修改以下位置：

**`styles/style.css`：**
- `html, body` 选择器：`font-family: "你的新字体族名", sans-serif;`
- `.tutorial` 选择器：`font-family: "你的新字体族名", sans-serif;`
- `.btn_play` 选择器：`font-family: "你的新字体族名", sans-serif;`
- `nav li` 选择器：`font-family: "你的新字体族名", serif;`
- `.st1` 选择器：`font-family: "你的新字体族名";`

---

## 完整修改清单

以下是更换字体时需要检查的所有文件和位置的汇总：

### `styles/style.css`

| 位置 | 内容 | 涉及字体 |
|------|------|---------|
| 第 1-4 行 | `@font-face` Display 声明 | Display |
| 第 6-9 行 | `@font-face` Headline 声明 | Headline |
| 第 11-14 行 | `@font-face` Text 声明 | Text |
| `.loading` 选择器 | `font-family` 和 `font-variation-settings` | Display |
| `.loading .char` | `@keyframes load-bounce-char` | Display |
| `.tutorial` 选择器 | `font-family` | Text |
| `.btn_play` 选择器 | `font-family` | Text |
| `html, body` 选择器 | `font-family` | Text |
| `nav li` 选择器 | `font-family` | Text |
| `.title` 选择器 | `font-family` | Headline |
| `.st1` 选择器 | `font-family` | Text |
| `.container` 选择器 | `font-family` 和 `font-variation-settings` | Display |
| `@keyframes bounce-char` | `font-variation-settings` | Display |
| `@keyframes bounce-end` | `font-variation-settings` | Display |

### `js/script.js`

| 位置 | 内容 | 涉及字体 |
|------|------|---------|
| `draw()` 函数中 `fontVariationSettings` 赋值 | 动态设置可变字体轴 | Display |
| `smoothH` 映射范围 | 控制 hght 轴变化幅度 | Display |
| `smoothI` 映射范围 | 控制 ital 轴变化幅度 | Display |
| `isTop` 值 | 控制 vrsb 轴切换 | Display |

---

## 推荐的替代可变字体

如果你想替换 Display 字体，以下是一些支持多轴变化的开源可变字体推荐：

| 字体名称 | 可变轴 | 适合用途 | 获取方式 |
|----------|--------|---------|---------|
| **Inter** | wght, slnt | 现代无衬线 | Google Fonts |
| **Recursive** | wght, slnt, CASL, CRSV, MONO | 多风格混合 | Google Fonts |
| **Anybody** | wght, wdth, ital | 展示型字体 | Google Fonts |
| **Fraunces** | wght, opsz, SOFT, WONK | 衬线展示字体 | Google Fonts |
| **Nabla** | EDPT, EHLT | 3D效果字体 | Google Fonts |
| **Amstelvar** | wght, wdth, opsz 等 | 参数化衬线字体 | GitHub |

> 注意：替换字体后，需要根据新字体支持的轴标签和范围调整所有 `font-variation-settings` 相关代码。

---

## 快速测试

更换字体后，用以下方式快速验证：

1. 在项目根目录运行本地服务器：
   ```bash
   python -m http.server 8765
   ```

2. 打开浏览器访问 `http://localhost:8765/`

3. 检查以下内容：
   - 加载动画（LOADING）是否正常显示并有字体变形动画
   - 点击 PLAY 后，"MAKE SOME NOISE" 文字是否正常渲染
   - 移动鼠标时，文字是否有动态变形响应
   - 打开麦克风后，声音是否能驱动文字变形

4. 打开浏览器开发者工具（F12），检查 Console 是否有报错
