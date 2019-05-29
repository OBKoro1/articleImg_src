const execSync = require('child_process').execSync; // 执行命令
const path = require('path'); // 路径模块
const fs = require('fs'); // 文件模块

function myExecSync(cmd) {
  // 除了该方法直到子进程完全关闭后才返回 执行完毕 返回
  try {
    var output = execSync(
      cmd,
      {
        encoding: 'utf8',
        timeout: 0,
        maxBuffer: 200 * 1024,
        killSignal: 'SIGTERM',
        cwd: null,
        env: null
      },
      function(err, stdout, stderr) {
        // 进程错误时 回调
        if (err) {
          console.log(`报错:${err}`); // 拦截报错
          return;
        }
      }
    );
  } catch (err) {
    console.log('执行命令出错:', err);
  }
}

function readDirSync(path) {
  var pa = fs.readdirSync(path); // 返回文件数组
  pa.forEach(function(ele, index) {
    // ele 文件名
    try {
      let url = `./viddle-source/${ele}`; // 文件路径
      let isDirectory = fs.statSync(url).isDirectory(); // 判断是否为文件夹
      if (isDirectory) {
        let file = `./viddle-source/${ele}/_config.json`; // 文件路径
        let isFile = fs.existsSync(file); // 判断_config.json 是否存在
        if (!isFile) {
          // 没有的话 就查config文件
          file = `./viddle-source/${ele}/config.json`; // 文件路径
        }
        // 有些文件夹没有config.json也没有_config.json 会抛出错误
        let data = fs.readFileSync(file, 'utf-8'); // 获取文件内容 返回字符串
        let res = data.indexOf(`"template": "npm"`); // 查找有没有npm形式
        // source打包并copy到dist
        if (res !== -1) {
          // npm形式 
          let cmd = `cd viddle-source/${ele}/ && npm install && npm run dev`;
          myExecSync(cmd);
          fs.copyFileSync(
            `./viddle-source/${ele}/dist/main.html`,
            `./viddle-dist/${ele}/main.html`
          );
        } else {
          // pug形式
          let cmd = `cd viddle-source/${ele}/ && pug main.pug -o dist`;
          myExecSync(cmd);
          fs.copyFileSync(
            `./viddle-source/${ele}/dist/main.html`,
            `./viddle-dist/${ele}/main.html`
          );
        }
      } else {
        return; // 不是数组就退出循环
      }
    } catch (err) {
      console.log('err:', err);
    }
  });
}

myExecSync('cd viddle-dist && git pull');
myExecSync('cd viddle-source && git pull');
// source打包并copy到dist
readDirSync('./viddle-source');
// push 两个文件夹
myExecSync(
  'cd viddle-source && git add . && git commit -m "build all" && git push'
);
myExecSync(
  'cd viddle-dist && git add . && git commit -m "build all" && git push'
);
