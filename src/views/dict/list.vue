<template>
    <div>
        <el-table 
        :data="List" 
        :load="getChildrens"
        style="width: 100%;" 
        row-key="id" border lazy 
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column label="名称" align="center" width="400">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="编码" align="center" width="220">
                <template slot-scope="scope">
                    <span>{{ scope.row.dictCode }}</span>
                </template>
            </el-table-column>
            <el-table-column label="值" align="center" width="200">
                <template slot-scope="scope">
                    <span>{{ scope.row.value }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
        </el-table>
  </div>
</template>

<script>
import dict from '@/api/dict';
export default {
    data() {
        return {
            List:[],      // 返回的dict页面数据
        }
    },
    created() {
        this.getDictList(1)
    },
    methods: {
        // 获取字典数据
        getDictList(id) {
            dict.getDictList(id).then(response => {
                this.List = response.data
            })
        },
        // 获取字典子列表---->前端实现递归
        getChildrens(tree, treeNode, resolve) {
            dict.getDictList(tree.id,).then(response => {
                resolve(response.data)
            })
        }
    }
    
}
</script>