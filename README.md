# Survey app

## Playing with the app

### Authentication codes

To authenticate your receipt while the app is running, click 'New Code' and use one of codes `22`, `ji`, or `ab`.

## Developing on the app

### Install Homebrew

[Reference](http://brew.sh/)

Run:

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Install NVM (node version manager)

[Reference](https://github.com/creationix/nvm#installation)

To install NVM, run:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
```

Activate NVM by sourcing it in your shell:

```
. ~/.nvm/nvm.sh
```

This project is set to use Node version 4.3 by default. To install and use this version of node, run the following in the project directory:

```
nvm install
```

```
nvm use
```

### Install watchman

[Reference](https://www.firebase.com/blog/2016-01-20-tutorial-firebase-react-native.html)

Run:

```
brew install watchman
```

### Install React

[Reference](https://www.firebase.com/blog/2016-01-20-tutorial-firebase-react-native.html)

```
sudo npm install -g react-native-cli
```

### Install all the node modules

```
npm install
```

### If you have trouble with unlocking files for access in Xcode

Remove all the node modules:

```
rm -rf node_modules/
```

Reinstall all the node modules with the correct permissions

```
npm install
```


