<template>
	<div class="jumbotron">
		<h1>列表</h1>
		<p>相关数据</p>

		<el-row :gutter="20">
			<el-col :span="2">
				<el-badge :value="12" class="item">
					<el-button type="primary">List-1 </el-button>
				</el-badge>
			</el-col>
			<el-col :span="2">
				<el-button type="primary">List-2</el-button>
			</el-col>
		</el-row>

		<div style="margin: 15px 0;">
			<el-input placeholder="关键字..." >
				<i class="el-icon-search" slot="prepend"></i>
				<el-button slot="append">搜索</el-button>
			</el-input>
		</div>

		<el-table :data="tableData3" border stripe style="width: 100%;">
			<el-table-column prop="date" label="日期" width="180"></el-table-column>
			<el-table-column prop="name" label="姓名" width="180"></el-table-column>
			<el-table-column prop="address" label="地址"></el-table-column>
		</el-table>

	</div>
</template>

<script>
  export default {
    data() {
      return {
        tableData3: [{
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    computed: {
    	
    }
  }
</script>

<style>
	.mark-style{
		background-color: #fff;
		color: blur;
	}
</style>