<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleDataBar" :isActive="sidebar.closed"></hamburger>

    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <!-- 站内搜索 -->
      <div class="item">
        <el-tooltip effect="dark" :content="$t('navbar.search')" placement="bottom">
          <el-button icon="el-icon-search" type="text" class="btnSearch" @click="handleBtnSearch"></el-button>
        </el-tooltip>
        <transition name="el-fade-in-linear">
          <el-autocomplete 
            ref="searchInput"
            v-model="searchVal"
            :fetch-suggestions="querySearchAsync" 
            @select="handleSelect" 
            @blur="showSearchInput = false"
            placeholder="站内搜索" 
            :trigger-on-focus="true"
            v-show="showSearchInput" ></el-autocomplete>
        </transition>
      </div>
      <!-- 使用文档 -->
      <a href="https://github.com/cobainby" class="item" target="_blank">
        <el-tooltip class="item" effect="dark" content="使用文档" placement="bottom"><i class="el-icon-question"></i></el-tooltip>
      </a>
      <!-- 错误 -->
      <error-log class="error item"></error-log>
      <!-- 全屏 -->
      <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
        <screenfull class="item"></screenfull>
      </el-tooltip>
      <!-- 多语言 -->
      <!-- <lang-select class="item"></lang-select> -->
      <!-- 换肤 -->
      <!-- <el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom">
        <theme-picker class="item"></theme-picker>
      </el-tooltip> -->
      <!-- 用户信息 -->
      <el-dropdown class="item">
        <span class="el-dropdown-link">
          <!-- <img class="avatar" src="../assets/bigUserHeader.png"> -->
          {{loginEname}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{$t('navbar.dashboard')}}
            </el-dropdown-item>
          </router-link>
          <a target='_blank' href="https://github.com/cobainby">
            <el-dropdown-item>
              {{$t('navbar.github')}}
            </el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import {mapGetters} from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import {search} from '@/api/base/menus'
import { detail } from "@/api/base/organ"
import { getToken } from "@/utils/auth"

export default {
  name: 'layoutNavBar',
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    LangSelect,
    ThemePicker
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar'])
  },
  data() {
    return {
      searchVal: '',
      loginEname: "",
      timeout: null,
      showSearchInput: false,
      restaurants: [],
      token: getToken()
    }
  },
  methods: {
    toggleDataBar() {
      this.$store.dispatch('toggleDataBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    handleBtnSearch() {
      this.showSearchInput = !this.showSearchInput
      this.$nextTick(() => {
        this.$refs['searchInput'].focus()
      })
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      this.searchVal = ''
      this.showSearchInput = false
      console.log(item)
      this.$message({
        message: `选取了 ${item.value}`,
        type: 'success'
      })
    }
  },
  mounted() {
    this.restaurants = search();
    //加载完后右上角显示当前登录人名字
    detail({ token: this.token }).then(res => {
      this.loginEname = res.data.accountName;
    });
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.navbar .item .el-input__inner {
  border: 0px;
  border-bottom: 1px solid #dcdfe6;
  border-radius: 0px;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@media (min-width: 640px) and (max-width: 1399px) {
  .navbar {
    height: 30px;
    line-height: 30px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 33px;
      height: 30px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container {
      float: left;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .right-menu {
      float: right;
      height: 30px;
      .item {
        display: inline-block;
        margin: -10px 5px 0 0;
        i {
          font-size: 15px;
        }
        .btnSearch {
          margin-right: 5px;
          font-size: 15px;
          color: rgba(0, 0, 0, 0.65);
        }
        .avatar {
          width: 20px;
          vertical-align: -5px;
        }
      }
    }
  }
}
@media (min-width: 1400px) {
  .navbar {
    height: 40px;
    line-height: 40px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 48px;
      height: 40px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container {
      float: left;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .right-menu {
      float: right;
      height: 40px;
      .item {
        display: inline-block;
        margin-right: 10px;
        i {
          font-size: 18px;
        }
        .btnSearch {
          margin-right: 5px;
          font-size: 18px;
          color: rgba(0, 0, 0, 0.65);
        }
        .avatar {
          width: 22px;
          vertical-align: -5px;
        }
      }
    }
  }
}
</style>
