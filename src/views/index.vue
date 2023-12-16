<template>
<div id="app">
  <el-alert title="网络异常" type="error" description="网络请求未能成功发出，请检查本地电脑网络情况，检查是否使用代理。" show-icon v-if="this.alertShow" @close="alertClose">
  </el-alert>
  <el-container class="body" direction="vertical">
    <el-header class="title" :style="{height: this.headerHeight1,lineHeight:this.headerHeight1}">青岛韩美来工艺品有限公司 </el-header>
    <el-header class="s-title" :style="{height: this.headerHeight2,lineHeight:this.headerHeight2}">
      <div style="float: right;width:6%;">
        <span class="s-title-span">{{this.username}}</span>
        <el-dropdown class="s-title-dropdown" type="primary" @command="dropdownCommand">
          <el-button type="info" size="mini" icon="el-icon-user-solid" circle></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="edit">完善个人信息</el-dropdown-item>
            <el-dropdown-item command="password">修改密码</el-dropdown-item>
            <el-dropdown-item command="checkout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container style="margin-top: 0.3%;" direction="horizontal">
      <el-aside width=10% class="self-menu" :style="{height:this.meunHeight}">
        <el-menu class="menu" :default-active="activeIndex" router background-color="#f1f2f3" text-color="#515365" active-background-color="#fff" active-text-color="#409EFF" @select="menuSelect">
          <el-menu-item ref="meunItemHome" v-if="this.authorities.indexOf('M-4') != -1" index="/">
            <div @mouseenter="menuItemEnter($event,'meunItemHome')" @mouseleave="menuItemLeave($event,'meunItemHome')">
              <i class="el-icon-s-home"></i><span class="self-menu-item">首页</span>
            </div>
          </el-menu-item>
          <el-menu-item ref="meunItemOrder" v-if="this.authorities.indexOf('M-1') != -1" index="/order">
            <div @mouseenter="menuItemEnter($event,'meunItemOrder')" @mouseleave="menuItemLeave($event,'meunItemOrder')">
              <i class="el-icon-s-order"></i><span class="self-menu-item">订单管理</span>
            </div>
          </el-menu-item>
          <el-menu-item ref="meunItemIn" v-if="this.authorities.indexOf('M-2') != -1" index="/inStorage">
            <div @mouseenter="menuItemEnter($event,'meunItemIn')" @mouseleave="menuItemLeave($event,'meunItemIn')">
              <i class="el-icon-caret-bottom"></i><span class="self-menu-item">入库管理</span>
            </div>
          </el-menu-item>
          <el-menu-item ref="meunItemOut" v-if="this.authorities.indexOf('M-3') != -1" index="/outStorage">
            <div @mouseenter="menuItemEnter($event,'meunItemOut')" @mouseleave="menuItemLeave($event,'meunItemOut')">
              <i class="el-icon-caret-top"></i><span class="self-menu-item">出库管理</span>
            </div>
          </el-menu-item>
          <el-menu-item ref="meunItemCustomer" v-if="this.authorities.indexOf('M-6') != -1" index="/company">
            <div @mouseenter="menuItemEnter($event,'meunItemCustomer')" @mouseleave="menuItemLeave($event,'meunItemCustomer')">
              <i class="el-icon-s-custom"></i><span class="self-menu-item">客户公司</span>
            </div>
          </el-menu-item>
          <el-menu-item ref="meunItemDict" v-if="this.authorities.indexOf('M-5') != -1" index="/dict">
            <div @mouseenter="menuItemEnter($event,'meunItemDict')" @mouseleave="menuItemLeave($event,'meunItemDict')">
              <i class="el-icon-s-grid"></i><span class="self-menu-item">字典管理</span>
            </div>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main-body" :style="{height:this.meunHeight}">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <!-- 完善个人信息 -->
  <el-dialog title="完善个人信息" :visible.sync="userInfoDialogFormVisible" width="40%">
    <el-form ref="userInfoForm" :model="userInfoForm" label-width="10%" :rules="userInfoRules" style="padding: 0% 10%;">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userInfoForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="编号">
        <el-input v-model="userInfoForm.account" autocomplete="off" disabled></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="userInfoDialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitUserInfoForm()">确 定</el-button>
    </div>
  </el-dialog>

  <!-- 修改密码 -->
  <el-dialog title="修改密码" :visible.sync="passwordDialogFormVisible" width="40%">
    <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" label-width="15%" style="padding: 0% 10%;">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="passwordForm.oldPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword1">
        <el-input v-model="passwordForm.newPassword1" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="newPassword2">
        <el-input v-model="passwordForm.newPassword2" type="password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="passwordDialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitPasswordForm()">确 定</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Index',
  data() {
    var username = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var oldPassword = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var newPassword1 = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var newPassword2 = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    return {
      activeIndex: "/",
      autoheight: 0,
      authorities: [],
      userInfoDialogFormVisible: false,
      passwordDialogFormVisible: false,
      username: "",
      userInfoForm: {
        username: "",
        account: ""
      },
      passwordForm: {
        oldPassword: "",
        newPassword1: "",
        newPassword2: "",
      },
      userInfoRules: {
        username: [{
          validator: username,
          trigger: 'blur'
        }],
      },
      passwordRules: {
        oldPassword: [{
          validator: oldPassword,
          trigger: 'blur'
        }],
        newPassword1: [{
          validator: newPassword1,
          trigger: 'blur'
        }],
        newPassword2: [{
          validator: newPassword2,
          trigger: 'blur'
        }],
      },
    }
  },
  created() {
    this.autoheight = window.innerHeight * 0.72
    this.$api.login.tokenVail().then(res => {
      if (res.data.s != 0) {
        this.$route.replace('/login')
      } else {
        localStorage.setItem("account", res.data.rs.account)
        localStorage.setItem("username", res.data.rs.username)
        localStorage.setItem("userId", res.data.rs.userId)
        this.$store.commit('authorities', res.data.rs.authorities);
        this.authorities = res.data.rs.authorities
        this.username = res.data.rs.username
        this.userInfoForm.username = res.data.rs.username
        this.userInfoForm.account = res.data.rs.account
      }
    })
  },
  computed: {
    headerHeight1: function() {
      return (window.innerHeight * 0.05) + 'px'; //自定义高度需求
    },
    headerHeight2: function() {
      return (window.innerHeight * 0.05) + 'px'; //自定义高度需求
    },
    meunHeight: function() {
      return (window.innerHeight * 0.89) + 'px'; //自定义高度需求
    },
    alertShow: function() {
      return this.$store.state.netWorkBroke
    }
  },
  mounted(){
    this.activeIndex = sessionStorage.getItem('keyPath') || '/'
  },
  methods: {
    alertClose() {
      this.$store.commit('changeNetwork', false)
    },
    dropdownCommand(command) {
      if (command == "edit") {
        this.userInfoDialogFormVisible = true
      } else if (command == "password") {
        this.passwordDialogFormVisible = true
      } else if (command == "checkout") {
        localStorage.removeItem("token")
        localStorage.removeItem("account")
        localStorage.removeItem("username")
        localStorage.removeItem("userId")
        this.$router.push("/login")
      }
    },
    submitUserInfoForm() {
      this.$refs['userInfoForm'].validate((valid) => {
        if (valid) {
          let body = {
            id: localStorage.getItem("userId"),
            name: this.userInfoForm.username
          }
          this.$api.user.update(body).then(res => {
            if (res.data.s == 0) {
              this.userInfoDialogFormVisible = false
            }
          })
        }
      })
    },
    submitPasswordForm() {
      this.$refs['passwordForm'].validate((valid) => {
        if (valid) {
          if (this.passwordForm.newPassword1 != this.passwordForm.newPassword2) {
            this.$message({
              showClose: true,
              message: '两次输入的密码不一致',
              type: 'error'
            });
            return
          }
          let body = {
            id: localStorage.getItem("userId"),
            password: this.passwordForm.oldPassword,
            newPassword: this.passwordForm.newPassword1
          }
          this.$api.user.newPassword(body).then(res => {
            if (res.data.s == 0) {
              this.passwordDialogFormVisible = false
              localStorage.removeItem("token")
              localStorage.removeItem("account")
              localStorage.removeItem("username")
              localStorage.removeItem("userId")
              this.$router.push("/login")
            } else {
              this.$message({
                showClose: true,
                message: res.data.rs,
                type: 'error'
              });
            }
          })
        }
      })
    },
    menuItemEnter(event, id) {
      this.$refs[id].$el.style.cssText = "background-color: #bfc9d4;border-radius: 10px;box-shadow: 0px 0px 8px #ccc;"
    },
    menuItemLeave(event, id) {
      this.$refs[id].$el.style.cssText = ""
    },
    menuSelect(keyPath){
      sessionStorage.setItem("keyPath",keyPath)
    }
  }
}
</script>

