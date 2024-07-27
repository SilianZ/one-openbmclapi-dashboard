<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://socialify.git.ci/SilianZ/one-openbmclapi-dashboard/image?description=1&language=1&name=1&pattern=Plus&theme=Dark">
  <source media="(prefers-color-scheme: light)" srcset="https://socialify.git.ci/SilianZ/one-openbmclapi-dashboard/image?description=1&language=1&name=1&pattern=Plus&theme=Light">
  <img src="https://socialify.git.ci/SilianZ/one-openbmclapi-dashboard/image?description=1&language=1&name=1&pattern=Charlie%20Brown&theme=Auto">
</picture>

# One OpenBMCLAPI Dashboard

</div>

基于 [Vue.js 3](https://cn.vuejs.org) + [PrimeVue 4](https://primevue.org) + [tailwindcss](https://tailwindcss.com/)、统一通用程序接口（API）的 OpenBMCLAPI 仪表盘。

使用 [TypeScript](https://www.typescriptlang.org) 编写。

## 推荐的 IDE 设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（并禁用 Vetur）。

## `.vue` 导入的 TS 类型支持

TypeScript 默认无法处理 `.vue` 导入的类型信息，因此我们用 `vue-tsc` 替换 `tsc` CLI 进行类型检查。在编辑器中，我们需要 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 让 TypeScript 语言服务能够识别 `.vue` 类型。

## 自定义配置

请参阅 [Vite 配置参考](https://vitejs.dev/config/).

## 项目设置

```sh
npm install
```

### 编译并热重载用于开发

```sh
npm run dev
```

### 类型检查、编译并压缩用于生产

```sh
npm run build
```

### 使用 [ESLint](https://eslint.org/) 进行代码检查

```sh
npm run lint
```

## 特别鸣谢

[LiterMC/go-openbmclapi](https://github.com/LiterMC/go-openbmclapi) 提供的部分代码。

[Kevin Z](https://github.com/zyxkad) 提供的技术支持。
