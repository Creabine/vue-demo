<template>
	<el-table :model="model" :data="data" border stripe style="width:100%;">
		<el-table-column type="selection" width="50"></el-table-column>

		<template v-for="item in model" >
			<el-table-column v-if="item.code == 'is_gift'" :prop="item.code" :label="item.name" width="60">
				<template scope="scope">
					{{scope.row.is_gift == 1 ? "是" : "否"}}
				</template>
			</el-table-column>

			<el-table-column v-else-if="item.code == 'name'" :prop="item.code" :label="item.name" width="250"></el-table-column>

			<el-table-column v-else-if="item.code == 'sync_switch'"  :prop="item.code" :label="item.name"width="100">
				<template scope="scope">
					<el-switch on-color="#13ce66" v-model="scope.row.sync_switch" off-color="#ff4949"></el-switch>
				</template>
			</el-table-column>

			<el-table-column v-else :prop="item.code" :label="item.name" width="100"></el-table-column>
		</template>
	</el-table>
</template>


<script>
	export default {
		props: ['model','data']
	}
</script>