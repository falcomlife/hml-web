export default {
  name: 'dict',
  data() {
    var itemName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    return {
      tableCustomer: [],
      tableColor: [],
      tableCt: [],
      tableComingtype: [],
      formCustomer: {},
      formColor: {},
      formCt: {},
      formComingtype: {},
      drawercustomer: false,
      drawercolor: false,
      drawerct: false,
      drawercomingtype: false,
      rules: {
        itemName: [{
          validator: itemName,
          trigger: 'blur'
        }]
      },
    }
  },
  created() {
    this.getCustomerDictList()
    this.getColorDictList()
    this.getCtDictList()
    this.getComingtypeDictList()
    this.autoheight = window.innerHeight * 0.316
  },
  computed: {
  },
  methods: {
    getCustomerDictList() {
      this.$api.dict.getDict({
          type: "customer"
        })
        .then(res => {
          this.tableCustomer = res.data.rs
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getColorDictList() {
      this.$api.dict.getDict({
          type: "color"
        })
        .then(res => {
          this.tableColor = res.data.rs
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getCtDictList() {
      this.$api.dict.getDict({
          type: "ct"
        })
        .then(res => {
          this.tableCt = res.data.rs
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getComingtypeDictList() {
      this.$api.dict.getDict({
          type: "incomingtype"
        })
        .then(res => {
          this.tableComingtype = res.data.rs
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    submitForm(form) {
      let body = {}
      if (form == 'customer') {
        body = {
          'type': form,
          'typeName': '科室名称',
          'itemName': this.formCustomer.itemName
        }
      } else if (form == 'color') {
        body = {
          'type': form,
          'typeName': '镀金颜色',
          'itemName': this.formColor.itemName
        }
      } else if (form == 'ct') {
        body = {
          'type': form,
          'typeName': '烤厅',
          'itemName': this.formCt.itemName
        }
      } else if (form == 'incomingtype') {
        body = {
          'type': form,
          'typeName': '来料类别',
          'itemName': this.formComingtype.itemName
        }
      }
      this.$api.dict.save(body)
        .then(res => {
          if (res.data.s == "0") {
            this.$message({
              showClose: true,
              message: '创建成功',
              type: 'success'
            });
            this.getCustomerDictList()
            this.getColorDictList()
            this.getCtDictList()
            this.getComingtypeDictList()
            this.drawercustomer = false
            this.drawercolor = false
            this.drawerct = false
            this.drawercomingtype = false
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
  }
}
