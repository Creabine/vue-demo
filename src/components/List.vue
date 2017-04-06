<template>
	<div class="jumbotron">
		<h1>列表</h1>
		<p>相关数据</p>

		<el-row :gutter="20">
			<el-col :span="3" v-for="list in listModel.facets" :key="list.code">
				<el-badge value="10" class="item">
					<el-button type="primary" @click="getListData(list.code)">{{list.name}}</el-button>
				</el-badge>
			</el-col>
		</el-row>

		<div style="margin: 15px 0;">
			<el-input placeholder="关键字..." >
				<i class="el-icon-search" slot="prepend"></i>
				<el-button slot="append">搜索</el-button>
			</el-input>
		</div>

		<el-table v-show="displayModel.length != 0" :data="displayList" border stripe style="width:100%;">

			<el-table-column type="selection" width="50"></el-table-column>

			<template v-for="item in displayModel" >

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
        displayModel:[],
        displayList: []
       }
    },
    computed: {
    	...mapState({
        	listModel: state => state.list.listModel
	}),
	//...mapGetters(['list1Data','list2Data']),
    	//...mapGetters(['list1Model','list2Model'])
    },
    methods : {
    	getListData(code){
    		/* 根据key取相应的model */
    		for (var i = this.listModel.facets.length - 1; i >= 0; i--) {
    			if (this.listModel.facets[i].code == code) {
    				let array = this.listModel.facets[i].model.main.fields.filter(function(obj){
			  		return obj.listpos > 0
			  	});;
			  	array.sort(compare("listpos"));
				this.displayModel = array;
    				break;
    			}
    		}
    		/* 根据key取相应的data,用vue-resource */
    		// GET /someUrl
    		const url = '../../static/' + code + '.json';
    		this.$http.get(url).then(response => {
	    		// get body data
	    		let data = response.body;
	    		data.code = code;
	    		//先放入vuex，再取出来处理使用
	    		this.$store.dispatch('addListType', data);
	    		
	    		let list = this.$store.state.list[code + '_data'].data.data
	    		list.map(function(obj){
				obj.sync_switch = Boolean(obj.sync_switch);
			});
	    		this.displayList = list;
	  		}, response => {
	    		// error callback
	    		alert('get json error !');
  		});
    	}
    }
  }	

/* 公用函数 */
function compare(propertyName){
	return function (object1, object2) { 
		var value1 = object1[propertyName]; 
		var value2 = object2[propertyName]; 
		return value1 - value2;
	};  
}
</script>

<style>
	.mark-style{
		background-color: #fff;
		color: blur;
	}
</style>