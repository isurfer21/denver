import { serve } from 'https://deno.land/std/http/server.ts';
import { parse } from 'https://deno.land/std/flags/mod.ts';
import * as path from 'https://deno.land/std/path/mod.ts';
import mime from 'https://isurfer21.github.io/denver/mime-db.json';

const APPNAME = 'DENVER';
const APPVER = '1.0.0';

class Args {
    constructor() {
        this.argv = parse(Deno.args);
    }
    parse(shortArg, longArg, typeArg, defaultVal) {
        let argVal;
        if (!!this.argv[shortArg] && typeof this.argv[shortArg] == typeArg) {
            argVal = this.argv[shortArg];
        } else if (!!this.argv[longArg] && typeof this.argv[longArg] == typeArg) {
            argVal = this.argv[longArg];
        } else {
            argVal = defaultVal;
        }
        return argVal;
    }
}

class Env {
    static load() {
        const url =
            import.meta.url;
        const u = new URL(url);
        const f = u.protocol === 'file:' ? u.pathname : url;
        const d = f.replace(/[/][^/]*$/, '');
        return {
            dirname: d,
            filename: f
        }
    }
}

class Bytes {
    static fileSize(b) {
        var u = 0,
            s = 1024;
        while (b >= s || -b >= s) {
            b /= s;
            u++;
        }
        return (u ? b.toFixed(1) + ' ' : b) + ' KMGTPEZY' [u] + 'B';
    }
}

class Mime {
    static fileExt(filename) {
        return filename.substring(filename.lastIndexOf('.') + 1);
    }
    static contentType(filename) {
        let fileExt = Mime.fileExt(filename);
        let types = [];
        for (let i = 0; i < mime.length; i++) {
            if (mime[i][0] == fileExt) {
                types.push(mime[i][1]);
            }
        }
        let mimeType = '';
        if (types.length < 1) {
            mimeType = 'application/octet-stream';
        } else {
            mimeType = types.join(',');
        }
        return mimeType;
    }
}

async function main() {
    const env = Env.load();

    const args = new Args();
    const version = args.parse('version', 'v', 'boolean', false),
        help = args.parse('help', 'h', 'boolean', false),
        host = args.parse('host', 'u', 'string', '127.0.0.1'),
        port = args.parse('port', 'p', 'number', '8080'),
        docpath = args.parse('docpath', 'd', 'string', env.dirname);

    if (help) {
        console.log(`${APPNAME}
A static web server for deno platform.

Options:
  -v, --version            display version information
  -h, --help               display help information
  -u, --host[=127.0.0.1]   set host IP or server address
  -p, --port[=8080]        set custom port number
  -d, --docpath            set document directory's path
    `);
    } else if (version) {
        console.log(`${APPNAME} (Version ${APPVER})
Copyright (c) 2019 Abhishek Kumar.
Licensed under the MIT License.
`);
    } else {
        console.log(`${APPNAME}
Serving at ${docpath}
Server listening at http://${host}:${port}/
Please hit 'Ctrl + C' to STOP the server.
`);
        const textEncoder = new TextEncoder();
        const server = serve(`${host}:${port}`);
        for await (const req of server) {
            let filepath = path.join(docpath, req.url);
            try {
                let data = textEncoder.encode('');
                let fileInfo = await Deno.stat(filepath);
                if (fileInfo.isDirectory()) {
                    let files = await Deno.readDir(filepath);
                    let list = [];
                    for (let f of files) {
                        if (f.isDirectory()) {
                            list.push(`<a href="./${f.name}/">${f.name}/</a>`);
                        } else if (f.isFile()) {
                            let fsize = Bytes.fileSize(f.len);
                            list.push(`<a href="./${f.name}">${f.name}</a> (${fsize})`);
                        }
                    }
                    data = textEncoder.encode('<h1>Index</h1>' + list.join('<br>'));
                    req.respond({
                        status: 200,
                        body: data
                    });
                } else if (fileInfo.isFile()) {
                    data = await Deno.readFile(filepath);
                    const headers = new Headers();
                    headers.set('content-type', Mime.contentType(filepath));
                    req.respond({
                        status: 200,
                        headers: headers,
                        body: data
                    });
                }
            } catch (error) {
                req.respond({
                    status: 404,
                    body: textEncoder.encode(`${error.name}\n${error.message}`)
                });
            }
        }
    }
}

main();