import request from '@/utils/request'

export default {
    // 查询医院设置信息
    getHospList(current,limit,searchObj) {
        return request({
            url:`/admin/hosp/hospitalSet/findPage/${current}/${limit}`,
            method:'post',
            data:searchObj            //使用json
        })
    },

    // 删除医院设置信息
    removeHospitalSet(id) {
        return request({
            url:`/admin/hosp/hospitalSet/${id}`,
            method:'delete',
        })
    },

    // 批量删除医院设置信息
    batchRemove(idList) {
        return request({
            url:`/admin/hosp/hospitalSet/batchRemove`,
            method:'delete',
            data:idList
        })
    }
}