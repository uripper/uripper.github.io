use std::io::{self, Write};
use yew::{html, start_app};
use yew::virtual_dom::{VNode, VTag};
use yew::virtual_dom::vtag::VTagError;
use yew::html::IntoPropValue;

fn main() -> io::Result<()> {
    let html = html! {
        <html>
            <head>
                <meta charset="utf-8" />
                <title>Hello World!</title>
                <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
                <link href="/css/style.css" rel="stylesheet" />
            </head>
            <body>
                <div id="app"></div>
                <script type="module" src="/pkg/index.js"></script>
            </body>
        </html>
    };

    let listener = std::net::TcpListener::bind("127.0.0.1:8080")?;

    for stream in listener.incoming() {
        let mut stream = stream?;
        let response = format!(
            "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nContent-Length: {}\r\n\r\n{}",
            html.to_string().len(),
            html.to_string(),
        );
        stream.write_all(response.as_bytes())?;
    }

    Ok(())
}

