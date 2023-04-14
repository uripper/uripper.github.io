use std::process::Command;

fn main() {
    let output = Command::new("wasm-pack")
        .arg("build")
        .arg("--target")
        .arg("web")
        .arg("--out-dir")
        .arg("static/js")
        .status()
        .unwrap();
    assert!(output.success());
}
