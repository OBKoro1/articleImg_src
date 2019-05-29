/*
 * @Github: https://github.com/OBKoro1
 * @Author: OBKoro1
 * @Created_time: 2019-05-28 17:21:41
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-05-29 15:30:28
 * @Description: 读取本地图片，更改他们的url。
 */

const fs = require('fs'); // 文件模块
var request = require('request');

// TODO:下载
console.log(process.argv, 'process.argv[2]')
process.argv.forEach(item => {
    console.log('111', item, typeof item)
})

let imgList = [] // img集合
let imgUrl = 'http://ww1.sinaimg.cn/large/'; // 要被替换的图片地址
const reg = /!\[(.*)\]\((.*?)\)/g; // 提取markdown图片语法
var async = require("async");

// 提取图片地址
readFile('./source')
console.log('图片提取完成', imgList)
// 下载图片到本地
downImg()
// 修改图片地址
readFile('./source', true)

// TODO: 上传图片到云端

/**
 * 递归查找文件夹，找到markdown文件的图片语法，
 * 匹配要被替换的图片，添加图片到数组/替换图片地址
 * @param {Stying} path 查找的文件夹
 * @param {Bealoon} replace 是否替换查找
 * @return: 
 * @Created_time: 2019-05-29 14:18:28
 */
function readFile(path, replace = false) {
    var files = fs.readdirSync(path); // 返回文件数组
    files.forEach((item) => {
        let url = `${path}/${item}`; // 文件路径
        let isDirectory = fs.statSync(url).isDirectory(); // 判断是否为文件夹
        if (isDirectory) {
            // 递归文件夹
            return readFile(url)
        } else {
            if (item.indexOf('.md') !== -1) {
                // 读取文件
                let data = fs.readFileSync(url, 'utf-8'); // 获取文件内容 返回字符串
                let res;
                while ((res = reg.exec(data)) !== null) {
                    let regUrl = res[2]
                    if (replace) {

                    } else {
                        // 添加图片到数组
                        if (regUrl.indexOf(imgUrl) !== -1) {
                            imgList.push(regUrl)
                        }
                    }
                }
            }
        }
    })
}

// 下载图片
function downImg() {
    async.mapSeries(imgList, (httpSrc, callback) => {
        // settimeout等待下载函数创建下载 不需要等下载完毕 是并行
        // 时间充裕的话可以下载函数放进函数中 在回调中调callback
        setTimeout(() => {
            // 图片名+后缀
            let imgName = httpSrc.split(imgUrl)
            try {
                if (imgName[1]) {
                    // TODO: 修改
                    // TODO: 判断文件夹
                    downloadPic(httpSrc, `./dist/${imgName[1]}`)
                }
                callback(null, httpSrc);
            } catch (err) {
                // 捕获报错 下载失败
                callback(err, httpSrc);
            }
        }, 400);
    }, (err, res) => {
        if (err) {
            throw err;
        } else {
            console.log('图片下载完成：', res)
        }
    });
    // 命名冲突的话 不会重复下载
    function downloadPic(src, imgPath) {
        request(src).pipe(fs.createWriteStream(imgPath)).on('close', () => {
            console.log('pic saved!', src)
        })
    }
}






// 执行shell命令
function myExecSync(cmd) {
    // 除了该方法直到子进程完全关闭后才返回 执行完毕 返回
    try {
        execSync(
            cmd,
            {
                encoding: 'utf8',
                timeout: 0,
                maxBuffer: 200 * 1024,
                killSignal: 'SIGTERM',
                cwd: null,
                env: null
            },
            function (err, stdout, stderr) {
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

console.log(111)