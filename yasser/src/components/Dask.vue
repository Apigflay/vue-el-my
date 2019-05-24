<template> 
    <div class="main">
        <div class="block" style="padding:30px 0px 30px 50px">
          <span class="demonstration">日期选择：</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-input v-model="input"
            placeholder="输入工号、姓名、角色编号、名称、手机"
            size="medium"
            style="width:330px"
          ></el-input>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
        <div class="block2" style="padding:30px 0px 30px 50px">
            <el-button type="primary" icon="el-icon-search">批量删除</el-button>
            <el-button type="primary" icon="el-icon-search">操作员列表</el-button>
            <el-button type="primary" icon="el-icon-search">新增操作员</el-button>
            共有数据  1  条
        </div>

        <div class="app-container">
             <el-table
              border
              :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
              <!-- 单选框 -->
              <el-table-column
                type="selection">
              </el-table-column>
              <!-- 员工编号 -->
              <el-table-column
                label="员工编号"
                sortable
                prop="date">
              </el-table-column>
              <!-- 员工姓名 -->
              <el-table-column
                label="员工姓名"
                sortable
                prop="date">
              </el-table-column>
              <!-- 手机 -->
              <el-table-column
                label="手机"
                sortable
                prop="date">
              </el-table-column>
              <!-- 角色编号 -->
              <el-table-column
                label="角色编号"
                sortable
                prop="date">
              </el-table-column>
              <!-- 角色名称 -->
              <el-table-column
                label="角色名称"
                sortable
                prop="date">
              </el-table-column>
              <!-- 描述 -->
              <el-table-column
                label="描述"
                sortable
                prop="date">
              </el-table-column>
              <!-- 状态 -->
              <el-table-column
                label="状态"
                sortable
                prop="date">
              </el-table-column>
              <!-- 操作时间 -->
              <el-table-column
                label="操作时间"
                sortable
                prop="date">
              </el-table-column>

              <el-table-column
                label="操作"
                align="">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">停用</el-button>
                  <el-button
                    size="mini"
                    type=""
                    @click="handleDelete(scope.$index, scope.row)">改密</el-button>
                     <el-button
                    size="mini"
                    type=""
                    @click="handleDelete(scope.$index, scope.row)">编辑</el-button>
                     <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          
          
        </div>
        <!-- 分页 -->
        <div class="block_fenye">
          <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </div>

</div>
  
