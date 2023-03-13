import request from '@/utils/request'

export default {
    //查询数据
    getDictList(id) {
        return request({
            url:`/admin/cmn/dict/findChildData/${id}`,
            method: 'get',
        })
    },
}