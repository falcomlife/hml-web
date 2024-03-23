<template>
  <div class="content-body">
    <el-row class="row">
      <el-col :span="24">
        <!-- 新建 -->
        <el-drawer :visible.sync="draweradd" :with-header="false" size='50%'>
          <div style="padding: 4% 10%;">
            <el-tabs>
              <el-tab-pane label="新增订单" style="margin-top:4%;overflow-y: scroll;" :style="{height: scrollerHeight}">
                <el-form ref="formout" :rules="rules" :model="formout" size="small">
                  <el-form-item label="科室名称" prop="customerName">
                    <el-select v-model="formout.customerName" filterable placeholder="请选择">
                      <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="订单图片" prop="image">
                    <el-upload class="avatar-uploader" :action="avatarUrl" :show-file-list="false"
                               :on-success="handleAddSuccess" :before-upload="beforeAddUpload">
                      <img v-if="formout.image" :src="formout.image" class="avatar"/>
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="订单号" prop="poNum">
                    <el-autocomplete
                        class="inline-input autocomplete"
                        v-model="formout.poNum"
                        :fetch-suggestions="poNumQuerySearch"
                        placeholder="请输入内容"
                        :trigger-on-focus="false"
                    ></el-autocomplete>
                  </el-form-item>
                  <el-form-item label="品名" prop="item">
                    <el-autocomplete
                        class="inline-input autocomplete"
                        v-model="formout.item"
                        :fetch-suggestions="itemQuerySearch"
                        placeholder="请输入内容"
                        @select="itemHandleSelect"
                    ></el-autocomplete>
                  </el-form-item>
                  <el-form-item label="部件" prop="part">
                    <el-autocomplete
                        class="inline-input autocomplete"
                        v-model="formout.part"
                        :fetch-suggestions="partQuerySearch"
                        placeholder="请输入内容"
                        @select="partHandleSelect"
                    ></el-autocomplete>
                  </el-form-item>
                  <el-form-item :required=true label="镀金颜色" prop="color">
                    <el-select v-model="formout.color" filterable placeholder="请选择">
                      <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item :required=true label="烤厅" prop="bake">
                    <el-select v-model="formout.bake" filterable placeholder="请选择">
                      <el-option v-for="item in bakeOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="数量" prop="count">
                    <el-input type=number v-model="formout.count" @change="formoutValueChange"></el-input>
                  </el-form-item>
                  <el-form-item label="每套组件数量" prop="partCount">
                    <el-input type=number v-model="formout.partCount" @change="formoutValueChange"></el-input>
                  </el-form-item>
                  <el-form-item label="组件总数量" prop="partSumCount">
                    <el-input type=number v-model="formout.partSumCount"></el-input>
                  </el-form-item>
                  <el-form-item label="单价" prop="price">
                    <el-input type=number v-model="formout.price" @change="formoutValueChange"></el-input>
                  </el-form-item>
                  <el-form-item label="合计" prop="sum">
                    <el-input type=number v-model="formout.sum"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                    <el-button @click="resetForm('formout')">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-drawer>
        <!-- 详情 -->
        <el-drawer :visible.sync="drawerupdate" :with-header="false" size='50%'>
          <div style="padding: 4% 10%;">
            <el-tabs>
              <el-tab-pane label="编辑订单" style="margin-top:4%;overflow-y: scroll;" :style="{height: scrollerHeight}">
                <el-form ref="formoutupdate" :rules="rules" :model="formoutupdate" size="small">
                  <el-form-item label="科室名称" prop="customerName">
                    <el-select v-model="formoutupdate.customerNameId" filterable placeholder="请选择">
                      <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="订单图片" prop="image">
                    <el-upload class="avatar-uploader" :action="avatarUrl" :show-file-list="false"
                               :on-success="handleUpdateSuccess" :before-upload="beforeUpdateUpload">
                      <img v-if="formoutupdate.image" :src="formoutupdate.image" class="avatar"/>
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="订单号" prop="poNum">
                    <el-autocomplete
                        class="inline-input autocomplete"
                        v-model="formoutupdate.poNum"
                        :fetch-suggestions="poNumQuerySearch"
                        placeholder="请输入内容"
                        :trigger-on-focus="false"
                    ></el-autocomplete>
                  </el-form-item>
                  <el-form-item label="品名" prop="item">
                    <el-autocomplete
                        class="inline-input autocomplete"
                        v-model="formoutupdate.item"
                        :fetch-suggestions="itemQuerySearch"
                        placeholder="请输入内容"
                        @select="itemHandleSelect"
                    ></el-autocomplete>
                  </el-form-item>
                  <el-form-item label="部件" prop="part">
                    <el-autocomplete
                        class="inline-input autocomplete"
                        v-model="formoutupdate.part"
                        :fetch-suggestions="partQuerySearch"
                        placeholder="请输入内容"
                        @select="partHandleSelect"
                    ></el-autocomplete>
                  </el-form-item>
                  <el-form-item label="镀金颜色" prop="color">
                    <el-select v-model="formoutupdate.colorId" filterable placeholder="请选择">
                      <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="烤厅" prop="bakeId">
                    <el-select v-model="formoutupdate.bakeId" filterable placeholder="请选择">
                      <el-option v-for="item in bakeOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="数量" prop="count">
                    <el-input type=number v-model="formoutupdate.count" @change="formoutupdateValueChange"></el-input>
                  </el-form-item>
                  <el-form-item label="每套组件数量" prop="partCount">
                    <el-input type=number v-model="formoutupdate.partCount"
                              @change="formoutupdateValueChange"></el-input>
                  </el-form-item>
                  <el-form-item label="组件数量" prop="partSumCount">
                    <el-input type=number v-model="formoutupdate.partSumCount"></el-input>
                  </el-form-item>
                  <el-form-item label="单价" prop="price">
                    <el-input type=number v-model="formoutupdate.price" @change="formoutupdateValueChange"></el-input>
                  </el-form-item>
                  <el-form-item label="合计" prop="sum">
                    <el-input type=number v-model="formoutupdate.sum"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" v-if="$store.state.authorities.indexOf('B-8') != -1"
                               @click="submitFormUpdate()">提交修改
                    </el-button>
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
        <el-input size=mini style="width:82%;" v-model="codeSelect" placeholder="请输入编号" clearable></el-input>
      </el-col>
      <el-col :span="2">
        <span class="selectlable">时间范围</span>
      </el-col>
      <el-col :span="6">
        <div class="block">
          <el-date-picker size=mini style="width:80%;" v-model="time" type="daterange" align="right" unlink-panels
                          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                          :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </el-col>

      <el-col :span="5">
        <el-button-group>
          <el-tooltip class="item" effect="light" content="搜索信息" placement="bottom">
            <el-button type="primary" icon="el-icon-search" @click="getList()" size=small>搜索</el-button>
          </el-tooltip>
          <el-tooltip v-if="$store.state.authorities.indexOf('B-5') != -1" class="item" effect="light"
                      content="新增订单信息" placement="bottom">
            <el-button type="primary" icon="el-icon-document-add" @click="draweraddClick()" size=small>新增</el-button>
          </el-tooltip>
          <el-tooltip v-if="$store.state.authorities.indexOf('B-2') != -1" class="item" effect="light" content="删除"
                      placement="bottom">
            <el-button type="warning" icon="el-icon-document-remove" @click="remove()" size=small>删除</el-button>
          </el-tooltip>
        </el-button-group>
      </el-col>
    </el-row>
    <el-row class="row selectrow">
      <el-col :span="2">
        <span class="selectlable">订单号</span>
      </el-col>
      <el-col :span="4">
        <el-input size=mini style="width:82%;" v-model="poSelect" placeholder="请输入订单号" clearable></el-input>
      </el-col>
      <el-col :span="1">
        <span class="selectlable">品名</span>
      </el-col>
      <el-col :span="4">
        <el-input size=mini style="width:82%;" v-model="itemSelect" placeholder="请输入品名" clearable></el-input>
      </el-col>
      <el-col :span="8" style="min-height:1px;">
      </el-col>
      <el-col :span="4">
        <el-button-group>
          <el-tooltip class="item" effect="light" content="导出" placement="bottom">
            <el-button type='primary' icon="el-icon-printer" size=small @click="exportExcel()">导出</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="打印" placement="bottom">
            <el-button type='primary' icon="el-icon-printer" size=small v-print="print">打印</el-button>
          </el-tooltip>
        </el-button-group>

      </el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="24">
        <div style="display:none;">
          <div id="print" ref="print">
            <div>
              <el-table :data="tableData">
                <el-table-column prop="customerName" label="科室名称" width=100></el-table-column>
                <el-table-column prop="code" label="编号" width=180></el-table-column>
                <el-table-column prop="poNum" label="订单号" width=100></el-table-column>
                <el-table-column prop="item" label="品名" width=100></el-table-column>
                <el-table-column prop="part" label="部件" width=100></el-table-column>
                <el-table-column prop="color" label="镀金颜色" width=100></el-table-column>
                <el-table-column prop="bake" label="烤厅" width=100></el-table-column>
                <el-table-column prop="count" label="数量" width=100></el-table-column>
                <el-table-column prop="price" label="单价" width=80></el-table-column>
                <el-table-column prop="sum" label="合计" width=80></el-table-column>
              </el-table>
            </div>
            <div>
              <span class="print-result">价格合计：</span><span class="print-result">{{ this.totalPrice }}</span><span
                class="print-result">元</span>
            </div>
            <div style="float: right;">
              <div class="print-result">青岛韩美来工艺品有限公司</div>
              <div class="print-result">{{ getCurrentTime() }}</div>
            </div>
          </div>
        </div>
        <el-table :data="tableData" :height="autoheight" @selection-change="onTableSelectChange">
          <el-table-column type="selection" width=60>
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <expandRow :order="scope.row" :expandType="'inStorageByOrder'"></expandRow>
            </template>
          </el-table-column>
          <el-table-column prop="customerName" label="科室名称" width=200></el-table-column>
          <el-table-column prop="image" label="订单图片" width=100>
            <template slot-scope="scope">
              <div style="width:50%;height:50%;">
                <el-image :src="scope.row.image" fit=contain :preview-src-list="[scope.row.image]" lazy></el-image>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="编号" width=180></el-table-column>
          <el-table-column prop="poNum" label="订单号" width=180></el-table-column>
          <el-table-column prop="item" label="品名" width=180></el-table-column>
          <el-table-column prop="part" label="部件" width=180></el-table-column>
          <el-table-column prop="color" label="镀金颜色" width=180></el-table-column>
          <el-table-column prop="bake" label="烤厅" width=180> </el-table-column>
          <el-table-column prop="count" label="数量" width=100></el-table-column>
          <el-table-column prop="partSumCount" label="组件总数" width=100></el-table-column>
          <el-table-column prop="partSumCountCal" label="已入库组件总数" width=140>
            <template slot-scope="scope">
              <font v-if="scope.row.incomingBigger" color="red">{{ scope.row.partSumCountCal }}</font>
              <font v-else>{{ scope.row.partSumCountCal }}</font>
            </template>
          </el-table-column>
          <el-table-column prop="outStroageGoodsSumCount" label="已出库良品组件总数" width=160>
            <template slot-scope="scope">
              <font v-if="scope.row.outStorageBigger" color="red">{{ scope.row.outStroageGoodsSumCount }}</font>
              <font v-else>{{ scope.row.outStroageGoodsSumCount }}</font>
            </template>
          </el-table-column>
          <el-table-column prop="partSumCountSubOutStroageGoodsSumCount" label="剩余待出库数量" width=100></el-table-column>
          <el-table-column prop="overPartSumCount" label="超出出库数量" width=100></el-table-column>
          <el-table-column prop="replatCount" label="返镀数量" width=100 label-class-name="table-col-label-analy"
                           class-name="table-col-analy"></el-table-column>
          <el-table-column prop="replatRatio" label="返镀比率(%)" label-class-name="table-col-label-analy"
                           class-name="table-col-analy" width=100></el-table-column>
          <el-table-column prop="incomingCount" label="来料异常数量" label-class-name="table-col-label-analy"
                           class-name="table-col-analy" width=110></el-table-column>
          <el-table-column prop="incomingRatio" label="来料异常比率(%)" label-class-name="table-col-label-analy"
                           class-name="table-col-analy" width=130></el-table-column>
          <el-table-column prop="price" label="单价" width=60></el-table-column>
          <el-table-column prop="sum" label="合计" width=80></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width=160></el-table-column>
          <el-table-column label="操作" width=80>
            <template slot-scope="scope">
              <el-tooltip class="item" effect="light" content="详情" placement="bottom">
                <el-button type="primary" icon="el-icon-edit-outline" size="mini" circle
                           @click="info(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex"
                     :page-sizes="[20, 50, 100, 500]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
                     :total="totalRowCount">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import order from "./order.js"

export default order
</script>

<style>
@import 'order.css'
</style>
