use json::JsonValue;
use unreachable::{UncheckedOptionExt, UncheckedResultExt};
use wasm_bindgen::prelude::wasm_bindgen;

extern crate wee_alloc;

// Use `wee_alloc` as the global allocator.
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[derive(Clone)]
struct Context {
    caller: String,
}

impl From<&str> for Context {
    fn from(value: &str) -> Self {
        unsafe {
            let p = json::parse(value).unchecked_unwrap_ok();
            Self {
                caller: p["caller"].as_str().unchecked_unwrap().to_string(),
            }
        }
    }
}

fn script(context: Context, _args: JsonValue) -> JsonValue {
    JsonValue::String(format!("Hello, {}!", context.caller))
}

#[wasm_bindgen]
pub fn run(context: &str, args: &str) -> String {
    json::stringify(script(
        Context::from(context),
        json::parse(args).unwrap(),
    ))
}
