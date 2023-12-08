import axios from 'axios'
import moment from 'moment'

export default {
  name: 'outStorage',
  data() {
    var outCount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else if (value.length > 100) {
        return callback(new Error('长度不能超过100'));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      customerNameSelect: '',
      customerNameOptions: [],
      colorOptions: [],
      bakeOptions: [],
      inStorageOptions: [],
      codeSelect: '',
      outTypeOptions: [{
        id: "1",
        itemName: "良品"
      }, {
        id: "2",
        itemName: "不良"
      }, {
        id: "3",
        itemName: "来料异常"
      }, {
        id: "4",
        itemName: "白金出库"
      }, {
        id: "5",
        itemName: "硫酸铜出库"
      }, {
        id: "7",
        itemName: "返回挑面"
      }, {
        id: "6",
        itemName: "其他"
      }],
      formmodule: {
        id: "",
        tempInStorageId: "",
        inStorageId: "",
        inStorageCode: "",
        code: "",
        customerName: "",
        customerNameId: "",
        image: "",
        name: "",
        poNum: "",
        item: "",
        part: "",
        color: "",
        colorId: "",
        count: "",
        bunchCount: "",
        bake: "",
        bakeId: "",
        outCount: "",
        outType: "",
        outTypeId: "",
        incomingType: "",
        incomingTypeId: "",
        createTime: "",
        modifiedTime: "",
        isDelete: "",
      },
      formout: {
        id: "",
        tempInStorageId: "",
        inStorageId: "",
        inStorageCode: "",
        code: "",
        customerName: "",
        customerNameId: "",
        image: "",
        name: "",
        poNum: "",
        item: "",
        part: "",
        color: "",
        colorId: "",
        count: "",
        bunchCount: "",
        bake: "",
        bakeId: "",
        outCount: "",
        outType: "",
        outTypeId: "",
        incomingType: "",
        incomingTypeId: "",
        createTime: "",
        modifiedTime: "",
        isDelete: "",
      },
      formoutupdate: {
        id: "",
        tempInStorageId: "",
        inStorageId: "",
        inStorageCode: "",
        code: "",
        customerName: "",
        customerNameId: "",
        image: "",
        name: "",
        poNum: "",
        item: "",
        part: "",
        color: "",
        colorId: "",
        count: "",
        bunchCount: "",
        bake: "",
        bakeId: "",
        outCount: "",
        outType: "",
        outTypeId: "",
        incomingType: "",
        incomingTypeId: "",
        createTime: "",
        modifiedTime: "",
        isDelete: "",
      },
      pageIndex: 1,
      pageSize: 5,
      totalRowCount: 0,
      idarr: [],
      avatarUrl: '',
      customerNameItem: '',
      time: [],
      draweradd: false,
      drawerupdate: false,
      inStorageLoading: false,
      print: {
        id: 'print',
        popTitle: '出库单',
        previewTitle: '出库单',
      },
      rules: {
        outCount: [{
          validator: outCount,
          trigger: 'blur'
        }],
      },
      autoheight: 0,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  created() {
    this.getList()
    this.getType()
    this.autoheight = window.innerHeight * 0.646
    this.avatarUrl = process.env.VUE_APP_BASE_URL + '/outStorage/image'
  },
  computed: {
    scrollerHeight: function() {
      return (window.innerHeight - 100) + 'px'; //自定义高度需求
    }
  },
  methods: {
    getType() {
      this.$api.dict.getDict({
        type: "customer"
      }).then(res => {
        this.customerNameOptions = res.data.rs
      })
      this.$api.dict.getDict({
        type: "color"
      }).then(res => {
        this.colorOptions = res.data.rs
      })
      this.$api.dict.getDict({
        type: "ct"
      }).then(res => {
        this.bakeOptions = res.data.rs
      })
    },
    getList() {
      let start = ''
      let end = ''
      if (this.time != null && this.time.length == 2) {
        start = moment(this.time[0]).format('YYYY-MM-DD HH:mm:ss')
        end = moment(this.time[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      this.$api.outStorage.getList({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          customerNameItem: this.customerNameSelect,
          code: this.codeSelect,
          starttime: start,
          endtime: end
        })
        .then(res => {
          this.tableData = res.data.rs.list
          this.totalRowCount = res.data.rs.totalRowCount
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    onTableSelectChange(row) {
      let idarr = []
      for (let item of row) {
        idarr.push(item.id)
      }
      this.idarr = idarr

    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.getList()
    },
    info(row) {
      this.drawerupdate = true
      this.formoutupdate = row
    },
    submitForm(form) {
      this.$refs['formout'].validate((valid) => {
        if (valid) {
          this.$api.outStorage.save(this.formout)
            .then(res => {
              if (res.data.s == "0") {
                this.$message({
                  showClose: true,
                  message: '创建成功',
                  type: 'success'
                });
                this.getList()
                this.draweradd = false
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.rs,
                  type: 'error'
                });
              }
              this.formout = this.formmodule
            })
        }
      })
    },
    submitFormUpdate() {
      console.log("this.formoutupdate",11)
      this.$refs['formoutupdate'].validate((valid) => {
        if (valid) {
          if (typeof this.formoutupdate.tempInStorageId != "undefined") {
            this.formoutupdate.inStorageId = this.formoutupdate.tempInStorageId
          }
          this.formoutupdate.outType = this.formoutupdate.outTypeId
          console.log("this.formoutupdate",this.formoutupdate)
          this.$api.outStorage.update(this.formoutupdate)
            .then(res => {
              if (res.data.s == "0") {
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                });
                this.getList()
                this.drawerupdate = false
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.rs,
                  type: 'error'
                });
              }
              this.formoutupdate = this.formmodule
            })
            .catch(function(error) {
              console.log(error)
              this.formoutupdate = this.formmodule
            })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    remove() {
      let newArr = JSON.parse(JSON.stringify(this.idarr))
      this.$api.outStorage.delete({
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
          } else {
            this.$message({
              showClose: true,
              message: res.data.rs,
              type: 'error'
            });
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    handleAddSuccess(res, file) {
      if (res.s == 0) {
        console.log("success")
        this.$set(this.formout, "image", process.env.VUE_APP_BASE_URL + file.response.rs)
        this.formout.image = process.env.VUE_APP_BASE_URL + file.response.rs
      } else {
        this.$message({
          showClose: true,
          message: res.rs,
          type: 'error'
        });
      }
    },
    beforeAddUpload(file) {
      const isJPG = file.type === 'image/jpeg/png';
      const isLt2M = file.size / 1024 / 1024 < 1;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 或PNG格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 1MB!');
      }
      //return isJPG && isLt2M;
      return isLt2M;
    },
    handleUpdateSuccess(res, file) {
      if (res.s == 0) {
        console.log("success")
        this.$set(this.formoutupdate, "image", process.env.VUE_APP_BASE_URL + file.response.rs)
        this.formoutupdate.image = process.env.VUE_APP_BASE_URL + file.response.rs
      } else {
        this.$message({
          showClose: true,
          message: res.rs,
          type: 'error'
        });
      }
    },
    beforeUpdateUpload(file) {
      const isJPG = file.type === 'image/jpeg/png';
      const isLt2M = file.size / 1024 / 1024 < 10;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 或PNG格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!');
      }
      //return isJPG && isLt2M;
      return isLt2M;
    },
    getInStorageByCode(code) {
      this.$api.inStorage.getByCode({
          code: code
        })
        .then(res => {
          if (res.data.s == 0) {
            this.inStorageOptions = res.data.rs
            this.inStorageLoading = false
          } else {
            this.$message({
              showClose: true,
              message: res.data.rs,
              type: 'error'
            });
          }
        })
    },
    inStorageCodeChange(inStorageId) {
      this.formoutupdate.tempInStorageId = this.formoutupdate.inStorageCode
      this.$api.inStorage.getById({
          id: inStorageId
        })
        .then(res => {
          if (res.data.s == 0) {
            this.formout.customerName = res.data.rs.customerName
            this.formout.poNum = res.data.rs.poNum
            this.formout.item = res.data.rs.item
            this.formout.part = res.data.rs.part
            this.formout.count = res.data.rs.count
            this.formout.name = res.data.rs.name
            this.formout.image = res.data.rs.image
            this.formout.color = res.data.rs.color
            this.formout.bake = res.data.rs.bake

            this.formoutupdate.customerNameId = res.data.rs.customerName
            this.formoutupdate.poNum = res.data.rs.poNum
            this.formoutupdate.item = res.data.rs.item
            this.formoutupdate.part = res.data.rs.part
            this.formoutupdate.count = res.data.rs.count
            this.formoutupdate.name = res.data.rs.name
            this.formoutupdate.image = res.data.rs.image
            this.formoutupdate.colorId = res.data.rs.color
            this.formoutupdate.bakeId = res.data.rs.bake
          } else {
            this.$message({
              showClose: true,
              message: res.data.rs,
              type: 'error'
            });
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
