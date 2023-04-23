<template>
  <div class="flex flex-col lg:flex-row text-[#A89B85] pt-32 md:pt-2  items-center">
    <div class="w-full lg:w-1/2 flex flex-col items-center mb-12 lg:mb-0">
      <div class="flex flex-row items-center text-4xl font-bold tracking-wider">
        <div class="mr-4 mb-4">
          <span class="material-symbols-outlined text-bold text-8xl">
            account_circle
          </span>
        </div>
        <div class="">歡迎裁判!</div>
      </div>
      <div class="flex flex-row space-x-4 text-2xl font-bold tracking-wider ">
        <input v-model="contestant"
          class="bg-[#CEC3B2] text-left p-2 flex items-center outline-none placeholder:text-left placeholder:text-[#F4EEE1] placeholder:text-3xl"
          placeholder="參賽者編號">
        <button @click="search()" class="border-[#A89B85] border-4 text-center p-2 rounded">查詢</button>
      </div>
      <div class="flex flex-col text-4xl font-bold tracking-wider mt-12 space-y-8 md:space-y-4  pl-4">
        <div class="flex flex-row ">
          <div class="mr-4">參賽者:</div>
          <div>{{ id }}</div>
        </div>
        <div class="flex flex-row">
          <div class="mr-12">學校:</div>
          <div>{{ school }}</div>
        </div>
        <div class="flex flex-row">
          <div class="mr-12">年級:</div>
          <div>{{ grade }}</div>
        </div>
      </div>
    </div>
    <div class="w-full lg:w-1/2 flex flex-col items-center">
      <div class="flex flex-row items-center text-5xl space-x-8 font-bold">
        <div>跳繩比賽</div>
        <div>{{ date }}</div>
      </div>
      <div class="w-10/12 mt-8">
        <div>
          <div v-if="videoUrl">
            <video :src="videoUrl" class="mt-4 max-w-full" controls></video>
          </div>
          <div v-else class="flex justify-center items-center bg-[#CEC3B2] md:h-50 h-96 relative">
            <div class="flex justify-center items-center w-12 h-12 p-12 rounded-full bg-[#A89B85] absolute z-20">
              <div class="triangle-right ml-2"></div>
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center justify-center text-3xl font-bold tracking-wider mt-4 space-x-8">
          <div class="flex items-center p-4">
            <input ref="fileInput" @change="onVideoChange" type="file" accept="video/*" hidden />
          </div>
          <button @click="chooseFile"
            class="rounded-xl w-40 bg-[#CEC3B2] text-[#A89B85] border-0 text-center tracking-wide px-4 mr-4 py-2">錄影</button>
          <button v-if="already" @click="uploadVideo()"
            class="w-40 rounded-xl bg-[#82D354] text-[#F4EEE1] border-0 text-center tracking-wide px-4 mr-4 py-2">送出</button>
          <button v-else
            class="w-40 bg-[#cee0c3a3] text-[#F4EEE1] rounded-xl border-0 text-center tracking-wide px-4 mr-4 py-2">尚未查詢</button>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
let m = new Date()
const baseURL = "http://" + import.meta.env.VITE_BACKEND_HOST + ":" + import.meta.env.VITE_BACKEND_PORT;
export default {
  data() {
    return {
      videoUrl: '',
      id: '尚未查詢',
      school: '尚未查詢',
      grade: '尚未查詢',
      video: new FormData(),
      already: false,
      date: "",
      toast: this.$swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        background: '#F4EEE1',
      })
    }
  },
  mounted() {
    this.date = m.getFullYear() + "/" + (m.getMonth() + 1) + "/" + m.getDate()
  },
  methods: {
    chooseFile() {
      this.$refs.fileInput.click();
    },
    onVideoChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.videoUrl = URL.createObjectURL(file);
        this.video.append('file', file)
        console.log(this.video)
      }
    },
    search() {
      console.log(this.contestant)
      if (this.contestant == undefined)
        alert('請輸入參賽者編號')
      else
        fetch(baseURL + '/contestants/' + this.contestant, {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        })
          .then(response => response.json())
          .then(data => {
            if (data.length) {
              this.id = data[0].id
              this.school = data[0].school
              this.grade = data[0].grade
              this.already = true
            }
            else {
              this.id = '查無此人'
              this.school = '查無此人'
              this.grade = '查無此人'
            }
          })
    },
    uploadVideo() {
      console.log(this.video)
      fetch(`${baseURL}/uploadVideo/${this.id}`, {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body:this.video
      }).then(res => {
        if (res.status == 200) {
          this.toast.fire({
            icon: 'success',
            title: '上傳成功'
          })
          //clear input
          this.video = new FormData()
          this.videoUrl = ''
          this.already = false
          //clear data
          this.id = '尚未查詢'
          this.school = '尚未查詢'
          this.grade = '尚未查詢'
          this.contestant = ''
        }
        else {
          this.toast.fire({
            icon: 'error',
            title: '上傳失敗'
          })
        }
      })
    }
  }
}
</script>
