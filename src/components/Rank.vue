<template>
    <div class="flex flex-col text-[#A89B85]">
        <div class="flex flex-row items-center text-5xl space-x-8 my-4 mx-8">
            <div class="font-bold">班際跳繩比賽</div>
            <div class="font-bold">{{ date }}</div>
            <div class="flex flex-row flex-1 justify-end">
                <div class="flex flex-col flex-1 text-right text-xl mr-4 pt-1">
                    <div>最近更新時間</div>
                    <div>{{ datetime }}</div>
                </div>
                <div>
                    <button class="bg-[#A89B85] text-[#F4EEE1] text-3xl px-6 py-3 rounded">匯出</button>
                </div>
            </div>

        </div>
        <div class="bg-[#A89B85] text-[#F4EEE1] text-4xl py-4">
            <div class="flex flex-row ml-2 justify-evenly">
                <div class="w-48 text-center">項目</div>
                <div class="w-36 text-center">組別</div>
                <div class="w-36 text-center">年級</div>
                <div class="w-36 text-center">姓名</div>
                <div class="w-48 text-center">學校</div>
                <div class="w-24 text-center">編號</div>
                <div class="w-24 text-center">成績</div>

            </div>
        </div>
        <div v-for="(item, idx) in data" :key="idx" class="text-4xl">
            <div class="flex flex-row mx-4 justify-evenly my-2">
                <div class="w-48 text-center">{{ item.contest }}</div>
                <div class="w-36 text-center">{{ item.group }}</div>
                <div class="w-36 text-center">{{ item.grade }}</div>
                <div class="w-36 text-center">{{ item.name }}</div>
                <div class="w-48 text-center">{{ item.school }}</div>
                <div class="w-24 text-center">{{ item.id }}</div>
                <div class="w-24 text-center">{{ item.score }}</div>
            </div>
            <hr class="border-4 border-[#CEC3B2]">
        </div>

    </div>
</template>

<script>
const baseURL = "http://"+import.meta.env.VITE_BACKEND_HOST+":"+import.meta.env.VITE_BACKEND_PORT;
const data = new Array()
export default {
    name: 'Rank',
    data() {
        return {
            data: data,
            datetime: '',

        }
    },
    mounted() {
        fetch(baseURL + "/contestants", {
            method: 'GET',
            headers: {
                Authorization: `bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                data.sort((a, b) => b.score - a.score)

                console.log(data)
                this.data = data
            })
        let m = new Date()
        this.datetime = m.getUTCFullYear() + "/" + (m.getUTCMonth() + 1) + "/" + m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();
        this.date = m.getUTCFullYear() + "/" + (m.getUTCMonth() + 1) + "/" + m.getUTCDate() 
    },
}
</script>
