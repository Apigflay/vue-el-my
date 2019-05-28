<template> 
    <div class="side">
        <i class="el-icon-s-operation show_none" @click="show_none"></i>
        <el-menu 
        default-active="1-4-1" 
        class="el-menu-vertical-demo" 
        @open="handleOpen" 
        @close="handleClose" 
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
            <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">管理员管理</span>
            </template>
            <el-menu-item-group>
            <!-- <span slot="title">分组一</span> -->
            <router-link to="/privilege">
                <el-menu-item index="1-1">操作员管理</el-menu-item>
            </router-link>
            <router-link to="/privilege">
                <el-menu-item index="1-2">权限管理</el-menu-item>
            </router-link>
            <router-link to="/role">
                <el-menu-item index="1-3">角色管理</el-menu-item>
            </router-link>
            
            
            
            </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">公司管理</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">会员管理</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">客服管理</span>
        </el-menu-item>
        <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">接口管理</span>
        </el-menu-item>
        <el-menu-item index="6">
            <i class="el-icon-setting"></i>
            <span slot="title">系统管理</span>
        </el-menu-item>
        </el-menu>
          
        
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
        isCollapse: false
      }
    },
    created() {
     
    },
    watch: {
      
    },
    filters: {
     
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      show_none:function(){
          if(this.isCollapse){
              this.isCollapse=false
          }else{
              this.isCollapse=true
          }
      }
    }
  }
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.side{
    /* height: 100%;
    width:200px;
    background:#545c64; */
    position: relative;
}
.side .show_none{
    position:absolute;
    top: 0px;
    height: 35px;
    width: 35px;
    right: -34px;
    font-size: 30px;
    background: #cecece;
    cursor: pointer;
    z-index: 10001;
}
</style>


