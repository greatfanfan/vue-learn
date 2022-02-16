import qs from 'qs'
import { Message } from 'element-ui'
// 获取表格数据
export function getData(root, url, params) {
    root.service.get(url, { params: params || {} })
    .then(res => {
        if(res.data.status === 200) {
            root.tableData = res.data.data
        }
    })
    .catch(err => {
        throw err
    })
}

// 新增和修改的方法
export function changeInfo(root, methods, url, form, callback) {
    /* this.service.post("/info", this.form).then(res=> {
        if(res.data.status === 200) {
            this.getData()
            this.dialogFormVisible = false
            this.$refs['form'].resetFields()
            this.$message({type: 'success', message: res.data.message})
        }
    }) */
    let data = qs.stringify(form)
    root.service[methods](url, data)
    .then(res => {
        if(res.data.status === 200) {
            callback(root, url)
            root.dialogFormVisible = false
            root.$refs['form'].resetFields()
            Message({type: 'success', message: res.data.message})
            // root.$message({type: 'success', message: res.data.message})
        }
    })
}

// 删除的方法
export function delData(root, url, id, callFun) {
    root.$alert('你确定要删除该数据吗？','提示', {
        confirmButtonText: '确定',
        callback: () => {
            root.service.delete(`${url}/${id}`).then(res => {
                if(res.data.status === 200) {
                    callFun(root, url)
                    // root.$message({message: res.data.message, type: 'success'})
                    Message({type: 'success', message: res.data.message})
                }
            })
            .catch(err => {
                throw err
            })
        }
    })
}

export function getTableData(root, url, params, arr) {
    root.service.get(url, { params: params || {} })
    .then(res => {
        if(res.data.status === 200) {
            root.tableData = res.data.data
            root.total = res.data.total
            root.tableData.map((item) => {
                // console.log(item)
                arr.map((aItem) => {
                    item[aItem] ? item[aItem + '_text'] = '是' : item[aItem + '_text'] = '否'
                })
            })
            // console.log(root.tableData)
        }
    })
    .catch(err => {
        throw err
    })
}