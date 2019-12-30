import { serve } from 'https://deno.land/std/http/server.ts';
import { parse } from "https://deno.land/std/flags/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";

const APPNAME = 'DENVER';
const APPVER = '1.0.0';

class ArgumentParser {
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

class EnvironmentVariable {
    constructor() {
        this.info = {};
    }
    load() {
        const url =
            import.meta.url;
        const u = new URL(url);
        const f = u.protocol === 'file:' ? u.pathname : url;
        const d = f.replace(/[/][^/]*$/, '');
        this.info = {
            dirname: d,
            filename: f,
        };
    }
}

async function main() {
    const env = new EnvironmentVariable();
    env.load();

    const arg = new ArgumentParser();
    const version = arg.parse('version', 'v', 'boolean', false),
        help = arg.parse('help', 'h', 'boolean', false),
        host = arg.parse('host', 'u', 'string', '127.0.0.1'),
        port = arg.parse('port', 'p', 'number', '8080'),
        docpath = arg.parse('docpath', 'd', 'string', env.info.dirname);

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
Server listening at http://${host}:${port}/
Please hit 'Ctrl + C' to STOP the server.
`);
        const server = serve(`${host}:${port}`);
        for await (const req of server) {
            let filepath = path.join(docpath, req.url);
            let data = await Deno.readFile(filepath);
            req.respond({
                body: data
            });
        }
    }
}

main();