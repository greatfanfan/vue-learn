<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>教务后台管理系统</span>
      </div>
      <el-form :rules="rules"
        :model="form" ref="form" label-width="80px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { nameRule, passRule } from '@/utils/validate'
import { login } from '@/api/api.js'
import { setToken } from '@/utils/token.js'
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: nameRule }],
        password: [{ validator: passRule }],
      }
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form)
          login(this.form).then(res => {
            console.log(res)
            if(res.data.status === 200) {
              let { username, token } = res.data
              setToken('username', username)
              setToken('token', token)
              this.$router.push('home')
            }
          })
        } else {
          return false;
        }
      });
    }
  },
};
</script>
<style lang="scss">
.login {
    width: 100%;
    height: 100%;
    position: absolute;
    background: #409EFF;
    .box-card {
        width: 450px;
        margin: 200px auto;
        .el-card__header {
            font-size: 34px;
        }
        .el-button {
            width: 100%;
        }
    }
}
</style>