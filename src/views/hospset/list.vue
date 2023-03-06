<template>
    <div class="app-container">
        医院设置列表
    </div>
</template>

<script>
//引入接口js文件
import hospset from '@/api/hospset';
import { totalmem } from 'os';

export default {
    //定义变量和初始值
    data() {
        return{
            current:1,  //当前页数
            limit:3,    //页显示记录数
            searchObj:{}, //条件封装对象
            List:[],       //每页数据集合
            total:0        //记录数   
        }
    },
    //页面渲染之前执行
    created() {
        this.getList()
    },
    methods: {
        //医院设置列表
        getList() {
            hospset.getHospList(this.current, this.limit, this.searchObj)
                .then(response => {
                    console.log(response)
                    //赋值
                    this.List = response.data.records
                    this.total = response.data.total
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }


}
</script>