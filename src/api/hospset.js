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
    },

    //锁定和取消锁定功能
    lockHospitalSet(id, status) {
        return request({
            url:`/admin/hosp/hospitalSet/lockHospitalSet/${id}/${status}`,
            method:'put',
        })
    },

    // 添加医院设置信息
    saveHospitalSet(hospitalSet) {
        return request({
            url: `/admin/hosp/hospitalSet/saveHospitalSet`,
            method: 'post',
            data: hospitalSet
        })
    },

    // 通过id查询医院设置信息
    getHospSet(id) {
        return request({
            url:`/admin/hosp/hospitalSet/getHospSet/${id}`,
            method: 'get'
        })
    },

    //修改医院设置信息
    updateHospitalSet(hospitalSet) {
        return request({
            url: `/admin/hosp/hospitalSet/updateHospitalSet`,
            method: 'post',
            data: hospitalSet
        })
    }


}