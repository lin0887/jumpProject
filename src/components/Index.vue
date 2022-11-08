<template>
  <div class="flex flex-nowrap text-[#A89B85] pt-32">
    <div class="w-full flex flex-col items-center">
      <div>
        <div class="flex flex-row items-center text-4xl font-bold tracking-wider">
          <div class="mr-4 mb-4">
            <span class="material-symbols-outlined text-bold text-8xl">
              account_circle
            </span>
          </div>
          <div class="">歡迎裁判，Admin !</div>
        </div>
        <div class="flex flex-row space-x-4 text-2xl font-bold tracking-wider ">
          <input v-model="contestant"
            class="bg-[#CEC3B2] text-left p-2 flex items-center outline-none placeholder:text-left placeholder:text-[#F4EEE1] placeholder:text-3xl"
            placeholder="參賽者編號">
          <button @click="search()" class="border-[#A89B85] border-4 text-center p-2 rounded">查詢</button>
        </div>
        <div class="flex flex-col text-4xl font-bold tracking-wider mt-12 space-y-8  pl-4">
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

    </div>
    <div class="w-full flex flex-col">
      <div class="flex flex-row items-center text-5xl space-x-8 font-bold">
        <div>班際跳繩比賽</div>
        <div>2022/11/11</div>
      </div>
      <div class="w-10/12 mt-12">
        <div class="flex justify-center items-center bg-[#CEC3B2] h-96">
          <div class="flex justify-center items-center w-12 h-12 p-12 rounded-full bg-[#A89B85]">
            <div class="triangle-right ml-2">
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center justify-center text-3xl font-bold tracking-wider mt-8 space-x-6 pl-4">
          <form class="flex items-center p-4">
            <input @change="Video" type="file" class="block w-full
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:bg-[#CEC3B2] file:text-[#A89B85]
                  file:text-lg file:font-semibold
                  file:text-center file:tracking-wide
                " />
            <button @click="uploadVideo()"
              class="w-40 bg-[#82D354] text-[#F4EEE1] rounded border-0 font-semibold text-center tracking-wide px-4 mr-4 py-2">送出</button>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
const dataURL = "http://localhost:8000"
export default {
  data() {
    return {
      id: '尚未查詢',
      school: '尚未查詢',
      grade: '尚未查詢',
      video: new FormData(),
    }
  },
  methods: {
    search() {
      console.log(this.contestant)
      if (this.contestant == undefined)
        alert('請輸入參賽者編號')
      else
        fetch(dataURL + '/contestants/' + this.contestant, {
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
            }
            else {
              this.id = '查無此人'
              this.school = '查無此人'
              this.grade = '查無此人'
            }
          })
    },
    Video(e) {
      this.video.append('file', e.target.files[0])
    },
    uploadVideo() {
      fetch(dataURL + '/uploadVideo', {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
        body: this.video
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
    }
  }
}
</script>

