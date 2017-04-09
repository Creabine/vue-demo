<template>
	<el-row>
			<el-col :span="9" :offset="2" v-for="(item,index) in model" :key="item.code">
				<p>
					<span>{{item.name}} : </span>
					<span v-for="d in data">{{d[item.code]}}</span>
				</p>
			</el-col>
	</el-row>
</template>


<script>
	export default {
		props: ['model','data']
	}
</script>