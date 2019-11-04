/**
 * @time  2019/9/24 16:43
 * @author  Eric Wang <vuejs@vip.qq.com>
 * @desc  Mock数据分页
 */

// 模拟数据
var _MOCK_DATA = [
    {
        name: "张三",
        age: 18
    },
    {
        name: "王五",
        age: 17
    },
    {
        name: "李四",
        age: 16
    },
    {
        name: "赵六",
        age: 15
    },
    {
        name: "庞统",
        age: 14
    },
];

// 分页数据状态
var pageData = {
    // 页面索引
    pageIndex: 1,
    // 单页数据量，初始化为2，可自由调整
    pageNum: 1,
    // 截取索引
    sliceIndex: 0
};

// 操作
var Option = (function() {
    function nextPage() {
        console.log(Math.ceil(_MOCK_DATA.length / pageData.pageNum), pageData.pageIndex)
        if (pageData.pageIndex <= Math.ceil(_MOCK_DATA.length / pageData.pageNum)) {
            console.log(getCurrentPageData_next(), "这是第" + pageData.pageIndex + "页", "下一页");
            pageData.pageIndex++;
            pageData.sliceIndex += pageData.pageNum;
        } else {
            console.log("数据超出索引")
        }
    }

    function prePage() {

        if (pageData.pageIndex > 0) {
            pageData.pageIndex--;
            pageData.sliceIndex -= pageData.pageNum;
            console.log(getCurrentPageData_pre(), "这是第" + pageData.pageIndex + "页", "上一页");
        } else {
            console.log("禁用鼠标操作，上一页没数据了");
        }

    }

    function getCurrentPageData_next() {
        return _MOCK_DATA.slice(pageData.sliceIndex, pageData.pageIndex * pageData.pageNum);
    }

    function getCurrentPageData_pre() {
        return _MOCK_DATA.slice(pageData.sliceIndex - pageData.pageNum, pageData.pageIndex * pageData.pageNum - pageData.pageNum);
    }

    return {
        nextPage: nextPage,
        prePage: prePage
    }
})();

Option.nextPage();
Option.nextPage();
Option.nextPage();
// Option().nextPage();
Option.prePage();
Option.prePage();
// Option().prePage();
// Option().prePage();
// Option().prePage();