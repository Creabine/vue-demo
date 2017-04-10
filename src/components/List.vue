<template>
	<div class="jumbotron">
		<h1>列表</h1>
		<p>相关数据</p>

		<el-row :gutter="20">
			<!-- <el-col :span="3" v-for="list in listModel.facets" :key="list.code">
				<el-badge value="10" class="item">
					<el-button type="primary" @click="getListData(list.code)">{{list.name}}</el-button>
				</el-badge>
			</el-col> -->
			<el-col :span="12" >
				<el-tabs type="card" v-model="displayType" @tab-click="hehe">
					<el-tab-pane :label="list.name" :class="list.code" v-for="(list,index) in listModel.facets" :key="list.code" :name="String(index)"></el-tab-pane>
				</el-tabs>
			</el-col>
		</el-row>
		 
		<div style="margin: 15px 0;">
			<el-input placeholder="关键字..." >
				<i class="el-icon-search" slot="prepend"></i>
				<el-button slot="append">搜索</el-button>
			</el-input>
		</div>

		<list-form></list-form>

		<!-- 下边的table组件化。然后根据facets[i].type 来判断渲染类型，若没有type就用facets的默认type。 -->
		<!-- 然后根据不同的type来返回不同的子组件，来进行渲染。复制一个facet，渲染出一个 text-->

		<!-- <list-table v-if="displayType == 'gp' && displayModel.length != 0" :model="displayModel" :data="displayData"></list-table> -->
		<!-- 这里是展示模型不是编辑模型，数据结构上有一些不同之处，方便起见就做成文本展示了。 -->
		<!-- <list-text v-if="displayType == 'fm' && displayModel.length != 0" :model="displayModel" :data="displayData"></list-text> -->

		<router-view v-if="displayModel.length != 0"  :model="displayModel" :data="displayData" :page="pageData"></router-view>

		

	

		

	</div>
</template>

<script>

	// 引入这个要一直存在的List-table组件
	import ListTable from './List-table.vue'
	import ListText from './List-text.vue'
	import ListForm from './List-form.vue'
	import {mapState} from 'vuex'
	import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
      	displayType: '',   //gp == table; fm == text;
            displayModel:[],
      	displayData: [],
      	pageData:{}
       }
    },
    // 导出ListTable组件，定义为标签<list-table></list-table>,写在上边的template中。
    components: { 
    	'list-table': ListTable,
    	'list-text': ListText,
    	'list-form':ListForm
    },
    computed: {
    	...mapState({
        	listModel: state => state.list.listModel
	}),
	//...mapGetters(['list1Data','list2Data']),
    	//...mapGetters(['list1Model','list2Model'])
    },
    methods : {
    	hehe(tag,event){
    		console.log(event.target);
    	},
    	getListData(code){
    		//console.log(tab);
    		/* 根据key取相应的model */
    		for (var i = this.listModel.facets.length - 1; i >= 0; i--) {
    			let facet = this.listModel.facets[i];
    			if (facet.code == code) {
    				//取得该facet的渲染类型type，若没有type属性则用默认类型；
    				this.displayType = facet.type || this.listModel.type;
    				//通过渲染类型，整理相应的数据；
    				if (this.displayType == 'gp') {
    					let array = facet.model.main.fields.filter(function(obj){
			  			return obj.listpos > 0
			  		});;
				  	array.sort(compare("listpos"));
					this.displayModel = array;
	    				break;
    				}else if (this.displayType == 'fm') {
    					let array = facet.model.main.fields.filter(function(obj){
			  			return obj.cardpos > 0
			  		});;
				  	array.sort(compare("cardpos"));
					this.displayModel = array;
	    				break;
    				}
    			}
    		}
    		/* 根据key取相应的data,用vue-resource */
    		// GET /someUrl
    		const url = '../../static/' + code + '.json';
    		this.$http.get(url).then(response => {
	    		// get body data
	    		let data = response.body;
	    		data.code = code;
	    		this.pageData = data.data;
	    		//先放入vuex，再取出来处理使用
	    		this.$store.dispatch('addListType', data);
	    		
	    		let list = this.$store.state.list[code + '_data'].data.data

	    		list.map(function(obj){
					obj.sync_switch = Boolean(obj.sync_switch);
				});
	    		this.displayData = list;
	    		
	  		}, response => {
	    		// error callback
	    		alert('get json error !');
  		});
    		/* 生成相应的path并进行路由跳转 */
		const path = '/list/' + this.displayType;
		this.$router.push(path);
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