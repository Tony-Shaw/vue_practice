<template>
  <div class="echartMaps" style="height: 100%; width: 100%">
    <div ref="map" id="viewChart" style="height: 100%; width: 100%"></div>
    <!-- <div :class="{ divBox: isTrue, divBox1: !isTrue }">
      <div
        id="divOne"
        style="height: 67.8%; width: 100%; border-bottom: dotted red 3px"
      ></div>
      <div id="divThree" style="height: 100%; width: 100%"></div>
    </div> -->
    <!-- <div :class="{ miniDiv: isTrue, miniDiv1: !isTrue }" @click="isShowDiv">
      <i class="el-icon-d-arrow-right" v-show="!isTrue"></i>
      <i class="el-icon-d-arrow-left" v-show="isTrue"></i>
    </div> -->
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  components: {},
  data() {
    return {
      // 全局变量
      wordSize: "2", //设置电厂名字大小
      wordLineSize: "1.1", //设置线路名字大小
      flag: false, //根据vulnerable判断颜色
      // 变电站数据
      tsData: [],
      // 核电厂数据
      nppCoord: [],
      // 核电厂颜色
      nppIconColor: [],
      // 核电厂文字
      nppLabel: [],
      // 核电厂圆数据
      nppRingCoord: [],
      // 线路数据
      linesData: [],
      // 动态线路数据
      dynamicLinesData: [],
      // 动态线路数据（lines）
      vulLine: [],
      //
      // 测试数据
      // 单回
      singleLinesData: [],
      // 单回
      doubleLinesData: [],
      // 单回
      threesLinesData: [],

      //
      //
      hepData: [],
      hdpData: [],
      series: [],
      //

      drawer: false,
      divMask: true,
      isTrue: true,
    };
  },
  methods: {
    drawLine1() {
      // let dom = document.getElementById("divOne");
      let myChart = echarts.init(dom);
      let app = {};
      let option = null;
      setTimeout(function () {
        option = {
          // color: ['blue', 'red', 'cyan', 'yellow', 'pink'],

          legend: {},
          tooltip: {
            trigger: "axis",
            showContent: false,
          },
          dataset: {
            source: [
              ["product", "2019", "2020"],
              ["煤电", 26880, 26940],
              ["水电", 16948, 17202],
              ["风电", 4462, 5435],
              ["光伏", 4660, 7038],
              ["其他", 211, 296],
            ],
          },
          xAxis: { type: "category" },
          yAxis: { gridIndex: 0 },
          grid: { left: "12%", top: "55%" },
          series: [
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            { type: "line", smooth: true, seriesLayoutBy: "row" },
            { type: "line", smooth: true, seriesLayoutBy: "row" },

            {
              type: "pie",
              id: "pie",
              radius: "30%",
              center: ["50%", "25%"],
              label: {
                formatter: "{b}: {@2019} ({d}%)",
              },
              encode: {
                itemName: "product",
                value: "2019",
                tooltip: "2019",
              },
            },
          ],
        };

        myChart.on("updateAxisPointer", function (event) {
          var xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            myChart.setOption({
              series: {
                id: "pie",
                label: {
                  formatter: "{b}: {@[" + dimension + "]} ({d}%)",
                },
                encode: {
                  value: dimension,
                  tooltip: dimension,
                },
              },
            });
          }
        });

        myChart.setOption(option);
      });

      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
    },
    drawLine() {
      // var dom = document.getElementById("divThree");
      var myChart = echarts.init(dom);
      let option = {
        color: ["red", "blue"],
        title: {
          text: "统调负荷需求",
          subtext: "单位:MW",
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(50, 115, 105,0.9)", //通过设置rgba调节背景颜色与透明度
        },
        legend: {
          data: ["目标方案", "上年度"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
        },
        yAxis: {
          type: "value",
          scale: true,
          max: 28000,
          min: 15000,
          splitNumber: 8,
          boundaryGap: [0.2, 0.2],
        },
        series: [
          {
            name: "上年度",
            type: "line",
            stack: "总量1",
            data: [
              23293,
              21051,
              20582,
              18759,
              17028,
              16429,
              16557,
              18336,
              17628,
              18980,
              23700,
              24423,
            ],
          },
          {
            name: "目标方案",
            type: "line",
            stack: "总量2",
            data: [
              24000,
              22800,
              21660,
              19500,
              18000,
              17500,
              17900,
              19000,
              18600,
              20000,
              24500,
              26550,
            ],
          },
        ],
      };
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
    },
    charts(val) {
      // console.log(val)
      let me = this;
      let wordNum = this.wordSize;
      let wordLineNum = this.wordLineSize;
      let myChart = echarts.init(document.getElementById("viewChart"));
      // var dom1 = document.getElementById("divThree");
      // var myChart1 = echarts.init(dom1);
      // let dom2 = document.getElementById("divOne");
      // let myChart2 = echarts.init(dom2);
      let option1 = {
        color: ["red", "blue"],
        title: {
          text: "统调负荷需求",
          subtext: "单位:MW",
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(50, 115, 105,0.9)", //通过设置rgba调节背景颜色与透明度
        },
        legend: {
          data: ["目标方案", "上年度"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
        },
        yAxis: {
          type: "value",
          scale: true,
          max: 28000,
          min: 15000,
          splitNumber: 8,
          boundaryGap: [0.2, 0.2],
        },
        series: [
          {
            name: "上年度",
            type: "line",
            stack: "总量1",
            data: [
              23293,
              21051,
              20582,
              18759,
              17028,
              16429,
              16557,
              18336,
              17628,
              18980,
              23700,
              24423,
            ],
          },
          {
            name: "目标方案",
            type: "line",
            stack: "总量2",
            data: [
              24000,
              22800,
              21660,
              19500,
              18000,
              17500,
              17900,
              19000,
              18600,
              20000,
              24500,
              26550,
            ],
          },
        ],
      };
      let option2 = {
        // color: ['blue', 'red', 'cyan', 'yellow', 'pink'],

        legend: {},
        tooltip: {
          trigger: "axis",
          showContent: false,
        },
        dataset: {
          source: [
            ["product", "2019", "2020"],
            ["煤电", 26880, 26940],
            ["水电", 16948, 17202],
            ["风电", 4462, 5435],
            ["光伏", 4660, 7038],
            ["其他", 211, 296],
          ],
        },
        xAxis: { type: "category" },
        yAxis: { gridIndex: 0 },
        grid: { left: "12%", top: "55%" },
        series: [
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          { type: "line", smooth: true, seriesLayoutBy: "row" },
          { type: "line", smooth: true, seriesLayoutBy: "row" },

          {
            type: "pie",
            id: "pie",
            radius: "30%",
            center: ["50%", "25%"],
            label: {
              formatter: "{b}: {@2019} ({d}%)",
            },
            encode: {
              itemName: "product",
              value: "2019",
              tooltip: "2019",
            },
          },
        ],
      };
      myChart.on("click", function (params) {
        console.log(params);
        console.log(params.name);
        // debugger
        let citys = {
          北京市: "110100",
          天津市: "120100",
          上海市: "310100",
          重庆市: "500100",
          崇明县: "310200",
          湖北省直辖县市: "429000",
          铜仁市: "522200",
          毕节市: "522400",
          石家庄市: "130100",
          唐山市: "130200",
          秦皇岛市: "130300",
          邯郸市: "130400",
          邢台市: "130500",
          保定市: "130600",
          张家口市: "130700",
          承德市: "130800",
          沧州市: "130900",
          廊坊市: "131000",
          衡水市: "131100",
          太原市: "140100",
          大同市: "140200",
          阳泉市: "140300",
          长治市: "140400",
          晋城市: "140500",
          朔州市: "140600",
          晋中市: "140700",
          运城市: "140800",
          忻州市: "140900",
          临汾市: "141000",
          吕梁市: "141100",
          呼和浩特市: "150100",
          包头市: "150200",
          乌海市: "150300",
          赤峰市: "150400",
          通辽市: "150500",
          鄂尔多斯市: "150600",
          呼伦贝尔市: "150700",
          巴彦淖尔市: "150800",
          乌兰察布市: "150900",
          兴安盟: "152200",
          锡林郭勒盟: "152500",
          阿拉善盟: "152900",
          沈阳市: "210100",
          大连市: "210200",
          鞍山市: "210300",
          抚顺市: "210400",
          本溪市: "210500",
          丹东市: "210600",
          锦州市: "210700",
          营口市: "210800",
          阜新市: "210900",
          辽阳市: "211000",
          盘锦市: "211100",
          铁岭市: "211200",
          朝阳市: "211300",
          葫芦岛市: "211400",
          长春市: "220100",
          吉林市: "220200",
          四平市: "220300",
          辽源市: "220400",
          通化市: "220500",
          白山市: "220600",
          松原市: "220700",
          白城市: "220800",
          延边朝鲜族自治州: "222400",
          哈尔滨市: "230100",
          齐齐哈尔市: "230200",
          鸡西市: "230300",
          鹤岗市: "230400",
          双鸭山市: "230500",
          大庆市: "230600",
          伊春市: "230700",
          佳木斯市: "230800",
          七台河市: "230900",
          牡丹江市: "231000",
          黑河市: "231100",
          绥化市: "231200",
          大兴安岭地区: "232700",
          南京市: "320100",
          无锡市: "320200",
          徐州市: "320300",
          常州市: "320400",
          苏州市: "320500",
          南通市: "320600",
          连云港市: "320700",
          淮安市: "320800",
          盐城市: "320900",
          扬州市: "321000",
          镇江市: "321100",
          泰州市: "321200",
          宿迁市: "321300",
          杭州市: "330100",
          宁波市: "330200",
          温州市: "330300",
          嘉兴市: "330400",
          湖州市: "330500",
          绍兴市: "330600",
          金华市: "330700",
          衢州市: "330800",
          舟山市: "330900",
          台州市: "331000",
          丽水市: "331100",
          合肥市: "340100",
          芜湖市: "340200",
          蚌埠市: "340300",
          淮南市: "340400",
          马鞍山市: "340500",
          淮北市: "340600",
          铜陵市: "340700",
          安庆市: "340800",
          黄山市: "341000",
          滁州市: "341100",
          阜阳市: "341200",
          宿州市: "341300",
          六安市: "341500",
          亳州市: "341600",
          池州市: "341700",
          宣城市: "341800",
          福州市: "350100",
          厦门市: "350200",
          莆田市: "350300",
          三明市: "350400",
          泉州市: "350500",
          漳州市: "350600",
          南平市: "350700",
          龙岩市: "350800",
          宁德市: "350900",
          南昌市: "360100",
          景德镇市: "360200",
          萍乡市: "360300",
          九江市: "360400",
          新余市: "360500",
          鹰潭市: "360600",
          赣州市: "360700",
          吉安市: "360800",
          宜春市: "360900",
          抚州市: "361000",
          上饶市: "361100",
          济南市: "370100",
          青岛市: "370200",
          淄博市: "370300",
          枣庄市: "370400",
          东营市: "370500",
          烟台市: "370600",
          潍坊市: "370700",
          济宁市: "370800",
          泰安市: "370900",
          威海市: "371000",
          日照市: "371100",
          莱芜市: "371200",
          临沂市: "371300",
          德州市: "371400",
          聊城市: "371500",
          滨州市: "371600",
          菏泽市: "371700",
          郑州市: "410100",
          开封市: "410200",
          洛阳市: "410300",
          平顶山市: "410400",
          安阳市: "410500",
          鹤壁市: "410600",
          新乡市: "410700",
          焦作市: "410800",
          濮阳市: "410900",
          许昌市: "411000",
          漯河市: "411100",
          三门峡市: "411200",
          南阳市: "411300",
          商丘市: "411400",
          信阳市: "411500",
          周口市: "411600",
          驻马店市: "411700",
          省直辖县级行政区划: "469000",
          武汉市: "420100",
          黄石市: "420200",
          十堰市: "420300",
          宜昌市: "420500",
          襄阳市: "420600",
          鄂州市: "420700",
          荆门市: "420800",
          孝感市: "420900",
          荆州市: "421000",
          黄冈市: "421100",
          咸宁市: "421200",
          随州市: "421300",
          恩施土家族苗族自治州: "422800",
          长沙市: "430100",
          株洲市: "430200",
          湘潭市: "430300",
          衡阳市: "430400",
          邵阳市: "430500",
          岳阳市: "430600",
          常德市: "430700",
          张家界市: "430800",
          益阳市: "430900",
          郴州市: "431000",
          永州市: "431100",
          怀化市: "431200",
          娄底市: "431300",
          湘西土家族苗族自治州: "433100",
          广州市: "440100",
          韶关市: "440200",
          深圳市: "440300",
          珠海市: "440400",
          汕头市: "440500",
          佛山市: "440600",
          江门市: "440700",
          湛江市: "440800",
          茂名市: "440900",
          肇庆市: "441200",
          惠州市: "441300",
          梅州市: "441400",
          汕尾市: "441500",
          河源市: "441600",
          阳江市: "441700",
          清远市: "441800",
          东莞市: "441900",
          中山市: "442000",
          潮州市: "445100",
          揭阳市: "445200",
          云浮市: "445300",
          南宁市: "450100",
          柳州市: "450200",
          桂林市: "450300",
          梧州市: "450400",
          北海市: "450500",
          防城港市: "450600",
          钦州市: "450700",
          贵港市: "450800",
          玉林市: "450900",
          百色市: "451000",
          贺州市: "451100",
          河池市: "451200",
          来宾市: "451300",
          崇左市: "451400",
          海口市: "460100",
          三亚市: "460200",
          三沙市: "460300",
          成都市: "510100",
          自贡市: "510300",
          攀枝花市: "510400",
          泸州市: "510500",
          德阳市: "510600",
          绵阳市: "510700",
          广元市: "510800",
          遂宁市: "510900",
          内江市: "511000",
          乐山市: "511100",
          南充市: "511300",
          眉山市: "511400",
          宜宾市: "511500",
          广安市: "511600",
          达州市: "511700",
          雅安市: "511800",
          巴中市: "511900",
          资阳市: "512000",
          阿坝藏族羌族自治州: "513200",
          甘孜藏族自治州: "513300",
          凉山彝族自治州: "513400",
          贵阳市: "520100",
          六盘水市: "520200",
          遵义市: "520300",
          安顺市: "520400",
          黔西南布依族苗族自治州: "522300",
          黔东南苗族侗族自治州: "522600",
          黔南布依族苗族自治州: "522700",
          昆明市: "530100",
          曲靖市: "530300",
          玉溪市: "530400",
          保山市: "530500",
          昭通市: "530600",
          丽江市: "530700",
          普洱市: "530800",
          临沧市: "530900",
          楚雄彝族自治州: "532300",
          红河哈尼族彝族自治州: "532500",
          文山壮族苗族自治州: "532600",
          西双版纳傣族自治州: "532800",
          大理白族自治州: "532900",
          德宏傣族景颇族自治州: "533100",
          怒江傈僳族自治州: "533300",
          迪庆藏族自治州: "533400",
          拉萨市: "540100",
          昌都地区: "542100",
          山南地区: "542200",
          日喀则地区: "542300",
          那曲地区: "542400",
          阿里地区: "542500",
          林芝地区: "542600",
          西安市: "610100",
          铜川市: "610200",
          宝鸡市: "610300",
          咸阳市: "610400",
          渭南市: "610500",
          延安市: "610600",
          汉中市: "610700",
          榆林市: "610800",
          安康市: "610900",
          商洛市: "611000",
          兰州市: "620100",
          嘉峪关市: "620200",
          金昌市: "620300",
          白银市: "620400",
          天水市: "620500",
          武威市: "620600",
          张掖市: "620700",
          平凉市: "620800",
          酒泉市: "620900",
          庆阳市: "621000",
          定西市: "621100",
          陇南市: "621200",
          临夏回族自治州: "622900",
          甘南藏族自治州: "623000",
          西宁市: "630100",
          海东地区: "632100",
          海北藏族自治州: "632200",
          黄南藏族自治州: "632300",
          海南藏族自治州: "632500",
          果洛藏族自治州: "632600",
          玉树藏族自治州: "632700",
          海西蒙古族藏族自治州: "632800",
          银川市: "640100",
          石嘴山市: "640200",
          吴忠市: "640300",
          固原市: "640400",
          中卫市: "640500",
          乌鲁木齐市: "650100",
          克拉玛依市: "650200",
          吐鲁番地区: "652100",
          哈密地区: "652200",
          昌吉回族自治州: "652300",
          博尔塔拉蒙古自治州: "652700",
          巴音郭楞蒙古自治州: "652800",
          阿克苏地区: "652900",
          克孜勒苏柯尔克孜自治州: "653000",
          喀什地区: "653100",
          和田地区: "653200",
          伊犁哈萨克自治州: "654000",
          塔城地区: "654200",
          阿勒泰地区: "654300",
          自治区直辖县级行政区划: "659000",
          台湾省: "710000",
          香港特别行政区: "810100",
          澳门特别行政区: "820000",
        };
        let provinces = {
          //23个省
          台湾: "taiwan",
          河北: "hebei",
          山西: "shanxi",
          辽宁: "liaoning",
          吉林: "jilin",
          黑龙江: "heilongjiang",
          江苏: "jiangsu",
          浙江: "zhejiang",
          安徽: "anhui",
          福建: "fujian",
          江西: "jiangxi",
          山东: "shandong",
          河南: "henan",
          湖北: "hubei",
          湖南: "hunan",
          广东: "guangdong",
          海南: "hainan",
          四川: "sichuan",
          贵州: "guizhou",
          云南: "yunnan",
          陕西: "shanxi1",
          甘肃: "gansu",
          青海: "qinghai",
          //5个自治区
          新疆: "xinjiang",
          广西: "guangxi",
          内蒙古: "neimenggu",
          宁夏: "ningxia",
          西藏: "xizang",
          //4个直辖市
          北京: "beijing",
          天津: "tianjin",
          上海: "shanghai",
          重庆: "chongqing",
          //2个特别行政区
          香港: "xianggang",
          澳门: "aomen",
        };
        if (params.name in provinces) {
          let cityJson = require("../assets/province/" +
            provinces[params.name] +
            ".json");
          var myChart = echarts.init(document.getElementById("viewChart"));
          //注册地图
          echarts.registerMap("params.name", cityJson);
          let option = {
            name: params.name,
            type: "map",
            mapType: params.name,
            color: ["red", "blue", "orange"],
            backgroundColor: "gray",
            legend: {
              orient: "vertical",
              top: "bottom",
              left: "right",
              // inactiveColor: 'black', // 图例关闭时的颜色
              selected: {},
              data: [
                {
                  name: "500kV",
                },
                {
                  name: "220kV",
                },
                {
                  name: "全部",
                },
              ],
              textStyle: {
                color: "color",
              },
              selectedMode: "single",
            },
            tooltip: {
              trigger: "item",
            },
            geo: {
              id: "params.name",
              map: "params.name",
              roam: true,
              // center: [107, 27],
              aspectScale: 1,
              silent: false, // 是否不响应鼠标以及触摸事件
              zoom: 1.3,
              label: {
                //静态的时候展示样式
                show: true, //是否显示地图省份得名称
                color: "black",
                emphasis: {
                  //动态展示的样式
                  color: "red",
                },
              },
              scaleLimit: {
                min: 1,
                max: 1000,
              },
              itemStyle: {
                areaColor: "#E6E6E6",
              },
            },
            series: me.series,
            animation: true,
            animationThreshold: 15,
            animationDuration: 2000,
            animationEasing: "bounceln",
            animationEasingUpdate: "cubicInOut",
            animationDurationUpdate: 2000,
          };

          let legend1 = window.sessionStorage.getItem("legend");
          if (legend1 == "220kV") {
            option.legend.selected[legend1] = true;
            option.legend.selected["全部"] = false;
            option.legend.selected["500kV"] = false;
          } else if (legend1 == "550kV") {
            option.legend.selected[legend1] = true;
            option.legend.selected["全部"] = false;
            option.legend.selected["220kV"] = false;
          } else if (legend1 == "全部") {
            option.legend.selected[legend1] = true;
            option.legend.selected["220kV"] = false;
            option.legend.selected["500kV"] = false;
          }
          myChart.setOption(option, true);
        } else if (params.name in citys) {
          let cityJson = require("../assets/city/" +
            citys[params.name] +
            ".json");
          var myChart = echarts.init(document.getElementById("viewChart"));
          //注册地图
          echarts.registerMap("params.name", cityJson);
          let option = {
            name: params.name,
            type: "map",
            mapType: params.name,
            color: ["red", "blue", "orange"],
            backgroundColor: "gray",
            legend: {
              orient: "vertical",
              top: "bottom",
              left: "right",
              // inactiveColor: 'black', // 图例关闭时的颜色
              selected: {},
              data: [
                {
                  name: "500kV",
                },
                {
                  name: "220kV",
                },
                {
                  name: "全部",
                },
              ],
              textStyle: {
                color: "color",
              },
              selectedMode: "single",
            },
            tooltip: {
              trigger: "item",
            },
            geo: {
              id: "params.name",
              map: "params.name",
              roam: true,
              // center: [107, 27],
              aspectScale: 1,
              silent: false, // 是否不响应鼠标以及触摸事件
              zoom: 1.3,
              label: {
                //静态的时候展示样式
                show: true, //是否显示地图省份得名称
                color: "black",
                emphasis: {
                  //动态展示的样式
                  color: "red",
                },
              },
              scaleLimit: {
                min: 1,
                max: 1000,
              },
              itemStyle: {
                areaColor: "#E6E6E6",
              },
            },
            series: me.series,
          };

          let legend1 = window.sessionStorage.getItem("legend");
          if (legend1 == "220kV") {
            option.legend.selected[legend1] = true;
            option.legend.selected["全部"] = false;
            option.legend.selected["500kV"] = false;
          } else if (legend1 == "550kV") {
            option.legend.selected[legend1] = true;
            option.legend.selected["全部"] = false;
            option.legend.selected["220kV"] = false;
          } else if (legend1 == "全部") {
            option.legend.selected[legend1] = true;
            option.legend.selected["220kV"] = false;
            option.legend.selected["500kV"] = false;
          }
          myChart.setOption(option, true);
        } else {
          me.back();
        }
      });
      // myChart2.setOption(option2);
      // myChart1.setOption(option1);

      myChart.on("legendselectchanged", function (params) {
        window.sessionStorage.setItem("legend", params.name);
      });
      myChart.showLoading();
      // window.onresize = function () {
      //   myChart.resize()
      //   myChart1.resize()
      //   myChart2.resize()
      // }
      window.addEventListener("resize", function () {
        myChart.resize();
        // myChart1.resize();
        // myChart2.resize();
      });
      if (val == "reload") {
        setTimeout(() => {
          myChart.resize();
          // myChart1.resize();
          // myChart2.resize();
        }, 50);
      }
      this.back();
      myChart.hideLoading();
    },
    // 控制是否显示遮罩
    isShowDiv() {
      this.divMask = !this.divMask;
      this.isTrue = !this.isTrue;
    },
    // 控制是否显示遮罩
    isShowDiv1() {
      this.divMask = !this.divMask;
      this.isTrue = !this.isTrue;
    },
    back() {
      let guizhou = require("../assets/china.json");
      var myChart = echarts.init(document.getElementById("viewChart"));
      //注册地图
      echarts.registerMap("guizhou", guizhou);
      // myChart.on('click', function (params) {
      // 此处也可以获取经纬度，当获取到的经纬度是原来设置的，并不会改变
      //   console.log(params, myChart.getOption(), '....')
      // 获取当前点击位置的经纬度
      //   console.log(
      //     myChart.convertFromPixel('geo', [
      //       params.event.offsetX,
      //       params.event.offsetY,
      //     ])
      //   )
      //   console.log(myChart.getOption().geo)
      // })
      // myChart.on('georoam', function (params) {
      // 鼠标拖动地图时候获取鼠标位置的信息（经纬度、放大倍数等）
      //   console.log(params, myChart.getOption(), '....')
      //   window.sessionStorage.setItem(
      //     'center0',
      //     myChart.getOption().geo[0].center[0]
      //   )
      //   window.sessionStorage.setItem(
      //     'center1',
      //     myChart.getOption().geo[0].center[1]
      //   )
      //   window.sessionStorage.setItem('zoom', myChart.getOption().geo[0].zoom)
      // })
      let option = {
        color: ["red", "blue", "orange"],
        backgroundColor: "#c1c1c1",
        legend: {
          orient: "vertical",
          top: "bottom",
          left: "right",
          selected: {},
          data: [
            {
              name: "500kV",
            },
            {
              name: "220kV",
            },
            {
              name: "全部",
            },
          ],
          textStyle: {
            color: "color",
          },
          selectedMode: "single",
          data: "",
          selected: {},
        },
        // tooltip: {
        //   trigger: 'item',
        // },
        geo: {
          id: "viewChart",
          map: "guizhou",
          roam: true,
          center: [107, 35],
          // center: [112, 34],

          aspectScale: 1,
          silent: false, // 是否不响应鼠标以及触摸事件
          zoom: 1.3,
          label: {
            //静态的时候展示样式
            show: true, //是否显示地图省份得名称
            color: "black",
            emphasis: {
              //动态展示的样式
              color: "red",
            },
          },
          scaleLimit: {
            min: 1,
            max: 1000,
          },
          itemStyle: {
            areaColor: "#E6E6E6",
          },
        },
        series: this.series,
        animation: true,
        animationThreshold: 15,
        animationDuration: 2000,
        animationEasing: "bounceln",
        animationEasingUpdate: "cubicInOut",
        animationDurationUpdate: 2000,
      };
      // let legend1 = window.sessionStorage.getItem('legend')
      // if (legend1 == '220kV') {
      //   option.legend.selected[legend1] = true
      //   option.legend.selected['全部'] = false
      //   option.legend.selected['500kV'] = false
      // } else if (legend1 == '550kV') {
      //   option.legend.selected[legend1] = true
      //   option.legend.selected['全部'] = false
      //   option.legend.selected['220kV'] = false
      // } else if (legend1 == '全部') {
      //   option.legend.selected[legend1] = true
      //   option.legend.selected['220kV'] = false
      //   option.legend.selected['500kV'] = false
      // }
      myChart.setOption(option, true);
    },
  },

  async mounted() {
    this.charts();
  },
};
</script>

<style lang="less" scoped>
// #innerDiv {
//   position: relative;
//   top: -100%;
//   width: 32%;
//   height: 100%;
//   background: rgba(229, 233, 233, 0.8);
// }

.divBox {
  position: relative;
  margin: 7.5px 0 0 10px;
  top: -100%;
  left: 0;
  width: 32%;
  height: 98%;
  transition: all 0.4s ease;
  background: rgba(229, 233, 233, 0.6);
}

.divBox1 {
  position: relative;
  margin: 7.5px 0 0 0;
  top: -100%;
  left: -32%;
  width: 32%;
  height: 98%;
  transition: all 0.4s ease;
  background: rgba(229, 233, 233, 0.6);
}

.miniDiv {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -150%;
  left: 32.6%;
  width: 2.5%;
  height: 15%;
  transition: all 0.4s ease;
  background: rgba(229, 233, 233, 0.2);
  color: black;
}

.miniDiv1 {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -150%;
  left: 0%;
  width: 2.5%;
  height: 15%;
  transition: all 0.4s ease;
  background: rgba(229, 233, 233, 0.2);
  color: black;
}
</style>
