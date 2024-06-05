import expandRow from './expandRow'
import moment from 'moment'
import * as math from 'mathjs'

export default {
    name: 'order',
    data() {
        return {
            tableData: [],
            customerNameSelect: '',
            customerNameOptions: [],
            colorOptions: [],
            bakeOptions: [],
            incomingTypeOptions: [],
            selectTimeFlagOptions: [
                {
                    id: "1",
                    itemName: "订单"
                },
                {
                    id: "2",
                    itemName: "入库"
                },
                {
                    id: "3",
                    itemName: "出库"
                }
            ],
            incomingTypeSelect: '',
            codeSelect: '',
            inCodeSelect: '',
            outCodeSelect: '',
            poSelect: '',
            itemSelect: '',
            totalPrice: 0,
            selectTimeFlag: "1",
            partRestaurants: [],
            poNumRestaurants: [],
            itemRestaurants: [],
            formout: {
                customerName: '',
                image: '',
                poNum: '',
                item: '',
                part: '',
                color: '',
                count: '',
                partCount: '',
                partSumCount: '',
                price: '',
                sum: '',
                deliveryTime: '',
            },
            formoutupdate: {
                customerName: '',
                image: '',
                poNum: '',
                item: '',
                part: '',
                color: '',
                count: '',
                partCount: '',
                partSumCount: '',
                price: '',
                sum: '',
                deliveryTime: '',
            },
            pageIndex: 1,
            pageSize: 20,
            totalRowCount: 0,
            idarr: [],
            avatarUrl: '',
            customerNameItem: '',
            time: [],
            deliveryTime: [],
            start: "",
            end: "",
            inTime: [],
            inStart: "",
            inEnd: "",
            outTime: [],
            outStart: "",
            outEnd: "",
            deliveryStart: "",
            deliveryEnd: "",
            draweradd: false,
            drawerupdate: false,
            partInfo: "",
            itemInfo: "",
            print: {
                id: 'print',
                popTitle: '订单',
                previewTitle: '订单',
            },
            rules: {},
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
    components: {
        expandRow
    },
    created() {
        this.getList()
        this.getType()
        this.loadParts()
        this.loadPoNums()
        this.loadItems()
        this.autoheight = window.innerHeight * 0.577
        this.avatarUrl = process.env.VUE_APP_BASE_URL + '/outStorage/image'
    },
    computed: {
        scrollerHeight: function () {
            return (window.innerHeight - 100) + 'px'; //自定义高度需求
        }
    },
    methods: {
        loadParts() {
            this.$api.order.loadParts().then(res => {
                this.partRestaurants = res.data.rs
            })
        },
        loadPoNums() {
            this.$api.order.loadPoNums().then(res => {
                this.poNumRestaurants = res.data.rs
            })
        },
        loadItems() {
            this.$api.order.loadItems().then(res => {
                this.itemRestaurants = res.data.rs
            })
        },
        itemHandleSelect(val) {
            this.itemInfo = val.value
            this.$api.order.loadPartsByItem({item: val.value}).then(res => {
                this.partRestaurants = res.data.rs
            })
            if (this.itemInfo != null && this.itemInfo != "" && this.partInfo != null && this.partInfo != "") {
                this.$api.order.loadInfoByItemPart({item: this.itemInfo, part: this.partInfo}).then(res => {
                    this.formout.color = res.data.rs.colorId
                    this.formout.partCount = res.data.rs.partCount

                    this.formoutupdate.colorId = res.data.rs.colorId
                    this.formoutupdate.partCount = res.data.rs.partCount
                })
            }

        },
        partHandleSelect(val) {
            this.partInfo = val.value
            if (this.itemInfo != null && this.itemInfo != "" && this.partInfo != null && this.partInfo != "") {
                this.$api.order.loadInfoByItemPart({item: this.itemInfo, part: this.partInfo}).then(res => {
                    this.formout.color = res.data.rs.colorId
                    this.formout.partCount = res.data.rs.partCount

                    this.formoutupdate.colorId = res.data.rs.colorId
                    this.formoutupdate.partCount = res.data.rs.partCount
                })
            }
        },
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
            this.start = ''
            this.end = ''
            this.inStart = ''
            this.inEnd = ''
            this.outStart = ''
            this.outEnd = ''
            this.deliveryStart=''
            this.deliveryEnd=''
            if (this.time != null && this.time.length == 2) {
                this.start = moment(this.time[0]).format('YYYY-MM-DD HH:mm:ss')
                this.end = moment(this.time[1]).format('YYYY-MM-DD HH:mm:ss')
            }
            if (this.inTime != null && this.inTime.length == 2) {
                this.inStart = moment(this.inTime[0]).format('YYYY-MM-DD HH:mm:ss')
                this.inEnd = moment(this.inTime[1]).format('YYYY-MM-DD HH:mm:ss')
            }
            if (this.outTime != null && this.outTime.length == 2) {
                this.outStart = moment(this.outTime[0]).format('YYYY-MM-DD HH:mm:ss')
                this.outEnd = moment(this.outTime[1]).format('YYYY-MM-DD HH:mm:ss')
            }
            if (this.deliveryTime != null && this.deliveryTime.length == 2) {
                this.deliveryStart = moment(this.deliveryTime[0]).format('YYYY-MM-DD HH:mm:ss')
                this.deliveryEnd = moment(this.deliveryTime[1]).format('YYYY-MM-DD HH:mm:ss')
            }
            this.$api.order.getList({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                customerNameItem: this.customerNameSelect,
                code: this.codeSelect,
                inCode: this.inCodeSelect,
                outCode: this.outCodeSelect,
                po: this.poSelect,
                item: this.itemSelect,
                starttime: this.start,
                endtime: this.end,
                inStarttime: this.inStart,
                inEndtime: this.inEnd,
                outStarttime: this.outStart,
                outEndtime: this.outEnd,
                deliveryStarttime: this.deliveryStart,
                deliveryEndtime: this.deliveryEnd,
                incomingType: this.incomingTypeSelect
            }).then(res => {
                let totalPrice = 0
                this.tableData = res.data.rs.list
                this.totalRowCount = res.data.rs.totalRowCount
                res.data.rs.list.forEach((item) => {
                    totalPrice = this.calculate(totalPrice + item.sum)
                })
                this.totalPrice = totalPrice
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
            this.loadPoNums()
            this.loadItems()
            this.loadParts()
            this.drawerupdate = true
            this.formoutupdate = {...row}
            this.formoutsource = {...row}
        },
        submitForm() {
            this.$refs['formout'].validate((valid) => {
                if (valid) {
                    let deliveryTime = moment(this.formout.deliveryTime).format('YYYY-MM-DD HH:mm:ss')
                    this.formout.deliveryTime = deliveryTime
                    this.$api.order.save(this.formout)
                        .then(res => {
                            if (res.data.s == "0") {
                                this.$message({
                                    showClose: true,
                                    message: '创建成功',
                                    type: 'success'
                                });
                                this.getList()
                                this.loadParts()
                                this.loadPoNums()
                                this.loadItems()
                                this.draweradd = false
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: res.data.rs,
                                    type: 'error'
                                });
                            }
                            // this.formout.part = ''
                            // this.formout.color = ''
                            // this.formout.bake = ''
                            // this.formout.count = ''
                            // this.formout.partCount = ''
                            // this.formout.partSumCount = ''
                            // this.formout.price = ''
                            // this.formout.sum = ''
                        })
                }
            })
        },
        // 直接修改，弃用
        submitFormUpdate() {
            this.$refs['formoutupdate'].validate((valid) => {
                if (valid) {
                    let deliveryTime = moment(this.formoutupdate.deliveryTime).format('YYYY-MM-DD HH:mm:ss')
                    this.formoutupdate.deliveryTime = deliveryTime
                    this.$api.order.update(this.formoutupdate)
                        .then(res => {
                            if (res.data.s == "0") {
                                this.$message({
                                    showClose: true,
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.getList()
                                this.loadParts()
                                this.loadPoNums()
                                this.loadItems()
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
                }
            })
        },
        //提交修改，创建审批流程
        // submitFormUpdate() {
        //   this.$refs['formoutupdate'].validate((valid) => {
        //     if (valid) {
        //       let common = this.formoutupdate.common
        //       let source= JSON.stringify(this.formoutsource);
        //       let target= JSON.stringify(this.formoutupdate);
        //       let process = {
        //         source: source,
        //         target: target,
        //         type: 1,
        //         common: common
        //       }
        //       this.$api.order.save(process)
        //           .then(res => {
        //             if (res.data.s == "0") {
        //               this.$message({
        //                 showClose: true,
        //                 message: '提交成功',
        //                 type: 'success'
        //               });
        //               this.getList()
        //               this.drawerupdate = false
        //             } else {
        //               this.$message({
        //                 showClose: true,
        //                 message: res.data.rs,
        //                 type: 'error'
        //               });
        //             }
        //             this.$refs['formoutupdate'].resetFields();
        //           })
        //     }
        //   })
        // },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        remove() {
            let newArr = JSON.parse(JSON.stringify(this.idarr))
            this.$api.order.delete({
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
                console.log("success")
                this.$set(this.formout, "image", process.env.VUE_APP_BASE_URL + "/images/" + file.response.rs)
                this.formout.image = process.env.VUE_APP_BASE_URL + "/images/" + file.response.rs
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
        formoutValueChange() {
            this.formout.partSumCount = this.calculate(this.formout.count * this.formout.partCount)
            this.formout.sum = this.calculate(this.formout.partSumCount * this.formout.price)
            console.log("~~~",this.formout.partSumCount)

        },
        formoutupdateValueChange() {
            this.formoutupdate.partSumCount = this.calculate(this.formoutupdate.count * this.formoutupdate.partCount)
            this.formoutupdate.sum = this.calculate(this.formoutupdate.partSumCount * this.formoutupdate.price)
        },
        calculate(value) {
            const precision = 14
            return Number(math.format(value, precision))
        },
        getCurrentTime() {
            //获取当前时间并打印
            let yy = new Date().getFullYear();
            let mm = new Date().getMonth() + 1;
            let dd = new Date().getDate();
            let hh = new Date().getHours();
            let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
            let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
            let date = yy + '年' + mm + '月' + dd + '日';
            let time = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss;
            return date;
        },
        exportExcel() {
            let start = ''
            let end = ''
            let inStart = ''
            let inEnd = ''
            let outStart = ''
            let outEnd = ''
            let deliveryStart = ''
            let deliveryEnd = ''
            if (this.time != null && this.time.length == 2) {
                start = moment(this.time[0]).format('YYYY-MM-DD HH:mm:ss')
                end = moment(this.time[1]).format('YYYY-MM-DD HH:mm:ss')
            }
            if (this.inTime != null && this.inTime.length == 2) {
                inStart = moment(this.inTime[0]).format('YYYY-MM-DD HH:mm:ss')
                inEnd = moment(this.inTime[1]).format('YYYY-MM-DD HH:mm:ss')
            }
            if (this.outTime != null && this.outTime.length == 2) {
                outStart = moment(this.outTime[0]).format('YYYY-MM-DD HH:mm:ss')
                outEnd = moment(this.outTime[1]).format('YYYY-MM-DD HH:mm:ss')
            }
            if (this.deliveryTime != null && this.deliveryTime.length == 2) {
                deliveryStart = moment(this.deliveryTime[0]).format('YYYY-MM-DD HH:mm:ss')
                deliveryEnd = moment(this.deliveryTime[1]).format('YYYY-MM-DD HH:mm:ss')
            }
            this.$api.order.exportExcel({
                customerNameItem: this.customerNameSelect,
                code: this.codeSelect,
                inCode: this.inCodeSelect,
                outCode: this.outCodeSelect,
                po: this.poSelect,
                item: this.itemSelect,
                starttime: start,
                endtime: end,
                inStarttime: inStart,
                inEndtime: inEnd,
                outStarttime: outStart,
                outEndtime: outEnd,
                deliveryStarttime: deliveryStart,
                deliveryEndtime: deliveryEnd
            }).then(
                res => {
                    var blob = new Blob([res.data], {
                        type: `application/vnd.ms-excel`
                    })
                    const link = document.createElement('a')
                    const name = `订单明细.xlsx`
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
        },
        partQuerySearch(queryString, cb) {
            var partRestaurants = this.partRestaurants;
            var results = queryString ? partRestaurants.filter(this.createFilter(queryString)) : partRestaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        poNumQuerySearch(queryString, cb) {
            var poNumRestaurants = this.poNumRestaurants;
            var results = queryString ? poNumRestaurants.filter(this.createFilter(queryString)) : poNumRestaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        itemQuerySearch(queryString, cb) {
            var itemRestaurants = this.itemRestaurants;
            var results = queryString ? itemRestaurants.filter(this.createFilter(queryString)) : itemRestaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        draweraddClick() {
            this.loadPoNums()
            this.loadItems()
            this.loadParts()
            this.draweradd = true
        }
    }
}
