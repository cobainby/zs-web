<template>
  <div class="add-form">
    <el-dialog
      width="50%"
      :title="text+pageTitle"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :rules="ruleInline"
        ref="dataForm"
        :model="formBase"
        label-position="right"
        label-width="120px"
        style=' margin-left:120px;'
      >
        <el-row>
          <el-col :span="24">
        <div class="dialog-content">
          <div class="clearfix">
            <div class="left-form">
              <div
                class="form-group"
                style="display:none"
              >
                <label class="control-label">工程地址</label>
                <input
                  type="text"
                  id="tipinput"
                  class="form-control"
                  v-model="addData.rtmp"
                  placeholder="工程地址"
                  autocomplete="off"
                >
              </div>
              <div class="form-group">
                <label class="control-label">经纬度</label>
                <input
                  type="text"
                  class="form-control half"
                  v-model="addData.lng"
                  placeholder="经度"
                  autocomplete="off"
                  style="margin-right: 30px"
                >
                <input
                  type="text"
                  class="form-control half"
                  v-model="addData.lat"
                  placeholder="纬度"
                  autocomplete="off"
                >
              </div>
            </div>
            <div class="right-map">
              <div class="map-parent">
                <div id="map"></div>
              </div>
              <div>按住左键拖动地图上红色标注到相应位置，即可完成经纬度标注，并自动获取该地址</div>
            </div>
          </div>
        </div>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose">{{$t('table.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="createData"
        >{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { detail, update, add } from "@/api/base/users";
import shajs from "sha.js";

export default {
  name: "usersAdd",
  props: [
    "text",
    "pageTitle",
    "PermissionGroupsList",
    "formBase",
    "ruleInline"
  ],
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      data: generateData(),
      addData: {
        location_id: "", // 以萨卡口编号
        loc_id: "", // 厂商卡口编号
        text: "", // 点位名称
        lng: "", // 经度
        lat: "", // 纬度
        rtmp: "" // rtmp地址或rtsp地址
      },
      value1: [1, 4],
      dialogFormVisible: false,
      fileList: [],
      handleChange: [],
      beforeAvatarUpload: []
    };
  },
  computed: {},
  methods: {
    // 弹层显示
    dialogFormV() {
      this.dialogFormVisible = true;
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false;
    },
    // 退出
    handleClose() {
      this.$emit("handleCloseModal");
    },

    // 表单提交
    createData() {
      this.$emit("handleCloseModal");
      // this.formBase.password = shajs('sha256').update(this.formBase.password).digest('hex')
      if (this.formBase.password === "") {
        delete this.formBase.password;
      }
      let data = {
        ...this.formBase
      };
      if (this.formBase.id) {
        update(data).then(() => {
          this.$emit("newDataes", this.formBase);
        });
      } else {
        add(this.formBase).then(() => {
          this.$emit("newDataes", this.formBase);
        });
      }
    }
  },
  // 挂载结束

  mounted: function() {},
  // 创建完毕状态
  created() {},
  // 组件更新
  updated: function() {}
};
</script>
<style scoped>
</style>
