## Jun

>  功能：
>  MarkDown 转换为 HTML 文件。
>  修改文件后刷新浏览器。
>  复制文件操作。
## Install
``` bash
npm install jun -g
```

## Usage

MarkDown转HTML方法：

```cli
jun build XXX.md
```

修改MarkDown文件后对应的HTML文件在浏览器中刷新显示

```cli
jun watch xxx.md -build
```

复制文件方法：

```cli
jun copy xxx.md aaa.md
```

