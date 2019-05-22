<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    {{$route.name}}

  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      msg: 'footer'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>