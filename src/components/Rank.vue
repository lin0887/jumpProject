<template>
    <div class="flex flex-col text-[#A89B85]">
        <div class="flex flex-row items-center text-5xl space-x-8 my-4 mx-8">
            <div class="font-bold">班際跳繩比賽</div>
            <div class="font-bold">2022/11/11</div>
            <div class="flex flex-col flex-1 justify-end text-right text-xl">
                <div>最近更新時間</div>
                <div>{{datetime}}</div>
            </div>
        </div>
        <div class="bg-[#A89B85] text-[#F4EEE1] text-4xl py-4">
            <div class="flex flex-row ml-4 justify-evenly">
                <div class="w-48 text-center">項目</div>
                <div class="w-36 text-center">組別</div>
                <div class="w-36 text-center">年級</div>
                <div class="w-36 text-center">姓名</div>
                <div class="w-48 text-center">學校</div>
                <div class="w-24 text-center">編號</div>
                <div class="w-24 text-center">成績</div>
                <div class="2-12 text-center">排名</div>
            </div>
        </div>
        <div v-for="(item, idx) in data" :key="idx" class="text-4xl">
            <div class="flex flex-row mx-4 justify-evenly my-2">
                <div class="w-48 text-center">{{item.contest}}</div>
                <div class="w-36 text-center">{{item.group}}</div>
                <div class="w-36 text-center">{{item.grade}}</div>
                <div class="w-36 text-center">{{item.name}}</div>
                <div class="w-48 text-center">{{item.school}}</div>
                <div class="w-24 text-center">{{item.id}}</div>
                <div class="w-24 text-center">{{item.score}}</div>
                <div class="w-12 text-center">{{idx+1}}</div>
            </div>
            <hr class="border-4 border-[#CEC3B2]">
        </div>

    </div>
</template>

<script>
const dataURL="http://localhost:8000"
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
        fetch(dataURL+"/contestants",{
            method: 'GET',
            headers:{
                Authorization:`bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                this.data = data
            })
            let m = new Date()
            this.datetime = m.getUTCFullYear() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();
    },
}
</script>
