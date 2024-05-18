<template>
  <el-row style="margin-left: 1%;">
    <el-col :span="24">
      <el-table :data="tableInStorageOrderData" style="width: 100%;" v-if="expandType=='inStorageByOrder'"
                row-class-name="expandtablebodyIn" highlight-current-row
                header-row-class-name="expandtableheaderIn">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <expandRow :inStorage="scope.row" :expandType="scope.row.expandType" :selectInCode="selectInCode" :selectOutCode="selectOutCode" :selectInStarttime="selectInStarttime" :selectInEndtime="selectInEndtime" :selectOutStarttime="selectOutStarttime" :selectOutEndtime="selectOutEndtime"></expandRow>
          </template>
        </el-table-column>
        <el-table-column label="编号" prop="code"></el-table-column>
        <el-table-column label="入库科室名称" prop="customerName"></el-table-column>
        <el-table-column label="图片" prop="image">
          <template slot-scope="scope">
            <div style="width:15%;height:15%;">
              <el-image :src="scope.row.image" fit=contain :preview-src-list="[scope.row.image]">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="订单号" prop="poNum"></el-table-column>
        <el-table-column label="品名" prop="item" ></el-table-column>
        <el-table-column label="部件" prop="part"  width="300"></el-table-column>
        <el-table-column label="订单镀金颜色" prop="orderColor" width="500"></el-table-column>
        <el-table-column label="烤厅" prop="bake"> </el-table-column>
        <el-table-column label="来料类别" prop="incomingType"></el-table-column>
<!--        <el-table-column label="不良原因" prop="badReason"></el-table-column>-->
        <el-table-column label="返镀原因" prop="incomingReason"></el-table-column>
        <el-table-column label="总订单量" prop="count"> </el-table-column>
        <el-table-column label="组件数" prop="bunchCount"></el-table-column>
        <el-table-column label="数量说明" prop="inCount"></el-table-column>
<!--        <el-table-column label="单位" prop="unit"></el-table-column>-->
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
      </el-table>

      <el-table :data="tableOutStoragesData" style="width: 100%;" v-if="expandType=='outStoragesByInStorage'"
                row-class-name="expandtablebodyOut" highlight-current-row header-row-class-name="expandtableheaderOut">
        <el-table-column label="编号" prop="code"></el-table-column>
        <el-table-column label="科室名称" prop="customerName"></el-table-column>
        <el-table-column label="图片" prop="image">
          <template slot-scope="scope">
            <div style="width:15%;height:15%;">
              <el-image :src="scope.row.image" fit=contain :preview-src-list="[scope.row.image]">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="品名" prop="item"></el-table-column>
        <el-table-column label="订单号" prop="poNum"></el-table-column>
        <el-table-column label="部件" prop="part" width="400"></el-table-column>
        <el-table-column label="镀金颜色" prop="color" width="600"></el-table-column>
        <el-table-column label="考厅" prop="bake"></el-table-column>
        <el-table-column label="总订单量" prop="count"></el-table-column>
        <el-table-column label="入库数量" prop="inCount"></el-table-column>
        <el-table-column label="出库类型" prop="outType"></el-table-column>
        <el-table-column label="出库组件数" prop="bunchCount"></el-table-column>
        <el-table-column label="出库数量说明" prop="outCount"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
      </el-table>

      <el-table :data="tableOutStorageData" style="width: 100%;" v-else-if="expandType=='outStorageByInStorage'"
                row-class-name="expandtablebodyOut" highlight-current-row header-row-class-name="expandtableheaderOut">
        <el-table-column label="编号" prop="code"></el-table-column>
        <el-table-column label="科室名称" prop="customerName"></el-table-column>
        <el-table-column label="图片" prop="image">
          <template slot-scope="scope">
            <div style="width:15%;height:15%;">
              <el-image :src="scope.row.image" fit=contain :preview-src-list="[scope.row.image]">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="品名" prop="item"></el-table-column>
        <el-table-column label="订单号" prop="poNum"></el-table-column>
        <el-table-column label="部件" prop="part" width="400"></el-table-column>
        <el-table-column label="镀金颜色" prop="color" width="600"></el-table-column>
        <el-table-column label="考厅" prop="bake"></el-table-column>
        <el-table-column label="总订单量" prop="count"></el-table-column>
        <el-table-column label="入库数量" prop="inCount"></el-table-column>
        <el-table-column label="出库类型" prop="outType"></el-table-column>
        <el-table-column label="出库组件数" prop="bunchCount"></el-table-column>
        <el-table-column label="出库数量说明" prop="outCount"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'

