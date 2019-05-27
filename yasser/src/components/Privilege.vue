<template> 
    <div class="main">
        <div class="block" style="padding:30px 0px 30px 50px">
          <span class="demonstration">功能名称</span>
          <el-input v-model="input"
            placeholder="输入功能节点编号"
            size="medium"
            style="width:330px"
          ></el-input>
          <el-button type="primary" icon="el-icon-search" @click="goSearchId">搜索</el-button>
        </div>
        <div class="block2" style="padding:30px 0px 30px 50px">
            <el-button type="primary" icon="el-icon-search">批量删除</el-button>
            <el-button type="primary" icon="el-icon-search">操作员列表</el-button>
            <el-button type="primary" icon="el-icon-search">新增操作员</el-button>
            共有数据  {{allCount}}  条
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
                prop="id">
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
                width="200">
                <template slot-scope="scope">
                  <el-button prop="isDel" @click="goStop(scope.row)" type="text" size="small">停/启用</el-button>
                  <el-button type="text" size="small" @click="goEdit(scope.row)">编辑</el-button>
                  <el-button type="text" size="small" @click="goDelete(scope.row)">删除</el-button>
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
    <!-- z遮罩层 -->
        <div class="marsk" v-if="showNone"></div>
    <!-- 弹出框--编辑--新增 -->
        <div class="pop" v-if="showNone">
            <el-form model="ruleForm" rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <!--  -->
                <el-form-item label="功能编号" prop="id">
                  <el-input v-model="id" placeholder="请输入功能编号" ></el-input>
                </el-form-item>
                <el-form-item label="功能名称" prop="name">
                  <el-input v-model="name" placeholder="请输入功能名称" size="small"></el-input>
                </el-form-item>
                <el-form-item label="上级编号" prop="parentId">
                  <el-input v-model="parentId" placeholder="请输入上级编号" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="isDel">
                  <el-input v-model="isDel" placeholder="1停用 0启用"></el-input>
                </el-form-item>
                <el-form-item label="叶子节点" prop="isLeaf">
                  <el-input v-model="isLeaf" placeholder="0-否；1-是" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="菜单/按钮" prop="type">
                  <el-input v-model="type" placeholder="1-菜单  2-按钮" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="显示顺序" prop="displayOrder">
                  <el-input v-model="displayOrder" placeholder="默认为1" disabled="true"></el-input>
                </el-form-item>
                
                
                <!-- id: 2               功能编号
                name: "管理员管理"      功能名称
                parentId: 1             上级编号
                isDel: "启用"        状态
                isLeaf: 0             叶子节点 0-否；1-是  
                type: 1                 菜单/按钮
                displayOrder: 1     显示顺序
                
                create_time: null   创建时间
                update_time: null       更新时间
                urlOrClass: "/SysOperator/List"    url -->

              <!--  -->
              
              
              
              
              
              
              <el-form-item>
                <el-button type="primary" @click="goKeep">保存</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                <el-button @click="reset">关闭弹框</el-button>
              </el-form-item>
            </el-form>

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
        input: '',//搜索双向绑定
        row:null,//被点击行的数据
        showNone:false,//遮罩层的隐藏
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
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
        

         tableData: [{
          date: '啊啊啊',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        search: '',

      // -----
      id: null ,             // 功能编号
      name: null,   //   功能名称
      parentId: null  ,         //  上级编号
      isDel: null  ,    //  状态 1停用 0正常 
      isLeaf: null  ,         //  叶子节点 0-否；1-是  
      type: null  ,            //   菜单/按钮
      displayOrder: null ,   // 显示顺序
      
      create_time: null , // 创建时间
      update_time: null , //     更新时间
      urlOrClass: null,//    url
      ruleForm: {
         
        },
        // rules: {
        //   name: [
        //     { required: true, message: '请输入活动名称', trigger: 'blur' },
        //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        //   ],
        //   region: [
        //     { required: true, message: '请选择活动区域', trigger: 'change' }
        //   ],
        //   date1: [
        //     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        //   ],
        //   date2: [
        //     { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        //   ],
        //   type: [
        //     { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        //   ],
        //   resource: [
        //     { required: true, message: '请选择活动资源', trigger: 'change' }
        //   ],
        //   desc: [
        //     { required: true, message: '请填写活动形式', trigger: 'blur' }
        //   ]
        // }
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
      //搜索id
      goSearchId:function(){
        this.$axios({  
          url: '/api/AdminManager/MenuList?nodeId='+this.input,
          method: 'get',
        //params参数必写 , 如果没有参数传{}也可以
          data:{  
            nodeId:this.input
          }
        })
        .then((res)=>{
          console.log(res.data)
          // console.log(res.data.count[0].allcount)
          if(res.data.code==1){
            this.privilegeList=res.data.data //查询成功重新赋值列表信息
            this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
          }else{
            this.$message(res.data.success[0].msg);
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      //删除一条
      goDelete:function(row){
        console.log(row);
        // console.log(this.row)
        // console.log(222)
        this.$axios({  
          url: '/api/AdminManager/ChangeMenuState',
          method: 'post',
        //params参数必写 , 如果没有参数传{}也可以 
          data:{ 
            type:3,
            nodeId:row.id
          }
        })
        .then((res)=>{
          console.log(res.data)
          // console.log(res.data.count[0].allcount)
          if(res.data.code==1){
            // this.privilegeList=res.data.data //查询成功重新赋值列表信息
            // this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
          }else{
            this.$message(res.data.success[0].msg);
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      //  停用？启用
      goStop:function(row){
        if(row.isDel=="启用"){
            this.$axios({  
              url: '/api/AdminManager/ChangeMenuState',
              method: 'post',
            //params参数必写 , 如果没有参数传{}也可以 
              data:{ 
                type:2,
                nodeId:row.id
              }
            })
            .then((res)=>{
              console.log(res.data)
              // console.log(res.data.count[0].allcount)
              if(res.data.code==1){
                // this.privilegeList=res.data.data //查询成功重新赋值列表信息
                // this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
              }else{
                this.$message(res.data.success[0].msg);
              }
            })
            .catch((err)=>{
              console.log(err)
            })
        }else{
            this.$axios({  
              url: '/api/AdminManager/ChangeMenuState',
              method: 'post',
            //params参数必写 , 如果没有参数传{}也可以 
              data:{ 
                type:1,
                nodeId:row.id
              }
            })
            .then((res)=>{
              console.log(res.data)
              // console.log(res.data.count[0].allcount)
              if(res.data.code==1){
                // this.privilegeList=res.data.data //查询成功重新赋值列表信息
                // this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
              }else{
                this.$message(res.data.success[0].msg);
              }
            })
            .catch((err)=>{
              console.log(err)
            })
        }
        console.log(row);
        
      },
      //编辑
      goEdit:function(row){
        this.showNone=true;
        this.row=row;
        console.log(this.row)

        this.id=row.id;
        this.name=row.name;
        this.parentId=row.parentId;
        this.isDel=row.isDel;
        this.isLeaf=row.isLeaf;
        this.type=row.type;
        this.displayOrder=row.displayOrder;    
      },
      //保存
      goKeep:function(){
          this.$axios({  
              url: '/api/AdminManager/ChangeMenu',
              method: 'post',
              //params参数必写 , 如果没有参数传{}也可以 
              data:{   
                id:this.id,             // 功能编号
                name: this.name,   //   功能名称
                parentId: Number(this.parentId)  ,         //  上级编号
                isDel: Number(this.isDel)  ,    //  状态 1停用 0正常 

                isLeaf: null ,         //  叶子节点 0-否；1-是  
                type: null  ,            //   菜单/按钮
                displayOrder: 1 ,   // 显示顺序
                create_time: null , // 创建时间
                update_time: null , //     更新时间
                urlOrClass: null,//    url
              }
            })
            .then((res)=>{
              console.log(res.data)
              // console.log(res.data.count[0].allcount)
              if(res.data.code==1){
                // this.privilegeList=res.data.data //查询成功重新赋值列表信息
                // this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
              }else{
                this.$message(res.data.success[0].msg);
              }
            })
            .catch((err)=>{
              console.log(err)
            })
      },
      //关闭编辑弹框
      reset:function(){
        this.showNone=false;
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
    position: relative;
}
.marsk{
  position: absolute;
  top: 0;
  left: 0; 
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
  z-index: 9999;
}
.pop{
  padding:2% 4%;
  position: absolute;
  top: 9%;
  left: 18%; 
  width: 60%;
  height: 80%;
  background: #fff;
  z-index: 10000;
}
</style>