</template>
<script>
//   import {
//     fetchList,
//     updateDeleteStatus,
//     updateNewStatus,
//     updateRecommendStatus,
//     updatePublishStatus
//   } from '@/api/operators'
//   import {fetchList as fetchSkuStockList,update as updateSkuStockList} from '@/api/skuStock'
//   import {fetchList as fetchProductAttrList} from '@/api/productAttr'
//   import {fetchList as fetchBrandList} from '@/api/brand'
//   import {fetchListWithChildren} from '@/api/productCate'

  const defaultListQuery = {
    keyword: null,
    pageNum: 1,
    pageSize: 5,
    publishStatus: null,
    verifyStatus: null,
    productSn: null,
    productCategoryId: null,
    brandId: null
  };
  export default {
    name: "productList",
    data() {
      return {
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
        },
        value1: '',
        value2: '',
        input: '',

         tableData: [{
          date: '啊啊啊',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        search: ''



        // editSkuInfo:{
        //   dialogVisible:false,
        //   productId:null,
        //   productSn:'',
        //   productAttributeCategoryId:null,
        //   stockList:[],
        //   productAttr:[],
        //   keyword:null
        // },
        // operates: [
        //   {
        //     label: "商品上架",
        //     value: "publishOn"
        //   },
        //   {
        //     label: "商品下架",
        //     value: "publishOff"
        //   },
        //   {
        //     label: "设为推荐",
        //     value: "recommendOn"
        //   },
        //   {
        //     label: "取消推荐",
        //     value: "recommendOff"
        //   },
        //   {
        //     label: "设为新品",
        //     value: "newOn"
        //   },
        //   {
        //     label: "取消新品",
        //     value: "newOff"
        //   },
        //   {
        //     label: "转移到分类",
        //     value: "transferCategory"
        //   },
        //   {
        //     label: "移入回收站",
        //     value: "recycle"
        //   }
        // ],
        // operateType: null,
        // listQuery: Object.assign({}, defaultListQuery),
        // list: null,
        // total: null,
        // listLoading: true,
        // selectProductCateValue: null,
        // multipleSelection: [],
        // productCateOptions: [],
        // brandOptions: [],
        // publishStatusOptions: [{
        //   value: 1,
        //   label: '上架'
        // }, {
        //   value: 0,
        //   label: '下架'
        // }],
        // verifyStatusOptions: [{
        //   value: 1,
        //   label: '审核通过'
        // }, {
        //   value: 0,
        //   label: '未审核'
        // }]
      }
    },
    created() {
      this.getList();
      // this.getBrandList();
      // this.getProductCateList();
    },
    watch: {
      selectProductCateValue: function (newValue) {
        if (newValue != null && newValue.length == 2) {
          this.listQuery.productCategoryId = newValue[1];
        } else {
          this.listQuery.productCategoryId = null;
        }

      }
    },
    filters: {
      verifyStatusFilter(value) {
        if (value === 1) {
          return '审核通过';
        } else {
          return '未审核';
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },


      getProductSkuSp(row, index) {
        if (index === 0) {
          return row.sp1;
        } else if (index === 1) {
          return row.sp2;
        } else {
          return row.sp3;
        }
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          console.log(response+'1111')
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      getBrandList() {
        fetchBrandList({pageNum: 1, pageSize: 100}).then(response => {
          this.brandOptions = [];
          let brandList = response.data.list;
          for (let i = 0; i < brandList.length; i++) {
            this.brandOptions.push({label: brandList[i].name, value: brandList[i].id});
          }
        });
      },
      getProductCateList() {
        fetchListWithChildren().then(response => {
          let list = response.data;
          this.productCateOptions = [];
          for (let i = 0; i < list.length; i++) {
            let children = [];
            if (list[i].children != null && list[i].children.length > 0) {
              for (let j = 0; j < list[i].children.length; j++) {
                children.push({label: list[i].children[j].name, value: list[i].children[j].id});
              }
            }
            this.productCateOptions.push({label: list[i].name, value: list[i].id, children: children});
          }
        });
      },
      handleShowSkuEditDialog(index,row){
        this.editSkuInfo.dialogVisible=true;
        this.editSkuInfo.productId=row.id;
        this.editSkuInfo.productSn=row.productSn;
        this.editSkuInfo.productAttributeCategoryId = row.productAttributeCategoryId;
        this.editSkuInfo.keyword=null;
        fetchSkuStockList(row.id,{keyword:this.editSkuInfo.keyword}).then(response=>{
          this.editSkuInfo.stockList=response.data;
        });
        fetchProductAttrList(row.productAttributeCategoryId,{type:0}).then(response=>{
          this.editSkuInfo.productAttr=response.data.list;
        });
      },
      handleSearchEditSku(){
        fetchSkuStockList(this.editSkuInfo.productId,{keyword:this.editSkuInfo.keyword}).then(response=>{
          this.editSkuInfo.stockList=response.data;
        });
      },
      handleEditSkuConfirm(){
        if(this.editSkuInfo.stockList==null||this.editSkuInfo.stockList.length<=0){
          this.$message({
            message: '暂无sku信息',
            type: 'warning',
            duration: 1000
          });
          return
        }
        this.$confirm('是否要进行修改', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          updateSkuStockList(this.editSkuInfo.productId,this.editSkuInfo.stockList).then(response=>{
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000
            });
            this.editSkuInfo.dialogVisible=false;
          });
        });
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleAddProduct() {
        this.$router.push({path:'/pms/addProduct'});
      },
      handleBatchOperate() {
        if(this.operateType==null){
          this.$message({
            message: '请选择操作类型',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        if(this.multipleSelection==null||this.multipleSelection.length<1){
          this.$message({
            message: '请选择要操作的商品',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        this.$confirm('是否要进行该批量操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids=[];
          for(let i=0;i<this.multipleSelection.length;i++){
            ids.push(this.multipleSelection[i].id);
          }
          switch (this.operateType) {
            case this.operates[0].value:
              this.updatePublishStatus(1,ids);
              break;
            case this.operates[1].value:
              this.updatePublishStatus(0,ids);
              break;
            case this.operates[2].value:
              this.updateRecommendStatus(1,ids);
              break;
            case this.operates[3].value:
              this.updateRecommendStatus(0,ids);
              break;
            case this.operates[4].value:
              this.updateNewStatus(1,ids);
              break;
            case this.operates[5].value:
              this.updateNewStatus(0,ids);
              break;
            case this.operates[6].value:
              break;
            case this.operates[7].value:
              this.updateDeleteStatus(1,ids);
              break;
            default:
              break;
          }
          this.getList();
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handlePublishStatusChange(index, row) {
        let ids = [];
        ids.push(row.id);
        this.updatePublishStatus(row.publishStatus, ids);
      },
      handleNewStatusChange(index, row) {
        let ids = [];
        ids.push(row.id);
        this.updateNewStatus(row.newStatus, ids);
      },
      handleRecommendStatusChange(index, row) {
        let ids = [];
        ids.push(row.id);
        this.updateRecommendStatus(row.recommandStatus, ids);
      },
      handleResetSearch() {
        this.selectProductCateValue = [];
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleDelete(index, row){
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = [];
          ids.push(row.id);
          this.updateDeleteStatus(1,ids);
        });
      },
      handleUpdateProduct(index,row){
        this.$router.push({path:'/pms/updateProduct',query:{id:row.id}});
      },
      handleShowProduct(index,row){
        console.log("handleShowProduct",row);
      },
      handleShowVerifyDetail(index,row){
        console.log("handleShowVerifyDetail",row);
      },
      handleShowLog(index,row){
        console.log("handleShowLog",row);
      },
      updatePublishStatus(publishStatus, ids) {
        let params = new URLSearchParams();
        params.append('ids', ids);
        params.append('publishStatus', publishStatus);
        updatePublishStatus(params).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      updateNewStatus(newStatus, ids) {
        let params = new URLSearchParams();
        params.append('ids', ids);
        params.append('newStatus', newStatus);
        updateNewStatus(params).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      updateRecommendStatus(recommendStatus, ids) {
        let params = new URLSearchParams();
        params.append('ids', ids);
        params.append('recommendStatus', recommendStatus);
        updateRecommendStatus(params).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      updateDeleteStatus(deleteStatus, ids) {
        let params = new URLSearchParams();
        params.append('ids', ids);
        params.append('deleteStatus', deleteStatus);
        updateDeleteStatus(params).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          });
        });
        this.getList();
      }
    }
  }
</script>
<style>


/* .block2{
  text-align:right;
} */
.block_fenye{
  padding-left: 30px;
  padding-right: 30px;
}
.block_fenye .el-pagination__sizes{
  margin-right:450px;
}
.main{
    /* flex: 1; */
}

</style>


