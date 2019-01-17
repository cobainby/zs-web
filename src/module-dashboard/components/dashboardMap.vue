<template>
  <div class="fog-detection-wrap">
    <layout>
      <div class="map-parent">
        <div id="map"></div>
        <div class="map-layer">
          <div class="map-legend">
            <ul>
              <li>
                <img src="../../../static/images/map/small-yellow.png">
                <span>黄色</span>
              </li>
              <li>
                <img src="../../../static/images/map/small-orange.png">
                <span>橙色</span>
              </li>
              <li>
                <img src="../../../static/images/map/small-red.png">
                <span>红色</span>
              </li>
            </ul>
          </div>
          <div class="map-link">
            <router-link class="location-link" :to="{path:'/equipment'}">监测设备设置
            </router-link>
            <router-link class="history-link" :to="{path:'/itemList'}">工程详细列表</router-link>
          </div>
        </div>
      </div>
      <div class="right-parent">
        <div class="fog-title">
          <span>监测工程</span>
          <mu-select-field v-model="targetType" label="" class="target-field" :underlineShow="true" @change="changeFilter">
            <mu-menu-item value="4" title="全部" />
            <mu-menu-item value="3" title="红色" />
            <mu-menu-item value="2" title="橙色" />
            <mu-menu-item value="1" title="黄色" />
            <mu-menu-item value="0" title="正常" />
          </mu-select-field>
        </div>
        <div v-show="hasFogData" class="fog-content">
          <div v-for="(item,index) in listData" :key="item.projectUuid" class="fog-item" v-show="showContent(item)" :data-id="item.projectUuid" @click="listItemClick(item, index)">
            <img :src="'../../../static/images/map/' + icon[item.warningGrade] + '-list.png'">
            <div class="fog-content-right">
              <div class="location">
                <span class="tit">监测工程</span>
                <span class="con" :title="item.projectName">{{ item.projectName }}</span>
              </div>
              <div class="time">
                <span class="tit">施工工况</span>
                <span class="con" v-if="item.constructionStep==0">未开始</span>
                <span class="con" v-if="item.constructionStep==1">施工中</span>
                <span class="con" v-if="item.constructionStep==2">已结束</span>
              </div>
            </div>
          </div>
        </div>
        <!-- <no-data-img v-show="!hasFogData" text="暂无数据"></no-data-img> -->
      </div>
      <mu-dialog :open="dialogFlag" dialogClass="fog-detection-dialog" @close="closeDialog">
        <div class="dialog-title">
          {{ nowItem.projectName }}
        </div>
        <div class="dialog-content">
          <!-- <div v-if="nowItem.bigPic !== ''" id="pic-wrap" class="pic">
            <img :src="nowItem.bigPic" ref="bigPic">
          </div> -->
          <div v-if="nowItem.bigPic !== ''" id="pic-wrap" class="pic">
            <img src="../../../static/images/test/video.png" ref="bigPic">
          </div>
          <no-data v-else></no-data>
        </div>
      </mu-dialog>
    </layout>
  </div>
</template>

<script>
import Layout from "../components/mapLayout";
import axios from "axios";
import { getToken } from "@/utils/auth";
import "../../../static/jquery-plugin/jquery.nicescroll.min.js";
import { projectList } from "@/api/base/project";

