<template> 
    <div class="main">
        <div class="block" style="padding:30px 0px 30px 50px">
          <span class="demonstration">功能名称</span>
          <el-input v-model="input"
            placeholder="输入功能节点编号"
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
              :data="privilegeList"
              style="width: 100%">
              <!-- 单选框 -->
              <el-table-column
                type="selection">
              </el-table-column>

              <!-- 功能编号 -->
              <el-table-column
                label="功能编号"
                sortable
                prop="name">
              </el-table-column>
              <!-- 功能名称 -->
              <el-table-column
                label="功能名称"
                width="250"
                sortable
                prop="name">
              </el-table-column>
              <!-- 上级编号 -->
              <el-table-column
                label="上级编号"
                sortable
                prop="parentId">
              </el-table-column>
              <!-- 级别 -->
              <el-table-column
                label="级别"
                sortable
                prop="name">
              </el-table-column>
              <!-- 状态 -->
              <el-table-column
                label="状态"
                sortable
                prop="isDel">
              </el-table-column>
              <!-- 操作时间 -->
              <el-table-column
                label="操作时间"
                width="150"
                sortable
                prop="update_time">
              </el-table-column>
              <!-- 操作 -->
              <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">停用</el-button>
                  <el-button type="text" size="small">编辑</el-button>
                  <el-button type="text" size="small">删除</el-button>
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
            :total="allCount">
          </el-pagination>
        </div>

</div>
  
</template>
<script>
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
        privilegeList:null,//权限列表信息
        allCount:null,//权限列表信息zong条数
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
      }
    },
    created() {
      this.getPrivilegeList();
      // this.getBrandList();
      // this.getProductCateList();
    },
    watch: {
      
    },
    filters: {
      
    },
    methods: {
      //获取权限列表信息
      getPrivilegeList:function(){
        this.$axios({  
          url: '/api/AdminManager/MenuList?nodeId=0',
          method: 'get',
        //params参数必写 , 如果没有参数传{}也可以
          data:{  
          }
        })
        .then((res)=>{
          console.log(res.data.data)
          console.log(res.data.count[0].allcount)
          if(res.data.code==1){
            this.privilegeList=res.data.data //zong列表信息
            this.allCount=res.data.count[0].allcount //zong条数
          }else{
            this.$message(res.msg);
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },


      
        
      
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


