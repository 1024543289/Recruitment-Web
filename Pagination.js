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
    pageNum: 2,
    // 截取索引
    sliceIndex: 0
};

// 操作
var Option = (function () {
    /*
     * @desc 上一页
     * @return {}  {Object} -返回一个对象，内部包含当前页的数据，页面索引
     */
    function nextPage() {
        console.log(Math.ceil(_MOCK_DATA.length / pageData.pageNum), pageData.pageIndex)
        if (pageData.pageIndex <= Math.ceil(_MOCK_DATA.length / pageData.pageNum)) {
            console.log(getCurrentPageData_next(), "这是第" + pageData.pageIndex + "页", "下一页");
            pageData.pageIndex++;
            pageData.sliceIndex += pageData.pageNum;
            // return getCurrentPageData_next();
            // 按照常规思路，返回三个参数
            return {
                data: getCurrentPageData_next(),
                index: pageData.pageIndex
            }
        } else {
            console.log("数据超出索引");
            // 这里可以做一些交互体验，比如禁用按钮
        }
    }

    /*
     * @desc 下一页
     * @return {}  {Object} -返回一个对象，内部包含当前页的数据，页面索引
     */
    function prePage() {

        if (pageData.pageIndex > 2) {
            pageData.pageIndex--;
            pageData.sliceIndex -= pageData.pageNum;
            console.log(getCurrentPageData_pre(), "这是第" + pageData.pageIndex + "页", "上一页");
            // return getCurrentPageData_pre();
            return {
                data: getCurrentPageData_pre(),
                index: pageData.pageIndex
            }
        } else {
            console.log("禁用鼠标操作，上一页没数据了");
            // 这里可以做一些交互体验，比如禁用按钮
        }

    }

    /*
     * @desc 点击下一页获取数据
     * @return [] {Array} -分页数据
     */
    function getCurrentPageData_next() {
        return _MOCK_DATA.slice(pageData.sliceIndex, pageData.pageIndex * pageData.pageNum);
    }

    /*
   * @desc 点击上一页获取数据
   * @return [] {Array} -分页数据
   */
    function getCurrentPageData_pre() {
        return _MOCK_DATA.slice(pageData.sliceIndex - pageData.pageNum, pageData.pageIndex * pageData.pageNum - pageData.pageNum);
    }

    return {
        nextPage: nextPage,
        prePage: prePage
    }
})();

// 先初始化_MOCK_DATA的数据，直接在ajax请求后赋值覆盖就好，例如_MOCK_DATA = data.data

// 可以修改分页数据状态里面的参数，进行页面数据展示

// 通过调用Option.nextPage()来获取下一页数据，默认返回数组对象

// 通过调用Option.prePage()来获取上一页数据，默认返回数组对象