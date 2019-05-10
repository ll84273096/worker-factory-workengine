# 发布npm模块的基础模板
发布npm模块的基础模板，npm模块支持es6语法，支持测试模块，支持一键发布

## npm命令
### npm run build
构建npm项目。通过BABEL对es6语法进行降级处理，通过webpack对项目进行打包，打包后的文件输出到/lib目录下。
### npm run lint
通过eslint进行语法检测。
### npm run test
通过mocha进行单元测试。
### npm run toFirst
首次进行npm发布的时候执行这个命令。
### npm run toPreview
发布一个npm包的预览版本
### npm run toPatch
发布一个npm包的补丁版本
### npm run toMinor
发布一个npm包的次要版本
### npm run Major
发布一个npm包的主要版本

## Installation
运用此模板编写npm包，再发布之前完善安装命令。

`npm install ***`

## MIT Licenced
运用此模板编写npm包，再发布之前完善许可信息