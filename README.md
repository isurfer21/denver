# denver
A static web server for deno platform

## Usage

### Serve at current directory
It would start the server with default settings.

```
$ deno --allow-net --allow-read denver.js
```

### Serve at custom directory
The custom directory could be any sub-directory under current one.

```
$ deno --allow-net --allow-read denver.js -d=./
```

### Serve at custom host
The custom host will serve the resources to external systems.

```
$ deno --allow-net --allow-read denver.js -u=192.168.0.1
```

### Serve at custom port
The custom port can be used based on requirement.

```
$ deno --allow-net --allow-read denver.js -p=9000
```

