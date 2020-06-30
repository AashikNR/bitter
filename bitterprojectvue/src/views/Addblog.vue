<template>
  <div>
    <add-blog></add-blog>
  </div>
</template>

<script>
// @ is an alias to /sr
import addBlog from '@/components/addBlog.vue'

export default {
  name: 'Home',
  components: {
    'add-blog': addBlog
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>
body{
    margin: 0;
    font-family: 'Nunito SemiBold';
}
</style>
