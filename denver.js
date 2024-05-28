#!/usr/bin/env deno

import { parse } from "https://deno.land/std/flags/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";

const APPNAME = "DENVER";
const APPVER = "1.0.2";

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
    const url = import.meta.url;
    const u = new URL(url);
    const f = u.protocol === "file:" ? u.pathname : url;
    const d = f.replace(/[/][^/]*$/, "");
    return {
      dirname: d,
      filename: f,
    };
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
    return (u ? b.toFixed(1) + " " : b) + " KMGTPEZY"[u] + "B";
  }
}

class Mime {
  static load(filepath) {
    return fetch(filepath)
      .then((response) => response.json())
      .then((data) => {
        Mime.database = data;
      });
  }

  static fileExt(filename) {
    return filename.substring(filename.lastIndexOf(".") + 1);
  }

  static contentType(filename) {
    let fileExt = Mime.fileExt(filename);
    let types = [];
    for (let i = 0; i < Mime.database.length; i++) {
      if (Mime.database[i][0] === fileExt) {
        types.push(Mime.database[i][1]);
      }
    }
    let mimeType = "";
    if (types.length < 1) {
      mimeType = "application/octet-stream";
    } else {
      mimeType = types.join(", ");
      if (
        mimeType.includes("text/") ||
        mimeType.includes("application/json") ||
        mimeType.includes("application/xml")
      ) {
        mimeType += "; charset=utf-8";
      }
    }
    return mimeType;
  }
}

async function main() {
  const env = Env.load();

  const args = new Args();
  const version = args.parse("version", "v", "boolean", false),
    help = args.parse("help", "h", "boolean", false),
    host = args.parse("host", "u", "string", "127.0.0.1"),
    port = args.parse("port", "p", "number", "8080"),
    docpath = args.parse("docpath", "d", "string", env.dirname);

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
    Mime.load("https://isurfer21.github.io/denver/mime-db.json");

    const textEncoder = new TextEncoder();
    Deno.serve(
      {
        port: port,
        hostname: host,
      },
      async (req) => {
        const url = new URL(req.url);
        console.log(new Date().toISOString(), req.method, url.pathname);
        const filepath = decodeURIComponent(path.join(docpath, url.pathname));
        try {
          let data = textEncoder.encode("");
          const fileInfo = await Deno.stat(filepath);
          if (fileInfo.isDirectory) {
            let list = [];
            for await (const dirEntry of Deno.readDir(filepath)) {
              if (dirEntry.isDirectory) {
                list.push(
                  `<a href="./${dirEntry.name}/">${dirEntry.name}/</a>`,
                );
              } else if (dirEntry.isFile) {
                let fileProp = await Deno.stat(
                  path.join(filepath, dirEntry.name),
                );
                let fileSize = Bytes.fileSize(fileProp.size);
                list.push(
                  `<a href="./${dirEntry.name}">${dirEntry.name}</a> (${fileSize})`,
                );
              }
            }
            data = textEncoder.encode("<h1>Index</h1>" + list.join("<br>"));
            const headers = new Headers();
            headers.set("content-type", "text/html; charset=utf-8");
            return new Response(data, {
              status: 200,
              headers: headers,
            });
          } else if (fileInfo.isFile) {
            data = await Deno.readFile(filepath);
            const headers = new Headers();
            const contentType = Mime.contentType(filepath);
            headers.set("content-type", contentType);
            return new Response(data, {
              status: 200,
              headers: headers,
            });
          }
        } catch (error) {
          console.log(`Error! ${error.name}:`, error.message);
          const headers = new Headers();
          headers.set("content-type", "text/plain; charset=utf-8");
          return new Response(
            textEncoder.encode(`${error.name}`),
            {
              status: 404,
              headers: headers,
            },
          );
        }
      },
    );
  }
}

main();