let mapHeight = (winH = $(window).height()) => {
  $(".map-parent").css({
    height: winH - 220,
    width: $(window).width() - 300
  });
  $(".right-parent").css({
    height: winH - 220
  });
  $(".fog-content").css({
    height: $(".right-parent").height() - 40
  });
};
/* eslint-disable no-undef */
const mapConfig = {
  center: [113.310846, 22.961402],
  zoom: 11,
  zooms: [3, 18]
};
const rank = ["正常", "预警", "报警", "超过控制值"];
export default {
  components: {
    Layout
  },
  data() {
    return {
      map: null,
      icon: ["small-green", "small-yellow", "small-orange", "small-red"], // 0:无雾 1:轻雾 2:中雾 3：大雾
      markers: new Map(), // 存储所有Marker点位的Map集合
      warningMarkerIds: [],
      infoWindow: null,
      token: getToken(),
      options: {
        center: new AMap.LngLat(mapConfig.center[0], mapConfig.center[1]),
        zoom: mapConfig.zoom,
        zooms: mapConfig.zooms,
        animateEnable: true
      },
      iconUrl: "../../../static/images/map",
      fogSocket: null,
      listData: [],
      dialogFlag: false,
      nowItem: {},
      targetType: "4",
      hasFogData: true
    };
  },
  methods: {
    init() {
      let _this = this;
      this.map = new AMap.Map("map", this.options);
      this.map.setFeatures(["bg", "building", "road", "point"]); // 多个种类要素显示
      projectList({ token: this.token })
        .then(res => {
          _this.warningMarkerIds = [];
          let dataIdArr = [];
          let list = [];
          if (res.data.length) {
            let data = res.data;
            list = data;
            data.forEach(function(item) {
              dataIdArr.push(item.projectUuid);
              _this.addMarker(item);
              _this.warningMarkerIds.push(item.projectUuid);
            });
            this.map.setFitView();
            let newArr = _this.listData.filter(function(item) {
              return $.inArray(item.projectUuid, dataIdArr) === -1;
            });
            _this.listData = [...data, ...newArr];
          }
        })
        .then(() => {
          // 连接socket
          // infowindow 点击显示大图
          $("#map").on("click", ".small-img", function() {
            _this.openDialog();
            let timer = null;
            timer = setInterval(function() {
              if (_this.$refs.bigPic) {
                clearInterval(timer);
                _this.$refs.bigPic.removeAttribute("style");
                let _w, _h;
                if (typeof _this.$refs.bigPic.naturalWidth === "undefined") {
                  // IE 6/7/8
                  let i = new Image();
                  i.src = _this.$refs.bigPic.src;
                  _w = _this.$refs.bigPic.width;
                  _h = _this.$refs.bigPic.height;
                } else {
                  // HTML5 browsers
                  _w = _this.$refs.bigPic.naturalWidth;
                  _h = _this.$refs.bigPic.naturalHeight;
                }
                const p = document.getElementById("pic-wrap");
                const _pw = p.offsetWidth;
                const _ph = p.offsetHeight;
                if (_w / _h > _pw / _ph) {
                  _this.$refs.bigPic.style.width = _pw + "px";
                  _this.$refs.bigPic.style.height = "auto";
                } else {
                  _this.$refs.bigPic.style.width = "auto";
                  _this.$refs.bigPic.style.height = _ph + "px";
                }
              }
            }, 50);
          });
        });
    },
    addMarker(item) {
      if (item.projectLatLon != null) {
        let _this = this;
        let opts = {};
        let lon = item.projectLatLon.split(",")[0]; //经度
        let lat = item.projectLatLon.split(",")[1]; //维度
        opts.map = this.map;
        opts.icon = new AMap.Icon({
          image: this.iconUrl + "/" + this.icon[item.warningGrade] + ".png",
          size: new AMap.Size(30, 30)
        });
        opts.offset = new AMap.Pixel(-15, -15);
        let lnglat = new AMap.LngLat(parseFloat(lon), parseFloat(lat));
        if (lnglat) {
          opts.position = lnglat;
          opts.title = item.projectName;
          let marker = new AMap.Marker(opts);
          marker.projectUuid = item.projectUuid;
          marker.projectName = item.projectName;
          marker.warningGrade = item.warningGrade;
          this.markers.set(item.projectUuid, marker);
          marker.on(
            "click",
            function(e) {
              let _marker = e.target;
              $(".fog-item").each(function() {
                if ($(this).attr("data-id") === _marker.projectUuid) {
                  $(this).click();
                }
              });
            },
            marker
          );
        }
      }
    },
    changeIcon(item) {
      let _this = this;
      let marker = this.markers.get(item.projectUuid);
      if (marker && marker.warningGrade !== item.warningGrade) {
        // 如果地图上渲染点的雾气大小和当前请求不同，改变地图点的图标
        marker.setMap(null);
        this.addMarker(item);
      }
    },
    openInfoWindow(lon, lat, content) {
      let infowindowOpts = {};
      // 可见宽度大于1400时地图点击后展示大窗口
      if (document.body.offsetWidth >= 1400) {
        infowindowOpts.size = new AMap.Size(240, 290);
      }else{
        infowindowOpts.size = new AMap.Size(200,210);
      }
      infowindowOpts.position = new AMap.LngLat(
        parseFloat(lon),
        parseFloat(lat)
      );
      //        infowindowOpts.autoMove = true
      infowindowOpts.content = content;
      this.infoWindow = new AMap.InfoWindow(infowindowOpts);
      this.infoWindow.open(
        this.map,
        new AMap.LngLat(parseFloat(lon), parseFloat(lat))
      );
      this.map.setCenter(new AMap.LngLat(lon, lat));
      this.map.panBy(0, 25);
    },
    closeInfoWindow() {
      if (this.infoWindow) {
        this.infoWindow.close();
        this.infoWindow = null;
      }
    },
    listItemClick(item, index) {
      this.closeInfoWindow();
      this.nowItem = item;
      $(".fog-item")
        .eq(index)
        .addClass("active")
        .siblings()
        .removeClass("active");
      let marker = this.markers.get(item.projectUuid);
      if (marker) {
        let conHtml = `
            <div class="map-item">
              <div class="location-name" title="${item.projectName}">${
          item.projectName
        }</div>
              <img class="small-img" src="../../../static/images/test/video.png" alt="${
                item.projectName
              }">
              <div class="line">工程地址：${item.projectLocation}</div>
              <div class="line">计划开挖时间：${item.excavationDatePlaned}</div>
              <div class="line">实际开挖时间：${item.backfillDateActual}</div>
              <div class="line">预警状态：${rank[item.warningGrade]}</div>
              <div class="line" style="float:left"><a href="#/detailInfo?id=${
                item.projectUuid
              }">项目详细信息</a></div>
              <div class="line" ><a style="margin-left:10px" href="#/dataInfo?id=${
                item.projectUuid
              }">数据展示</a></div>
            </div>
          `;
        this.openInfoWindow(
          marker.getPosition().getLng(),
          marker.getPosition().getLat(),
          conHtml
        );
      }
    },
    closeDialog: function() {
      this.dialogFlag = false;
    },
    openDialog: function() {
      this.dialogFlag = true;
    },
    changeFilter(value) {
      this.targetType = value;
    },
    showContent(item) {
      if (this.targetType === "4") {
        return (
          item.warningGrade === 0 ||
          item.warningGrade === 1 ||
          item.warningGrade === 2 ||
          item.warningGrade === 3
        );
      } else {
        return item.warningGrade === parseInt(this.targetType);
      }
    }
  },
  mounted() {
    mapHeight();
    $(window).resize(() => mapHeight());
    $(".fog-content").niceScroll({
      cursorcolor: "#3497db",
      autohidemode: true
    });
    setInterval(function() {
      $(".fog-content")
        .getNiceScroll()
        .resize();
    }, 500);
    this.init();
  },
  destroyed() {
    // this.fogSocket.disconnect()
    // $('.fog-content').getNiceScroll().resize()
  },
  watch: {
    // listData: function(newVal, oldVal) {
    //   debugger
    //   let _this = this;
    //   let flag = false;
    //   if (newVal.length > 0) {
    //     for (let i = 0; i < newVal.length; i++) {
    //       if (newVal[i].warningGrade === 0) {
    //         continue;
    //       } else {
    //         flag = true;
    //         break;
    //       }
    //     }
    //   }
    //   this.hasFogData = flag;
    // }
  }
};
</script>

