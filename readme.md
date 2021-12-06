### prerequisites:
* [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces)
* [Yarn create-react-app](https://yarnpkg.com/package/create-react-app)
* [Using Create-React-App In A Monorepo](https://frontend-digest.com/using-create-react-app-in-a-monorepo-a4e6f25be7aa)

### Install dependencies:
```sh
git clone https://github.com/filkovsp/web-fs.git
cd web-fs

yarn install
```
### Start the whole bundle at once:
```sh
yarn start
```
### Optional:
* Add new dependency:
    ```sh
    yarn add react react-dom
    ```
* Start client only:
    ```sh
    yarn --cwd client start
    ```
* Start server only:
    ```sh
    yarn --cwd client start
    ```