<style scoped>
.nav {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font: bold 40px/60px arial, sans-serif;
}

.menu {
  border-right: solid 0px #e6e6e6;
}

.body {
  background-color: #f1f2f3;
}

.content {
  float: left;
  width: 92%;
}

.title {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font: bold 20px arial, sans-serif;
  color: #fff;
  background-color: #0b1a46;
}

.s-title {
  box-shadow: 0px 0px 8px #bbb;
}

.s-title-span {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font: bold 12px arial, sans-serif;
  color: #aaa;
  margin-right: 10%;
}

.s-title-dropdown {
  font-size: 20px;
}

.self-menu-item {
  text-align: center;
  width: 30%;
  padding: 0% 10%;
}

.self-menu {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font: bold 16px arial, sans-serif;
  background-color: #f1f2f3;
  border-right: solid 1px #e6e6e6;
}

.main-body {
  padding: 0.8% 0.8%;
  background-color: #f1f2f3;
}

.user-i {
  border-right: solid 1px #e6e6e6;
}

.is-active {
  background-color: #fff !important;
  width: 90%;
  height: 90%;
  margin: 5% 5%;
  border-radius: 10px;
  box-shadow: 0px 0px 8px #ccc;
}
.el-menu-item{
  margin: 5% 5%;
}
</style>
