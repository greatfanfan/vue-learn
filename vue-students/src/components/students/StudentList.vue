<template>
  <div class="studentList">
    <el-form :inline="true" :model="form" class="demo-form-inline" size="small">
      <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名查询"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="find">查询</el-button>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- tableData.slice((当前的页数-1)*每页条数, 当前页数*当前条数) -->
    <el-table :data="compData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center"> </el-table-column>
      <el-table-column prop="age" label="年龄" align="center"> </el-table-column>
      <el-table-column prop="sex_text" label="性别" align="center"> </el-table-column>
      <el-table-column prop="number" label="学号" align="center"> </el-table-column>
      <el-table-column prop="class" label="班级" align="center"> </el-table-column>
      <el-table-column prop="state_text" label="状态" align="center"> </el-table-column>
      <el-table-column prop="address" label="地址" align="center"> </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"> </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { students, studentDel } from '@/api/api'
export default {
  data() {
    return {
      form: {
        name: ''
      },
      tableData: [],
      total: 0,
      currentPage: 1, // 当前页数
      pageSize: 10
    };
  },
  created() {
    this.getData()
  },
  computed: {
    compData() {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  methods: {
    getData(params) {
      students(params).then(res=> {
      console.log(res)
      this.tableData = res.data.data
      this.total = res.data.total
      this.tableData.map(item => {
        item.sex === 1 ? item.sex_text = '男' : item.sex_text = '女'
        item.state === '1' ? (item.state_text = '已入学') : item.state === "2" ? (item.state_text = '未入学') : (item.state_text = '休学中')
      })
    })
    },
    find() {
        console.log(this.form)
        this.getData(this.form)
    },
    reset() {
      this.form = {}
      this.getData()
    },
    del(row) {
      console.log(row)
      this.$alert('你确定要删除该数据吗？','提示', {
        confirmButtonText: '确定',
        callback: () => {
          studentDel(row.id).then(res => {
            console.log(res)
            if(res.data.status === 200) {
              this.$message({message: res.data.message, type: 'success'})
              this.getData()
            }
          })
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang="scss">
.studentList {
    .demo-form-inline {
      text-align: left;
    }
    .el-pagination {
      text-align: left;
      margin-top: 20px;
    }
}
</style>