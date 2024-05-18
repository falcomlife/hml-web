<template>
<div class="content-body">
  <el-row class="row">
    <el-col :span="24">
      <!-- 新建 -->
      <el-drawer :visible.sync="draweradd" :with-header="false" size='50%'>
        <div style="padding: 2% 3%;">
          <el-tabs>
            <el-tab-pane label="新增入库" style="margin-top:4%;padding: 0% 5%;overflow-y: scroll;" :style="{height: scrollerHeight}">
              <el-form ref="formout" :rules="rules" :model="formout" size="small">
                <el-card>
                  <i class="el-icon-s-order drawer-hard">订单信息</i>
                  <el-divider> </el-divider>
                  <el-form-item :required=true label="订单编号" prop="orderId">
                    <el-select v-model="formout.orderId" filterable remote reserve-keyword placeholder="请输入订单编号" :remote-method="getOrderByCode" :loading="orderLoading" @change="orderCodeChange">
                      <el-option v-for="item in orderOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="科室名称" prop="customerName">
                    <el-select v-model="formout.customerName" filterable placeholder="请选择" disabled>
                      <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="订单号" prop="poNum">
                    <el-input npm v-model="formout.poNum" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="品名" prop="item">
                    <el-input v-model="formout.item" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="部件" prop="part">
                    <el-input v-model="formout.part" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="订单镀金颜色" prop="orderColor">
                    <el-select v-model="formout.orderColor" filterable placeholder="请选择" disabled>
                      <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item :required=true label="烤厅" prop="bake">
                    <el-select v-model="formout.bake" filterable placeholder="请选择" disabled>
                      <el-option v-for="item in bakeOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="总订单量" prop="count">
                    <el-input v-model="formout.count" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="订单组件数" prop="partSumCount">
                    <el-input v-model="formout.partSumCount" disabled></el-input>
                  </el-form-item>
                </el-card>
                <el-card style="margin-top:3%;">
                  <i class="el-icon-s-claim drawer-hard">入库信息</i>
                  <el-divider> </el-divider>
<!--                  <el-form-item :required=true label="品名" prop="name">-->
<!--                    <el-input v-model="formout.name"></el-input>-->
<!--                  </el-form-item>-->
                  <el-form-item :required=true label="产品图片" prop="image">
                    <el-upload class="avatar-uploader" :action="avatarUrl" :show-file-list="false" :on-success="handleAddSuccess" :before-upload="beforeAddUpload">
                      <img v-if="formout.image" :src="formout.image" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
