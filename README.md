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

#### Note
1. If you have downloaded the repository then you can replace [https://isurfer21.github.io/denver/denver.js](https://isurfer21.github.io/denver/denver.js) with **denver.js** in the below commands to run from local repository.
2. You can also make an **alias** or **shortcut** for this command `deno --allow-net --allow-read https://isurfer21.github.io/denver/denver.js` as `denver`, so that you don't have to type this long command statement everytime you use it.

### Serve at root directory
It would start the server with default settings, that means it would serve at root directory where the *denver.js* file got downloaded.

```
$ deno --allow-net --allow-read https://isurfer21.github.io/denver/denver.js
```

So it is advisable to always pass the serving directory path in command-line parameters.

### Serve at current directory
The current directory could be passed like this. You can run either of these commands.

```
$ deno --allow-net --allow-read https://isurfer21.github.io/denver/denver.js -d=./
```
or

```
$ deno --allow-net --allow-read https://isurfer21.github.io/denver/denver.js --docpath=./
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

### Serve at custom host
The custom host will serve the resources to external systems. You can run either of these commands.

```
$ deno --allow-net --allow-read https://isurfer21.github.io/denver/denver.js -u=192.168.0.1
```
or

```
$ deno --allow-net --allow-read https://isurfer21.github.io/denver/denver.js --host=192.168.0.1
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

## References
*Denver* is a remake of these static-servers made in other languages and platforms

- [Suxm](https://isurfer21.github.io/Suxm/) made in *Go* lang, distributed as binaries
- [Avityam](https://www.npmjs.com/package/avityam) made in *node.js*, distributed via npm 