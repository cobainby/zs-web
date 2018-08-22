<template>
  <div class="add-form">
    <el-dialog :title="text+pageTitle" :visible.sync="dialogFormVisible">
      <el-form 
        :rules="ruleInline" 
        ref="dataForm" 
        :model="formBase" 
        label-position="right" 
        label-width="120px" 
        style='width: 400px; margin-left:120px;'
        >
        <el-form-item label="工程名称" prop="username">
          <el-input v-model="formBase.username"></el-input>
        </el-form-item>
        <el-form-item label="工程地址" prop="password" v-if="formBase.password!=undefined">
          <el-input v-model="formBase.password"></el-input>
        </el-form-item>
        <el-form-item label="工程类别" prop="email">
          <el-input v-model="formBase.email"></el-input>
        </el-form-item>
        <el-form-item label="建设单位" prop="permission_group_id">
          <el-select class="filter-item" v-model="formBase.permission_group_id">
            <el-option v-for="item in PermissionGroupsList" :value="item.id" :key="item.key" :label="item.title">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="监督机构" prop="phone">
          <el-input v-model="formBase.phone"></el-input>
        </el-form-item>
        <!-- 头像上传下一个版本再做 -->
        <el-form-item label="监测平面图上传" prop="avatar">
            <el-upload
              class="upload-demo"
              :action="importFileUrl"
              :on-change="handleChange"
              :file-list="fileList" accept="image/jpeg,image/gif,image/png,image/bmp" 
              :before-upload="beforeAvatarUpload">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item> 
        <el-form-item label="监督机构">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="formBase.introduction">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {detail, update, add} from '@/api/base/users'
import shajs from 'sha.js'

export default {
  name: 'usersAdd',
  props: [
    'text',
    'pageTitle',
    'PermissionGroupsList',
    'formBase',
    'ruleInline'
  ],
  data() {
    return {
      dialogFormVisible: false
      // fileList: [],
      // importFileUrl: 'https://jsonplaceholder.typicode.com/posts/',
    }
  },
  computed: {},
  methods: {
    // 弹层显示
    dialogFormV() {
      this.dialogFormVisible = true
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false
    },
    // 退出
    handleClose() {
      this.$emit('handleCloseModal')
    },

    // 表单提交
    createData() {
          this.$emit('handleCloseModal')
          // this.formBase.password = shajs('sha256').update(this.formBase.password).digest('hex')
          if (this.formBase.password === '') {
            delete this.formBase.password
          }
          let data = {
            ...this.formBase
          }
          if (this.formBase.id) {
            update(data).then(() => {
              this.$emit('newDataes', this.formBase)
            })
          } else {
            add(this.formBase).then(() => {
              this.$emit('newDataes', this.formBase)
            })
          }
    }
  },
  // 挂载结束

  mounted: function() {},
  // 创建完毕状态
  created() {},
  // 组件更新
  updated: function() {}
}
</script>
<style scoped>
</style>
