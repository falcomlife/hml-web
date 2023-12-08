<template>
<div class="content-body">
  <el-row class="row">
    <el-col :span="24">
      <!-- 新建 -->
      <el-drawer :visible.sync="draweradd" :with-header="false" size='50%'>
        <div style="padding: 2% 3%;">
          <el-tabs>
            <el-tab-pane label="新增出库" style="margin-top:4%;padding: 0% 5%;overflow-y: scroll;" :style="{height: scrollerHeight}">
              <el-form ref="formout" :rules="rules" :model="formout" size="small">
                <el-card>
                  <i class="el-icon-s-order drawer-hard">订单及入库信息</i>
                  <el-divider> </el-divider>
                  <el-form-item :required=true label="入库编号" prop="inStorageId">
                    <el-select v-model="formout.inStorageId" filterable remote reserve-keyword placeholder="请输入订单编号" :remote-method="getInStorageByCode" :loading="inStorageLoading" @change="inStorageCodeChange">
                      <el-option v-for="item in inStorageOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="科室名称" prop="customerName">
                    <el-select v-model="formout.customerName" filterable placeholder="请选择" disabled>
                      <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="品名" prop="name">
                    <el-input v-model="formout.name" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="订单号" prop="poNum">
                    <el-input v-model="formout.poNum" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="品名" prop="item">
                    <el-input v-model="formout.item" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="部件" prop="part">
                    <el-input v-model="formout.part" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="总订单量" prop="count">
                    <el-input v-model="formout.count" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="产品图片" prop="image">
                    <el-upload class="avatar-uploader" :action="avatarUrl" :show-file-list="false" :on-success="handleAddSuccess" :before-upload="beforeAddUpload" disabled>
                      <img v-if="formout.image" :src="formout.image" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="镀金颜色" prop="color">
                    <el-select v-model="formout.color" filterable placeholder="请选择" disabled>
                      <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="烤厅" prop="bake">
                    <el-select v-model="formout.bake" filterable placeholder="请选择" disabled>
                      <el-option v-for="item in bakeOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-card>
                <el-card style="margin-top:3%;">
                  <i class="el-icon-s-order drawer-hard">出库信息</i>
                  <el-divider> </el-divider>
                  <el-form-item :required=true label="组件数" prop="bunchCount">
                    <el-input type=number v-model="formout.bunchCount"></el-input>
                  </el-form-item>
                  <el-form-item :required=true label="数量说明" prop="outCount">
                    <el-input v-model="formout.outCount"></el-input>
                  </el-form-item>
                  <el-form-item :required=true label="出库类型" prop="outType">
                    <el-select v-model="formout.outType" filterable placeholder="请选择">
                      <el-option v-for="item in outTypeOptions" :key="item.id" :label="item.itemName" :value="item.id">
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
            <el-tab-pane label="编辑出库" style="margin-top:4%;padding: 0% 5%;overflow-y: scroll;" :style="{height: scrollerHeight}">
              <el-form ref="formoutupdate" :rules="rules" :model="formoutupdate" size="small">
                <el-card>
                  <i class="el-icon-s-order drawer-hard">订单及入库信息</i>
                  <el-divider> </el-divider>
                  <el-form-item :required=true label="入库编号" prop="inStorageCode">
                    <el-select v-model="formoutupdate.inStorageCode" filterable remote reserve-keyword placeholder="请输入订单编号" :remote-method="getInStorageByCode" :loading="inStorageLoading" @change="inStorageCodeChange">
                      <el-option v-for="item in inStorageOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="科室名称" prop="customerName">
                    <el-select v-model="formoutupdate.customerNameId" filterable placeholder="请选择" disabled>
                      <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="品名" prop="name">
                    <el-input v-model="formoutupdate.name" disabled></el-input>
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
                  <el-form-item label="订单总量" prop="count">
                    <el-input v-model="formoutupdate.count" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="产品图片" prop="image">
                    <el-upload class="avatar-uploader" :action="avatarUrl" :show-file-list="false" :on-success="handleUpdateSuccess" :before-upload="beforeUpdateUpload" disabled>
                      <img v-if="formoutupdate.image" :src="formoutupdate.image" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="镀金颜色" prop="color">
                    <el-select v-model="formoutupdate.colorId" filterable placeholder="请选择" disabled>
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
                </el-card>
                <el-card style="margin-top:3%;">
                  <i class="el-icon-s-order drawer-hard">出库信息</i>
                  <el-divider> </el-divider>
                  <el-form-item :required=true label="组件数" prop="bunchCount">
                    <el-input type=number v-model="formoutupdate.bunchCount"></el-input>
                  </el-form-item>
                  <el-form-item :required=true label="数量说明" prop="outCount">
                    <el-input v-model="formoutupdate.outCount"></el-input>
                  </el-form-item>
                  <el-form-item :required=true label="出库类型" prop="outType">
                    <el-select v-model="formoutupdate.outTypeId" filterable placeholder="请选择">
                      <el-option v-for="item in outTypeOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-card>
                <el-form-item>
                  <el-button type="primary" @click="submitFormUpdate()">提交修改</el-button>
                </el-form-item>
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
          <el-button type="primary" icon="el-icon-search" @click="getList()" size=small round>搜索</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="新增出库信息" placement="bottom">
          <el-button type="primary" icon="el-icon-document-add" @click="draweradd=true" size=small round>新增</el-button>
        </el-tooltip>
        <el-tooltip v-if="$store.state.authorities.indexOf('B-4') != -1" class="item" effect="light" content="删除" placement="bottom">
          <el-button type="warning" icon="el-icon-document-remove" @click="remove()" size=small round>删除</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="打印" placement="bottom">
          <el-button type='primary' icon="el-icon-printer" size=small round v-print="print">打印</el-button>
        </el-tooltip>
      </el-button-group>
    </el-col>
  </el-row>
  <el-row class="row">
    <el-col :span="24">
      <div style="display:none;">
        <el-table id="print" ref="print" :data="tableData" @selection-change="onTableSelectChange">
          <el-table-column prop="customerName" label="科室名称" width=100> </el-table-column>
          <el-table-column prop="code" label="编号" width=100> </el-table-column>
          <el-table-column prop="name" label="品名" width=50> </el-table-column>
          <el-table-column prop="poNum" label="订单号" width=100> </el-table-column>
          <el-table-column prop="item" label="品名" width=100> </el-table-column>
          <el-table-column prop="part" label="部件" width=100> </el-table-column>
          <el-table-column prop="color" label="镀金颜色" width=50> </el-table-column>
          <el-table-column prop="bake" label="烤厅" width=50> </el-table-column>
          <el-table-column prop="count" label="总订单量" width=50> </el-table-column>
          <el-table-column prop="outType" label="出库类型" width=50> </el-table-column>
          <el-table-column prop="bunchCount" label="组件数" width=80> </el-table-column>
          <el-table-column prop="outCount" label="数量说明" width=80> </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width=100> </el-table-column>
        </el-table>
      </div>
      <el-table :data="tableData" :height="autoheight" @selection-change="onTableSelectChange">
        <el-table-column type="selection" width=60>
        </el-table-column>
        <el-table-column prop="customerName" label="科室名称" width=140> </el-table-column>
        <el-table-column prop="image" label="产品图片" width=100>
          <template slot-scope="scope">
            <div style="width:50%;height:50%;">
              <el-image :src="scope.row.image" fit=contain :preview-src-list="[scope.row.image]" lazy></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="编号" width=140> </el-table-column>
        <el-table-column prop="name" label="品名" width=140> </el-table-column>
        <el-table-column prop="poNum" label="订单号" width=180> </el-table-column>
        <el-table-column prop="item" label="品名" width=180> </el-table-column>
        <el-table-column prop="part" label="部件" width=180> </el-table-column>
        <el-table-column prop="color" label="镀金颜色" width=100> </el-table-column>
        <el-table-column prop="bake" label="烤厅" width=60> </el-table-column>
        <el-table-column prop="count" label="总订单量" width=100> </el-table-column>
        <el-table-column prop="outType" label="出库类型" width=80> </el-table-column>
        <el-table-column prop="inCount" label="入库数量" width=80> </el-table-column>
        <el-table-column prop="bunchCount" label="组件数" width=70> </el-table-column>
        <el-table-column prop="outCount" label="数量说明" width=80> </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width=160> </el-table-column>
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
import outStorage from "./outStorage.js"
export default outStorage
</script>

<style>
@import 'outStorage.css'
</style>
