
<!--
 * 一级导航（头部导航）
-->
<template>
  <div class="header-component">
    <div class="logo">{{ title }}</div>
    <div class="navigator">
      <router-link
        style="display: flex; font-size: 14px; line-height: 25px; flex-direction: column; align-items: center;"
        v-for="item in list"
        :key="item.name"
        :to="item.path"
      >
        <img
          style="margin: 0; padding: 6px 0 4px; height: 25px; width: 25px; line-height: 40px;"
          :src="item.meta.icon"
          alt
        />
        <span>{{ item.meta.title }}</span>
      </router-link>
    </div>
    <div class="user-info">
      <el-dropdown
        trigger="click"
        @command="handleCommand"
      >
        <span class="el-dropdown-link">
          <span>
            {{ username }}
          </span>
          <span>
            {{ role }}
          </span>
          <i class="el-icon-caret-bottom"> </i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="quit">
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { title } from '@/setting';
import { mapState } from 'vuex';
// import * as api from '@/api/login';

export default {
  name: 'Header',
  components: {},
  data () {
    return {
      title,
      username: '',
      role: ''
    };
  },
  computed: {
    ...mapState({
      // username: state => state.username,
      list: (state) => {
        let userInfo = JSON.parse(localStorage.userInfo);
        let usermenu = userInfo.menu;
        // console.log(state);
        if (userInfo.role === '系统管理员') return state.menu.data.filter(item => item.name !== 'home');
        return state.menu.data.filter(item => {
          if (item.meta.code !== 'HOME') {
            for (let i = 0; i < usermenu.length; i++) {
              if (usermenu[i].split('_')[0] === item.meta.code) return true
            }
          } else return false
        });
      }
    })
  },
  mounted () {
    this.username = JSON.parse(localStorage.userInfo).username;
    this.role = JSON.parse(localStorage.userInfo).role;
  },
  methods: {
    handleCommand () {
      this.$confirm('确认退出系统吗', '提示', { type: 'warning' })
        .then(() => {
          sessionStorage.clear();
          localStorage.clear();
          this.$router.push('/login');
          // api.logout({ accessToken: sessionStorage.accessToken }).then(res => {
          //   if (res) {
          //     sessionStorage.clear();
          //     this.$router.push('/login');
          //   }
          // });
        })
        .catch(() => { });
    }
  }
};
</script>

<style lang="scss" scoped>
$height: 60px;
.header-component {
  height: $height;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3b75c9;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 21px;
  font-weight: bold;
  color: #fff;
  white-space: nowrap;
  margin-right: 10px;
  &::before {
    content: '';
    width: 30px;
    height: 40px;
    margin-left: 10px;
    margin-right: 10px;
    background-image: url(../assets/image/logo.png);
    background-size: auto 100%;
    background-repeat: no-repeat;
  }
}

.navigator {
  width: 70vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  a {
    flex-grow: 1;
    max-width: 190px;
    line-height: $height;
    text-align: center;
    color: #fff;

    &.router-link-active {
      background-color: #2559a5;
    }
  }
}

.user-info {
  .el-dropdown {
    color: #ffb935;
    cursor: pointer;
    white-space: nowrap;
  }
}
</style>
