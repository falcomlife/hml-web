<template>
<div>
  <el-row class="row selectrow">
    <el-col :span="6">
      <el-button-group>
        <el-tooltip class="item" effect="light" content="新建角色" placement="bottom">
          <el-button type="primary" icon="el-icon-document-add" @click="dialogVisible=true" size=small round>新增</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="删除" placement="bottom">
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
        <el-table-column prop="name" label="名称" min-width=40%> </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width=40%> </el-table-column>
        <el-table-column label="操作" min-width=10%>
          <template slot-scope="scope">
            <el-tooltip class="item" style="margin-right: 10px;" effect="light" content="修改" placement="bottom">
              <el-button type="primary" icon="el-icon-edit-outline" size="mini" circle @click="updateShow(scope.row)"></el-button>
            </el-tooltip>
            <el-popover placement="right" trigger="click">
              <h3 style="color: #909399;">配置权限</h3>
              <el-table :data="authorityData" style="height:600px; overflow-y: scroll;">
                <el-table-column prop="inRole" width="60">
                  <template slot-scope="scopeRole">
                    <el-switch v-model="scopeRole.row.inRole" @change="(value) => inRoleChange(value,scope.row,scopeRole.row)">
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="名称" width="100">
                </el-table-column>
                <el-table-column prop="typeName" label="类型" width="100">
                </el-table-column>
                <el-table-column prop="code" label="编码" width="100">
                </el-table-column>
                <el-table-column prop="userName" label="使用者" width="100">
                </el-table-column>
                <el-table-column prop="isEnableName" label="是否启用" width="100">
                </el-table-column>
              </el-table>
              <el-button slot="reference" type="primary" icon="el-icon-key" size="mini" circle @click="getAuthorityList(scope.row)"></el-button>
            </el-popover>
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

  <el-dialog title="新建" :visible.sync="dialogVisible" width="50%">
    <el-form ref="formout" :rules="rules" :model="formout" size="small">
      <el-form-item required label="名称" prop="name">
        <el-input v-model="formout.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('formout')">重置</el-button>
        <el-button type="primary" @click="submitForm()">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!-- 修改角色信息 -->
  <el-dialog title="修改角色信息" :visible.sync="roleDialogFormVisible" width="40%">
    <el-form ref="userInfoForm" :model="roleForm" label-width="15%" :rules="rules" style="padding: 0% 2%;">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleForm.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="roleDialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitRoleForm()">确 定</el-button>
    </div>
  </el-dialog>

</div>
</template>


<script>
export default {
  name: 'role',
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
      authorityData: [],
      name: "",
      code: "",
      info: false,
      dialogVisible: false,
      roleDialogFormVisible: false,
      formout: {
        name: "",
        companyId: ""
      },
      roleForm: {
        name: ""
      },
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
  computed: {
    scrollerHeight: function() {
      return (window.innerHeight - 150) + 'px'; //自定义高度需求
    }
  },
  methods: {
    getList() {
      this.$api.role.getList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        name: this.name,
        companyId: this.companyId,
      }).then(res => {
        this.tableData = res.data.rs.list
        this.totalRowCount = res.data.rs.totalRowCount
      })
    },
    getAuthorityList(row) {
      this.$api.authority.getAll({
        "roleId": row.id
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
        this.authorityData = arr
      })
    },
    submitForm() {
      this.$refs['formout'].validate((valid) => {
        if (valid) {
          this.formout.companyId = this.companyId
          this.$api.role.save(this.formout)
            .then(res => {
              if (res.data.s == "0") {
                this.$message({
                  showClose: true,
                  message: '创建成功',
                  type: 'success'
                });
                this.getList()
              }
              this.$refs['formout'].resetFields();
            })
        }
      })
    },
    inRoleChange(value,row,rowRole){
      console.log(row,rowRole)
      let body={
        id: row.id,
        authorityId: rowRole.id,
        authorityFlag: value,
      }
      this.$api.role.addAuthorityToRole(body).then(res => {
        if(res.data.s == 0){
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
      this.$api.role.delete({
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
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    editAuthority(row) {
      console.log(row)
    },
    updateShow(row){
      this.roleForm = row
      this.roleDialogFormVisible = true
    },
    submitRoleForm(){
      this.$api.role.update(this.roleForm).then(res=>{
        if(res.data.s == 0){
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          this.roleDialogFormVisible = false
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
</style>
