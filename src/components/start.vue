<template>
    <div class="start animated" :class="istime?o:s" v-show="start">
        <img src="../assets/logo.jpeg" alt="" srcset="" class="start_img  animated fadeIn">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                istime: false,
                o: 'fadeOut',
                s: '',
                start:true
            }
        },
        created() {
            setTimeout(() => {
                this.istime = true
                setTimeout(()=>{
                    this.start=false
                },1000)
            }, 2000)
        }
    }
</script>

<style lang="less" scoped>
    .fadeOut {
        animation-duration: 1s;
    }
    .fadeIn {
        animation-duration: 3s;
    }
    .start {
        width: 100vw;
        height: 100vh;
        background-color: white;
        position: absolute;
        top: 0px;
        left: 0px;
        .start_img {
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
</style>