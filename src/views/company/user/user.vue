<template>
<div>
  <el-row class="row selectrow">
    <el-col :span="6">
      <el-button-group>
        <el-tooltip class="item" effect="light" content="锁定选中用户" placement="bottom">
          <el-button type="primary" icon="el-icon-lock" @click="lock()" size=small round>锁定</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="解锁选中用户" placement="bottom">
          <el-button type="primary" icon="el-icon-unlock" @click="nonelock()" size=small round>解锁</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="删除选中用户" placement="bottom">
          <el-button type="primary" icon="el-icon-document-remove" @click="remove()" size=small round>删除</el-button>
        </el-tooltip>
      </el-button-group>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-table :data="tableData" :height="autoheight" @selection-change="onTableSelectChange">
        <el-table-column type="selection" min-width=10%>
        </el-table-column>
        <el-table-column prop="name" label="姓名" min-width=20%> </el-table-column>
        <el-table-column prop="account" label="账户" min-width=15%> </el-table-column>
        <el-table-column prop="code" label="工号" min-width=15%> </el-table-column>
        <el-table-column prop="isLockName" label="是否锁定" min-width=10%> </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width=10%> </el-table-column>
        <el-table-column label="操作" min-width=20%>
          <template slot-scope="scope">
            <el-popover placement="right" width="200" trigger="click">
              <h3 style="color: #909399;">配置角色</h3>
              <el-table :data="userData">
                <el-table-column prop="inRole" width="100">
                  <template slot-scope="scopeUser">
                    <el-switch v-model="scopeUser.row.inUser" @change="(value) => inUserChange(value,scope.row,scopeUser.row)">
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="名称" width="100">
                </el-table-column>
              </el-table>
              <el-button slot="reference" type="primary" icon="el-icon-user" size="mini" circle @click="getRoleList(scope.row)"></el-button>
            </el-popover>
            <el-button style="margin-left: 10px;" slot="reference" type="warning" icon="el-icon-edit-outline" size="mini" round @click="rebackPassword(scope.row)">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[20, 50, 100, 500]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalRowCount">
      </el-pagination>
    </el-col>
  </el-row>
</div>
</template>


<script>
export default {
  name: 'user',
  data() {
    var name = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else if (value.length > 100) {
        return callback(new Error('长度不能超过100'));
      } else {
        callback();
      }
    };
    return {
      pageSize: 20,
      pageIndex: 1,
      totalRowCount: 0,
      tableData: [],
      userData: [],
      name: "",
      code: "",
      info: false,
      dialogVisible: false,
      checkboxGroup: [],
      rules: {
        name: [{
          validator: name,
          trigger: 'blur'
        }],
      },
    }
  },
  props: {
    companyId: {
      type: String,
      required: true,
      default: ""
    }
  },
  created() {
    this.autoheight = window.innerHeight * 0.605
    this.getList()
  },
  updated() {
    console.log(this.companyId)
  },
  methods: {
    getList() {
      this.$api.user.getList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        name: this.name,
        companyId: this.companyId,
      }).then(res => {
        this.tableData = res.data.rs.list
        this.totalRowCount = res.data.rs.totalRowCount
      })
    },
    getRoleList(row) {
      this.$api.user.getRoleList({
        "userId": row.id
      }).then(res => {
        let arr = res.data.rs
        arr.forEach((item, index) => {
          if (item.type == 1) {
            item.typeName = "接口"
          } else if (item.type == 2) {
            item.typeName = "菜单"
          } else if (item.type == 3) {
            item.typeName = "按钮"
          }

          if (item.user == 1) {
            item.userName = "本公司权限"
          } else if (item.user == 2) {
            item.userName = "科室权限"
          }
          if (item.isEnable) {
            item.isEnableName = "启用"
          } else {
            item.isEnableName = "未启用"
          }
        })
        this.userData = arr
      })
    },
    inUserChange(value, row, rowUser) {
      console.log(row, rowUser)
      let body = {
        id: row.id,
        roleId: rowUser.id,
        roleFlag: value,
      }
      this.$api.user.addRoleToUser(body).then(res => {
        if (res.data.s == 0) {
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          });
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.getList()
    },
    onTableSelectChange(row) {
      let idarr = []
      for (let item of row) {
        idarr.push(item.id)
      }
      this.idarr = idarr
    },
    remove() {
      let newArr = JSON.parse(JSON.stringify(this.idarr))
      this.$api.user.delete({
          data: newArr
        })
        .then(res => {
          if (res.data.s == "0") {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            this.getList()
          }
        })
    },
    lock() {
      let newArr = JSON.parse(JSON.stringify(this.idarr))
      this.$api.user.lock(newArr)
        .then(res => {
          if (res.data.s == "0") {
            this.$message({
              showClose: true,
              message: '锁定成功',
              type: 'success'
            });
            this.getList()
          }
        })
    },
    nonelock() {
      let newArr = JSON.parse(JSON.stringify(this.idarr))
      this.$api.user.nonelock(newArr)
        .then(res => {
          if (res.data.s == "0") {
            this.$message({
              showClose: true,
              message: '解锁成功',
              type: 'success'
            });
            this.getList()
          }
        })
    },
    rebackPassword(row) {
      this.$api.user.rebackPassword({
        "id": row.id
      }).then(res => {
        if (res.data.s == "0") {
          this.$message({
            showClose: true,
            message: '重置成功',
            type: 'success'
          });
          this.getList()
        }
      })
    }
  }
}
</script>

<style>
.el-table .cell {
  white-space: pre-line;
}

.row {
  margin-bottom: 10px;
}

.input {
  width: 100%;
}

.td1 {
  width: 20%;
}

.td2 {
  width: 80%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.selectlable {
  font-size: 16px;
  color: #909399;
  font-weight: bold;
}

.selectrow {
  vertical-align: middle;
  line-height: 40px;
}

.table-col-label-analy {
  color: #909399;
}

.print-result {
  font-size: 16px;
  color: #909399;
  font-weight: bold;
}

.el-tabs--top {
  height: auto !important;
}
</style>
