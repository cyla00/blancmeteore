<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Login',
    data(){
        return{
            input_email: '',
            input_password: '',
        }
    }
})
</script>

<template>
    <section>
        
        <div class="form-wrapper">
            <div class="image">
                <img class="illustration" src="@/assets/login.png" alt="login connection image">
            </div>
            <div class="form">
                <h3 class="form-title">{{$t('connection.title')}}</h3>
                <label for="login-email">{{$t('connection.email')}}</label>
                <input type="email" name="login-email" v-model="input_email">

                <label for="login-password">{{$t('connection.password')}}</label>
                <input type="password" name="login-password" v-model="input_password">
                <button class="submit">{{$t('connection.submit')}}</button>

                <div class="registration-wrapper">
                    <p class="registration-fallback">{{$t('connection.registration-fallback')}}</p>
                    <router-link class="registration-fallback-url" to="/registration">&nbsp;{{$t('connection.registration-fallback-url')}}</router-link>
                </div>
                
            </div>
        </div>
    </section>
</template>

<style scoped>
section{
    display: flex;
    justify-content: center;
    height: 80vh;
    transition: 0.2s ease all;
}
.form-wrapper{
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    margin: auto;
    border-radius: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.form{
    margin: auto;
    display: flex;
    flex-direction: column;
}
input{
    font-size: 20px;
    padding: 5px 20px;
    outline: none;
    border: 1px solid transparent;
    border-radius: 5px;
    transition: 0.2s ease all;
    text-align: center;
}
input:focus{
    border: 1px solid #4db3af;
}
.registration-wrapper{
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-size: 15px;
}
.registration-fallback{
    margin: 0;
}
.registration-fallback-url{
    text-decoration: none;
    color: #4db3af;
}
.registration-fallback-url:hover{
    transition: 0.2s ease all;
    color: #062C43;
}
.submit{
    margin: auto;
}
.image{
    margin: auto;
    background: #062C43;
    border-radius: 20px 0 0 20px;
}
.illustration{
    width: 600px;
}
</style>