export default {
  name: 'expandRow',
  data() {
    return {
      tableInStorageOrderData: [],
      tableOutStoragesData: [],
      tableOutStorageData: [],
    }
  },
  props: {
    order: {},
    inStorage: {},
    expandType: {},
    selectInCode: {},
    selectOutCode: {},
    selectInStarttime: {},
    selectInEndtime: {},
    selectOutStarttime: {},
    selectOutEndtime: {},
  },
  created() {
    if (this.expandType == "inStorageByOrder") {
      this.getInStorageListByOrder()
    } else if (this.expandType == "outStoragesByInStorage") {
      this.getOutStorageListByInStorage()
    } else if (this.expandType == "outStorageByInStorage") {
      this.getOutStorageByInStorage()
    }
  },
  computed: {},
  methods: {
    getInStorageListByOrder() {
      this.$api.order.getInStorageListByOrder({
        orderId: this.order.id,
        inCode: this.selectInCode,
        inStarttime: this.selectInStarttime,
        inEndtime: this.selectInEndtime,
        outCode: this.selectOutCode,
        outStarttime: this.selectOutStarttime,
        outEndtime: this.selectOutEndtime,
      }).then(res => {
        if (res.data.s == 0) {
          console.log(res.data)
          this.tableInStorageOrderData = res.data.rs
        } else {
          this.$message({
            showClose: true,
            message: res.data.rs,
            type: 'error'
          });
        }
      })
          .catch(function (error) {
            console.log(error)
          })
    },
    getOutStorageListByInStorage() {
      console.log(this.inStorage.id,"1111")
      this.$api.order.getOutStorageListByInStorage({
        inStorageId: this.inStorage.id,
        outCode: this.selectOutCode,
        outStarttime: this.selectOutStarttime,
        outEndtime: this.selectOutEndtime,
      }).then(res => {
        if (res.data.s == 0) {
          console.log("res", res)
          this.tableOutStoragesData = res.data.rs
        } else {
          this.$message({
            showClose: true,
            message: res.data.rs,
            type: 'error'
          });
        }
      })
          .catch(function (error) {
            console.log(error)
          })
    },
    getOutStorageByInStorage() {
      this.$api.order.getOutStorageByInStorage({
        outStorageId: this.inStorage.outStorageId,
        outCode: this.selectOutCode,
        outStarttime: this.selectOutStarttime,
        outEndtime: this.selectOutEndtime,
      }).then(res => {
        if (res.data.s == 0) {
          this.tableOutStorageData = res.data.rs
        } else {
          this.$message({
            showClose: true,
            message: res.data.rs,
            type: 'error'
          });
        }
      })
          .catch(function (error) {
            console.log(error)
          })
    }
  }
}
</script>
<style>
.expandtableheaderIn th {
  padding: 1px 1px !important;
  background-color: #87cefa !important;
}

.expandtablebodyIn td {
  padding: 1px 1px !important;
  background-color: #87cefa;
}

.expandtableheaderOut th {
  padding: 1px 1px !important;
  background-color: #fafad2 !important;
}

.expandtablebodyOut td {
  padding: 1px 1px !important;
  background-color: #fafad2;
}

.el-table .el-table__cell {
  padding: 0px;
}

</style>
