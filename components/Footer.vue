<template>
    <footer class="footer">
        <div class="copyright">Copyright &copy; {{ footer.copyright.since && footer.copyright.since < nowYear ? footer.copyright.since + '-' : '' }}{{nowYear}} {{footer.copyright.author}}</div>
        <div class="license" v-if="footer.license" v-html="footer.license"></div>
    </footer>
</template>

<script>
export default {
  data() {
    return {
      nowYear: new Date().getFullYear()
    };
  },
  computed: {
    footer() {
      return this.$themeConfig.footer;
    }
  }
}
</script>

<style scoped>
.footer {
    text-align: center;
    color: #aaa;
    border-top: 1px solid #eaecef;
    padding-top: 16px;
    padding-bottom: 16px;
}
.license {
    font-size: 14px;
}
</style>