<!--                  <el-form-item :required=true label="入库镀金颜色" prop="color">-->
<!--                    <el-select v-model="formout.color" filterable placeholder="请选择">-->
<!--                      <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName" :value="item.id">-->
<!--                      </el-option>-->
<!--                    </el-select>-->
<!--                  </el-form-item>-->
                  <el-form-item :required=true label="来料类别" prop="incomingType">
                    <el-select v-model="formout.incomingType" filterable placeholder="请选择">
                      <el-option v-for="item in incomingTypeOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="出库编号" prop="outStorageId" v-show="formout.incomingType==5 || formout.incomingType==='30bc0ec552cb4a59a23c680362219ecf' ">
                    <el-select v-model="formout.outStorageId" filterable reserve-keyword placeholder="请输入订单编号" :loading="outStorageLoading" @change="outStorageCodeChange">
                      <el-option v-for="item in outStorageCodeOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="不良原因" prop="badReason" v-show="formout.incomingType==='30bc0ec552cb4a59a23c680362219ecf'">
                    <el-input v-model="formout.badReason"></el-input>
                  </el-form-item>
                  <el-form-item label="返镀原因" prop="incomingReason" v-show="formout.incomingType==5">
                    <el-input v-model="formout.incomingReason"></el-input>
                  </el-form-item>
                  <el-form-item :required=true label="组件数" prop="bunchCount">
                    <el-input type=number v-model="formout.bunchCount"></el-input>
                  </el-form-item>
                  <el-form-item label="数量说明">
                    <el-input v-model="formout.inCount"></el-input>
                  </el-form-item>
                  <el-form-item :required=true label="单位" prop="unit">
                    <el-select v-model="formout.unit" filterable placeholder="请选择">
                      <el-option v-for="item in unitOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                    <el-button @click="resetForm('formout')">重置</el-button>
                  </el-form-item>
                </el-card>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-drawer>
      <!-- 详情 -->
      <el-drawer :visible.sync="drawerupdate" :with-header="false" size='50%'>
        <div style="padding: 2% 3%;">
          <el-tabs>
            <el-tab-pane label="编辑入库" style="margin-top:4%;padding: 0% 5%;overflow-y: scroll;" :style="{height: scrollerHeight}">
              <el-form ref="formoutupdate" :rules="rules" :model="formoutupdate" size="small">
                <el-card>
                  <i class="el-icon-s-order drawer-hard">订单信息</i>
                  <el-divider> </el-divider>
                  <el-form-item :required=true label="订单编号" prop="orderCode">
                    <el-select v-model="formoutupdate.orderCode" filterable remote reserve-keyword placeholder="请输入订单编号" :remote-method="getOrderByCode" :loading="orderLoading" @change="orderCodeChange">
                      <el-option v-for="item in orderOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="科室名称" prop="customerNameId">
                    <el-select v-model="formoutupdate.customerNameId" filterable placeholder="请选择" disabled>
                      <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="订单号" prop="poNum">
                    <el-input v-model="formoutupdate.poNum" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="品名" prop="item">
                    <el-input v-model="formoutupdate.item" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="部件" prop="part">
                    <el-input v-model="formoutupdate.part" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="订单镀金颜色" prop="orderColorId">
                    <el-select v-model="formoutupdate.orderColorId" filterable placeholder="请选择" disabled>
                      <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="烤厅" prop="bakeId">
                    <el-select v-model="formoutupdate.bakeId" filterable placeholder="请选择" disabled>
                      <el-option v-for="item in bakeOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="总订单量" prop="count">
                    <el-input v-model="formoutupdate.count" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="订单组件数" prop="partSumCount">
                    <el-input v-model="formoutupdate.partSumCount" disabled></el-input>
                  </el-form-item>
                </el-card>
                <el-card style="margin-top:3%;">
                  <i class="el-icon-s-claim drawer-hard">入库信息</i>
                  <el-divider> </el-divider>
<!--                  <el-form-item :required=true label="品名" prop="name">-->
<!--                    <el-input v-model="formoutupdate.name"></el-input>-->
<!--                  </el-form-item>-->
                  <el-form-item :required=true label="产品图片" prop="image">
                    <el-upload class="avatar-uploader" :action="avatarUrl" :show-file-list="false" :on-success="handleAddSuccess" :before-upload="beforeAddUpload">
                      <img v-if="formoutupdate.image" :src="formoutupdate.image" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
