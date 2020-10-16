//告诉gulp需要去执行哪些任务。
const gulp = require("gulp");

//创建任务
gulp.task("hello", function(){
  console.log("hello world");
})

// const htmlmin = require("gulp-htmlmin");
// 将.html文件拷贝到dist这个目录下
gulp.task("copy-html", function(){
  return gulp.src("index.html")
  // .pipe(htmlmin({
  //   removeEmptyAttibutes: true, // 移出所有空属性
  //   collapseWhitespace: true // 压缩 html
  // }))
  .pipe(gulp.dest("dist/"))
  .pipe(connect.reload());
})

// //拷贝图片
gulp.task("images", function(){
  // return gulp.src("images/*.{jpg,png}").pipe(gulp.dest("dist/images"));
  // return gulp.src("images/*/*").pipe(gulp.dest("dist/images"));
  return gulp.src("images/**/*").pipe(gulp.dest("dist/images"))
  .pipe(connect.reload());
})


// //拷贝多个数据，到一个文件夹中
gulp.task("data", function(){
  return gulp.src(["json/*.json"])
  .pipe(gulp.dest("dist/data"))
  .pipe(connect.reload());
})
gulp.task("js", function(){
  return gulp.src(["js/*.js"])
  .pipe(gulp.dest("dist/js"))
  .pipe(connect.reload());
})
gulp.task("fontpic", function(){
  return gulp.src("font_e86vl3ugds5/**/*")
  .pipe(gulp.dest("dist/font_e86vl3ugds5"))
  .pipe(connect.reload());
})
gulp.task("html", function(){
  return gulp.src("html/**/*")
  .pipe(gulp.dest("dist/html"))
  .pipe(connect.reload());
})
gulp.task("php", function(){
  return gulp.src("php/**/*")
  .pipe(gulp.dest("dist/php"))
  .pipe(connect.reload());
})
gulp.task("css", function(){
  return gulp.src("csss/**/*")
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
})


// //一次性执行多个任务
gulp.task("build", ["copy-html", 'images', "data","js","fontpic","html","php","css"], function(){
  console.log("项目建立成功");
})



// //处理scss文件  scss专门用于编写我们的css代码的
// /*
//   如果最后的.css大家要压缩重命名以后，再去存放的话，那么就必须一个文件一个任务。
// */
const sass = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("scss1", function(){
  return gulp.src("stylesheet/index.scss")
  .pipe(sass())
  .pipe(gulp.dest("dist/css"))
  .pipe(minifyCSS())
  .pipe(rename("index.min.css"))
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
})
gulp.task("scss2", function(){
  return gulp.src("stylesheet/shop.scss")
  .pipe(sass())
  .pipe(gulp.dest("dist/css"))
  .pipe(minifyCSS())
  .pipe(rename("shop.min.css"))
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
})
gulp.task("scss3", function(){
  return gulp.src("stylesheet/shopall.scss")
  .pipe(sass())
  .pipe(gulp.dest("dist/css"))
  .pipe(minifyCSS())
  .pipe(rename("shopall.min.css"))
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
})

gulp.task("scss4", function(){
  return gulp.src("stylesheet/shoppingcar.scss")
  .pipe(sass())
  .pipe(gulp.dest("dist/css"))
  .pipe(minifyCSS())
  .pipe(rename("shoppingcar.min.css"))
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
})

gulp.task("scss5", function(){
  return gulp.src("stylesheet/login.scss")
  .pipe(sass())
  .pipe(gulp.dest("dist/css"))
  .pipe(minifyCSS())
  .pipe(rename("login.min.css"))
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
})

gulp.task("scss6", function(){
  return gulp.src("stylesheet/register.scss")
  .pipe(sass())
  .pipe(gulp.dest("dist/css"))
  .pipe(minifyCSS())
  .pipe(rename("register.min.css"))
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
})
gulp.task("scss7", function(){
  return gulp.src("stylesheet/common.scss")
  .pipe(sass())
  .pipe(gulp.dest("dist/css"))
  .pipe(minifyCSS())
  .pipe(rename("common.min.css"))
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
})
gulp.task("scss", ["scss1","scss2","scss3","scss4","scss5","scss6","scss7"], function(){
  console.log("scss建立成功");
})

// const concat = require("gulp-concat");
// const uglify = require("gulp-uglify");
// const babel = require("gulp-babel");
// //合并js代码的一个插件  不要对遵从模块化规范，或者jquery这样的第三方库进行合并和压缩。
// gulp.task("scripts", function(){
//   return gulp.src(["./javascript1/*.js", "./javascript2/*.js"])
//   .pipe(concat("index.js"))
//   .pipe(babel({
//     presets: ['@babel/env']
//   }))
//   .pipe(gulp.dest("dist/js"))
//   .pipe(uglify())
//   .pipe(rename("index.min.js"))
//   .pipe(gulp.dest("dist/js"))
//   .pipe(connect.reload());
// })


// //提供了一个监听的功能
gulp.task("watch", function(){
  //第一个参数，我们要去监听的文件路径， 第二个参数，监听数据发生变化以后，执行的内容
  gulp.watch("index.html", ['copy-html']);
  gulp.watch("images/**/*", ['images']);
  gulp.watch("json/*.json", ['data']);
  gulp.watch("stylesheet/index.scss", ['scss1']);
  gulp.watch("stylesheet/shop.scss", ['scss2']);
  gulp.watch("stylesheet/shopall.scss", ['scss3']);
  gulp.watch("stylesheet/shoppingcar.scss", ['scss4']);
  gulp.watch("stylesheet/login.scss", ['scss5']);
  gulp.watch("stylesheet/register.scss", ['scss6']);
  gulp.watch("js/*.js", ['js']);
  gulp.watch("font_e86vl3ugds5/**/*",['fontpic'])
  gulp.watch("html/**/*",['html'])
  gulp.watch("php/**/*",['php'])
  gulp.watch("csss/**/*",['css'])
})

// //可以在当前目录启动一个临时的服务器
// //热更新
const connect = require("gulp-connect");
gulp.task("server", function(){
  connect.server({
    root: "dist", //用来设置服务器的根目录
    port: 8800,  //0-65535
    livereload: true
  })
})


// //设置默认任务,同时启动服务和监听功能
gulp.task("default", ['watch', "server"]);

