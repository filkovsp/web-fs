# WEB FS
WEB FS is a React Web Based app that provides simple access to user files over web interface. Purpose for this was sharing common media files with family members within the home network.

This project is inspired by another old one over here: [Cute File Browser](https://github.com/filkovsp/Cute-File-Browser) (CFB).
But, that CFB one has couple of very annoying problems:
* it requires PHP server
* it scans the whole directory structure recursevely at the very first request to the back-end
* it doesn't work with file/folder names in other than English language

So, i've tried to addres all those issues in this React based version, here.
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