<!--                  <el-form-item label="入库镀金颜色" prop="colorId">-->
<!--                    <el-select v-model="formoutupdate.colorId" filterable placeholder="请选择">-->
<!--                      <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName" :value="item.id">-->
<!--                      </el-option>-->
<!--                    </el-select>-->
<!--                  </el-form-item>-->
                  <el-form-item :required=true label="来料类别" prop="incomingTypeId">
                    <el-select v-model="formoutupdate.incomingTypeId" filterable placeholder="请选择">
                      <el-option v-for="item in incomingTypeOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="出库编号" prop="outStorageCode" v-show="formoutupdate.incomingTypeId==5 || formoutupdate.incomingTypeId==='30bc0ec552cb4a59a23c680362219ecf'">
                    <el-select v-model="formoutupdate.outStorageCode" filterable reserve-keyword placeholder="请输入订单编号" :loading="outStorageLoading" @change="outStorageCodeChange">
                      <el-option v-for="item in outStorageCodeOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="不良原因" prop="badReason" v-show="formoutupdate.incomingTypeId==='30bc0ec552cb4a59a23c680362219ecf'">
                    <el-input v-model="formoutupdate.badReason"></el-input>
                  </el-form-item>
                  <el-form-item label="返镀原因" prop="incomingReason" v-show="formoutupdate.incomingTypeId==5">
                    <el-input v-model="formoutupdate.incomingReason"></el-input>
                  </el-form-item>
                  <el-form-item :required=true label="组件数" prop="bunchCount">
                    <el-input type=number v-model="formoutupdate.bunchCount"></el-input>
                  </el-form-item>
                  <el-form-item :required=true label="单位" prop="unitId">
                    <el-select v-model="formoutupdate.unitId" filterable placeholder="请选择">
                      <el-option v-for="item in unitOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="数量说明">
                    <el-input v-model="formoutupdate.inCount"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" v-show="$store.state.authorities.indexOf('B-9') != -1" @click="submitFormUpdate()">提交修改</el-button>
                  </el-form-item>
                </el-card>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-drawer>
    </el-col>
  </el-row>
  <el-row class="row selectrow">
    <el-col :span="2">
      <span class="selectlable">科室名称</span>
    </el-col>
    <el-col :span="4">
      <el-select size=mini v-model="customerNameSelect" clearable filterable placeholder="请选择">
        <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName" :value="item.id">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="1">
      <span class="selectlable">编号</span>
    </el-col>
    <el-col :span="4">
      <el-input size=mini style="width:80%;" v-model="codeSelect" placeholder="请输入编号" clearable></el-input>
    </el-col>
    <el-col :span="2">
      <span class="selectlable">时间范围</span>
    </el-col>
    <el-col :span="5">
      <div class="block">
        <el-date-picker size=mini style="width:80%;" v-model="time" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
      </div>
    </el-col>
    <el-col :span="6">
      <el-button-group>
        <el-tooltip class="item" effect="light" content="搜索信息" placement="bottom">
          <el-button type="primary" icon="el-icon-search" @click="getList()" size=small>搜索</el-button>
        </el-tooltip>
        <el-tooltip v-show="$store.state.authorities.indexOf('B-6') != -1" class="item" effect="light" content="新增入库信息" placement="bottom">
          <el-button type="primary" icon="el-icon-document-add" @click="add()" size=small>新增</el-button>
        </el-tooltip>
        <el-tooltip v-show="$store.state.authorities.indexOf('B-3') != -1" class="item" effect="light" content="删除" placement="bottom">
          <el-button type="warning" icon="el-icon-document-remove" @click="remove()" size=small >删除</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="打印" placement="bottom">
          <el-button type='primary' icon="el-icon-printer" size=small v-print="print">打印</el-button>
        </el-tooltip>
      </el-button-group>
    </el-col>
  </el-row>
  <el-row class="row selectrow">
    <el-col :span="2">
      <span class="selectlable">来料类别</span>
    </el-col>
    <el-col :span="4">
      <el-select size=mini v-model="incomingTypeSelect" clearable filterable placeholder="请选择">
        <el-option v-for="item in incomingTypeOptions" :key="item.id" :label="item.itemName" :value="item.id">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="1">
      <span class="selectlable">订单号</span>
    </el-col>
    <el-col :span="4">
      <el-input size=mini style="width:80%;" v-model="poNumSelect" placeholder="请输入订单号" clearable></el-input>
    </el-col>
    <el-col :span="2">
      <span class="selectlable">品名</span>
    </el-col>
    <el-col :span="4">
      <el-input size=mini style="width:80%;" v-model="itemSelect" placeholder="请输入品名" clearable></el-input>
    </el-col>

    <el-col :span="1" style="min-height:1px;" >
    </el-col>
    <el-col :span="6">
      <el-button-group>
        <el-tooltip class="item" effect="light" content="导出" placement="bottom">
          <el-button type='primary' icon="el-icon-printer" size=small @click="exportExcel()">导出</el-button>
        </el-tooltip>
      </el-button-group>
    </el-col>
  </el-row>
  <el-row class="row">
    <el-col :span="24">
      <div style="display: none;">
        <div id="print" ref="print">
          <div v-for="(item) in tableDataPrint" style="float: left;width: 50%;" :style="{height: printCellHeight}" :key="item.id">
            <div>
              <div style="float:left;width:49%;">
                <el-image :src="item.image" style="width:100%;" :style="{height: printCellHeight}" fit=fill></el-image>
              </div>
              <div style="float:left;width:45%;margin-left:5%;">
                <el-descriptions size=mini :column="1" content-class-name="self-descriptions-item">
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="科室名称">
                    <font color="red">{{item.customerName}}</font>
                  </el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="编号">{{item.code}}</el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="品名">{{item.item}}</el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="烤厅">{{item.bake}}</el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="组件数">{{item.bunchCount}}</el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="数量说明">
                    <font color="red">{{item.inCount}}</font>
                  </el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="来料类别">
                    <el-tag size="small">{{item.incomingType}}</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="不良原因">{{item.badReason}}</el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="创建时间">{{item.createTime}}</el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="订单号">{{item.poNum}}</el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="品名">{{item.item}}</el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="部件">{{item.part}}</el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="总订单量">{{item.count}}</el-descriptions-item>
                </el-descriptions>
