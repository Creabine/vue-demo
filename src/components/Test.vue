<template>
	<div class="jumbotron">
		<h1>表单</h1>
		<!-- <p>{{status == 1 ? "得到数据" : "无数据"}}</p> -->

		<!-- Form -->
		<el-button type="primary" @click="getList()">获取并编辑数据</el-button>
		<el-dialog title="数据编辑表单" v-model="dialogFormVisible"  size="small">
			<el-form :model="testFrom" :rules="rules" ref="testFrom" :inline="true" label-width="120px">

			<el-form-item :label="testFrom.so_money.name" prop="so_money.value">
				<el-input v-model="testFrom.so_money.value" ></el-input>
			</el-form-item>
				<!-- 提交按钮 -->
				<el-form-item>
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="submitForm('testFrom')">提 交</el-button>
				</el-form-item>

			</el-form>
		</el-dialog>
		
	</div>
</template>

<script>

import {mapGetters} from 'vuex'

	export default {
		data(){
			return {
				//dialogTableVisible: false,
				dialogFormVisible: false,
				testFrom:{
					so_money:{
						name: '价格',
						value: 123
					}
				},
				rules:{
					so_money:{
						message:"提示信息",
						required:true,
						trigger:"blur"
					}
				}
			}
		},
		computed : {
			
		},
		methods : {
		  getList() {
		  	  /* 从json文件取得数据放入vuex  */
			  	this.dialogFormVisible = true;
		 	},
		 	submitForm(formName) {
		 		//console.log(this.$refs[formName].validate);
        this.$refs[formName].validate((valid) => {
        	//alert('jinlaile');
          if (valid) {
            alert('submit!');
            this.dialogFormVisible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
		},
	}
</script>

<style>
	.data{margin-top: 15px;background-color: green;}
	.model{margin-top: 15px;background-color: yellow;}
	p{margin: 20px 0;}
</style>