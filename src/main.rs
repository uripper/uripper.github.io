#![feature(proc_macro_hygiene, decl_macro)]

use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};

#[get("/")]
async fn index() -> impl Responder {
    let html = include_str!("../templates/index.html");
    HttpResponse::Ok().content_type("text/html").body(html)
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(index)
            .service(echo)
            .route("/hey", web::get().to(manual_hello))
            .service(actix_files::Files::new("/img", "./static/img"))
            .service(actix_files::Files::new("/js", "./static/js"))
            .service(actix_files::Files::new("/css", "./static/css"))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
