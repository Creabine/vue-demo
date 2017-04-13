<template>
	
	<div>

		<div class="container">
			<div class="item new">
				<i class="el-icon-plus"></i>
				<span>新建</span>
			</div>
			<div class="item" :id="dataItem.id" v-for="dataItem in data" :key="dataItem.id">
				<p v-for="modelItem in model">
					<span class="titile">{{modelItem.name}}</span>
					<span v-html="dataItem[modelItem.code]"></span>
				</p>
			</div>
		</div>
	</div>
	
</template>

<script>

export default {
	data(){
		return {
			fit:true
		}
	},
	props: ['model','data','page'],
	methods:{
		handleSelectionChange(data){
			this.$store.dispatch('changeListSelected', data);
		}
	}
}

</script>

<style>
	.container{
		display: flex;
		justify-content: left;
		align-items: center;
		flex-wrap: wrap;
	}
	.container .item,.new{
		width: 250px;
		height: 260px;
		border: 1px solid #e7eaec;
		margin:5px;
		display: block;
		font-size: 14px;
		overflow: hidden;
	}
	.container .item:hover{
		border: 1px solid #1AB394;
	}
	.container .item .title{
		font-weight: 700;
	}
	.container .new{
		display: flex;
		cursor: pointer;
		justify-content: center;
		align-items: center;
		font-size: 25px;
	}
	
</style>