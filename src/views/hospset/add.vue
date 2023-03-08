<template>
    <div class="app-container">
        <!--表单组件-->
        <el-form ref="form" label-width="120px">
            <el-form-item label="医院名称"><el-input v-model="hospitalSet.hosname" /></el-form-item>
            <el-form-item label="医院编号"><el-input v-model="hospitalSet.hoscode" /></el-form-item>
            <el-form-item label="api基础路径"><el-input v-model="hospitalSet.apiUrl" /></el-form-item>
            <el-form-item label="联系人姓名"><el-input v-model="hospitalSet.contactsName" /></el-form-item>
            <el-form-item label="联系人电话"><el-input v-model="hospitalSet.contactsPhone" /></el-form-item>
            <el-form-item >
                <el-button type="primary" style="float:right" @click="saveOrUpdate">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 引入接口js文件
import hospset from '@/api/hospset'

export default{
    // 定义变量
    data() {
        return {
            hospitalSet:{}
        }
    },
    // 页面渲染之前调用
    created() {
        // 获取路由id
        if(this.$route.params && this.$route.params.id) {
            const id = this.$route.params.id
            this.getHospSet(id)
        }
    },
    methods: {
        // 根据id查询医院设置信息
        getHospSet(id) {
            hospset.getHospSet(id).then(response => {
                this.hospitalSet = response.data
            })
        },
        // 新增或修改数据
        saveOrUpdate() {
            if(!this.hospitalSet.id) {
                // 添加操作
                hospset.saveHospitalSet(this.hospitalSet).then(response => {
                // 提示
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                })
                // 跳转列表
                    this.$router.push({path:'/hospSet/list'})
            })
            } else {
                // 修改操作
                this.hospitalSet.updateTime = new Date().getTime()
                hospset.updateHospitalSet(this.hospitalSet).then(response => {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    })
                    this.$router.push({path:'/hospSet/list'})
                })
            }
        }
    }
}
</script>
