
<template>
  <div style="max-width: 80%; margin: 40px auto;">
    <el-card shadow="always" class="my-full-card">
      <template #header>
        <span>修改学生成绩</span>
      </template>
      <el-form :model="form" label-width="auto" @submit.prevent="handleSubmit">
        <el-form-item label="学号" required>
          <el-input v-model="form.xh" placeholder="请输入学号" />
        </el-form-item>
        <el-form-item label="科目" required>
          <el-select v-model="form.subject" placeholder="请选择科目">
            <el-option
              v-for="col in subjectColumns"
              :key="col.dataIndex"
              :label="col.title"
              :value="col.dataIndex"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分数" required>
          <el-input-number v-model="form.score" :min="0" :max="100" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleSubmit">
            修改成绩
          </el-button>
          <el-button style="margin-left: 16px" @click="goBack">返回</el-button>
        </el-form-item>
        <el-alert
          v-if="successMsg"
          type="success"
          :closable="false"
          show-icon
          style="margin-top: 16px"
        >
          {{ successMsg }}
        </el-alert>
        <el-alert
          v-if="errorMsg"
          type="error"
          :closable="false"
          show-icon
          style="margin-top: 16px"
        >
          {{ errorMsg }}
        </el-alert>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const form = ref({ xh: '', subject: '', score: null })
const loading = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

const subjectColumns = [
  { title: '高等数学1-1', dataIndex: 'math1_1' },
  { title: '高等数学1-2', dataIndex: 'math1_2' },
  { title: '线性代数', dataIndex: 'linear_algebra' },
  { title: '大学物理4-1', dataIndex: 'physics4_1' },
  { title: '信息技术导论', dataIndex: 'info_tech_intro' },
  { title: '高级语言程序设计', dataIndex: 'prog_lang' },
  { title: '面向对象程序设计', dataIndex: 'oop' },
]

async function handleSubmit() {
  if (!form.value.xh || !form.value.subject || form.value.score === null) {
    errorMsg.value = '请填写所有字段'
    return
  }
  loading.value = true
  errorMsg.value = ''
  successMsg.value = ''
  try {
    const res = await fetch(`http://localhost:3000/api/scores/${form.value.xh}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [form.value.subject]: form.value.score }),
    }).then((r) => r.json())
    if (res.success) {
      successMsg.value = '修改成功'
      ElMessage.success('修改成功')
    } else {
      errorMsg.value = '修改失败'
    }
  } catch (e) {
    errorMsg.value = '服务器异常'
  }
  loading.value = false
}

function goBack() {
  router.push('/score-query')
}
</script>

<style scoped>
.my-full-card {
  width: 100%;
  box-sizing: border-box;
}
</style>