<template>
<div>
  <el-row class="row">
    <el-col :span="12">
      <el-card class="box-card">
        <el-row class="row">
          <el-col :span="4">
            <span class="boxlable">科室名称</span>
          </el-col>
          <el-col :span="20">
            <div style="float: right;">
              <el-button type="primary" icon="el-icon-document-add" @click="drawercustomer=true" size=mini round>新增</el-button>
            </div>
          </el-col>
        </el-row>
        <el-table :data="tableCustomer" :height="autoheight">
          <el-table-column prop="itemName" label="内容名称" style="width:100%"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="12" style="padding-left: 1%;">
      <el-card class="box-card">
        <el-row class="row">
          <el-col :span="4">
            <span class="boxlable">镀金颜色</span>
          </el-col>
          <el-col :span="20">
            <div style="float: right;">
              <el-button type="primary" icon="el-icon-document-add" @click="drawercolor=true" size=mini round>新增</el-button>
            </div>
          </el-col>
        </el-row>
        <el-table :data="tableColor" :height="autoheight">
          <el-table-column prop="itemName" label="内容名称" style="width:100%"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
  <el-row class="row">
    <el-col :span="12">
      <el-card class="box-card">
        <el-row class="row">
          <el-col :span="4">
            <span class="boxlable">烤厅</span>
          </el-col>
          <el-col :span="20">
            <div style="float: right;">
              <el-button type="primary" icon="el-icon-document-add" @click="drawerct=true" size=mini round>新增</el-button>
            </div>
          </el-col>
        </el-row>
        <el-table :data="tableCt" :height="autoheight">
          <el-table-column prop="itemName" label="内容名称" style="width:100%"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="12" style="padding-left: 1%;">
      <el-card class="box-card">
        <el-row class="row">
          <el-col :span="4">
            <span class="boxlable">来料类别</span>
          </el-col>
          <el-col :span="20">
            <div style="float: right;">
              <el-button type="primary" icon="el-icon-document-add" @click="drawercomingtype=true" size=mini round>新增</el-button>
            </div>
          </el-col>
        </el-row>
        <el-table :data="tableComingtype" :height="autoheight">
          <el-table-column prop="itemName" label="内容名称" style="width:100%"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
  <el-drawer :visible.sync="drawercustomer" :with-header="false" size='50%'>
    <div style="padding: 4% 10%;">
      <div style="padding-bottom: 1%;">
        <span class="boxlable">科室名称</span>
      </div>
      <el-divider></el-divider>
      <el-form ref="formCustomer" :rules="rules" :model="formCustomer" size="small">
        <el-form-item label="内容" prop="itemName">
          <el-input v-model="formCustomer.itemName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('customer')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
  <el-drawer :visible.sync="drawercolor" :with-header="false" size='50%'>
    <div style="padding: 4% 10%;">
      <div style="padding-bottom: 1%;">
        <span class="boxlable">镀金颜色</span>
      </div>
      <el-divider></el-divider>
      <el-form ref="formColor" :rules="rules" :model="formColor" size="small">
        <el-form-item label="内容" prop="itemName">
          <el-input v-model="formColor.itemName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('color')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
  <el-drawer :visible.sync="drawerct" :with-header="false" size='50%'>
    <div style="padding: 4% 10%;">
      <div style="padding-bottom: 1%;">
        <span class="boxlable">烤厅</span>
      </div>
      <el-divider></el-divider>
      <el-form ref="formCt" :rules="rules" :model="formCt" size="small">
        <el-form-item label="内容" prop="itemName">
          <el-input v-model="formCt.itemName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ct')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
  <el-drawer :visible.sync="drawercomingtype" :with-header="false" size='50%'>
    <div style="padding: 4% 10%;">
      <div style="padding-bottom: 1%;">
        <span class="boxlable">来料类别</span>
      </div>
      <el-divider></el-divider>
      <el-form ref="formComingtype" :rules="rules" :model="formComingtype" size="small">
        <el-form-item label="内容" prop="itemName">
          <el-input v-model="formComingtype.itemName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('incomingtype')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</div>
</template>

<script>
import dict from "./dict.js"
export default dict
</script>

<style>
@import 'dict.css'
</style>
