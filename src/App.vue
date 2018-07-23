<template>
    <div id="app" class="fillcontain">
        <router-view></router-view>
    </div>
</template>
<script>
export default {

}

</script>
<style lang="less">
@import './style/common';
#app{
	min-width: 1200px;
}
.cell {
    text-align: center;
}
</style>
