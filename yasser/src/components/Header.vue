<template>
  <div class="header">
    <div class="logo_area_rap">
        <div class="logo_area">
            <!--   -->
            <img class="male" src="./imgs/male.jpg" alt="xiao" title="xiao">
            <img class="female" src="./imgs/female.jpg" alt="xiao" title="xiao">
            <marquee class="first" style="" direction="up" behavior="alternate" width="100" height="50" scrollamount="11" scrolldelay="100">
                <font color='red' size="5">不</font>
            </marquee>
            <marquee direction="up" behavior="alternate" width="100" height="50" scrollamount="11" scrolldelay="200">
                <font color='yellow' size="5">忘</font>
            </marquee>
            <marquee direction="up" behavior="alternate" width="100" height="50" scrollamount="11" scrolldelay="300">
                <font color='brown' size="5">初</font>
            </marquee>
            <marquee direction="up" behavior="alternate" width="100" height="50" scrollamount="11" scrolldelay="400">
                <font color='#cc3333' size="5">心</font>
            </marquee>
            <marquee direction="up" behavior="alternate" width="100" height="50" scrollamount="11" scrolldelay="100">
                <font color='#ff9933' size="5">方</font>
            </marquee>
            <marquee direction="up" behavior="alternate" width="100" height="50" scrollamount="11" scrolldelay="200">
                <font color='#660099' size="5">得</font>
            </marquee>
            <marquee direction="up" behavior="alternate" width="100" height="50" scrollamount="11" scrolldelay="300">
                <font color='#9999ff' size="5">始</font>
            </marquee>
            <marquee direction="up" behavior="alternate" width="100" height="50" scrollamount="11" scrolldelay="400">
                <font color='#ff00ff' size="5">終</font>
            </marquee>
        </div>
    </div>
    <div class="navigation_rap">
        <div class="navigation">
            <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1">首页</el-menu-item>
            <el-submenu index="2">
                <template slot="title">关于我们</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
             <el-submenu index="3">
                <template slot="title">业务体系</template>
                <el-menu-item index="3-1">选项1</el-menu-item>
                <el-menu-item index="3-2">选项2</el-menu-item>
                <el-menu-item index="4-3">选项3</el-menu-item>
                <el-menu-item index="4-4">选项4</el-menu-item>
            </el-submenu>
             <el-submenu index="4">
                <template slot="title">加入我们</template>
                <el-menu-item index="4-1">选项1</el-menu-item>
                <el-menu-item index="4-2">选项2</el-menu-item>
            </el-submenu>
            <el-menu-item index="5" disabled>联系我们</el-menu-item>
            <el-menu-item index="6"><a href="https://www.ele.me" target="_blank">Invertor Relations</a></el-menu-item>
            </el-menu>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
        msg: 'header',
        activeIndex: '1',
        activeIndex2: '1'
    }
  },
  methods: {
       handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
    width:100%;
    min-height: 20px;
}
.logo_area_rap{

}
.logo_area{
    width:1200px;
    height: 82px;
    margin:auto;
    /* background:#cecece; */
    display: flex;
    align-items: center;
}
.male{
height:100%;
margin-left:50px;
}
.female{
height:100%;
position:relative;
left:-24px;top:2px;
}
.first{
    margin-left: 150px;
}
.quickResponse{
    margin-left: 10px;
    margin-right: 200px;
}
.navigation_rap{
    border-bottom: 1px solid #000;
    background:#545c64;
}
.navigation{
    width:1200px;
    height: 59px;
    margin:auto;
}
</style>