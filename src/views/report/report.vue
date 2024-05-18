<template>
<div v-show="this.authorities.indexOf('M-4') != -1">
  <el-row>
    <el-col :span="12">
      <el-row>
        <el-col style="padding-top: 10px;padding-left: 10px" :span="12">
          <el-card class="box-card">
            <el-row>
              <i class="el-icon-s-data selectlable"></i>
              <span class="boxlable">订单统计</span>
            </el-row>
            <el-row style="margin-top: 2%;">
              <el-col :span="6" :style="{height:heightRow1}">
                <div class="selectlable">月份：</div>
              </el-col>
              <el-col :span="18" :style="{height:heightRow1}">
                <div>
                  <el-date-picker size=mini value-format="yyyy-MM-dd HH:mm:ss" v-model="ordermonth" @change="orderChange" type="month" align="right" unlink-panels range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
                  </el-date-picker>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col style="padding-top: 10px;padding-left: 10px" :span="12">
          <el-card class="box-card">
            <el-row style="padding-top:10%;">
              <el-col :span="12" :style="{height:heightRow1}">
                <div class="numlable">订单数量：</div>
              </el-col>
              <el-col :span="12" :style="{height:heightRow1}">
                <div style="width: 90%;" class="numlable">{{this.orderStatistics}}</div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="padding-top: 10px;padding-left: 10px" :span="24">
          <el-card class="box-card">
            <!-- <el-table :data="orderByColor" style="width: 100%" :default-sort="{prop: 'count', order: 'descending'}">
                    <el-table-column prop="color" label="镀金颜色" sortable width="180">
                    </el-table-column>
                    <el-table-column prop="count" label="总额（元）" sortable width="80">
                    </el-table-column>
                  </el-table> -->
            <div style="width: 100%;" :style="{height:heightRow2}" id="echartsColorSum"></div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
    <el-col style="padding-top: 10px;padding-left: 20px" :span="12">
      <el-card class="box-card" :style="{height: scrollerHeight}">
        <el-row class="row">
          <i class="el-icon-s-data selectlable"></i>
          <span class="boxlable">入库统计</span>
        </el-row>
        <el-row class="row selectrow">
          <el-col :span="2">
            <span class="selectlable selectrow">月份：</span>
          </el-col>
          <el-col :span="4">
            <el-date-picker size=mini value-format="yyyy-MM-dd HH:mm:ss" v-model="inStoragemonth" @change="inStorageChange" type="month" align="right" unlink-panels range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
            </el-date-picker>
          </el-col>
        </el-row>
        <el-divider> </el-divider>
        <el-row class="row selectrow">
          <el-col :span="12">
            <span class="numlable">总计</span>
          </el-col>
          <el-col :span="12">
            <span class="numlable">返修统计</span>
          </el-col>
        </el-row>
        <el-row class="row selectrow">
          <el-col :span="12">
            <span class="numlable">{{this.inStorageStatistics}}</span>
          </el-col>
          <el-col :span="12">
            <el-row class="row">
              <el-col :span="18">
                <span class="boxlable">返镀件个数</span>
              </el-col>
              <el-col :span="6">
                <span class="boxlable">{{this.reInStorageCount}}</span>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="18">
                <span class="boxlable">返修率</span>
              </el-col>
              <el-col :span="6">
                <span class="boxlable">{{this.reInStorageRatio}}%</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
  <el-row>
    <el-col style="padding-top: 20px;padding-left: 10px" :span="24">
      <el-col :span="24">
        <el-card class="box-card">
          <el-row :style="{height: heightRow3}">
            <el-col :span="2">
              <div class="selectlable">月份：</div>
            </el-col>
            <el-col :span="20">
              <div>
                <el-date-picker size=mini value-format="yyyy-MM-dd HH:mm:ss" v-model="ordermonthcustomer" @change="orderChangeCustomer" type="month" align="right" unlink-panels range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
                </el-date-picker>
              </div>
            </el-col>
            <el-col :span="2">
              <el-button type='primary' icon="el-icon-printer" size=small round @click="exportOrderStatisticsCustomerExcel()">导出</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div style="width: 100%;" :style="{height:heightRow4}" id="echartsCustomerSum"></div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-col>
  </el-row>
</div>
</template>

<script>
import report from "./report.js"
export default report
</script>

<style>
@import 'report.css'
</style>
