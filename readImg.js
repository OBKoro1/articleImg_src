/*
 * @Github: https://github.com/OBKoro1
 * @Author: OBKoro1
 * @Created_time: 2019-05-28 17:21:41
 * @LastEditors: OBKoro1
 * @LastEditTime: 2019-05-30 13:59:37
 * @Description: 读取markdown地址，更改他们的url。
 * 建议将项目备份一下，以免操作失误导致数据丢失
 */

const fs = require('fs'); // 文件模块
var request = require('request');
const reg = /!\[(.*)\]\((.*?)\)/g; // 提取markdown图片语法
var async = require("async");
let imgList = [] // img集合

// TODO: 变量
let imgUrl = 'http://ww1.sinaimg.cn/large/'
// const imgUrl = 'https://github.com/OBKoro1/articleImg_src/blob/master/dist/'; // 要被替换的图片地址
const newUrl = 'https://github.com/OBKoro1/articleImg_src/blob/master/weibo_img_move/' // 替换成这个地址
const addEnd = '?raw=true' // 项目地址
// const newUrl = 'https://baidu.com/src/' // 替换成这个地址
// const addEnd = '?raw=true' // 可以添加后缀 如github查看图片后缀为: ?raw=true
const item_src = './source' // 要读取markdown的项目地址
const down_src = './img_src' // 图片下载地址



// 提取图片地址
// readFile(item_src)
// 下载图片到本地 => 上传图片到云端，这步建议自己完成
// downImg()
// 修改图片地址 TODO: 充分理解后再开启 或者先建两个文件试手
readFile(item_src, true)

// 上传图片到云端

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
            return readFile(url, replace)
        } else {
            if (item.indexOf('.md') !== -1) {
                // 读取文件
                let data = fs.readFileSync(url, 'utf-8'); // 获取文件内容 返回字符串
                let res;
                let isChange = false
                while ((res = reg.exec(data)) !== null) {
                    let regUrl = res[2]
                    // 添加图片到数组 是否找到该字符串
                    if (regUrl.indexOf(imgUrl) !== -1) { 
                        if (replace) {
                            // 拼接要替换的url
                            let imgName = regUrl.split(imgUrl)[1]
                            let replaceUrl = `${newUrl}${imgName}`
                            // 可以添加后缀 如github查看图片后缀为: ?raw=true
                            if (addEnd) {
                                replaceUrl += addEnd
                            }
                            // console.log('replaceUrl', regUrl, imgName, replaceUrl)
                            // 替换字符串
                            isChange = true
                            data = data.replace(regUrl, replaceUrl)
                        } else {
                            imgList.push(regUrl)
                        }
                    }
                }
                // 修改文件
                if (replace && isChange) {
                    fs.writeFile(url, data, 'utf-8', () => {
                        console.log('修改成功', url)
                    })
                }
            }
        }
    })
    console.log('图片提取完成', imgList)
}

// 下载图片
function downImg() {
    // 创建文件夹
    try {
        let isDirectory = fs.statSync(down_src).isDirectory(); // 判断是否为文件夹
        if (!isDirectory) {
            fs.mkdirSync(down_src, { recursive: true });
        }
    } catch (err) {
        fs.mkdirSync(down_src, { recursive: true });
    }

    async.mapSeries(imgList, (httpSrc, callback) => {
        // settimeout等待下载函数创建下载 不需要等下载完毕 是并行
        // 时间充裕的话可以下载函数放进函数中 在回调中调callback
        setTimeout(() => {
            // 图片名+后缀
            let imgName = httpSrc.split(imgUrl)
            try {
                if (imgName[1]) {
                    downloadPic(httpSrc, `${down_src}/${imgName[1]}`)
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
