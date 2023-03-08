<template>
    <div class="app-container">
        <!--表单插件-->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="医院名称">
                <el-input v-model="searchObj.hosname" placeholder="医院名称"></el-input>
            </el-form-item>
            <el-form-item label="医院编号">
                <el-input v-model="searchObj.hoscode" placeholder="医院编号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getList()">查询</el-button>
            </el-form-item>
        </el-form>
        <!--工具条-->
        <div>
            <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
        </div>
        <!--表格插件-->
        <el-table :data="List" stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="hosname" label="医院名称"></el-table-column>
            <el-table-column prop="hoscode" label="医院编号"></el-table-column>
            <el-table-column prop="apiUrl" label="api基础路径"></el-table-column>
            <el-table-column prop="contactsName" label="联系人姓名"></el-table-column>
            <el-table-column prop="contactsPhone" label="联系人手机"></el-table-column>
            <el-table-column label="状态" width="80">
                <template slot-scope="scope">
                    {{scope.row.status === 1 ? '可用' : '不可用'}}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteHospSetById(scope.row.id)"></el-button>
                    <el-button v-if="scope.row.status==1" type="primary" size="mini" @click="lockHospitalSet(scope.row.id, 0)">锁定</el-button>
                    <el-button v-if="scope.row.status==0" type="primary" size="mini" @click="lockHospitalSet(scope.row.id, 1)">取消锁定</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页插件-->
        <el-pagination
            @current-change="getList"
            :current-page.sync="current"
            style="padding: 30px 0; text-align: center;"
            :page-size="limit"
            layout="total,prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
//引入接口js文件
import hospset from '@/api/hospset';

export default {
    //定义变量和初始值
    data() {
        return{
            current:1,  //当前页数
            limit:3,    //页显示记录数
            searchObj:{}, //条件封装对象
            List:[],       //每页数据集合
            total:0,        //记录数   
            multiSelection:[],   // 
        }
    },
    //页面渲染之前执行
    created() {
        this.getList()
    },
    methods: {
        // 查询医院设置列表
        getList(page=1) {
            this.current = page
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
        },
        // 删除医院设置信息
        deleteHospSetById(id) {
            this.$confirm('此操作将永久删除医院设置信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    hospset.removeHospitalSet(id).then(response => {
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    // 刷新页面
                    this.getList(1)
                })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
                });          
            });
        },
         // 获取复选框选中的id值
         handleSelectionChange(selection) {
            this.multiSelection = selection;
        },
        // 批量删除医院设置信息
        removeRows() {
            this.$confirm('此操作将永久删除医院设置信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    console.log(1111);
                    var idList = []
                    for(var i = 0; i < this.multiSelection.length; i++) {
                        var id = this.multiSelection[i].id
                        idList.push(id)
                    }
                    console.log(1111);
                    hospset.batchRemove(idList).then(response => {
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    // 刷新页面
                    this.getList(1)
                })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
                });          
            });
        },
        // 锁定和取消锁定
        lockHospitalSet(id, status) {
            hospset.lockHospitalSet(id, status).then(response => {
                this.getList(this.current)
            })
        }
    }
}
</script>