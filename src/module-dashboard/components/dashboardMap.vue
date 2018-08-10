<template>
  <div id="fog-detection-wrap">
    <div class="map-parent">
      <div id="map"></div>
      <div class="map-layer">
        <div class="map-legend">
          <ul>
            <li>
              <img src="../../../static/images/map/big-fog.png">
              <span>正常</span>
            </li>
            <li>
              <img src="../../../static/images/map/mid-fog.png">
              <span>报警</span>
            </li>
            <li>
              <img src="../../../static/images/map/small-fog.png">
              <span>预警</span>
            </li>
          </ul>
        </div>
        <div class="map-link">
          <router-link class="location-link">监测设备设置
          </router-link>
          <router-link class="history-link">历史记录查询</router-link>
        </div>
      </div>
    </div>
    <div class="right-parent">
      <div class="fog-title">
        <span>监测情况提醒</span>
        <mu-select-field v-model="targetType" label="" class="target-field" :underlineShow="true" @change="changeFilter">
          <mu-menu-item value="4" title="全部" />
          <mu-menu-item value="3" title="正常" />
          <mu-menu-item value="2" title="预警" />
          <mu-menu-item value="1" title="报警" />
        </mu-select-field>
      </div>
      <div v-show="hasFogData" class="fog-content">
        <div v-for="(item,index) in listData" :key="item.id" class="fog-item" v-show="showContent(item)" :data-id="item.id" @click="listItemClick(item, index)">
          <img :src="'../../../static/images/map/' + icon[item.fogDegree] + '-list.png'">
          <div class="fog-content-right">
            <div class="location">
              <span class="tit">监控点位</span>
              <span class="con" :title="item.locationName">{{ item.locationName }}</span>
            </div>
            <div class="time">
              <span class="tit">更新时间</span>
              <span class="con">{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>
      <no-data-img v-show="!hasFogData" text="暂无数据"></no-data-img>
    </div>
  </div>
</template>


<script>
var map;
export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var map = new AMap.Map("map", {
        resizeEnable: true,
        center: [116.397428, 39.90923], //地图中心点
        zoom: 12 //地图显示的缩放级别
      });
      //添加构造器
      AMap.plugin(
        ["AMap.Driving", "AMap.Transfer", "AMap.Walking"],
        function() {
          map.addControl(new AMap.Driving());
          map.addControl(new AMap.Transfer());
          map.addControl(new AMap.Walking());
        }
      );
    }
  }
};
</script>
<style lang="scss" type="text/scss">
#map {
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
}
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
              margin-top: 5px;
            }
            .line {
              margin-top: 5px;
              a {
                font-size: 14px;
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
  .imap-clickable.label-city {
    width: 62px;
    height: 62px;
    text-align: center;
    background-color: #4aab68;
    opacity: 0.8;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    top: -28px;
    padding: 6px;
    .imap-label {
      top: 12px;
      width: 50px;
      border: none;
      background: transparent;
      b {
        display: block;
      }
    }
    &:hover {
      background-color: #e4393c;
    }
  }
  .label-marker-address {
    .imap-label {
      border: none;
      background-color: #fff;
      padding: 3px 5px;
      box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.4);
      .triangle-down {
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 6px solid #9a9894;
        position: absolute;
        bottom: -6px;
        left: 50%;
        i {
          width: 0;
          height: 0;
          border-left: 3px solid transparent;
          border-right: 3px solid transparent;
          border-top: 4px solid #fff;
          position: relative;
          top: -3px;
          left: -3px;
        }
      }
    }
  }
}
</style>