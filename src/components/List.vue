<template>
	<div class="jumbotron">
		<h1>列表</h1>
		<p>相关数据</p>

		<el-row :gutter="20">
			<el-col :span="2">
				<el-badge :value="list1_Render.length" class="item">
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

		<el-table :data="is_list1 ? list1_Render : list2_Render" border stripe style="width:100%;">
			<el-table-column type="selection" width="130"></el-table-column>
			

			<el-table-column prop="name.value" label="商品名称" width="300"></el-table-column>
			<el-table-column prop="code.value" label="货号" width="130"></el-table-column>
			<el-table-column prop="price.value" label="销售价格（元）" width="130"></el-table-column>
			<el-table-column prop="weight.value" label="重量（kg）" width="130"></el-table-column>
			<el-table-column prop="volume.value" label="体积" width="130"></el-table-column>
			<el-table-column prop="brand.value" label="品牌" width="130"></el-table-column>

			<!-- 由于不能循环渲染列，所以目前没能实现以下3个需求： -->
			<!-- 1.动态输出列；2.根据每列数据的不同code输出不同的内容(数据、文本或按钮)；3.列属性按照listpos排序 -->

			<!-- list目前的问题： 目前列是写死了，如何动态生成列呢？-->
			<!-- 如何循环这个template动态输出不同列数的表格呢？prop只能接受字符串，不能接受数组怎么办？ -->
			<!-- 似乎element-ui目前不支持这个功能，看到了一个请求增加类似特性的issue：https://github.com/ElemeFE/element/issues/3839 -->
			<template>
				<el-table-column prop="category.value" label="品类" width="130"></el-table-column>

				<el-table-column prop="is_gift.value" label="赠品" width="130">
					<template scope="scope">
	        	{{scope.row.is_gift.value == 1 ? "是" : "否"}}
	      	</template>
				</el-table-column>

				<el-table-column prop="sync_switch.value" label="商品同步开关" width="150">
					<template scope="scope">
		        <el-switch on-color="#13ce66" v-model="scope.row.sync_switch.value" off-color="#ff4949"></el-switch>
		      </template>
				</el-table-column>
			</template>
			



		</el-table>

	</div>
</template>

<script>

	//import {mapState} from 'vuex'
	import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        is_list1: true
      }
    },
    computed: {
    	...mapGetters(['list1_Render','list2_Render'])
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