<!--                <div>-->
<!--                  <div><label style="padding-bottom: 0px;" class="print-font">入库镀金颜色:</label></div>-->
<!--                  <div>-->
<!--                    <font style="color:red" class="print-font">{{item.color}}</font>-->
<!--                  </div>-->
<!--                </div>-->
                <div>
                  <div><label style="padding-bottom: 0px;" class="print-font">订单镀金颜色:</label></div>
                  <div><span class="print-font">{{item.orderColor}}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-table :data="tableData" :height="autoheight" @selection-change="onTableSelectChange">
        <el-table-column type="selection" width=60>
        </el-table-column>
        <el-table-column prop="customerName" label="入库科室名称" width=110> </el-table-column>
        <el-table-column prop="image" label="产品图片" width=100>
          <template slot-scope="scope">
            <div style="width:50%;height:50%;">
              <el-image :src="scope.row.image" fit=contain :preview-src-list="[scope.row.image]" lazy></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="编号" width=120> </el-table-column>
        <el-table-column prop="poNum" label="订单号" width=160> </el-table-column>
        <el-table-column prop="item" label="品名" width=160> </el-table-column>
        <el-table-column prop="part" label="部件" width=160> </el-table-column>
        <el-table-column prop="orderColor" label="订单镀金颜色" width=110> </el-table-column>
<!--        <el-table-column prop="color" label="入库镀金颜色" width=110> </el-table-column>-->
        <el-table-column prop="bake" label="烤厅" width=110> </el-table-column>
        <el-table-column prop="count" label="总订单量" width=100> </el-table-column>
        <el-table-column prop="partSumCount" label="订单组件数" width=120> </el-table-column>
        <el-table-column prop="bunchCount" label="组件数" width=70> </el-table-column>
        <el-table-column prop="unit" label="单位" width=50> </el-table-column>
        <el-table-column prop="inCount" label="数量说明" width=80> </el-table-column>
        <el-table-column prop="incomingType" label="来料类别" width=80> </el-table-column>
        <el-table-column prop="badReason" label="不良原因" width=160> </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width=140> </el-table-column>
        <el-table-column label="操作" width=80>
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" content="详情" placement="bottom">
              <el-button type="primary" icon="el-icon-edit-outline" size=mini circle @click="info(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[5, 20, 100, 500]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalRowCount">
    </el-pagination>
  </el-row>
</div>
</template>

<script>
import inStorage from "./inStorage.js"
export default inStorage
</script>

<style>
@import 'inStorage.css'
</style>
