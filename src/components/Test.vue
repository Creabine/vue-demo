<template>
	<div class="jumbotron">
		<h1>计算器</h1>
		
		
		<el-row :gutter="20">
			<el-col :span="6"><el-input v-model="num1" placeholder="num1"></el-input></el-col>
			<el-col :span="6"><el-input v-model="num2" placeholder="num2"></el-input></el-col>
			<el-col :span="2"><el-button type="primary" @click="add">加</el-button></el-col>
			<el-col :span="2"><el-button type="primary" @click="minus">减</el-button></el-col>
			<el-col :span="2"><el-button type="primary" @click="multiply">乘</el-button></el-col>
			<el-col :span="2"><el-button type="primary" @click="divide">除</el-button></el-col>
		</el-row>

		<p> Result = {{ result }}</p>
	</div>
</template>

<script>

	import {mapGetters} from 'vuex'

	export default {
		data(){
			return {
				num1: "0.1",
				num2: "0.2",
				result: ""

			}
		},
		computed : {
			
		},
		methods : {
			add(){  //+
				//判断最大小数位数
				let length1 = this.num1.split(".")[1].length;
				let length2 = this.num2.split(".")[1].length;
				let length = length1 >= length2 ? length1 : length2;
				//console.log(length);
				//化为整数计算再变回小数
				let helpNum = Math.pow(10,length);
				//console.log(helpNum);
				let num1 = Number(this.num1) * helpNum;
				let num2 = Number(this.num2) * helpNum;
				let result = (num1 + num2)/helpNum;
				this.result = result;		
			},
			minus(){  //-
				//判断最大小数位数
				let length1 = this.num1.split(".")[1].length;
				let length2 = this.num2.split(".")[1].length;
				let length = length1 >= length2 ? length1 : length2;
				//console.log(length);
				//化为整数计算再变回小数
				let helpNum = Math.pow(10,length);
				//console.log(helpNum);
				let num1 = Number(this.num1) * helpNum;
				let num2 = Number(this.num2) * helpNum;
				let result = (num1 - num2)/helpNum;
				this.result = result;		
			},
			multiply(){  //*
				//判断最大小数位数
				let length1 = this.num1.split(".")[1].length;
				let length2 = this.num2.split(".")[1].length;
				//let length = length1 >= length2 ? length1 : length2;
				//console.log(length);
				//化为整数计算再变回小数
				let helpNum1 = Math.pow(10,length1);
				let helpNum2 = Math.pow(10,length2);
				//console.log(helpNum);
				let num1 = Number(this.num1) * helpNum1;
				let num2 = Number(this.num2) * helpNum2;
				let result = (num1 * num2)/(helpNum1 * helpNum2);
				this.result = result;	
			},
			divide(){  //  /
				//判断最大小数位数
				let length1 = this.num1.split(".")[1].length;
				let length2 = this.num2.split(".")[1].length;
				//let length = length1 >= length2 ? length1 : length2;
				//console.log(length);
				//化为整数计算再变回小数
				let helpNum1 = Math.pow(10,length1);
				let helpNum2 = Math.pow(10,length2);
				let num1 = Number(this.num1) * helpNum1;
				let num2 = Number(this.num2) * helpNum2;
				let result = (num1 / num2);
				this.result = result;	
			}
		},
	}
	</script>

	<style>
		.data{margin-top: 15px;background-color: green;}
		.model{margin-top: 15px;background-color: yellow;}
		p{margin: 20px 0;}
	</style>