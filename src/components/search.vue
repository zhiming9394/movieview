<template>
    <div class="container">
        <div class="search-card">
        <input type="text" class="search">
        <button class="search-title">搜索</button>
        </div>
    </div>
</template>

<script>
export default {
name: "search"
}
</script>

<style scoped>
    .container{
        margin: 20px 200px 20px 200px;
        
    }

    .search{
        width: 450px;
        height: 30px;
        display: inline-block;
    }

    .search-title{
        width: 50px;
        height: 36px;
        text-align: center;
        display: inline-block;
        background:#409EFF;
        border: 0px;
        
    }
</style>