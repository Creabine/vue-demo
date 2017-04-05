<template>
	<div class="jumbotron">
		<h1>列表</h1>
		<p>相关数据</p>

		<el-row :gutter="20">
			<el-col :span="2">
				<el-badge :value="list1Data.length" class="item">
					<el-button type="primary" @click="showList1()">List-1 </el-button>
				</el-badge>
			</el-col>
			<el-col :span="2">
				<el-button type="primary" @click="showList2()">List-2</el-button>
			</el-col>
		</el-row>

		<div style="margin: 15px 0;">
			<el-input placeholder="关键字..." >
				<i class="el-icon-search" slot="prepend"></i>
				<el-button slot="append">搜索</el-button>
			</el-input>
		</div>

		<el-table :data="is_list1 ? list1Data : list2Data" border stripe style="width:100%;">

			<el-table-column type="selection" width="50"></el-table-column>

			<template v-for="item in (is_list1 ? list1Model : list2Model)" >

				<el-table-column v-if="item.code == 'is_gift'" :prop="item.code" :label="item.name" width="60">
					<template scope="scope">
						{{scope.row.is_gift == 1 ? "是" : "否"}}
					</template>
				</el-table-column>

				<el-table-column v-else-if="item.code == 'name'" :prop="item.code" :label="item.name" width="250"></el-table-column>

				<el-table-column v-else-if="item.code == 'sync_switch'"  :prop="item.code" :label="item.name"width="100">
					<template scope="scope">
						<el-switch on-color="#13ce66" v-model="scope.row.sync_switch" off-color="#ff4949"></el-switch>
						<!-- <input type="checkbox" v-model="scope.row.sync_switch"> -->
					</template>
				</el-table-column>

				<el-table-column v-else :prop="item.code" :label="item.name" width="100"></el-table-column>

			</template>

		</el-table>

	</div>
</template>

<script>

	import {mapState} from 'vuex'
	import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        is_list1: true
       }
    },
    computed: {
 //    	...mapState({
 //        	list1Data: state => state.listData.list1.data,
 //        	list2Data: state => state.listData.list2.data
	// }),
	...mapGetters(['list1Data','list2Data']),
    	...mapGetters(['list1Model','list2Model'])
    },
    methods : {
    	showList1() {
    		this.is_list1 = true;
    	},
    	showList2() {
    		this.is_list1 = false;
    	},
    }
  }
</script>

<style>
	.mark-style{
		background-color: #fff;
		color: blur;
	}
</style>