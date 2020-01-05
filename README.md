# denver
> A static web server for deno platform.

The name *denver* is a portmanteau word of *den*o and ser*ver* that is made specifically for deno platform. 

i.e., **den**o + ser**ver** → **denver** 

### Supported features

- Cross-platform application supported on macOS, Windows, Linux
- Serve at single host address at a time, thus *localhost* ≠ *external IP address*
- Host address can be customized otherwise runs at *localhost*
- Port number can be customized otherwise uses default port *8080*
- Serves at root directory where *denver.js* is present, if no directory path were provided

## Pre-requisite
It is dependent on **Deno** which is a secure runtime for *JavaScript* and *TypeScript*. 

You can install it from [https://deno.land/](https://deno.land/).

## Install 
You can directly install the application using this command

```
deno install denver https://isurfer21.github.io/denver/denver.js --allow-net --allow-read
```

#### Alias
You can also make an **alias** or **shortcut** for this command `deno --allow-net --allow-read https://isurfer21.github.io/denver/denver.js` as `denver`, so that you don't have to type this long command statement everytime you use it.

It would set the whole command as alias in currently active command-line session and would be useful till session lasts.

##### On macOS & Linux
```
alias denver="deno --allow-net --allow-read https://isurfer21.github.io/denver/denver.js"
```
##### On Windows
```
doskey denver=deno --allow-net --allow-read https://isurfer21.github.io/denver/denver.js
```

#### Note
If you have downloaded the repository then you can replace [https://isurfer21.github.io/denver/denver.js](https://isurfer21.github.io/denver/denver.js) with **denver.js** in the below commands to run from local repository.

Alternatively, you can also install the app from your local respository using 

```
cd denver/
deno install denver denver.js
```

This would work similar to *alias*.

## Usage
You can see the command-line options using help command as shown below.

```
$ deno --allow-net --allow-read https://isurfer21.github.io/denver/denver.js --help
DENVER
A static web server for deno platform.

Options:
  -v, --version            display version information
  -h, --help               display help information
  -u, --host[=127.0.0.1]   set host IP or server address
  -p, --port[=8080]        set custom port number
  -d, --docpath            set document directory's path
    
```

#### Using alias
```
$ denver -h
```
or 

```
$ denver --help
```

### Serve at root directory
It would start the server with default settings, that means it would serve at root directory where the *denver.js* file got downloaded.

```
$ deno --allow-net --allow-read https://isurfer21.github.io/denver/denver.js
```

So it is advisable to always pass the serving directory path in command-line parameters.

#### Using alias
```
$ denver
```

### Serve at current directory
The current directory could be passed like this. You can run either of these commands.

```
$ deno --allow-net --allow-read https://isurfer21.github.io/denver/denver.js -d=./
```
or

```
$ deno --allow-net --allow-read https://isurfer21.github.io/denver/denver.js --docpath=./
```

#### Using alias
```
$ denver -d=./
```
or

```
$ denver --docpath=./
```

### Serve at custom directory
The custom directory could be any sub-directory under current one. You can run either of these commands.

```
$ deno --allow-net --allow-read https://isurfer21.github.io/denver/denver.js -d=./web/
```
or

```
$ deno --allow-net --allow-read https://isurfer21.github.io/denver/denver.js --docpath=./web/
```

#### Using alias
```
$ denver -d=./web/
```
or

```
$ denver --docpath=./web/
```

### Serve at custom host
The custom host will serve the resources to external systems. You can run either of these commands.

```
$ deno --allow-net --allow-read https://isurfer21.github.io/denver/denver.js -u=192.168.0.1
```
or

```
$ deno --allow-net --allow-read https://isurfer21.github.io/denver/denver.js --host=192.168.0.1
```

#### Using alias
```
$ denver -u=192.168.0.1
```
or

```
$ denver --host=192.168.0.1
```

### Serve at custom port
The custom port can be used based on requirement. You can run either of these commands.

```
$ deno --allow-net --allow-read https://isurfer21.github.io/denver/denver.js -p=9000
```
or

```
$ deno --allow-net --allow-read https://isurfer21.github.io/denver/denver.js --port=9000
```

#### Using alias
```
$ denver -p=9000
```
or

```
$ denver --port=9000
```

### Upgrade cached modules of app
Deno transparently downloads and caches modules on first usage and they won't be downloaded again unless you pass `--reload` flag to force fetch/compilation step again.

```
$ deno --allow-net --allow-read --reload https://isurfer21.github.io/denver/denver.js
```

### More info about app
To get more information about app like dependencies and locate absolute path, run this command.

```
$ deno info https://isurfer21.github.io/denver/denver.js
```

## References
*Denver* is a remake of these static-servers made in other languages and platforms

- [Suxm](https://isurfer21.github.io/Suxm/) made in *Go* lang, distributed as binaries
- [Avityam](https://www.npmjs.com/package/avityam) made in *node.js*, distributed via npm 