<template>
    <div class="flex flex-col lg:flex-row text-[#A89B85] items-center pt-32">
        <div class="w-full flex flex-col items-center mb-12 lg:mb-0 xl:mx-8">
            <div class="flex flex-row items-center text-3xl lg:text-5xl font-bold tracking-wider">
                <div class="mr-4 mb-4">
                    <span class="material-symbols-outlined text-bold text-6xl lg:text-9xl">
                        account_circle
                    </span>
                </div>
                <div class="">歡迎裁判!</div>
            </div>
            <div class="text-xl lg:text-3xl font-bold tracking-wider mt-4">
                <input v-model="form.name" type="text"
                    class="bg-[#CEC3B2] w-48 lg:w-64 h-12 lg:h-18 mb-4 text-left p-2 flex items-center outline-none placeholder:text-left placeholder:text-[#F4EEE1] "
                    placeholder="姓名">
                <div class="flex flex-row space-x-4 mb-4">
                    <select v-model="form.school"
                        class="bg-[#CEC3B2] w-48 lg:w-64 h-12 lg:h-18 text-left p-2 flex items-center outline-none">
                        <option disabled value="">學校</option>
                        <option>喵喵國小</option>
                        <option>汪汪國小</option>
                    </select>
                    <select v-model="form.grade"
                        class="bg-[#CEC3B2] w-48 lg:w-64 h-12 lg:h-18 text-left p-2 flex items-center outline-none">
                        <option disabled value="">年級</option>
                        <option>一年級</option>
                        <option>二年級</option>
                        <option>三年級</option>
                        <option>四年級</option>
                        <option>五年級</option>
                        <option>六年級</option>
                    </select>
                </div>
                <div class="flex flex-row space-x-4">
                    <select v-model="form.contest"
                        class="bg-[#CEC3B2] w-48 lg:w-64 h-12 lg:h-18 text-left p-2 flex items-center outline-none">
                        <option disabled value="">項目</option>
                        <option>一跳一迴旋</option>
                    </select>
                    <select v-model="form.group"
                        class="bg-[#CEC3B2] w-48 lg:w-64 h-12 lg:h-18 text-left p-2 flex items-center outline-none">
                        <option disabled value="">分組</option>
                        <option>男子組</option>
                        <option>女子組</option>
                    </select>
                </div>
                <button @click="register()" class="mt-8 w-2/5 lg:w-2/5 bg-[#82D354] text-[#F4EEE1] rounded border-0 font-semibold text-center tracking-wide px-4 mr-4 py-2">手動登記</button>
            </div>
        </div>
        <div class="flex flex-col w-full items-center">
            <div class="flex flex-row items-center text-3xl lg:text-5xl space-x-8 font-bold">
                <div>跳繩比賽</div>
                <div>{{date}}</div>
            </div>
            <div class="mt-16 lg:mt-32 mb-16 flex items-center text-xl lg:text-3xl font-bold tracking-wider space-x-6 pl-4">
                <input @change="File" type="file" class="block
    file:mr-4 file:py-2 file:px-4
    file:rounded-full file:border-0
    file:bg-[#CEC3B2] file:text-[#A89B85]
    file:text-lg file:font-semibold
    file:text-center file:tracking-wide
    " />
            </div>
            <button @click="uploadCSV()"
                class="mt-8 w-64 text-xl lg:text-3xl bg-[#82D354] text-[#F4EEE1] rounded border-0 font-semibold text-center tracking-wide px-4 mr-4 py-2">批量登記</button>
        </div>
    </div>
</template>



       


<script>
const baseURL = "http://" + import.meta.env.VITE_BACKEND_HOST + ":" + import.meta.env.VITE_BACKEND_PORT;
export default {
    data() {
        return {
            date: new Date().toLocaleDateString(),
            form: {
                name: "",
                school: "",
                grade: "",
                group: "",
                contest: "",
            },
            file: new FormData(),
            toast: this.$swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 1500,
                background: '#F4EEE1',
            })
        }
    },
    methods: {
        register() {
            console.log(JSON.stringify(this.form))
            if (this.form.name == "" || this.form.school == "" || this.form.grade == "" || this.form.group == "" || this.form.contest == "") {
                this.toast.fire({
                    icon: 'warning',
                    title: '請填寫完整資料'
                })
                return
            }
            fetch(baseURL + "/contestants", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.form)
            }).then(res => {
                if (res.status == 200) {
                    this.toast.fire({
                        icon: 'success',
                        title: '登記成功'
                    })
                    this.form.name = ""
                    this.form.school = ""
                    this.form.grade = ""
                    this.form.group = ""
                    this.form.contest = ""
                } else {
                    this.toast.fire({
                        icon: 'error',
                        title: '登記失敗'
                    })
                }
            })
        },
        File(e) {
            this.file.append("file", e.target.files[0])
            console.log(this.file.get("file"))
        },
        uploadCSV() {
            if (this.file.get("file") == null) {
                this.toast.fire({
                    icon: 'warning',
                    title: '請選擇檔案'
                })
                return
            }
            fetch(baseURL + "/uploadCSV", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
                body: this.file
            }).then(res => {
                if (res.status == 200) {
                    this.toast.fire({
                        icon: 'success',
                        title: '上傳成功'
                    })
                } else {
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