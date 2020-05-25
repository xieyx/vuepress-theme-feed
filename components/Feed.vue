<template>
  <div class="post-list">
    <div class="tag-list" v-if="tag">
      <span class="tag" v-for="(v, k) in allTags" :style="{backgroundColor:color()}">
        <em class="text-item active" v-if="typeof tag === 'string' && k.toLocaleLowerCase()===tag.toLocaleLowerCase()">{{k}}({{v}})</em>
        <em class="text-item" v-else @click="$emit('turnTo', k.toLocaleLowerCase())">{{k}}({{v}})</em>
      </span>
    </div>
    <div class="post" v-for="(post, i) of pages">
      <router-link class="post-title" :to="post.path">{{ post.title }}</router-link>
      <div>
        <span class="user-info" v-if="post.creator"><img class="avatar" :src="post.creator.avatar" />{{post.creator.email.replace(/@.*$/, '')}}</span>
        <span class="last-updated">{{ themeConfig.formatDate ? diaplayTime(post.lastUpdated) : post.lastUpdated }}</span>
      </div>
      <div class="post-content" v-if="post.excerpt" v-html="post.excerpt.replace(/^<h1\b.*?<\/h1>/, '')"></div>
      <div class="post-actions">
        <span class="tag" v-for="t in post.frontmatter.tags">
          <em class="text-item active" v-if="t.toLocaleLowerCase()===tag.toLocaleLowerCase()">{{t.toLocaleLowerCase()}}</em>
          <em class="text-item" v-else @click="$emit('turnTo', t.toLocaleLowerCase())">{{t.toLocaleLowerCase()}}</em>
        </span>
        <router-link class="continue-reading" :to="post.path">{{ themeConfig.readMore || themeConfig.locales[localePath].readMore || 'Read More' }}</router-link>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Footer from '@theme/components/Footer.vue'

export default {
  name: 'Feed',

  components: { Footer },
  computed: {
    themeConfig() {
      return this.$site.themeConfig;
    },
    localePath() {
      return this.$localePath;
    },
    formatDateLabel() {
      return this.$site.themeConfig.formatDateLabel || this.$site.themeConfig.locales[this.$localePath].formatDateLabel || {
        yearAgo: ' year ago',
        monthAgo: ' month ago',
        weekAgo: ' week ago',
        dayAgo: ' day ago',
        hourAgo: ' hour ago',
        minuteAgo: ' minute ago',
        secondAgo: ' second ago',
      };
    }
  },
  data() {
    return {
      allTags: {},
      pages: [],
    }
  },
  props: {
    tag: '',
  },

  created() {
    this.getPages();
  },

  methods: {
    color() {
      // 标签button颜色
      let colors = [
        "#3498DB",
        "#3EAF7C",
        "#5CBBF6",
        "#f5A28E",
        "#f2AC3B",
        "#FA6551",
        "#C68CE0"
      ];
      return colors[parseInt(Math.random() * colors.length)];
    },
    getPages() {
      this.allTags = {};
      this.pages = [];
      let allTags = [];

      let p = this.$site.pages.filter(v => {
        // 路径前缀判断
        if (this.$localePath === '/' && v.path.split('/').length === 4) {
          return false;
        }
        if (v.path.indexOf(this.$localePath) === 0 && v.frontmatter.tags) {
          allTags.push(...v.frontmatter.tags);
          if (typeof this.tag === 'string' && this.tag !== '') {
            return v.frontmatter.tags.some(t => t.toLocaleLowerCase() === this.tag.toLocaleLowerCase());
          }
        }
        if (v.title && v.path.indexOf(this.$page.path) === 0) {
          return v;
        }
      })
      this.allTags = allTags.reduce((v, k) => {
        k = k.toLocaleLowerCase();
        v[k] = v[k] === undefined ? 1 : v[k] + 1;
        return v;
      }, {});
      this.pages = p.sort((pre, next) => {
        return new Date(pre.lastUpdated) > new Date(next.lastUpdated) ? -1 : 1;
      });
    },
    diaplayTime(date) {
      const timePublish = new Date(date);
      const timeNow = new Date();
      const minute = 1000 * 60;
      const hour = minute * 60;
      const day = hour * 24;
      const month = day * 30;
      const year = month * 12;
      const diffValue = timeNow - timePublish;
      const diffMonth = diffValue / month;
      const diffWeek = diffValue / (7 * day);
      const diffDay = diffValue / day;
      const diffHour = diffValue / hour;
      const diffMinute = diffValue / minute;
      const diffYear = diffValue / year;
      if (diffValue < 0) {
        return this.formatDateLabel.secondAgo;
      } else if (diffYear > 1) {
        return parseInt(diffYear) + this.formatDateLabel.yearAgo;
      } else if (diffMonth > 1) {
        return parseInt(diffMonth) + this.formatDateLabel.monthAgo;
      } else if (diffWeek > 1) {
        return parseInt(diffWeek) + this.formatDateLabel.weekAgo;
      } else if (diffDay > 1) {
        return parseInt(diffDay) + this.formatDateLabel.dayAgo;
      } else if (diffHour > 1) {
        return parseInt(diffHour) + this.formatDateLabel.hourAgo;
      } else if (diffMinute > 1) {
        return parseInt(diffMinute) + this.formatDateLabel.minuteAgo;
      } else {
        return this.formatDateLabel.secondAgo;
      }
    }
  },

  watch: {
    '$route': 'getPages'
  }
};
</script>

<style lang="stylus" scoped>
@require '../styles/wrapper.styl'

@media screen and (max-width: 768px)
  .post-list
    padding: 16px !important;

.post-list
  max-width: 740px;
  margin: 0 auto;
  margin-top: 56px;
  padding: 2rem 2.5rem;

.post
  border: 1px solid #eaecef;
  border-radius: 2px;
  margin-bottom 16px;
  padding: 16px;
  transition: box-shadow linear .1s;
  -webkit-box-shadow: none;
  box-shadow: none;
  position: relative;
  &:hover,
  &:focus
    transition: box-shadow linear .1s;
    border: 1px solid transparent;
    -webkit-box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  .post-actions
    width: 100%;
    display: inline-block;
    .tag
      line-height: 34px;
  .post-title
    font-size: 36px;
    font-weight: 600;
  .last-updated
    margin-top: 4px;
    color: #bbb;
    font-size: 14px;
    line-height: 28px;
  .continue-reading
    float: right;
    padding: 6px;
    border-radius: 2px;
    background-color: white;
    display: inline-flex;
    transition: background-color linear .2s;
    &:hover,
    &:focus
      transition: background-color linear .2s;
      background-color: #eee
  .edited-text
    position: absolute;
    right: 16px;
    top: 16px;
    color: #bbb;
    font-size: 14px;
  .tag
    .text-item
      border: 1px $accentColor;
      font-style: normal;
      margin-right: 0.4rem;
      cursor: pointer;
      background-color: #f6f6f6;
      padding: 0.2rem 0.4rem;
      &.active
        color: $accentColor;
      &:hover
        color: $accentColor;
  .user-info
    .avatar
      height: 14px;
      vertical-align: middle;
      border-radius: 3px;
      overflow: hidden;
      display: inline-block;
      margin-right: 3px;

.tag-list
  margin-bottom: 2rem;
  .tag
    vertical-align: middle;
    cursor: pointer;
    margin: 0.5rem 0.5rem 0.2rem;
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

.post-content >>> img
  max-width: 100%;
</style>
