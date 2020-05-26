<template>
  <main class="page">
    <slot name="top" />

    <Content class="theme-default-content" />

    <div class="controbutor-list page-edit" v-if="contributors">
      <h2>{{ themelocaleConfig.pageContributors || 'Contributors' }}</h2>
      <span class="user-info" v-for="t in contributors">
        <a target="_blank" :href="t.email.replace(/^(\w+)@.*$/, `${domain}/$1`)"><img class="avatar" :src="t.avatar" :alt="t.email" :title="t.email" /></a>
      </span>
    </div>

    <div class="tag-list page-edit" v-if="frontmatter.tags">
      <h2>{{ themelocaleConfig.pageTags || 'Tags' }}</h2>
      <span class="tag" v-for="t in frontmatter.tags">
        <em class="text-item" @click="$emit('turnTo', t.toLocaleLowerCase())">{{t.toLocaleLowerCase()}}</em>
      </span>
    </div>

    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@parent-theme/components/PageEdit.vue'
import PageNav from '@parent-theme/components/PageNav.vue'

export default {
  components: { PageEdit, PageNav },
  props: ['sidebarItems'],
  computed: {
    domain() {
      return this.$site.themeConfig.repo.replace(/^(https?:\/\/[^/]+).*$/, '$1');
    },
    frontmatter() {
      return this.$page.frontmatter;
    },
    contributors() {
      return this.$page.contributors;
    },
    themelocaleConfig() {
      return this.$themeLocaleConfig
    }
  }
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block

.tag-list
  margin-bottom: 2rem;
  .tag
    vertical-align: middle;
    cursor: pointer;
    margin: 0.5rem 0.5rem 0.2rem;
    background-color: $codeBgColor;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    border-radius: 0.2rem;
    color: #fff;
    font-size: 1rem;
    box-shadow: 0 1px 0.25rem 0 hsla(0, 0%, 57%, 0.21);
    transition: all 0.3s;
    &:hover
      transform: scale(1.2);
    .text-item
      padding: 0.4rem 0.7rem;
      font-style: normal;

.user-info
  margin-right: 0.5rem;
  .avatar
    max-width: 64px;
</style>
