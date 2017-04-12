<template>
	<div>
		<el-table :model="model" :data="data" @selection-change="handleSelectionChange" border stripe max-height="500" :fit="true">
			<el-table-column type="selection" align="center" fixed="left" width="50"></el-table-column>

			<!-- 插入html   :show-overflow-tooltip="true"-->
			<el-table-column :label="item.name" v-for="item in model">
				<template scope="scope">
					<span v-html="scope.row[item.code]"></span>
				</template>
			</el-table-column>
			
		</el-table>

		<el-row type="flex" justify="center">
			<el-pagination
			      :current-page="page.pageNo"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="page.totalCount">
		    	</el-pagination>
		</el-row>
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
	.glyphicon-flag:after{
		content:'flag-html';
		color:green;
	}
</style>