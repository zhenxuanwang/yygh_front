<template>
    <div class="app-container">
        <!--工具条-->
        <div class="el-toolbar">
            <div class="el-toolbar-body" style="justify-content: flex-start;">
                <a href="http://localhost:8202/admin/cmn/dict/exportData" target="_blank">
                    <el-button type="primary">导出<i class="el-icon-download el-icon--right"></i></el-button>
                </a>
                <el-button type="primary" @click="importData()">导入<i class="el-icon-upload el-icon--right"></i></el-button>
            </div>
        </div>
        <!--表格数据-->
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
        <!--弹框插件-->
        <el-dialog title="导入" :visible.sync="dialogImportVisable" width="400px">
            <el-form label-position="center">
                <el-form label-position="center">
                    <el-form-item label="文件">
                        <el-upload 
                        :multiple="false"
                        :on-success="uploadsuccess"
                        class="upload-demo"
                        action="http://localhost:8202/admin/cmn/dict/importData">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传xls文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>  
                </el-form>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogImportVisable = false">
                    取消
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import dict from '@/api/dict';
export default {
    data() {
        return {
            dialogImportVisable:false,  // 弹框初始值
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
        },
        // 导入字典
        importData() {
            this.dialogImportVisable = true
        },

        // 成功导入
        uploadsuccess() {
            this.dialogImportVisable = false
            this.getDictList(1)
        }
    }
    
}
</script>