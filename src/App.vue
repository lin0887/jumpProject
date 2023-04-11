<template>
  <div>
    <nav
      class="bg-[#CEC3B2]  text-[#F4EEE1] h-16 border-[#A89B85] border-b-8 flex justify-end items-center pr-12 text-bold text-2xl tracking-wide">
      <div class="flex items-center h-full space-x-5">
        <router-link to="/" class="text-2xl">上傳</router-link>
        <router-link to="/rank" class="text-2xl">賽務榜</router-link>
        <router-link to="/register" class="text-2xl">選手登記</router-link>
        <!-- <router-link v-if="islogin" @click="clearLocalStorage()" to="/login" class="text-2xl">登出</router-link> -->
        <!-- <router-link v-else to="/login" class="text-2xl">登入</router-link> -->
        <!-- <router-link to="" class="bg-[#F4EEE1] p-2 w-16 h-8 flex justify-center items-center ml-4 rounded">
          <span class="material-symbols-outlined text-[#A89B85]">
            menu
          </span>
        </router-link to=""> -->
      </div>
    </nav>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      islogin : false
    }
  },
  mounted() {
    console.log(this.islogin)
    if (localStorage.getItem('token')) {
      console.log('token exists')
      this.islogin = true
    }
  },
  methods: {
    clearLocalStorage() {
      localStorage.clear()
      this.islogin = false
    }
  }

}
</script>

