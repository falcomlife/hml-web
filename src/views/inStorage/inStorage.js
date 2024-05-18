import moment from 'moment'

export default {
  name: 'inStorage',
  data() {
    var color = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var orderCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var image = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var name = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else if (value.length > 100) {
        return callback(new Error('长度不能超过100'));
      } else {
        callback();
      }
    };
    var bake = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else if (value.length > 100) {
        return callback(new Error('长度不能超过100'));
      } else {
        callback();
      }
    };
    var bunchCount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var inCount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else if (value.length > 100) {
        return callback(new Error('长度不能超过100'));
      } else {
        callback();
      }
    };
    var incomingType = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else if (value.length > 100) {
        return callback(new Error('长度不能超过100'));
      } else {
        callback();
      }
    };
    var outStorageCode = (rule, value, callback) => {
      if (!value && this.formout.incomingType == 5) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var badReason = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else if (value.length > 20) {
        return callback(new Error('长度不能超过20'));
      } else {
        callback();
      }
    };
    var unit = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      tableDataPrint: [],
      customerNameSelect: '',
      incomingTypeSelect: '',
      customerNameOptions: [],
      colorOptions: [],
      bakeOptions: [],
      incomingTypeOptions: [],
      orderOptions: [],
      outStorageCodeOptions: [],
      unitOptions: [{
        id: "1",
        itemName: "个"
      }, {
        id: "2",
        itemName: "千克"
      }, {
        id: "3",
        itemName: "克"
      }],
      codeSelect: '',
      itemSelect: '',
      poNumSelect: '',
      formmodule: {
        id: "",
        tempOrderId: "",
        orderId: "",
        orderCode: "",
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
        inCount: "",
        price: "",
        sum: "",
        incomingType: "",
        incomingTypeId: "",
        createTime: "",
        modifiedTime: "",
        isDelete: "",
      },
      formout: {
        id: "",
        tempOrderId: "",
        orderId: "",
        orderCode: "",
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
        outStorageId: "",
        bake: "",
        bakeId: "",
        inCount: "",
        price: "",
        sum: "",
        unit: "个",
        incomingType: "",
        incomingTypeId: "",
        createTime: "",
        modifiedTime: "",
        isDelete: "",
      },
      formoutupdate: {
        id: "",
        tempOrderId: "",
        orderId: "",
        orderCode: "",
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
        outStorageCode: "",
        bake: "",
        bakeId: "",
        inCount: "",
        price: "",
        sum: "",
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
      orderLoading: false,
      outStorageLoading: false,
      print: {
        id: 'print',
        popTitle: '入库单',
        previewTitle: '入库单',
        extraHead: "",
      },
      rules: {
        orderCode: [{
          validator: orderCode,
          trigger: 'blur'
        }],
        image: [{
          validator: image,
          trigger: 'blur'
        }],
        bake: [{
          validator: bake,
          trigger: 'blur'
        }],
        incomingType: [{
          validator: incomingType,
          trigger: 'blur'
        }],
        unit: [{
          validator: unit,
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
    this.autoheight = window.innerHeight * 0.577
    this.avatarUrl = process.env.VUE_APP_BASE_URL + '/outStorage/image'
  },
  computed: {
    scrollerHeight: function() {
      return (window.innerHeight - 100) + 'px'; //自定义高度需求
    },
    printCellHeight: function() {
      return (window.innerHeight) * 0.82+ 'px'; //自定义高度需求
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
      this.$api.dict.getDict({
        type: "incomingtype"
      }).then(res => {
        this.incomingTypeOptions = res.data.rs
      })
    },
    getList() {
      let start = ''
      let end = ''
      if (this.time != null && this.time.length == 2) {
        start = moment(this.time[0]).format('YYYY-MM-DD HH:mm:ss')
        end = moment(this.time[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      this.$api.inStorage.getList({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          customerNameItem: this.customerNameSelect,
          item: this.itemSelect,
          poNum: this.poNumSelect,
          incomingTypeItem: this.incomingTypeSelect,
          code: this.codeSelect,
          starttime: start,
          endtime: end
        })
        .then(res => {
          this.tableData = res.data.rs.list
          this.tableDataPrint = res.data.rs.list
          this.totalRowCount = res.data.rs.totalRowCount
        })
    },
    getListByIds(idarr) {
      this.$api.inStorage.getListByIds(idarr)
        .then(res => {
          this.tableDataPrint = res.data.rs
        })
    },
    onTableSelectChange(row) {
      let idarr = []
      for (let item of row) {
        idarr.push(item.id)
      }
      this.idarr = idarr
      if (idarr != 0) {
        let newArr = JSON.parse(JSON.stringify(idarr))
        this.getListByIds(newArr)
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.getList()
    },
    add() {
      this.draweradd = true
      this.getOutStorageByCode(null, this.formout.orderId, this.formout.item, true)
    },
    info(row) {
      this.drawerupdate = true
      this.formoutupdate = row
      this.getOutStorageByCode(null, this.formoutupdate.orderId, this.formoutupdate.item, false)
    },
    submitForm() {
      this.$refs['formout'].validate((valid) => {
        console.log(this.formout,"update valid")
        if (valid) {
          if ("个" == this.formout.unit) {
            this.formout.unit = 1
          }
          this.$api.inStorage.save(this.formout)
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
              this.$refs['formout'].resetFields();
              this.formout.unit = "个"
            })
        }
      })
    },
    submitFormUpdate() {
      this.$refs['formoutupdate'].validate((valid) => {
        console.log("valid",valid)
        if (valid) {
          if (typeof this.formoutupdate.tempOrderId != "undefined") {
            this.formoutupdate.orderId = this.formoutupdate.tempOrderId
          }
          if (typeof this.formoutupdate.tempOutStorageId != "undefined") {
            this.formoutupdate.outStorageId = this.formoutupdate.tempOutStorageId
          }
          this.$api.inStorage.update(this.formoutupdate)
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
              this.$refs['formoutupdate'].resetFields();
            })
            .catch(function(error) {
              console.log(error)
              this.$refs['formoutupdate'].resetFields();
            })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formout.unit = "个"
    },
    remove() {
      let newArr = JSON.parse(JSON.stringify(this.idarr))
      this.$api.inStorage.delete({
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
    },
    handleAddSuccess(res, file) {
      if (res.s == 0) {
        this.$set(this.formout, "image", process.env.VUE_APP_BASE_URL + "/images/" + file.response.rs)
        this.formout.image = process.env.VUE_APP_BASE_URL + "/images/" + file.response.rs
        this.$set(this.formoutupdate, "image", process.env.VUE_APP_BASE_URL + "/images/" + file.response.rs)
        this.formoutupdate.image = process.env.VUE_APP_BASE_URL + "/images/" + file.response.rs
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
      const isLt2M = file.size / 1024 / 1024 < 10;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 或PNG格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 10MB!');
      }
      //return isJPG && isLt2M;
      return isLt2M;
    },
    handleUpdateSuccess(res, file) {
      if (res.s == 0) {
        console.log("success")
        this.$set(this.formoutupdate, "image", process.env.VUE_APP_BASE_URL + "/images/" + file.response.rs)
        this.formoutupdate.image = process.env.VUE_APP_BASE_URL + "/images/" + file.response.rs
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
      const isLt2M = file.size / 1024 / 1024 < 1;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 或PNG格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
      }
      //return isJPG && isLt2M;
      return isLt2M;
    },
    getOrderByCode(code) {
      this.$api.order.getByCode({
          code: code
        })
        .then(res => {
          if (res.data.s == 0) {
            this.orderOptions = res.data.rs
            this.orderLoading = false
          } else {
            this.$message({
              showClose: true,
              message: res.data.rs,
              type: 'error'
            });
          }
        })
    },
    orderCodeChange(orderId) {
      this.formoutupdate.tempOrderId = this.formoutupdate.orderCode
      this.$api.order.getById({
          id: orderId
        })
        .then(res => {
          if (res.data.s == 0) {
            this.formout.customerName = res.data.rs.customerName
            this.formout.poNum = res.data.rs.poNum
            this.formout.item = res.data.rs.item
            this.formout.part = res.data.rs.part
            this.formout.count = res.data.rs.count
            this.formout.partSumCount = res.data.rs.partSumCount
            this.formout.orderColor = res.data.rs.color
            this.formout.bake = res.data.rs.bake
            this.formout.orderId = orderId

            this.formoutupdate.customerNameId = res.data.rs.customerName
            this.formoutupdate.poNum = res.data.rs.poNum
            this.formoutupdate.item = res.data.rs.item
            this.formoutupdate.part = res.data.rs.part
            this.formoutupdate.count = res.data.rs.count
            this.formoutupdate.partSumCount = res.data.rs.partSumCount
            this.formoutupdate.orderColorId = res.data.rs.color
            this.formoutupdate.bake = res.data.rs.bake

            this.getOutStorageByCode(null, orderId, this.formout.item, true)

          } else {
            this.$message({
              showClose: true,
              message: res.data.rs,
              type: 'error'
            });
          }
        })
    },
    getOutStorageByCode(code, orderId, item, reflash) {
      this.$api.outStorage.getByCode({
          code: code,
          orderId: orderId,
          item: item
        })
        .then(res => {
          if (res.data.s == 0) {
            console.log("enter")
            this.outStorageCodeOptions = res.data.rs
            if (reflash) {
              this.formout.outStorageId = null
              this.formoutupdate.outStorageCode = null
            }
            this.outStorageLoading = false
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
    outStorageCodeChange() {
      this.formoutupdate.tempOutStorageId = this.formoutupdate.outStorageCode
    },
    exportExcel() {
      let start = ''
      let end = ''
      if (this.time != null && this.time.length == 2) {
        start = moment(this.time[0]).format('YYYY-MM-DD HH:mm:ss')
        end = moment(this.time[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      this.$api.inStorage.exportExcel({
        customerNameItem: this.customerNameSelect,
        item: this.itemSelect,
        poNum: this.poNumSelect,
        incomingType: this.incomingTypeSelect,
        code: this.codeSelect,
        starttime: start,
        endtime: end
      }).then(
        res => {
          var blob = new Blob([res.data], {
            type: `application/vnd.ms-excel`
          })
          const link = document.createElement('a')
          const name = `入库明细.xlsx`
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          link.setAttribute('download', name)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          this.$message({
            title: '成功',
            message: '导出成功！',
            type: 'success',
            duration: 1000
          })
        })
    }
  }
}
