# 基于Typescript的npm模块发布基础模板
发布npm模块的基础模板，支持Typescript语法，支持测试模块，支持自动升级版本、更新changelog文件

## npm命令
### npm run start
运行npm项目。
### npm run build
构建npm项目。通过webpack对项目进行打包，打包后的文件输出到/dist目录下。
### npm run eslint
通过eslint进行语法检测。
### npm run test
通过mocha进行单元测试。
### npm run release
自动发布项目、更新版本、更新changelog文件、更新tag号。
### npm run release:first
首次发布项目，生成changelog文件。
### npm run release:alpha
发布内测版代码。
### npm run release:beta
发布公测版代码。
### npm run release:patch
发布补丁。
### npm run release:minor
发布次要版本。
### npm run release:major
发布主要版本。

## Installation
运用此模板编写npm包，再发布之前完善安装命令。

`npm install ***`

## MIT Licenced
运用此模板编写npm包，再发布之前完善许可信息