<style lang="scss" type="text/scss">
@media (min-width: 640px) and (max-width: 1399px) {
  .fog-detection-wrap {
    margin: -12px;
    .content {
      position: relative;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      .breadcrumb {
        margin: 0 !important;
      }
      .map-parent {
        position: relative;
        float: left;
        #map {
          width: 100%;
          height: 100%;
          .amap-info-content {
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            font-size: 12px;
            .map-item {
              height: 100%;
              .location-name {
                font-size: 12px;
                font-weight: 900;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
                white-space: nowrap;
                margin-top: -2px;
              }
              .small-img {
                width: 150px;
                height: 80px;
                cursor: pointer;
                margin-top: 2px;
              }
              .line {
                margin-top: 2px;
                font-size: 9px;
                a {
                  font-size: 10px;
                  color: #3497db;
                }
              }
            }
          }
        }
        .map-layer {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 500;
          .map-legend {
            float: left;
            background: #c8ebff;
            border-radius: 9px;
            box-shadow: 3px 3px 3px #cac9c7;
            ul {
              width: 85px;
              height: 55px;
              margin: 0;
              padding: 10px 0 10px 10px;
              li {
                list-style: none;
                float: left;
                margin-right: 3px;
                height: 100%;
                text-align: center;
                img {
                  width: 20px;
                }
                span {
                  display: block;
                  width: 100%;
                  font-size: 10px;
                  font-weight: 600;
                }
              }
            }
          }
          .map-link {
            float: left;
            width: 100px;
            margin-left: 6px;
            a {
              display: block;
              text-align: center;
              width: 100%;
              height: 20px;
              line-height: 20px;
              font-size: 12px;
              color: #fff;
              border-radius: 6px;
              margin-top: 2px;
              box-shadow: 3px 3px 3px #cac9c7;
            }
            .location-link {
              background: #3497db;
            }
            .history-link {
              background: #e57d1c;
              margin-top: 10px;
            }
          }
        }
      }
      .right-parent {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1000;
        width: 240px;
        background: #fff;
        box-shadow: -5px 0 5px -5px #9e9e9e;
        .mu-select-field .mu-dropDown-menu {
          height: 20px !important;
        }
        .fog-title {
          height: 30px;
          line-height: 30px;
          background: #d4eeff;
          color: #0386e1;
          font-size: 14px;
          font-weight: 700;
          padding-left: 10px;
          position: relative;
          .target-field {
            position: absolute;
            top: 5px;
            right: 5px;
            background: #d4eeff;
            width: 80px !important;
            height: 24px;
            border-radius: 4px;
            font-size: 10px;
            min-height: 20px;
            .mu-dropDown-menu-icon {
              top: -4px;
            }
            .mu-dropDown-menu-text {
              height: 24px;
              line-height: 24px;
              margin-top: -4px;
              padding-left: 5px;
              color: #9f9f9f;
              font-weight: 500;
            }
          }
        }
        .fog-content {
          overflow: hidden;
          .fog-item {
            height: 60px;
            border-bottom: 1px dashed #dddddd;
            padding: 10px;
            cursor: pointer;
            &:last-child {
              border-bottom: 0;
            }
            &.active {
              background: #dfddde;
            }
            img {
              float: left;
              width: 30px;
            }
            .fog-content-right {
              margin-left: 40px;
              font-size: 11px;
              .tit {
                color: #bbbbbb;
              }
              .con {
                margin-left: 3px;
              }
              .location {
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
                white-space: nowrap;
              }
              .time {
                margin-top: 5px;
              }
            }
          }
        }
      }
    }
  }
}
@media (min-width: 1400px) {
  .fog-detection-wrap {
    .content {
      position: relative;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      .breadcrumb {
        margin: 0 !important;
      }
      .map-parent {
        position: relative;
        float: left;
        #map {
          width: 100%;
          height: 100%;
          .amap-info-content {
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            font-size: 12px;
            .map-item {
              height: 100%;
              .location-name {
                font-size: 14px;
                font-weight: 900;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
                white-space: nowrap;
              }
              .small-img {
                width: 207px;
                height: 130px;
                cursor: pointer;
                margin-top: 3px;
              }
              .line {
                margin-top: 3px;
                a {
                  font-size: 13px;
                  color: #3497db;
                }
              }
            }
          }
        }
        .map-layer {
          position: absolute;
          top: 10px;
          left: 15px;
          z-index: 500;
          .map-legend {
            float: left;
            background: #c8ebff;
            border-radius: 9px;
            box-shadow: 3px 3px 3px #cac9c7;
            ul {
              width: 115px;
              height: 70px;
              margin: 0;
              padding: 10px 0 10px 10px;
              li {
                list-style: none;
                float: left;
                margin-right: 3px;
                height: 100%;
                text-align: center;
                img {
                  width: 30px;
                }
                span {
                  display: block;
                  width: 100%;
                  font-size: 12px;
                  font-weight: 700;
                }
              }
            }
          }
          .map-link {
            float: left;
            width: 140px;
            margin-left: 10px;
            a {
              display: block;
              text-align: center;
              width: 100%;
              height: 30px;
              color: #fff;
              border-radius: 6px;
              padding-top: 4px;
              box-shadow: 3px 3px 3px #cac9c7;
            }
            .location-link {
              background: #3497db;
            }
            .history-link {
              background: #e57d1c;
              margin-top: 10px;
            }
          }
        }
      }
      .right-parent {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1000;
        width: 340px;
        background: #fff;
        box-shadow: -5px 0 5px -5px #9e9e9e;
        .mu-select-field .mu-dropDown-menu {
          height: 20px !important;
        }
        .fog-title {
          height: 40px;
          line-height: 40px;
          background: #d4eeff;
          color: #0386e1;
          font-size: 16px;
          font-weight: 700;
          padding-left: 10px;
          position: relative;
          .target-field {
            position: absolute;
            top: 5px;
            right: 5px;
            background: #d4eeff;
            width: 80px !important;
            height: 24px;
            border-radius: 4px;
            font-size: 12px;
            min-height: 24px;
            .mu-dropDown-menu-icon {
              top: -4px;
            }
            .mu-dropDown-menu-text {
              height: 24px;
              line-height: 24px;
              margin-top: -4px;
              padding-left: 5px;
              color: #9f9f9f;
              font-weight: 500;
            }
          }
        }
        .fog-content {
          overflow: hidden;
          .fog-item {
            height: 90px;
            border-bottom: 1px dashed #dddddd;
            padding: 20px 10px 20px 20px;
            cursor: pointer;
            &:last-child {
              border-bottom: 0;
            }
            &.active {
              background: #dfddde;
            }
            img {
              float: left;
              width: 50px;
            }
            .fog-content-right {
              margin-left: 65px;
              .tit {
                font-size: 11px;
                color: #bbbbbb;
              }
              .con {
                margin-left: 5px;
              }
              .location {
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
                white-space: nowrap;
              }
              .time {
                margin-top: 7px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
