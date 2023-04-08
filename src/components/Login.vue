<template>
    <div>
        <div class="flex mt-32 text-[#A89B85]">
            <div
                class="flex flex-col px-16 py-6 mt-4  mx-auto items-center text-4xl font-bold tracking-wider">
                <div class="mx-4 flex flex-col space-y-4 items-center">
                    <span class="material-symbols-outlined text-bold text-9xl ">
                        account_circle
                    </span>
                    <input v-model="loginForm.name" type="text"
                        class="bg-[#CEC3B2] text-left p-2 flex items-center outline-none placeholder:text-left placeholder:text-[#F4EEE1] placeholder:text-3xl" placeholder="帳號" />
                    <input v-model="loginForm.password" type="password" @keypress.enter="handleLogin"
                        class="bg-[#CEC3B2] text-left p-2 flex items-center outline-none placeholder:text-left placeholder:text-[#F4EEE1] placeholder:text-3xl" placeholder="密碼" />

                    <div class="flex flex-row self-center">
                        <button @click="handleLogin" 
                            class="rounded-md shadow-xl px-8 p-2 mt-4 bg-lime-500 text-white">登入</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const baseURL = "http://"+import.meta.env.VITE_BACKEND_HOST+":"+import.meta.env.VITE_BACKEND_PORT;
export default {
    data() {
        let usernameValid = (rule, value, callback) => {
            if (value.trim().length == 0) {
                return callback(new Error("請輸入帳號"))
            } else {
                return callback()
            }
        }
        let passwordValid = (rule, value, callback) => {
            if (value.trim().length == 0) {
                return callback(new Error("請輸入密碼"))
            } else {
                return callback()
            }
        }
        return {
            loginForm: {
                name: '',
                password: '',
            },
            loginRules: {
                username: [{ validator: usernameValid, trigger: 'blur' }],
                password: [{ validator: passwordValid, trigger: 'blur' }]
            }
        }
    },
    methods: {
        handleLogin() {
            let username = this.loginForm.name
            let password = this.loginForm.password
            if (username == '' && password == '') {
                alert('帳號密碼不能為空')
            } else {
                fetch(baseURL+"/token", {
                    method: "POST",
                    headers: {
                        // form data
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `username=${username}&password=${password}`,
                })// 檢查是否登入成功
                    .then((res) => {
                        if (res.status == 200) {
                            // save token to local storage
                            res.json().then((data) => {
                                localStorage.setItem("token", data.access_token);
                                this.loginState = true;
                                this.$router.push("/");
                            });
                        } else {
                            alert('帳號密碼錯誤')
                        }
                    })
            }
        },

        removeCookie() {
            Cookies.remove('login')
        }
    }
}
</script>